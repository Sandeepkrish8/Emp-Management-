'use client'

import { useState, useEffect } from 'react'
import { Plus, CheckCircle, XCircle } from 'lucide-react'
import { DashboardLayout } from '@/components/layouts/DashboardLayout'
import { DataTable, Column } from '@/components/tables/DataTable'
import { Modal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Avatar } from '@/components/ui/avatar'
import { useAllEmployees } from '@/hooks/useEmployees'
import { LeaveRequest } from '@/lib/types'
import { MOCK_LEAVES } from '@/lib/mock-data'
import { LEAVE_TYPES } from '@/lib/constants'
import { formatDate, getStatusColor, cn, calculateLeaveDays, sleep } from '@/lib/utils'
import toast from 'react-hot-toast'

const STATUS_OPTS = [
  { value: '', label: 'All' },
  { value: 'pending',  label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
]

export default function LeavePage() {
  const [leaves, setLeaves] = useState<LeaveRequest[]>([])
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const { employees } = useAllEmployees()

  const [form, setForm] = useState({
    employeeId: '',
    type: 'annual',
    startDate: '',
    endDate: '',
    reason: '',
  })

  useEffect(() => {
    setLoading(true)
    sleep(250).then(() => {
      setLeaves([...MOCK_LEAVES])
      setLoading(false)
    })
  }, [])

  const filtered = filter ? leaves.filter((l) => l.status === filter) : leaves

  const handleApprove = async (id: string) => {
    const idx = MOCK_LEAVES.findIndex((l) => l.id === id)
    if (idx !== -1) MOCK_LEAVES[idx].status = 'approved'
    setLeaves([...MOCK_LEAVES])
    toast.success('Leave approved')
  }

  const handleReject = async (id: string) => {
    const idx = MOCK_LEAVES.findIndex((l) => l.id === id)
    if (idx !== -1) MOCK_LEAVES[idx].status = 'rejected'
    setLeaves([...MOCK_LEAVES])
    toast.success('Leave rejected')
  }

  const handleCreate = async () => {
    if (!form.employeeId || !form.startDate || !form.endDate || !form.reason) {
      toast.error('Please fill all fields')
      return
    }
    setSubmitting(true)
    await sleep(400)
    const emp = employees.find((e) => e.id === form.employeeId)
    const newLeave: LeaveRequest = {
      id: String(Date.now()),
      employeeId: form.employeeId,
      employee: emp,
      type: form.type as LeaveRequest['type'],
      startDate: form.startDate,
      endDate: form.endDate,
      reason: form.reason,
      status: 'pending',
      days: calculateLeaveDays(form.startDate, form.endDate),
      createdAt: new Date().toISOString(),
    }
    MOCK_LEAVES.unshift(newLeave)
    setLeaves([...MOCK_LEAVES])
    toast.success('Leave request created')
    setSubmitting(false)
    setModalOpen(false)
    setForm({ employeeId: '', type: 'annual', startDate: '', endDate: '', reason: '' })
  }

  const empOptions = employees.map((e) => ({
    value: e.id,
    label: e.name,
  }))

  const columns: Column<LeaveRequest>[] = [
    {
      key: 'employee',
      label: 'Employee',
      render: (r) => {
        const name = r.employee?.name ?? 'Unknown'
        return (
          <div className="flex items-center gap-2.5">
            <Avatar name={name} size="sm" />
            <span className="font-medium text-gray-900">{name}</span>
          </div>
        )
      },
    },
    {
      key: 'type',
      label: 'Type',
      render: (r) => (
        <Badge className={cn('capitalize', getStatusColor(r.type))}>
          {r.type.replace('_', ' ')}
        </Badge>
      ),
    },
    {
      key: 'dates',
      label: 'Dates',
      render: (r) =>
        `${formatDate(r.startDate, 'MMM d')} – ${formatDate(r.endDate, 'MMM d, yyyy')}`,
    },
    { key: 'days', label: 'Days', render: (r) => `${r.days}d` },
    { key: 'reason', label: 'Reason', render: (r) => <span className="max-w-xs truncate block">{r.reason}</span> },
    {
      key: 'status',
      label: 'Status',
      render: (r) => (
        <Badge className={cn('capitalize', getStatusColor(r.status))}>
          {r.status}
        </Badge>
      ),
    },
    {
      key: 'actions',
      label: '',
      render: (r) =>
        r.status === 'pending' ? (
          <div className="flex gap-1.5">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-emerald-600 hover:bg-emerald-50"
              onClick={() => handleApprove(r.id)}
            >
              <CheckCircle className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-red-500 hover:bg-red-50"
              onClick={() => handleReject(r.id)}
            >
              <XCircle className="h-4 w-4" />
            </Button>
          </div>
        ) : null,
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-44">
            <Select
              options={STATUS_OPTS}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          <Button onClick={() => setModalOpen(true)}>
            <Plus className="h-4 w-4" />
            New Request
          </Button>
        </div>

        <DataTable columns={columns} data={filtered} loading={loading} />
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="New Leave Request"
        size="md"
      >
        <div className="space-y-4">
          <Select
            label="Employee"
            options={empOptions}
            placeholder="Select employee"
            value={form.employeeId}
            onChange={(e) => setForm((f) => ({ ...f, employeeId: e.target.value }))}
          />
          <Select
            label="Leave Type"
            options={LEAVE_TYPES as unknown as { value: string; label: string }[]}
            value={form.type}
            onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Start Date"
              type="date"
              value={form.startDate}
              onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value }))}
            />
            <Input
              label="End Date"
              type="date"
              value={form.endDate}
              onChange={(e) => setForm((f) => ({ ...f, endDate: e.target.value }))}
            />
          </div>
          <Textarea
            label="Reason"
            placeholder="Brief reason for leave..."
            value={form.reason}
            onChange={(e) => setForm((f) => ({ ...f, reason: e.target.value }))}
          />
          <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
            <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate} loading={submitting}>Submit</Button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  )
}

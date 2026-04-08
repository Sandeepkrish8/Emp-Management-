'use client'

import { useState, useCallback } from 'react'
import { Plus } from 'lucide-react'
import { parseISO, isAfter, isBefore, startOfDay } from 'date-fns'
import { DashboardLayout } from '@/components/layouts/DashboardLayout'
import { EmployeeTable } from '@/components/tables/EmployeeTable'
import { EmployeeForm } from '@/components/forms/EmployeeForm'
import { Modal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'
import { AdvancedSearch, SearchFilters, EMPTY_FILTERS } from '@/components/employees/AdvancedSearch'
import { useEmployees, useCreateEmployee, useUpdateEmployee, useDeleteEmployee } from '@/hooks/useEmployees'
import { useDepartments } from '@/hooks/useDepartments'
import { Employee, EmployeeFormData } from '@/lib/types'
import { exportToCSV, exportToExcel } from '@/lib/utils'
import toast from 'react-hot-toast'

export default function EmployeesPage() {
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState<SearchFilters>(EMPTY_FILTERS)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selected, setSelected] = useState<Employee | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const { employees, total, loading } = useEmployees(page, 10)
  const { departments } = useDepartments()
  const createMutation = useCreateEmployee()
  const updateMutation = useUpdateEmployee(selected?.id ?? '')
  const deleteMutation = useDeleteEmployee()

  const deptOptions = departments.map((d) => ({ value: d.id, label: d.name }))

  const filtered = employees.filter((e) => {
    const { searchTerm, department, status, hireDateFrom, hireDateTo } = filters
    if (searchTerm) {
      const q = searchTerm.toLowerCase()
      if (!`${e.name} ${e.email} ${e.position}`.toLowerCase().includes(q)) return false
    }
    if (department && e.departmentId !== department) return false
    if (status && e.status !== status) return false
    if (hireDateFrom) {
      try { if (isBefore(parseISO(String(e.hireDate)), startOfDay(parseISO(hireDateFrom)))) return false } catch {}
    }
    if (hireDateTo) {
      try { if (isAfter(parseISO(String(e.hireDate)), startOfDay(parseISO(hireDateTo)))) return false } catch {}
    }
    return true
  })

  const handleFilter = useCallback((f: SearchFilters) => {
    setFilters(f)
    setPage(1)
  }, [])

  const handleExport = useCallback((format: 'csv' | 'excel') => {
    const rows = filtered.map((e) => ({
      Name: e.name,
      Email: e.email,
      Phone: e.phoneNumber,
      Department: e.department?.name ?? '',
      Position: e.position,
      Status: e.status,
      Salary: e.salary,
      'Hire Date': String(e.hireDate),
    }))
    if (format === 'csv') exportToCSV(rows as any, 'employees')
    else exportToExcel(rows as any, 'employees')
  }, [filtered])

  const handleSubmit = async (data: EmployeeFormData) => {
    setSubmitting(true)
    if (selected) {
      await updateMutation.mutateAsync(data)
    } else {
      await createMutation.mutateAsync(data)
    }
    setSubmitting(false)
    setModalOpen(false)
    setSelected(null)
  }

  const handleEdit = (emp: Employee) => {
    setSelected(emp)
    setModalOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!selected) return
    await deleteMutation.mutateAsync(selected.id)
    setDeleteModalOpen(false)
    setSelected(null)
  }

  const openNew = () => {
    setSelected(null)
    setModalOpen(true)
  }

  return (
    <DashboardLayout>
      <div className="space-y-5">
        {/* Toolbar */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
            <p className="text-sm text-gray-500 mt-0.5">{total} total employees</p>
          </div>
          <Button onClick={openNew} className="flex-shrink-0 gap-2">
            <Plus className="h-4 w-4" />
            New Employee
          </Button>
        </div>

        {/* Advanced Search */}
        <AdvancedSearch
          departments={deptOptions}
          onFilter={handleFilter}
          onExport={handleExport}
          totalFiltered={filtered.length}
        />

        {/* Table */}
        <EmployeeTable
          employees={filtered}
          total={total}
          page={page}
          pageSize={10}
          loading={loading}
          onPageChange={setPage}
          onEdit={handleEdit}
          onDelete={(emp) => { setSelected(emp); setDeleteModalOpen(true) }}
        />
      </div>

      {/* Create / Edit modal */}
      <Modal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setSelected(null) }}
        title={selected ? 'Edit Employee' : 'New Employee'}
        size="xl"
      >
        <EmployeeForm
          employee={selected}
          departments={deptOptions}
          onSubmit={handleSubmit}
          onCancel={() => { setModalOpen(false); setSelected(null) }}
          loading={submitting}
        />
      </Modal>

      {/* Delete confirmation */}
      <Modal
        open={deleteModalOpen}
        onClose={() => { setDeleteModalOpen(false); setSelected(null) }}
        title="Delete Employee"
        size="sm"
      >
        <p className="text-sm text-gray-600">
          Are you sure you want to delete{' '}
          <strong>{selected?.name}</strong>? This action cannot be undone.
        </p>
        <div className="mt-5 flex justify-end gap-3">
          <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </div>
      </Modal>
    </DashboardLayout>
  )
}

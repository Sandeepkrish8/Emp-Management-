'use client'

import { useState } from 'react'
import { Plus, Users, Pencil, Trash2 } from 'lucide-react'
import { DashboardLayout } from '@/components/layouts/DashboardLayout'
import { DepartmentForm } from '@/components/forms/DepartmentForm'
import { Modal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useDepartments } from '@/hooks/useDepartments'
import { useAllEmployees } from '@/hooks/useEmployees'
import { Department, DepartmentFormData } from '@/lib/types'
import { formatDate } from '@/lib/utils'

export default function DepartmentsPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selected, setSelected] = useState<Department | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const { departments, loading, createDepartment, updateDepartment, deleteDepartment } =
    useDepartments()
  const { employees } = useAllEmployees()

  const managerOptions = employees.map((e) => ({
    value: e.id,
    label: e.name,
  }))

  const handleSubmit = async (data: DepartmentFormData) => {
    setSubmitting(true)
    if (selected) {
      await updateDepartment(selected.id, data)
    } else {
      await createDepartment(data)
    }
    setSubmitting(false)
    setModalOpen(false)
    setSelected(null)
  }

  const openNew = () => { setSelected(null); setModalOpen(true) }
  const openEdit = (d: Department) => { setSelected(d); setModalOpen(true) }
  const openDelete = (d: Department) => { setSelected(d); setDeleteModalOpen(true) }

  return (
    <DashboardLayout>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">{departments.length} departments total</p>
          <Button onClick={openNew}>
            <Plus className="h-4 w-4" />
            New Department
          </Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-36 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {departments.map((dept) => {
              const manager = employees.find((e) => e.id === dept.managerId)
              return (
                <Card key={dept.id} className="group hover:shadow-md transition-shadow">
                  <CardContent className="pt-5">
                    <div className="flex items-start justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50">
                        <Users className="h-5 w-5 text-primary-600" />
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(dept)}>
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-red-500 hover:bg-red-50"
                          onClick={() => openDelete(dept)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                    <h3 className="mt-3 font-semibold text-gray-900">{dept.name}</h3>
                    <p className="mt-0.5 text-xs text-gray-500 line-clamp-2">
                      {dept.description ?? 'No description'}
                    </p>
                    <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                      <span>
                        <strong className="text-gray-700">{dept.employeeCount ?? 0}</strong> employees
                      </span>
                      {manager && (
                        <span className="truncate max-w-[120px]">
                          {manager.name}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>

      <Modal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setSelected(null) }}
        title={selected ? 'Edit Department' : 'New Department'}
        size="md"
      >
        <DepartmentForm
          department={selected}
          managers={managerOptions}
          onSubmit={handleSubmit}
          onCancel={() => { setModalOpen(false); setSelected(null) }}
          loading={submitting}
        />
      </Modal>

      <Modal
        open={deleteModalOpen}
        onClose={() => { setDeleteModalOpen(false); setSelected(null) }}
        title="Delete Department"
        size="sm"
      >
        <p className="text-sm text-gray-600">
          Are you sure you want to delete <strong>{selected?.name}</strong>?
          This action cannot be undone.
        </p>
        <div className="mt-5 flex justify-end gap-3">
          <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
          <Button variant="destructive" onClick={async () => {
            if (selected) await deleteDepartment(selected.id)
            setDeleteModalOpen(false)
            setSelected(null)
          }}>
            Delete
          </Button>
        </div>
      </Modal>
    </DashboardLayout>
  )
}

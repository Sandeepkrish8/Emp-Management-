'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, Filter, X, Download, ChevronDown } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export interface SearchFilters {
  searchTerm: string
  department: string
  status: string
  hireDateFrom: string
  hireDateTo: string
}

export const EMPTY_FILTERS: SearchFilters = {
  searchTerm: '',
  department: '',
  status: '',
  hireDateFrom: '',
  hireDateTo: '',
}

interface AdvancedSearchProps {
  departments: { value: string; label: string }[]
  onFilter: (filters: SearchFilters) => void
  onExport: (format: 'csv' | 'excel') => void
  totalFiltered: number
}

export function AdvancedSearch({
  departments,
  onFilter,
  onExport,
  totalFiltered,
}: AdvancedSearchProps) {
  const [filters, setFilters] = useState<SearchFilters>(EMPTY_FILTERS)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const activeFilterCount = [
    filters.department,
    filters.status,
    filters.hireDateFrom,
    filters.hireDateTo,
  ].filter(Boolean).length

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      onFilter(filters)
    }, 300)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [filters]) // eslint-disable-line react-hooks/exhaustive-deps

  const update = (patch: Partial<SearchFilters>) =>
    setFilters((prev) => ({ ...prev, ...patch }))

  const clearAll = () => setFilters(EMPTY_FILTERS)

  const hasFilters = Object.values(filters).some(Boolean)

  return (
    <div className="space-y-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      {/* Row 1: search input + filter toggle + export */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by name, email, or position..."
            className="pl-9 pr-9"
            value={filters.searchTerm}
            onChange={(e) => update({ searchTerm: e.target.value })}
          />
          {filters.searchTerm && (
            <button
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              onClick={() => update({ searchTerm: '' })}
              type="button"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Filter toggle */}
        <Button
          variant="outline"
          onClick={() => setShowAdvanced((v) => !v)}
          className="relative flex-shrink-0 gap-2"
          type="button"
        >
          <Filter className="h-4 w-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
              {activeFilterCount}
            </span>
          )}
          <ChevronDown
            className={`h-3 w-3 transition-transform ${showAdvanced ? 'rotate-180' : ''}`}
          />
        </Button>

        {/* Export */}
        <div className="flex flex-shrink-0 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onExport('csv')}
            disabled={totalFiltered === 0}
            className="gap-1.5"
            type="button"
          >
            <Download className="h-3.5 w-3.5" />
            CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onExport('excel')}
            disabled={totalFiltered === 0}
            className="gap-1.5"
            type="button"
          >
            <Download className="h-3.5 w-3.5" />
            Excel
          </Button>
        </div>
      </div>

      {/* Row 2: advanced filter panel */}
      {showAdvanced && (
        <div className="grid grid-cols-1 gap-3 border-t border-gray-100 pt-3 sm:grid-cols-4">
          {/* Department */}
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">
              Department
            </label>
            <select
              value={filters.department}
              onChange={(e) => update({ department: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Departments</option>
              {departments.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => update({ status: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="on-leave">On Leave</option>
            </select>
          </div>

          {/* Hired From */}
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">
              Hired From
            </label>
            <input
              type="date"
              value={filters.hireDateFrom}
              onChange={(e) => update({ hireDateFrom: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Hired To */}
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">
              Hired To
            </label>
            <input
              type="date"
              value={filters.hireDateTo}
              onChange={(e) => update({ hireDateTo: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}

      {/* Row 3: active filter summary */}
      {hasFilters && (
        <div className="flex items-center justify-between border-t border-gray-100 pt-2 text-sm">
          <span className="text-gray-500">
            Showing{' '}
            <strong className="text-gray-800">{totalFiltered}</strong>{' '}
            result{totalFiltered !== 1 ? 's' : ''}
          </span>
          <button
            onClick={clearAll}
            type="button"
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
          >
            <X className="h-3.5 w-3.5" />
            Clear all filters
          </button>
        </div>
      )}
    </div>
  )
}

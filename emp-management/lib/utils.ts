import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, parseISO, differenceInDays } from 'date-fns'
import { DATE_FORMAT } from './constants'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date, fmt = DATE_FORMAT): string {
  try {
    const d = typeof date === 'string' ? parseISO(date) : date
    return format(d, fmt)
  } catch {
    return 'Invalid date'
  }
}

export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount)
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function calculateLeaveDays(startDate: string, endDate: string): number {
  return differenceInDays(parseISO(endDate), parseISO(startDate)) + 1
}

// ─── Export Utilities ────────────────────────────────────────────────────────

export function exportToCSV(data: Record<string, unknown>[], filename: string): void {
  if (data.length === 0) return
  const headers = Object.keys(data[0])
  const escape = (val: unknown) => {
    const s = String(val ?? '')
    return s.includes(',') || s.includes('"') || s.includes('\n')
      ? `"${s.replace(/"/g, '""')}"`
      : s
  }
  const rows = [
    headers.join(','),
    ...data.map((row) => headers.map((h) => escape(row[h])).join(',')),
  ]
  const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${filename}.csv`
  link.click()
  URL.revokeObjectURL(url)
}

export function exportToExcel(data: Record<string, unknown>[], filename: string): void {
  if (data.length === 0) return
  const headers = Object.keys(data[0])
  const xmlEsc = (v: unknown) =>
    String(v ?? '').replace(/[<>&"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c] ?? c))
  const rows = [headers, ...data.map((row) => headers.map((h) => row[h]))]
  const xmlRows = rows
    .map(
      (r) =>
        `<Row>${r.map((c) => `<Cell><Data ss:Type="String">${xmlEsc(c)}</Data></Cell>`).join('')}</Row>`
    )
    .join('')
  const xml = [
    `<?xml version="1.0"?>`,
    `<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">`,
    `<Worksheet ss:Name="Employees"><Table>${xmlRows}</Table></Worksheet>`,
    `</Workbook>`,
  ].join('')
  const blob = new Blob([xml], { type: 'application/vnd.ms-excel' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${filename}.xls`
  link.click()
  URL.revokeObjectURL(url)
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    active:    'text-emerald-700 bg-emerald-50 border-emerald-200',
    inactive:  'text-gray-600 bg-gray-100 border-gray-200',
    on_leave:  'text-amber-700 bg-amber-50 border-amber-200',
    present:   'text-emerald-700 bg-emerald-50 border-emerald-200',
    absent:    'text-red-700 bg-red-50 border-red-200',
    late:      'text-amber-700 bg-amber-50 border-amber-200',
    half_day:  'text-blue-700 bg-blue-50 border-blue-200',
    pending:   'text-amber-700 bg-amber-50 border-amber-200',
    approved:  'text-emerald-700 bg-emerald-50 border-emerald-200',
    rejected:  'text-red-700 bg-red-50 border-red-200',
    annual:    'text-blue-700 bg-blue-50 border-blue-200',
    sick:      'text-orange-700 bg-orange-50 border-orange-200',
    maternity: 'text-pink-700 bg-pink-50 border-pink-200',
    paternity: 'text-indigo-700 bg-indigo-50 border-indigo-200',
    unpaid:    'text-gray-700 bg-gray-100 border-gray-200',
  }
  return colors[status] ?? 'text-gray-600 bg-gray-100 border-gray-200'
}

export function truncate(str: string, length = 50): string {
  return str.length > length ? `${str.substring(0, length)}…` : str
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}

export function generateEmployeeId(): string {
  return `EMP${String(Math.floor(Math.random() * 9000) + 1000)}`
}

export function getRatingLabel(rating: number): string {
  const labels: Record<number, string> = {
    1: 'Poor',
    2: 'Below Average',
    3: 'Average',
    4: 'Good',
    5: 'Excellent',
  }
  return labels[rating] ?? 'N/A'
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

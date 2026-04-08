export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

export const APP_NAME =
  process.env.NEXT_PUBLIC_APP_NAME || 'EMS - Employee Management System'

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  EMPLOYEES: '/employees',
  EMPLOYEE_NEW: '/employees/new',
  EMPLOYEE_DETAIL: (id: string) => `/employees/${id}`,
  DEPARTMENTS: '/departments',
  ATTENDANCE: '/attendance',
  LEAVE: '/leave',
  PERFORMANCE: '/performance',
} as const

export const LEAVE_TYPES = [
  { value: 'annual', label: 'Annual Leave' },
  { value: 'sick', label: 'Sick Leave' },
  { value: 'maternity', label: 'Maternity Leave' },
  { value: 'paternity', label: 'Paternity Leave' },
  { value: 'unpaid', label: 'Unpaid Leave' },
] as const

export const EMPLOYEE_STATUS_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'on_leave', label: 'On Leave' },
] as const

export const ROLE_OPTIONS = [
  { value: 'admin', label: 'Admin' },
  { value: 'manager', label: 'Manager' },
  { value: 'employee', label: 'Employee' },
] as const

export const PAGINATION_LIMITS = [10, 25, 50, 100] as const
export const DEFAULT_PAGE_SIZE = 10

export const DATE_FORMAT = 'MMMM dd, yyyy'
export const DATE_SHORT = 'MM/dd/yyyy'
export const DATETIME_FORMAT = 'MMM dd, yyyy HH:mm'

export const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { href: '/employees', label: 'Employees', icon: 'Users' },
  { href: '/departments', label: 'Departments', icon: 'Building2' },
  { href: '/attendance', label: 'Attendance', icon: 'Clock' },
  { href: '/leave', label: 'Leave', icon: 'CalendarDays' },
  { href: '/performance', label: 'Performance', icon: 'TrendingUp' },
] as const

// ─── User & Auth ────────────────────────────────────────────────────────────

export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'manager' | 'employee'
  avatar?: string
}

// ─── Employee ────────────────────────────────────────────────────────────────

export type EmployeeStatus = 'active' | 'inactive' | 'on-leave'

export interface Employee {
  id: string
  name: string
  email: string
  phoneNumber: string
  departmentId: string
  department?: Department
  position: string
  salary: number
  status: EmployeeStatus
  hireDate: string | Date
  emergencyContact?: string
  address?: string
  dateOfBirth?: string | Date
  profileImage?: string
  createdAt?: string
  updatedAt?: string
}

export type EmployeeFormData = Omit<Employee, 'id' | 'department' | 'createdAt' | 'updatedAt'>

// ─── Department ──────────────────────────────────────────────────────────────

export interface Department {
  id: string
  name: string
  description?: string
  managerId?: string
  manager?: Employee
  employeeCount?: number
  createdAt: string
}

export type DepartmentFormData = Omit<Department, 'id' | 'manager' | 'employeeCount' | 'createdAt'>

// ─── Attendance ──────────────────────────────────────────────────────────────

export type AttendanceStatus = 'present' | 'absent' | 'late' | 'half_day'

export interface Attendance {
  id: string
  employeeId: string
  employee?: Employee
  date: string
  checkIn: string
  checkOut?: string
  status: AttendanceStatus
  hoursWorked?: number
}

// ─── Leave ───────────────────────────────────────────────────────────────────

export type LeaveType = 'annual' | 'sick' | 'maternity' | 'paternity' | 'unpaid'
export type LeaveStatus = 'pending' | 'approved' | 'rejected'

export interface LeaveRequest {
  id: string
  employeeId: string
  employee?: Employee
  type: LeaveType
  startDate: string
  endDate: string
  reason: string
  status: LeaveStatus
  days: number
  createdAt: string
}

export type LeaveFormData = Omit<LeaveRequest, 'id' | 'employee' | 'status' | 'days' | 'createdAt'>

// ─── Performance ─────────────────────────────────────────────────────────────

export interface Performance {
  id: string
  employeeId: string
  employee?: Employee
  period: string
  rating: number
  goals: string
  achievements: string
  feedback: string
  reviewerId: string
  createdAt: string
}

// ─── Dashboard ───────────────────────────────────────────────────────────────

export interface DashboardMetrics {
  totalEmployees: number
  activeEmployees: number
  totalDepartments: number
  pendingLeaves: number
  presentToday: number
  absentToday: number
}

// ─── API ─────────────────────────────────────────────────────────────────────

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface ApiError {
  message: string
  code?: string
  errors?: Record<string, string[]>
}

// ─── Store ───────────────────────────────────────────────────────────────────

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  setAuth: (user: User, token: string) => void
  logout: () => void
  updateUser: (updates: Partial<User>) => void
}

export interface AppState {
  sidebarOpen: boolean
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
}

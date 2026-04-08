import {
  Employee,
  Department,
  Attendance,
  LeaveRequest,
  Performance,
  DashboardMetrics,
} from './types'

export const MOCK_DEPARTMENTS: Department[] = [
  { id: '1', name: 'Engineering',     description: 'Software development & infrastructure', managerId: '1', employeeCount: 12, createdAt: '2023-01-10' },
  { id: '2', name: 'Human Resources', description: 'HR, recruitment & people ops',           managerId: '2', employeeCount: 5,  createdAt: '2023-01-10' },
  { id: '3', name: 'Marketing',       description: 'Brand, growth & communications',          managerId: '3', employeeCount: 8,  createdAt: '2023-01-10' },
  { id: '4', name: 'Finance',         description: 'Finance, accounting & reporting',         managerId: '4', employeeCount: 6,  createdAt: '2023-01-10' },
  { id: '5', name: 'Operations',      description: 'Ops, logistics & vendor management',      managerId: '5', employeeCount: 9,  createdAt: '2023-01-10' },
]

export const MOCK_EMPLOYEES: Employee[] = [
  { id: '1',  name: 'John Smith',     email: 'john.smith@company.com',    phoneNumber: '+1 555-0101', departmentId: '1', department: MOCK_DEPARTMENTS[0], position: 'Senior Engineer',     salary: 95000, status: 'active',   hireDate: '2022-03-15' },
  { id: '2',  name: 'Sarah Johnson',  email: 'sarah.johnson@company.com', phoneNumber: '+1 555-0102', departmentId: '2', department: MOCK_DEPARTMENTS[1], position: 'HR Manager',          salary: 75000, status: 'active',   hireDate: '2021-06-01' },
  { id: '3',  name: 'Michael Brown',  email: 'michael.brown@company.com', phoneNumber: '+1 555-0103', departmentId: '3', department: MOCK_DEPARTMENTS[2], position: 'Marketing Lead',      salary: 80000, status: 'active',   hireDate: '2022-09-10' },
  { id: '4',  name: 'Emily Davis',    email: 'emily.davis@company.com',   phoneNumber: '+1 555-0104', departmentId: '4', department: MOCK_DEPARTMENTS[3], position: 'Financial Analyst',   salary: 70000, status: 'on-leave', hireDate: '2023-01-20' },
  { id: '5',  name: 'David Wilson',   email: 'david.wilson@company.com',  phoneNumber: '+1 555-0105', departmentId: '1', department: MOCK_DEPARTMENTS[0], position: 'Frontend Developer', salary: 85000, status: 'active',   hireDate: '2022-11-05' },
  { id: '6',  name: 'Jessica Martinez',email: 'jessica.m@company.com',   phoneNumber: '+1 555-0106', departmentId: '5', department: MOCK_DEPARTMENTS[4], position: 'Operations Manager', salary: 78000, status: 'active',   hireDate: '2021-04-15' },
  { id: '7',  name: 'Robert Taylor',  email: 'robert.taylor@company.com', phoneNumber: '+1 555-0107', departmentId: '1', department: MOCK_DEPARTMENTS[0], position: 'Backend Developer',  salary: 90000, status: 'active',   hireDate: '2022-07-22' },
  { id: '8',  name: 'Amanda Anderson',email: 'amanda.a@company.com',      phoneNumber: '+1 555-0108', departmentId: '2', department: MOCK_DEPARTMENTS[1], position: 'Recruiter',          salary: 60000, status: 'inactive', hireDate: '2023-03-08' },
  { id: '9',  name: 'Chris Lee',      email: 'chris.lee@company.com',     phoneNumber: '+1 555-0109', departmentId: '3', department: MOCK_DEPARTMENTS[2], position: 'Content Strategist', salary: 65000, status: 'active',   hireDate: '2023-05-12' },
  { id: '10', name: 'Megan White',    email: 'megan.white@company.com',   phoneNumber: '+1 555-0110', departmentId: '4', department: MOCK_DEPARTMENTS[3], position: 'Senior Accountant',  salary: 82000, status: 'active',   hireDate: '2021-09-30' },
]

export const MOCK_ATTENDANCE: Attendance[] = [
  { id: '1', employeeId: '1',  employee: MOCK_EMPLOYEES[0], date: '2026-04-06', checkIn: '09:00', checkOut: '17:30', status: 'present',  hoursWorked: 8.5 },
  { id: '2', employeeId: '2',  employee: MOCK_EMPLOYEES[1], date: '2026-04-06', checkIn: '08:45', checkOut: '17:15', status: 'present',  hoursWorked: 8.5 },
  { id: '3', employeeId: '3',  employee: MOCK_EMPLOYEES[2], date: '2026-04-06', checkIn: '09:45', checkOut: '17:30', status: 'late',     hoursWorked: 7.75 },
  { id: '4', employeeId: '4',  employee: MOCK_EMPLOYEES[3], date: '2026-04-06', checkIn: '',      checkOut: '',      status: 'absent',   hoursWorked: 0 },
  { id: '5', employeeId: '5',  employee: MOCK_EMPLOYEES[4], date: '2026-04-06', checkIn: '09:00', checkOut: '13:00', status: 'half_day', hoursWorked: 4 },
  { id: '6', employeeId: '6',  employee: MOCK_EMPLOYEES[5], date: '2026-04-06', checkIn: '08:30', checkOut: '17:00', status: 'present',  hoursWorked: 8.5 },
  { id: '7', employeeId: '7',  employee: MOCK_EMPLOYEES[6], date: '2026-04-06', checkIn: '09:05', checkOut: '18:00', status: 'present',  hoursWorked: 8.92 },
  { id: '8', employeeId: '8',  employee: MOCK_EMPLOYEES[7], date: '2026-04-06', checkIn: '',      checkOut: '',      status: 'absent',   hoursWorked: 0 },
]

export const MOCK_LEAVES: LeaveRequest[] = [
  { id: '1', employeeId: '1', employee: MOCK_EMPLOYEES[0], type: 'annual',   startDate: '2026-04-10', endDate: '2026-04-15', reason: 'Family vacation',               status: 'pending',  days: 5, createdAt: '2026-04-01' },
  { id: '2', employeeId: '3', employee: MOCK_EMPLOYEES[2], type: 'sick',     startDate: '2026-04-08', endDate: '2026-04-09', reason: 'Medical appointment',           status: 'approved', days: 2, createdAt: '2026-04-05' },
  { id: '3', employeeId: '5', employee: MOCK_EMPLOYEES[4], type: 'annual',   startDate: '2026-04-20', endDate: '2026-04-24', reason: 'Rest and relaxation',           status: 'pending',  days: 5, createdAt: '2026-04-03' },
  { id: '4', employeeId: '7', employee: MOCK_EMPLOYEES[6], type: 'unpaid',   startDate: '2026-03-15', endDate: '2026-03-16', reason: 'Personal matters',              status: 'rejected', days: 2, createdAt: '2026-03-10' },
  { id: '5', employeeId: '2', employee: MOCK_EMPLOYEES[1], type: 'maternity',startDate: '2026-05-01', endDate: '2026-06-30', reason: 'Maternity leave',               status: 'approved', days: 60,createdAt: '2026-03-20' },
  { id: '6', employeeId: '9', employee: MOCK_EMPLOYEES[8], type: 'sick',     startDate: '2026-04-07', endDate: '2026-04-07', reason: 'Fever and cold',                status: 'pending',  days: 1, createdAt: '2026-04-06' },
]

export const MOCK_PERFORMANCE: Performance[] = [
  { id: '1', employeeId: '1', employee: MOCK_EMPLOYEES[0], period: 'Q1 2026', rating: 5, goals: 'Complete API redesign; Improve test coverage to 80%', achievements: 'Delivered API redesign 2 weeks early; Test coverage at 85%', feedback: 'Exceptional performance. A true team leader.',      reviewerId: '2', createdAt: '2026-04-01' },
  { id: '2', employeeId: '3', employee: MOCK_EMPLOYEES[2], period: 'Q1 2026', rating: 4, goals: 'Launch Q1 campaign; Increase social engagement by 20%', achievements: 'Launched campaign on time; Social engagement up 25%',     feedback: 'Great work on the campaign execution.',              reviewerId: '2', createdAt: '2026-04-01' },
  { id: '3', employeeId: '5', employee: MOCK_EMPLOYEES[4], period: 'Q1 2026', rating: 3, goals: 'Refactor legacy components; Add accessibility features',  achievements: 'Refactored 60% of components; Partial accessibility done',feedback: 'Good progress. Focus on completing the accessibility work.', reviewerId: '1', createdAt: '2026-04-01' },
  { id: '4', employeeId: '7', employee: MOCK_EMPLOYEES[6], period: 'Q1 2026', rating: 5, goals: 'Build microservice architecture; Optimize DB queries',      achievements: 'Microservices live; DB query times reduced by 40%',      feedback: 'Outstanding technical delivery.',                   reviewerId: '1', createdAt: '2026-04-01' },
  { id: '5', employeeId: '6', employee: MOCK_EMPLOYEES[5], period: 'Q1 2026', rating: 4, goals: 'Streamline vendor contracts; Reduce ops cost by 10%',       achievements: 'Renegotiated 5 contracts; Cost reduced by 12%',          feedback: 'Exceeded cost savings target.',                     reviewerId: '2', createdAt: '2026-04-01' },
]

export const MOCK_METRICS: DashboardMetrics = {
  totalEmployees: 40,
  activeEmployees: 35,
  totalDepartments: 5,
  pendingLeaves: 6,
  presentToday: 32,
  absentToday: 8,
}

export const MONTHLY_HEADCOUNT = [
  { month: 'Nov', count: 34 },
  { month: 'Dec', count: 36 },
  { month: 'Jan', count: 36 },
  { month: 'Feb', count: 38 },
  { month: 'Mar', count: 39 },
  { month: 'Apr', count: 40 },
]

export const DEPT_DISTRIBUTION = MOCK_DEPARTMENTS.map((d) => ({
  name: d.name,
  count: d.employeeCount ?? 0,
}))

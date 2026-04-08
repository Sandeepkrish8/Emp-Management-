import { Router, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../server';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';

const router = Router();

const EmployeeSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phoneNumber: z.string().min(5),
  departmentId: z.string().cuid(),
  position: z.string().min(1),
  salary: z.number().positive(),
  hireDate: z.string().transform((val) => new Date(val)),
  status: z.enum(['active', 'inactive', 'on-leave']).default('active'),
  emergencyContact: z.string().optional(),
  address: z.string().optional(),
  dateOfBirth: z.string().transform((val) => new Date(val)).optional(),
  profileImage: z.string().url().optional(),
});

// GET /api/employees
router.get('/', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { page = '1', limit = '10', search, departmentId, status } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where: Record<string, unknown> = {};
    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { email: { contains: search as string, mode: 'insensitive' } },
        { position: { contains: search as string, mode: 'insensitive' } },
      ];
    }
    if (departmentId) where.departmentId = departmentId;
    if (status) where.status = status;

    const [employees, total] = await Promise.all([
      prisma.employee.findMany({
        where,
        include: { department: { select: { id: true, name: true } } },
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
      }),
      prisma.employee.count({ where }),
    ]);

    res.json({
      data: employees,
      total,
      page: Number(page),
      pageSize: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    });
  } catch {
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
});

// GET /api/employees/:id
router.get('/:id', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const employee = await prisma.employee.findUnique({
      where: { id: req.params.id },
      include: {
        department: true,
        attendanceRecords: { take: 30, orderBy: { date: 'desc' } },
        performanceReviews: {
          take: 5,
          orderBy: { createdAt: 'desc' },
          include: { reviewer: { select: { id: true, name: true } } },
        },
        leaveRequests: { take: 10, orderBy: { createdAt: 'desc' } },
      },
    });

    if (!employee) {
      res.status(404).json({ error: 'Employee not found' });
      return;
    }

    res.json(employee);
  } catch {
    res.status(500).json({ error: 'Failed to fetch employee' });
  }
});

// POST /api/employees
router.post('/', authenticate, authorize(['admin', 'hr']), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const data = EmployeeSchema.parse(req.body);
    const employee = await prisma.employee.create({
      data,
      include: { department: { select: { id: true, name: true } } },
    });
    res.status(201).json(employee);
  } catch (err: any) {
    if (err.issues) { res.status(400).json({ error: err.errors }); return; }
    if (err.code === 'P2002') { res.status(409).json({ error: 'Email already exists' }); return; }
    res.status(500).json({ error: 'Failed to create employee' });
  }
});

// PUT /api/employees/:id
router.put('/:id', authenticate, authorize(['admin', 'hr']), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const data = EmployeeSchema.partial().parse(req.body);
    const employee = await prisma.employee.update({
      where: { id: req.params.id },
      data,
      include: { department: { select: { id: true, name: true } } },
    });
    res.json(employee);
  } catch (err: any) {
    if (err.issues) { res.status(400).json({ error: err.errors }); return; }
    if (err.code === 'P2025') { res.status(404).json({ error: 'Employee not found' }); return; }
    res.status(500).json({ error: 'Failed to update employee' });
  }
});

// DELETE /api/employees/:id
router.delete('/:id', authenticate, authorize(['admin']), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    await prisma.employee.delete({ where: { id: req.params.id } });
    res.json({ message: 'Employee deleted successfully' });
  } catch (err: any) {
    if (err.code === 'P2025') { res.status(404).json({ error: 'Employee not found' }); return; }
    res.status(500).json({ error: 'Failed to delete employee' });
  }
});

export default router;

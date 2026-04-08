import { Router, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../server';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';

const router = Router();

const DepartmentSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().optional(),
  managerId: z.string().cuid().optional(),
  budget: z.number().nonnegative(),
});

// GET /api/departments
router.get('/', authenticate, async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const departments = await prisma.department.findMany({
      include: {
        manager: { select: { id: true, name: true, position: true } },
        _count: { select: { employees: true } },
      },
      orderBy: { name: 'asc' },
    });
    res.json(departments);
  } catch {
    res.status(500).json({ error: 'Failed to fetch departments' });
  }
});

// GET /api/departments/:id
router.get('/:id', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const department = await prisma.department.findUnique({
      where: { id: req.params.id },
      include: {
        manager: { select: { id: true, name: true, position: true } },
        employees: { select: { id: true, name: true, email: true, position: true, status: true } },
      },
    });

    if (!department) {
      res.status(404).json({ error: 'Department not found' });
      return;
    }

    res.json(department);
  } catch {
    res.status(500).json({ error: 'Failed to fetch department' });
  }
});

// POST /api/departments
router.post('/', authenticate, authorize(['admin', 'hr']), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const data = DepartmentSchema.parse(req.body);
    const department = await prisma.department.create({
      data,
      include: { manager: { select: { id: true, name: true } } },
    });
    res.status(201).json(department);
  } catch (err: any) {
    if (err.issues) { res.status(400).json({ error: err.errors }); return; }
    if (err.code === 'P2002') { res.status(409).json({ error: 'Department name already exists' }); return; }
    res.status(500).json({ error: 'Failed to create department' });
  }
});

// PUT /api/departments/:id
router.put('/:id', authenticate, authorize(['admin', 'hr']), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const data = DepartmentSchema.partial().parse(req.body);
    const department = await prisma.department.update({
      where: { id: req.params.id },
      data,
      include: { manager: { select: { id: true, name: true } } },
    });
    res.json(department);
  } catch (err: any) {
    if (err.issues) { res.status(400).json({ error: err.errors }); return; }
    if (err.code === 'P2025') { res.status(404).json({ error: 'Department not found' }); return; }
    res.status(500).json({ error: 'Failed to update department' });
  }
});

// DELETE /api/departments/:id
router.delete('/:id', authenticate, authorize(['admin']), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    await prisma.department.delete({ where: { id: req.params.id } });
    res.json({ message: 'Department deleted successfully' });
  } catch (err: any) {
    if (err.code === 'P2025') { res.status(404).json({ error: 'Department not found' }); return; }
    if (err.code === 'P2003') { res.status(409).json({ error: 'Cannot delete department with employees' }); return; }
    res.status(500).json({ error: 'Failed to delete department' });
  }
});

export default router;

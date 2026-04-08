import { Router, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../server';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';

const router = Router();

const AttendanceSchema = z.object({
  employeeId: z.string().cuid(),
  date: z.string().transform((val) => new Date(val)),
  status: z.enum(['present', 'absent', 'late', 'half-day']),
  checkIn: z.string().transform((val) => new Date(val)).optional(),
  checkOut: z.string().transform((val) => new Date(val)).optional(),
  hoursWorked: z.number().nonnegative().optional(),
  notes: z.string().optional(),
});

// GET /api/attendance
router.get('/', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { employeeId, startDate, endDate, page = '1', limit = '20' } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where: Record<string, unknown> = {};
    if (employeeId) where.employeeId = employeeId;
    if (startDate || endDate) {
      where.date = {
        ...(startDate ? { gte: new Date(startDate as string) } : {}),
        ...(endDate ? { lte: new Date(endDate as string) } : {}),
      };
    }

    const [records, total] = await Promise.all([
      prisma.attendanceRecord.findMany({
        where,
        include: { employee: { select: { id: true, name: true, department: { select: { name: true } } } } },
        skip,
        take: Number(limit),
        orderBy: { date: 'desc' },
      }),
      prisma.attendanceRecord.count({ where }),
    ]);

    res.json({
      data: records,
      total,
      page: Number(page),
      pageSize: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    });
  } catch {
    res.status(500).json({ error: 'Failed to fetch attendance records' });
  }
});

// POST /api/attendance
router.post('/', authenticate, authorize(['admin', 'hr', 'manager']), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const data = AttendanceSchema.parse(req.body);
    const record = await prisma.attendanceRecord.create({
      data,
      include: { employee: { select: { id: true, name: true } } },
    });
    res.status(201).json(record);
  } catch (err: any) {
    if (err.issues) { res.status(400).json({ error: err.errors }); return; }
    if (err.code === 'P2002') { res.status(409).json({ error: 'Attendance record already exists for this date' }); return; }
    res.status(500).json({ error: 'Failed to create attendance record' });
  }
});

// PUT /api/attendance/:id
router.put('/:id', authenticate, authorize(['admin', 'hr', 'manager']), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const data = AttendanceSchema.partial().omit({ employeeId: true }).parse(req.body);
    const record = await prisma.attendanceRecord.update({
      where: { id: req.params.id },
      data,
      include: { employee: { select: { id: true, name: true } } },
    });
    res.json(record);
  } catch (err: any) {
    if (err.issues) { res.status(400).json({ error: err.errors }); return; }
    if (err.code === 'P2025') { res.status(404).json({ error: 'Record not found' }); return; }
    res.status(500).json({ error: 'Failed to update attendance record' });
  }
});

// DELETE /api/attendance/:id
router.delete('/:id', authenticate, authorize(['admin']), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    await prisma.attendanceRecord.delete({ where: { id: req.params.id } });
    res.json({ message: 'Attendance record deleted' });
  } catch (err: any) {
    if (err.code === 'P2025') { res.status(404).json({ error: 'Record not found' }); return; }
    res.status(500).json({ error: 'Failed to delete record' });
  }
});

export default router;

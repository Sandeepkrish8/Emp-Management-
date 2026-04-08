import { Router, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../server';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';

const router = Router();

const LeaveSchema = z.object({
  employeeId: z.string().cuid(),
  type: z.enum(['vacation', 'sick', 'personal', 'maternity', 'sabbatical']),
  startDate: z.string().transform((val) => new Date(val)),
  endDate: z.string().transform((val) => new Date(val)),
  totalDays: z.number().positive(),
  reason: z.string().optional(),
});

// GET /api/leave
router.get('/', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { employeeId, status, page = '1', limit = '10' } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where: Record<string, unknown> = {};
    if (employeeId) where.employeeId = employeeId;
    if (status) where.status = status;

    const [requests, total] = await Promise.all([
      prisma.leaveRequest.findMany({
        where,
        include: { employee: { select: { id: true, name: true, department: { select: { name: true } } } } },
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
      }),
      prisma.leaveRequest.count({ where }),
    ]);

    res.json({
      data: requests,
      total,
      page: Number(page),
      pageSize: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    });
  } catch {
    res.status(500).json({ error: 'Failed to fetch leave requests' });
  }
});

// POST /api/leave
router.post('/', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const data = LeaveSchema.parse(req.body);
    const request = await prisma.leaveRequest.create({
      data,
      include: { employee: { select: { id: true, name: true } } },
    });
    res.status(201).json(request);
  } catch (err: any) {
    if (err.issues) { res.status(400).json({ error: err.errors }); return; }
    res.status(500).json({ error: 'Failed to create leave request' });
  }
});

// PUT /api/leave/:id/approve
router.put('/:id/approve', authenticate, authorize(['admin', 'hr', 'manager']), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { approverComments } = z.object({ approverComments: z.string().optional() }).parse(req.body);
    const request = await prisma.leaveRequest.update({
      where: { id: req.params.id },
      data: { status: 'approved', approvedBy: req.user!.id, approverComments },
    });
    res.json(request);
  } catch (err: any) {
    if (err.code === 'P2025') { res.status(404).json({ error: 'Leave request not found' }); return; }
    res.status(500).json({ error: 'Failed to approve leave request' });
  }
});

// PUT /api/leave/:id/reject
router.put('/:id/reject', authenticate, authorize(['admin', 'hr', 'manager']), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { approverComments } = z.object({ approverComments: z.string().optional() }).parse(req.body);
    const request = await prisma.leaveRequest.update({
      where: { id: req.params.id },
      data: { status: 'rejected', approvedBy: req.user!.id, approverComments },
    });
    res.json(request);
  } catch (err: any) {
    if (err.code === 'P2025') { res.status(404).json({ error: 'Leave request not found' }); return; }
    res.status(500).json({ error: 'Failed to reject leave request' });
  }
});

// DELETE /api/leave/:id
router.delete('/:id', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const existing = await prisma.leaveRequest.findUnique({ where: { id: req.params.id } });
    if (!existing) { res.status(404).json({ error: 'Leave request not found' }); return; }
    if (existing.status !== 'pending') { res.status(409).json({ error: 'Only pending requests can be deleted' }); return; }

    await prisma.leaveRequest.delete({ where: { id: req.params.id } });
    res.json({ message: 'Leave request deleted' });
  } catch {
    res.status(500).json({ error: 'Failed to delete leave request' });
  }
});

export default router;

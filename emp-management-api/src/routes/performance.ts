import { Router, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../server';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';

const router = Router();

const PerformanceSchema = z.object({
  employeeId: z.string().cuid(),
  reviewerId: z.string().cuid(),
  rating: z.number().min(1).max(5),
  comment: z.string().min(1),
  strengths: z.array(z.string()).default([]),
  improvements: z.array(z.string()).default([]),
  goals: z.array(z.string()).default([]),
  reviewDate: z.string().transform((val) => new Date(val)),
});

// GET /api/performance
router.get('/', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { employeeId, page = '1', limit = '10' } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where: Record<string, unknown> = {};
    if (employeeId) where.employeeId = employeeId;

    const [reviews, total] = await Promise.all([
      prisma.performanceReview.findMany({
        where,
        include: {
          employee: { select: { id: true, name: true, position: true } },
          reviewer: { select: { id: true, name: true } },
        },
        skip,
        take: Number(limit),
        orderBy: { reviewDate: 'desc' },
      }),
      prisma.performanceReview.count({ where }),
    ]);

    res.json({
      data: reviews,
      total,
      page: Number(page),
      pageSize: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    });
  } catch {
    res.status(500).json({ error: 'Failed to fetch performance reviews' });
  }
});

// POST /api/performance
router.post('/', authenticate, authorize(['admin', 'hr', 'manager']), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const data = PerformanceSchema.parse(req.body);
    const review = await prisma.performanceReview.create({
      data,
      include: {
        employee: { select: { id: true, name: true } },
        reviewer: { select: { id: true, name: true } },
      },
    });
    res.status(201).json(review);
  } catch (err: any) {
    if (err.issues) { res.status(400).json({ error: err.errors }); return; }
    res.status(500).json({ error: 'Failed to create performance review' });
  }
});

// PUT /api/performance/:id
router.put('/:id', authenticate, authorize(['admin', 'hr', 'manager']), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const data = PerformanceSchema.partial().omit({ employeeId: true, reviewerId: true }).parse(req.body);
    const review = await prisma.performanceReview.update({
      where: { id: req.params.id },
      data,
      include: {
        employee: { select: { id: true, name: true } },
        reviewer: { select: { id: true, name: true } },
      },
    });
    res.json(review);
  } catch (err: any) {
    if (err.issues) { res.status(400).json({ error: err.errors }); return; }
    if (err.code === 'P2025') { res.status(404).json({ error: 'Review not found' }); return; }
    res.status(500).json({ error: 'Failed to update performance review' });
  }
});

// DELETE /api/performance/:id
router.delete('/:id', authenticate, authorize(['admin']), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    await prisma.performanceReview.delete({ where: { id: req.params.id } });
    res.json({ message: 'Performance review deleted' });
  } catch (err: any) {
    if (err.code === 'P2025') { res.status(404).json({ error: 'Review not found' }); return; }
    res.status(500).json({ error: 'Failed to delete review' });
  }
});

export default router;

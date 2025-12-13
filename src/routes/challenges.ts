import {Router} from 'express';
import {z} from 'zod';
import {prisma} from '../db.js';

export const router = Router();

const challenge = z.object({
  id: z.string(),
  slug: z.string(),
  title_en: z.string(),
  title_ar: z.string(),
  summary_en: z.string(),
  summary_ar: z.string(),
  difficulty: z.enum(['newbie', 'junior', 'intermediate', 'advanced', 'guru']),
  isPremium: z.boolean()
});

router.get('/', async (_req, res) => {
  const items = await prisma.challenge.findMany({
    select: {
      id: true,
      slug: true,
      title_en: true,
      title_ar: true,
      summary_en: true,
      summary_ar: true,
      difficulty: true,
      isPremium: true,
      tags: true
    },
    orderBy: {createdAt: 'desc'}
  });
  res.json({items});
});

router.get('/:slug', (req, res) => {
  // TODO: fetch from DB by slug
  const {slug} = req.params;
  res.json({
    id: 'demo',
    slug,
    title_en: 'Demo challenge',
    title_ar: 'تحدّي تجريبي',
    summary_en: 'Summary',
    summary_ar: 'ملخص',
    difficulty: 'newbie',
    isPremium: false
  });
});



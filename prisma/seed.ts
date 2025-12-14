import 'dotenv/config';
import {PrismaClient} from '../src/generated/client.js';
import {PrismaPg} from '@prisma/adapter-pg';
import pg from 'pg';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Upsert a sample challenge
  await prisma.challenge.upsert({
    where: {slug: 'demo-challenge'},
    update: {},
    create: {
      slug: 'demo-challenge',
      title_en: 'Demo challenge',
      title_ar: 'تحدّي تجريبي',
      summary_en: 'A simple starter challenge',
      summary_ar: 'تحدٍّ بسيط للبدء',
      longDescription_en: 'Build a simple page to list items.',
      longDescription_ar: 'ابنِ صفحة بسيطة لعرض العناصر.',
      difficulty: 'NEWBIE',
      tags: ['layout', 'lists'],
      isPremium: false
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });



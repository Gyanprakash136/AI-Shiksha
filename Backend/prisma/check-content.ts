import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Checking Lecture Content...');

    const lectures = await prisma.sectionItem.findMany({
        where: { type: 'LECTURE' },
        include: {
            lecture_content: true
        }
    });

    console.log(`Found ${lectures.length} lectures.`);

    lectures.forEach(l => {
        console.log(`\nLesson: ${l.title} (${l.id})`);
        console.log(`Description: ${l.description}`);
        console.log('Lecture Content:', l.lecture_content);
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

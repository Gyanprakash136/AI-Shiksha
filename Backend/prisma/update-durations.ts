import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Updating duration_minutes (0 -> 15) for SectionItems...');

    const updateResult = await prisma.sectionItem.updateMany({
        where: {
            duration_minutes: 0
        },
        data: {
            duration_minutes: 15
        }
    });

    console.log(`Updated ${updateResult.count} items from 0 to 15 mins.`);

    console.log('Adding sample video URL to first LECTURE item...');
    const firstLecture = await prisma.sectionItem.findFirst({
        where: { type: 'LECTURE' },
        include: { lecture_content: true }
    });

    if (firstLecture) {
        if (!firstLecture.lecture_content) {
            console.log(`Creating content for item ${firstLecture.id}`);
            await prisma.lectureContent.create({
                data: {
                    item_id: firstLecture.id,
                    content_type: 'VIDEO',
                    video_url: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4',
                    video_provider: 'URL'
                }
            });
        } else if (!firstLecture.lecture_content.video_url) {
            console.log(`Updating content for item ${firstLecture.id}`);
            await prisma.lectureContent.update({
                where: { item_id: firstLecture.id },
                data: {
                    video_url: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4',
                    video_provider: 'URL'
                }
            });
        } else {
            console.log('First lecture already has video URL:', firstLecture.lecture_content.video_url);
        }
    } else {
        console.log('No LECTURE items found.');
    }

}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

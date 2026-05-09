const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Seeding localhost franchise...');
    const franchise = await prisma.franchise.upsert({
        where: { domain: 'localhost' },
        update: {
            is_active: true,
            domain_verified: true,
        },
        create: {
            name: 'Local Development Platform',
            domain: 'localhost',
            is_active: true,
            domain_verified: true,
        }
    });
    console.log('Franchise seeded successfully:', franchise.id);
}

main().catch(e => {
    console.error(e);
    process.exit(1);
}).finally(() => {
    prisma.$disconnect();
});

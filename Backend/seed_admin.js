const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function seedAdmin() {
    const email = process.env.ADMIN_EMAIL || 'admin@example.com';
    const password = process.env.ADMIN_PASSWORD || 'secure_placeholder_password';
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
            name: 'Super Admin',
            email,
            password_hash: hashedPassword,
            role: 'SUPER_ADMIN',
        },
    });

    console.log('✅ Super Admin user created/updated:');
    console.log(`   Email: ${email}`);
    // Password output hidden for security
    console.log('   Role: SUPER_ADMIN');
}

seedAdmin()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

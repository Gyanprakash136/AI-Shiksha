import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Generate a URL-friendly slug from a title
 */
function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/[\s_-]+/g, '-') // Replace spaces, underscores with single hyphen
        .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Ensure slug uniqueness within a section by appending numbers if needed
 */
async function ensureUniqueSlug(sectionId: string, baseSlug: string, excludeId?: string): Promise<string> {
    let slug = baseSlug;
    let counter = 1;

    while (true) {
        const existing = await prisma.sectionItem.findFirst({
            where: {
                section_id: sectionId,
                slug,
                id: excludeId ? { not: excludeId } : undefined,
            },
        });

        if (!existing) {
            return slug;
        }

        slug = `${baseSlug}-${counter}`;
        counter++;
    }
}

/**
 * Generate slugs for all existing section items that don't have one
 */
async function generateSlugsForExistingItems() {
    console.log('Starting slug generation for existing section items...');

    const itemsWithoutSlugs = await prisma.sectionItem.findMany({
        where: {
            slug: null,
        },
        orderBy: {
            created_at: 'asc',
        },
    });

    console.log(`Found ${itemsWithoutSlugs.length} items without slugs`);

    for (const item of itemsWithoutSlugs) {
        const baseSlug = generateSlug(item.title);
        const uniqueSlug = await ensureUniqueSlug(item.section_id, baseSlug, item.id);

        await prisma.sectionItem.update({
            where: { id: item.id },
            data: { slug: uniqueSlug },
        });

        console.log(`✓ Generated slug for "${item.title}": ${uniqueSlug}`);
    }

    console.log('✅ Slug generation complete!');
}

// Run the migration
generateSlugsForExistingItems()
    .catch((error) => {
        console.error('Error generating slugs:', error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

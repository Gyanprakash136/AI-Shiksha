-- AlterTable
ALTER TABLE "course_progress" ADD COLUMN     "last_accessed_item_id" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "weekly_minutes_spent" INTEGER NOT NULL DEFAULT 0;

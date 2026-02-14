-- AlterTable
ALTER TABLE "enrollments" ADD COLUMN     "completed_at" TIMESTAMP(3),
ADD COLUMN     "last_activity_at" TIMESTAMP(3),
ADD COLUMN     "progress_percentage" INTEGER NOT NULL DEFAULT 0;

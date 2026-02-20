/*
  Warnings:

  - You are about to alter the column `embedding` on the `lesson_embeddings` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Unsupported("vector(768)")`.
  - A unique constraint covering the columns `[name,franchise_id]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug,franchise_id]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,franchise_id]` on the table `tags` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug,franchise_id]` on the table `tags` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateExtension
CREATE EXTENSION IF NOT EXISTS vector;

-- DropIndex
DROP INDEX "categories_name_key";

-- DropIndex
DROP INDEX "categories_slug_key";

-- DropIndex
DROP INDEX "tags_name_key";

-- DropIndex
DROP INDEX "tags_slug_key";

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "franchise_id" TEXT;

-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "access_days_limit" INTEGER,
ADD COLUMN     "estimated_duration" INTEGER;

-- AlterTable
ALTER TABLE "enrollments" ADD COLUMN     "expires_at" TIMESTAMP(3),
ADD COLUMN     "total_learning_time" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "lesson_embeddings" ALTER COLUMN "embedding" SET DATA TYPE vector(768) USING "embedding"::text::vector(768);

-- AlterTable
ALTER TABLE "tags" ADD COLUMN     "franchise_id" TEXT;

-- CreateTable
CREATE TABLE "ai_usage_logs" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "course_id" TEXT,
    "input_tokens_estimate" INTEGER NOT NULL DEFAULT 0,
    "output_tokens_estimate" INTEGER NOT NULL DEFAULT 0,
    "latency_ms" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_usage_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_franchise_id_key" ON "categories"("name", "franchise_id");

-- CreateIndex
CREATE UNIQUE INDEX "categories_slug_franchise_id_key" ON "categories"("slug", "franchise_id");

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_franchise_id_key" ON "tags"("name", "franchise_id");

-- CreateIndex
CREATE UNIQUE INDEX "tags_slug_franchise_id_key" ON "tags"("slug", "franchise_id");

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_franchise_id_fkey" FOREIGN KEY ("franchise_id") REFERENCES "franchises"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_franchise_id_fkey" FOREIGN KEY ("franchise_id") REFERENCES "franchises"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_usage_logs" ADD CONSTRAINT "ai_usage_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_usage_logs" ADD CONSTRAINT "ai_usage_logs_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

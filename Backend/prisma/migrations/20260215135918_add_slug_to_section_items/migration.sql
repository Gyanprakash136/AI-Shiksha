/*
  Warnings:

  - A unique constraint covering the columns `[section_id,slug]` on the table `section_items` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "section_items" ADD COLUMN     "slug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "section_items_section_id_slug_key" ON "section_items"("section_id", "slug");

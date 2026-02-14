/*
  Warnings:

  - You are about to drop the column `item_id` on the `quizzes` table. All the data in the column will be lost.
  - Added the required column `title` to the `quizzes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "quizzes" DROP CONSTRAINT "quizzes_item_id_fkey";

-- DropIndex
DROP INDEX "quizzes_item_id_key";

-- AlterTable
ALTER TABLE "quiz_questions" ADD COLUMN     "set_number" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "quizzes" DROP COLUMN "item_id",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "questions_per_set" INTEGER NOT NULL DEFAULT 10,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "total_sets" INTEGER NOT NULL DEFAULT 1,
ALTER COLUMN "passing_score" SET DEFAULT 75,
ALTER COLUMN "attempts_allowed" SET DEFAULT 3;

-- AlterTable
ALTER TABLE "section_items" ADD COLUMN     "quiz_id" TEXT;

-- AddForeignKey
ALTER TABLE "section_items" ADD CONSTRAINT "section_items_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "quizzes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

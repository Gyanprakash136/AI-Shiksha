-- CreateTable
CREATE TABLE "section_item_progress" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "completed_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "section_item_progress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "section_item_progress_student_id_item_id_key" ON "section_item_progress"("student_id", "item_id");

-- AddForeignKey
ALTER TABLE "section_item_progress" ADD CONSTRAINT "section_item_progress_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "section_item_progress" ADD CONSTRAINT "section_item_progress_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "section_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

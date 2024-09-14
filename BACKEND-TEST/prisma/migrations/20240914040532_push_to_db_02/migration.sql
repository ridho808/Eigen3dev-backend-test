/*
  Warnings:

  - You are about to drop the `Borrow` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Borrow" DROP CONSTRAINT "Borrow_book_code_fkey";

-- DropForeignKey
ALTER TABLE "Borrow" DROP CONSTRAINT "Borrow_member_id_fkey";

-- DropTable
DROP TABLE "Borrow";

-- CreateTable
CREATE TABLE "Borrowbook" (
    "id" SERIAL NOT NULL,
    "member_id" INTEGER NOT NULL,
    "book_code" TEXT NOT NULL,
    "borrow_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "return_date" TIMESTAMP(3),
    "status_return" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Borrowbook_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Borrowbook_id_member_id_book_code_idx" ON "Borrowbook"("id", "member_id", "book_code");

-- AddForeignKey
ALTER TABLE "Borrowbook" ADD CONSTRAINT "Borrowbook_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Borrowbook" ADD CONSTRAINT "Borrowbook_book_code_fkey" FOREIGN KEY ("book_code") REFERENCES "Book"("code") ON DELETE CASCADE ON UPDATE CASCADE;

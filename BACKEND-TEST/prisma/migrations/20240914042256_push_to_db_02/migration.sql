/*
  Warnings:

  - A unique constraint covering the columns `[member_id]` on the table `Penalty` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Penalty_member_id_key" ON "Penalty"("member_id");

/*
  Warnings:

  - Added the required column `created_at` to the `staff` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "staff" ADD COLUMN     "created_at" VARCHAR(64) NOT NULL;

-- AlterTable
ALTER TABLE "team" ADD COLUMN     "collector_id" VARCHAR(64);

-- AddForeignKey
ALTER TABLE "team" ADD CONSTRAINT "team_collector_id_fkey" FOREIGN KEY ("collector_id") REFERENCES "staff"("staff_pass_id") ON DELETE SET NULL ON UPDATE CASCADE;

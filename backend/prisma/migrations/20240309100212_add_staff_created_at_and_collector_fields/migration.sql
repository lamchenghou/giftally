/*
  Warnings:

  - Made the column `collector_id` on table `team` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "team" DROP CONSTRAINT "team_collector_id_fkey";

-- AlterTable
ALTER TABLE "team" ALTER COLUMN "collector_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "team" ADD CONSTRAINT "team_collector_id_fkey" FOREIGN KEY ("collector_id") REFERENCES "staff"("staff_pass_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

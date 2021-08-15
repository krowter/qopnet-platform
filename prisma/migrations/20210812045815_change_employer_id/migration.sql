/*
  Warnings:

  - You are about to drop the column `promoEmployerId` on the `promo_employees` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "promo_employees" DROP CONSTRAINT "promo_employees_promoEmployerId_fkey";

-- AlterTable
ALTER TABLE "promo_employees" DROP COLUMN "promoEmployerId",
ADD COLUMN     "employerId" TEXT;

-- AddForeignKey
ALTER TABLE "promo_employees" ADD FOREIGN KEY ("employerId") REFERENCES "promo_employers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

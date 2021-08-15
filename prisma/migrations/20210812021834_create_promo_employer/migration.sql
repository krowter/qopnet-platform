/*
  Warnings:

  - You are about to drop the column `employerParam` on the `promo_employees` table. All the data in the column will be lost.
  - You are about to drop the column `nationalIdNumber` on the `promo_employees` table. All the data in the column will be lost.
  - You are about to drop the column `nationalIdNumber` on the `promo_submissions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "promo_employees" DROP COLUMN "employerParam",
DROP COLUMN "nationalIdNumber",
ADD COLUMN     "nationalId" TEXT,
ADD COLUMN     "promoEmployerId" TEXT,
ALTER COLUMN "employeeId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "promo_submissions" DROP COLUMN "nationalIdNumber",
ADD COLUMN     "nationalId" TEXT;

-- CreateTable
CREATE TABLE "promo_employer" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "phone" TEXT,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "promo_employees" ADD FOREIGN KEY ("promoEmployerId") REFERENCES "promo_employer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

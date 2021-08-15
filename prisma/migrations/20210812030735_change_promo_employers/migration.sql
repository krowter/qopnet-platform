/*
  Warnings:

  - You are about to drop the `promo_employer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "promo_employees" DROP CONSTRAINT "promo_employees_promoEmployerId_fkey";

-- DropTable
DROP TABLE "promo_employer";

-- CreateTable
CREATE TABLE "promo_employers" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "phone" TEXT,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "promo_employees" ADD FOREIGN KEY ("promoEmployerId") REFERENCES "promo_employers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

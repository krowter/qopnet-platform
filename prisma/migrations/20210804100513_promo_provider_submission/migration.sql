-- CreateEnum
CREATE TYPE "PromoSubmissionStatus" AS ENUM ('PENDING', 'APPROVED');
-- CreateTable
CREATE TABLE "promo_providers" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "promo_submissions" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "birthPlace" TEXT,
    "birthDate" TIMESTAMP(3),
    "street" TEXT,
    "streetDetails" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zip" TEXT,
    "status" "PromoSubmissionStatus",
    "providerId" TEXT,
    PRIMARY KEY ("id")
);
-- AddForeignKey
ALTER TABLE "promo_submissions"
ADD FOREIGN KEY ("providerId") REFERENCES "promo_providers"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
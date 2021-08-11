-- AlterTable
ALTER TABLE "addresses"
ALTER COLUMN "city" DROP NOT NULL,
    ALTER COLUMN "state" DROP NOT NULL,
    ALTER COLUMN "zip" DROP NOT NULL,
    ALTER COLUMN "countryCode" DROP NOT NULL;
-- AlterTable
ALTER TABLE "promo_submissions"
ADD COLUMN "nationalIdNumber" TEXT;
-- CreateTable
CREATE TABLE "promo_employees" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "employeeId" TEXT NOT NULL,
    "name" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "birthPlace" TEXT,
    "birthDate" TIMESTAMP(3),
    "nationalIdNumber" TEXT,
    "street" TEXT,
    "streetDetails" TEXT,
    "city" TEXT,
    "State" TEXT,
    "zip" TEXT,
    "employerParam" TEXT,
    PRIMARY KEY ("id")
);
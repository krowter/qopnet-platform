-- CreateEnum
CREATE TYPE "FundBeneficiaryStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');
-- AlterTable
ALTER TABLE "supplier_products"
ADD COLUMN "discount" INTEGER,
    ADD COLUMN "discountMaxReduction" MONEY,
    ALTER COLUMN "weightUnit"
SET DEFAULT E 'KG',
    ALTER COLUMN "status"
SET DEFAULT E 'ACTIVE';
-- CreateTable
CREATE TABLE "financing_services" (
    "id" TEXT NOT NULL,
    "handle" TEXT,
    "name" TEXT,
    "website" TEXT,
    "phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "fund_beneficiaries" (
    "id" TEXT NOT NULL,
    "nationalId" TEXT,
    "birthPlace" TEXT,
    "birthDate" TIMESTAMP(3),
    "income" MONEY,
    "status" "FundBeneficiaryStatus" DEFAULT E 'PENDING',
    "financingServiceId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "profileId" TEXT,
    "userId" TEXT,
    PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "fund_benefactors" (
    "id" TEXT NOT NULL,
    "financingServiceId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);
-- CreateIndex
CREATE UNIQUE INDEX "financing_services.handle_unique" ON "financing_services"("handle");
-- CreateIndex
CREATE UNIQUE INDEX "fund_beneficiaries_profileId_unique" ON "fund_beneficiaries"("profileId");
-- CreateIndex
CREATE UNIQUE INDEX "fund_beneficiaries_userId_unique" ON "fund_beneficiaries"("userId");
-- AddForeignKey
ALTER TABLE "fund_beneficiaries"
ADD FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "fund_beneficiaries"
ADD FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "fund_beneficiaries"
ADD FOREIGN KEY ("financingServiceId") REFERENCES "financing_services"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "fund_benefactors"
ADD FOREIGN KEY ("financingServiceId") REFERENCES "financing_services"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
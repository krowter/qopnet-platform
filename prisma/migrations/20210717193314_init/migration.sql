-- CreateEnum
CREATE TYPE "SupplierCategory" AS ENUM ('PRODUCER', 'DISTRIBUTOR');
-- CreateEnum
CREATE TYPE "SupplierProductWeightUnit" AS ENUM ('GR', 'KG', 'TON');
-- CreateEnum
CREATE TYPE "SupplierProductStatus" AS ENUM ('ACTIVE', 'INACTIVE');
-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "profiles" (
    "id" TEXT NOT NULL,
    "handle" TEXT,
    "name" TEXT,
    "avatarUrl" TEXT,
    "phone" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "admin_profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "addresses" (
    "id" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "streetDetails" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "profileId" TEXT,
    "wholesalerId" TEXT,
    "supplierId" TEXT,
    "merchantId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "wholesalers" (
    "id" TEXT NOT NULL,
    "handle" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "suppliers" (
    "id" TEXT NOT NULL,
    "handle" TEXT,
    "name" TEXT,
    "phone" TEXT,
    "avatarUrl" TEXT,
    "nationalTax" TEXT,
    "certificationFile" TEXT,
    "category" "SupplierCategory",
    "ownerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "supplier_products" (
    "id" TEXT NOT NULL,
    "images" JSONB,
    "slug" TEXT,
    "name" TEXT,
    "subname" TEXT,
    "category" TEXT,
    "sku" TEXT,
    "description" TEXT,
    "price" MONEY,
    "priceMax" MONEY,
    "priceMin" MONEY,
    "minOrder" INTEGER,
    "weight" INTEGER,
    "weightUnit" "SupplierProductWeightUnit",
    "weightDetails" TEXT,
    "dimension" JSONB,
    "status" "SupplierProductStatus",
    "stock" INTEGER,
    "supplierId" TEXT,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "merchants" (
    "id" TEXT NOT NULL,
    "handle" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "ownerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);
-- CreateIndex
CREATE UNIQUE INDEX "users.email_unique" ON "users"("email");
-- CreateIndex
CREATE UNIQUE INDEX "profiles.handle_unique" ON "profiles"("handle");
-- CreateIndex
CREATE UNIQUE INDEX "profiles_userId_unique" ON "profiles"("userId");
-- CreateIndex
CREATE UNIQUE INDEX "admin_profiles_userId_unique" ON "admin_profiles"("userId");
-- CreateIndex
CREATE UNIQUE INDEX "wholesalers.handle_unique" ON "wholesalers"("handle");
-- CreateIndex
CREATE UNIQUE INDEX "suppliers.handle_unique" ON "suppliers"("handle");
-- CreateIndex
CREATE UNIQUE INDEX "supplier_products.slug_unique" ON "supplier_products"("slug");
-- CreateIndex
CREATE UNIQUE INDEX "merchants.handle_unique" ON "merchants"("handle");
-- AddForeignKey
ALTER TABLE "profiles"
ADD FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "admin_profiles"
ADD FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "addresses"
ADD FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "addresses"
ADD FOREIGN KEY ("wholesalerId") REFERENCES "wholesalers"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "addresses"
ADD FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "addresses"
ADD FOREIGN KEY ("merchantId") REFERENCES "merchants"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "wholesalers"
ADD FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "suppliers"
ADD FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "supplier_products"
ADD FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "supplier_products"
ADD FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "merchants"
ADD FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
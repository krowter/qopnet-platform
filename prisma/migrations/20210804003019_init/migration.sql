-- CreateEnum
CREATE TYPE "SupplierCategory" AS ENUM ('PRODUCER', 'DISTRIBUTOR');
-- CreateEnum
CREATE TYPE "SupplierProductWeightUnit" AS ENUM ('GR', 'KG', 'TON');
-- CreateEnum
CREATE TYPE "SupplierProductStatus" AS ENUM ('ACTIVE', 'INACTIVE');
-- CreateEnum
CREATE TYPE "MerchantProductStatus" AS ENUM ('ACTIVE', 'INACTIVE');
-- CreateEnum
CREATE TYPE "FundBeneficiaryStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM (
    'DRAFT',
    'WAITING_FOR_PAYMENT',
    'PAID',
    'WAITING_FOR_CONFIRMATION',
    'PROCESSED',
    'WAITING_FOR_PICKUP',
    'ONDELIVERY',
    'DELIVERED',
    'CONFIRMED',
    'COMPLAINED',
    'CANCELED',
    'REFUNDED'
);
-- CreateEnum
CREATE TYPE "PaymentCategory" AS ENUM ('COD', 'TRANSFER', 'VIRTUALACCOUNT');
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
    "updatedAt" TIMESTAMP(3) NOT NULL,
    PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "admin_profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
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
    "updatedAt" TIMESTAMP(3) NOT NULL,
    PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "wholesalers" (
    "id" TEXT NOT NULL,
    "handle" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "suppliers" (
    "id" TEXT NOT NULL,
    "handle" TEXT,
    "name" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "avatarUrl" TEXT,
    "nationalTax" TEXT,
    "certificationFile" TEXT,
    "category" "SupplierCategory",
    "ownerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
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
    "discount" INTEGER,
    "discountMaxReduction" MONEY,
    "weight" INTEGER,
    "weightUnit" "SupplierProductWeightUnit",
    "weightDetails" TEXT,
    "dimension" JSONB,
    "status" "SupplierProductStatus",
    "stock" INTEGER,
    "ownerId" TEXT,
    "supplierId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "merchants" (
    "id" TEXT NOT NULL,
    "handle" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "avatarUrl" TEXT,
    "ownerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "merchant_products" (
    "id" TEXT NOT NULL,
    "images" JSONB,
    "slug" TEXT,
    "name" TEXT,
    "category" TEXT,
    "sku" TEXT,
    "description" TEXT,
    "price" MONEY,
    "discount" INTEGER,
    "status" "MerchantProductStatus",
    "ownerId" TEXT,
    "merchantId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "financing_services" (
    "id" TEXT NOT NULL,
    "handle" TEXT,
    "name" TEXT,
    "website" TEXT,
    "phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "fund_beneficiaries" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "profileId" TEXT,
    "nationalId" TEXT,
    "birthPlace" TEXT,
    "birthDate" TIMESTAMP(3),
    "income" MONEY,
    "status" "FundBeneficiaryStatus",
    "financingServiceId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "fund_benefactors" (
    "id" TEXT NOT NULL,
    "financingServiceId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "business_orders" (
    "id" TEXT NOT NULL,
    "status" "OrderStatus",
    "ownerId" TEXT,
    "shipmentAddressId" TEXT,
    "paymentId" TEXT,
    "totalItems" INTEGER,
    "totalPrice" DECIMAL(65, 30),
    "totalWeight" DECIMAL(65, 30),
    "totalShippingCost" DECIMAL(65, 30),
    "shippingDiscount" DECIMAL(65, 30),
    "totalPayment" DECIMAL(65, 30),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "business_order_items" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "businessOrderId" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "supplierProductId" TEXT NOT NULL,
    "courierId" TEXT,
    "fleetId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "paymentCategory" "PaymentCategory" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
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
-- CreateIndex
CREATE UNIQUE INDEX "merchant_products.slug_unique" ON "merchant_products"("slug");
-- CreateIndex
CREATE UNIQUE INDEX "financing_services.handle_unique" ON "financing_services"("handle");
-- CreateIndex
CREATE UNIQUE INDEX "fund_beneficiaries_userId_unique" ON "fund_beneficiaries"("userId");
-- CreateIndex
CREATE UNIQUE INDEX "fund_beneficiaries_profileId_unique" ON "fund_beneficiaries"("profileId");
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
ADD FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "supplier_products"
ADD FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "merchants"
ADD FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "merchant_products"
ADD FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "merchant_products"
ADD FOREIGN KEY ("merchantId") REFERENCES "merchants"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "fund_beneficiaries"
ADD FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "fund_beneficiaries"
ADD FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "fund_beneficiaries"
ADD FOREIGN KEY ("financingServiceId") REFERENCES "financing_services"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "fund_benefactors"
ADD FOREIGN KEY ("financingServiceId") REFERENCES "financing_services"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "business_orders"
ADD FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "business_orders"
ADD FOREIGN KEY ("shipmentAddressId") REFERENCES "addresses"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "business_orders"
ADD FOREIGN KEY ("paymentId") REFERENCES "payments"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "business_order_items"
ADD FOREIGN KEY ("businessOrderId") REFERENCES "business_orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "business_order_items"
ADD FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "business_order_items"
ADD FOREIGN KEY ("supplierProductId") REFERENCES "supplier_products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
-- This trigger can be pasted into the first init migration
-- Copy from auth.users to public.users
CREATE OR REPLACE FUNCTION public.signup_copy_to_users_table() RETURNS TRIGGER AS $$ BEGIN
INSERT INTO public.users (id, email)
VALUES(new.id, new.email);
RETURN NEW;
INSERT INTO public.profiles (userId)
VALUES(new.userId);
RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
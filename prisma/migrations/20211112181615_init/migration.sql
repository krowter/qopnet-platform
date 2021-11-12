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
CREATE TYPE "BusinessOrderStatus" AS ENUM (
    'DRAFT',
    'WAITING_FOR_PAYMENT',
    'PAYMENT_IN_PROCESS',
    'PAID',
    'CANCELED',
    'REFUNDED'
);
-- CreateEnum
CREATE TYPE "BusinessOrderItemStatus" AS ENUM (
    'WAITING_FOR_CONFIRMATION',
    'IN_PROCESS',
    'WAITING_FOR_PICKUP',
    'ON_DELIVERY',
    'DELIVERED',
    'CONFIRMED',
    'COMPLAINED',
    'CANCELED'
);
-- CreateEnum
CREATE TYPE "PaymentCategory" AS ENUM (
    'CASH_ON_DELIVERY',
    'TRANSFER_MANUAL',
    'TRANSFER_VIRTUAL_ACCOUNT',
    'INSTALMENT',
    'CREDIT',
    'LOAN'
);
-- CreateEnum
CREATE TYPE "PaymentRecordStatus" AS ENUM (
    'PENDING',
    'PAID',
    'CANCELLED',
    'OUTDATED',
    'INVALID'
);
-- CreateEnum
CREATE TYPE "PromoSubmissionStatus" AS ENUM ('PENDING', 'APPROVED');
-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
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
    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "admin_profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "admin_profiles_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "addresses" (
    "id" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "streetDetails" TEXT,
    "ward" TEXT,
    "subdistrict" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zip" TEXT,
    "countryCode" TEXT,
    "profileId" TEXT,
    "wholesalerId" TEXT,
    "supplierId" TEXT,
    "merchantId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "wholesalers" (
    "id" TEXT NOT NULL,
    "handle" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "wholesalers_pkey" PRIMARY KEY ("id")
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
    "category" "SupplierCategory" DEFAULT E 'PRODUCER',
    "ownerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "suppliers_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "supplier_products" (
    "id" TEXT NOT NULL,
    "images" JSONB,
    "slug" TEXT,
    "name" TEXT,
    "subname" TEXT,
    "description" TEXT,
    "sku" TEXT,
    "category" TEXT,
    "tags" JSONB,
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
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "supplier_products_pkey" PRIMARY KEY ("id")
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
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "merchants_pkey" PRIMARY KEY ("id")
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
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "merchant_products_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "financing_services" (
    "id" TEXT NOT NULL,
    "handle" TEXT,
    "name" TEXT,
    "website" TEXT,
    "phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "financing_services_pkey" PRIMARY KEY ("id")
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
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "fund_beneficiaries_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "fund_benefactors" (
    "id" TEXT NOT NULL,
    "financingServiceId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "fund_benefactors_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "business_orders" (
    "id" TEXT NOT NULL,
    "status" "BusinessOrderStatus",
    "ownerId" TEXT,
    "shipmentAddressId" TEXT,
    "paymentMethodId" TEXT,
    "paymentRecordId" TEXT,
    "totalItems" INTEGER,
    "totalWeight" INTEGER,
    "totalPrice" MONEY,
    "totalShippingCost" MONEY,
    "totalShippingDiscount" MONEY,
    "totalPayment" MONEY,
    "totalBillPayment" MONEY,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "courierId" TEXT,
    "courierVehicleId" TEXT,
    CONSTRAINT "business_orders_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "business_order_items" (
    "id" TEXT NOT NULL,
    "status" "BusinessOrderItemStatus",
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "businessOrderId" TEXT NOT NULL,
    "supplierProductId" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "courierId" TEXT,
    "courierVehicleId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "business_order_items_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "couriers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "couriers_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "courier_vehicles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "maxWeightCapacity" INTEGER,
    "maxCargoDimensionLength" INTEGER,
    "maxCargoDimensionHeight" INTEGER,
    "maxCargoDimensionWidth" INTEGER,
    "maxCargoDimensionCubicMeter" DOUBLE PRECISION,
    "courierId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "courier_vehicles_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "payment_methods" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "paymentCategory" "PaymentCategory" NOT NULL,
    "accountNumber" TEXT,
    "accountHolderName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "payment_methods_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "payment_records" (
    "id" TEXT NOT NULL,
    "status" "PaymentRecordStatus",
    "accountNumber" TEXT,
    "accountHolderName" TEXT,
    "uniqueDigits" DECIMAL(65, 30),
    "amountDue" MONEY,
    "amountPaid" MONEY,
    "proofImages" JSONB [],
    "paymentMethodId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "payment_records_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "virtual_account_numbers" (
    "id" TEXT NOT NULL,
    "vaNumber" TEXT NOT NULL,
    "instCode" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "bussinessOrderId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "virtual_account_numbers_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "virtual_account_permata_logs" (
    "id" TEXT NOT NULL,
    "requestObject" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "virtual_account_permata_logs_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "promo_providers" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    CONSTRAINT "promo_providers_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "promo_submissions" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "birthPlace" TEXT,
    "birthDate" DATE,
    "nationalId" TEXT,
    "street" TEXT,
    "streetDetails" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zip" TEXT,
    "status" "PromoSubmissionStatus",
    "providerId" TEXT,
    CONSTRAINT "promo_submissions_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "promo_employees" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "employeeId" TEXT,
    "name" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "birthPlace" TEXT,
    "birthDate" DATE,
    "nationalId" TEXT,
    "street" TEXT,
    "streetDetails" TEXT,
    "city" TEXT,
    "State" TEXT,
    "zip" TEXT,
    "employerId" TEXT,
    CONSTRAINT "promo_employees_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "promo_employers" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "phone" TEXT,
    CONSTRAINT "promo_employers_pkey" PRIMARY KEY ("id")
);
-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
-- CreateIndex
CREATE UNIQUE INDEX "profiles_handle_key" ON "profiles"("handle");
-- CreateIndex
CREATE UNIQUE INDEX "profiles_userId_key" ON "profiles"("userId");
-- CreateIndex
CREATE UNIQUE INDEX "admin_profiles_userId_key" ON "admin_profiles"("userId");
-- CreateIndex
CREATE UNIQUE INDEX "wholesalers_handle_key" ON "wholesalers"("handle");
-- CreateIndex
CREATE UNIQUE INDEX "suppliers_handle_key" ON "suppliers"("handle");
-- CreateIndex
CREATE UNIQUE INDEX "supplier_products_slug_key" ON "supplier_products"("slug");
-- CreateIndex
CREATE UNIQUE INDEX "merchants_handle_key" ON "merchants"("handle");
-- CreateIndex
CREATE UNIQUE INDEX "merchant_products_slug_key" ON "merchant_products"("slug");
-- CreateIndex
CREATE UNIQUE INDEX "financing_services_handle_key" ON "financing_services"("handle");
-- CreateIndex
CREATE UNIQUE INDEX "fund_beneficiaries_userId_key" ON "fund_beneficiaries"("userId");
-- CreateIndex
CREATE UNIQUE INDEX "fund_beneficiaries_profileId_key" ON "fund_beneficiaries"("profileId");
-- CreateIndex
CREATE UNIQUE INDEX "business_orders_paymentRecordId_key" ON "business_orders"("paymentRecordId");
-- CreateIndex
CREATE UNIQUE INDEX "virtual_account_numbers_bussinessOrderId_key" ON "virtual_account_numbers"("bussinessOrderId");
-- AddForeignKey
ALTER TABLE "profiles"
ADD CONSTRAINT "profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "admin_profiles"
ADD CONSTRAINT "admin_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "addresses"
ADD CONSTRAINT "addresses_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "addresses"
ADD CONSTRAINT "addresses_wholesalerId_fkey" FOREIGN KEY ("wholesalerId") REFERENCES "wholesalers"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "addresses"
ADD CONSTRAINT "addresses_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "addresses"
ADD CONSTRAINT "addresses_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "merchants"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "wholesalers"
ADD CONSTRAINT "wholesalers_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "suppliers"
ADD CONSTRAINT "suppliers_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "supplier_products"
ADD CONSTRAINT "supplier_products_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "supplier_products"
ADD CONSTRAINT "supplier_products_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "merchants"
ADD CONSTRAINT "merchants_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "merchant_products"
ADD CONSTRAINT "merchant_products_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "merchant_products"
ADD CONSTRAINT "merchant_products_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "merchants"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "fund_beneficiaries"
ADD CONSTRAINT "fund_beneficiaries_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "fund_beneficiaries"
ADD CONSTRAINT "fund_beneficiaries_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "fund_beneficiaries"
ADD CONSTRAINT "fund_beneficiaries_financingServiceId_fkey" FOREIGN KEY ("financingServiceId") REFERENCES "financing_services"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "fund_benefactors"
ADD CONSTRAINT "fund_benefactors_financingServiceId_fkey" FOREIGN KEY ("financingServiceId") REFERENCES "financing_services"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "business_orders"
ADD CONSTRAINT "business_orders_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "business_orders"
ADD CONSTRAINT "business_orders_shipmentAddressId_fkey" FOREIGN KEY ("shipmentAddressId") REFERENCES "addresses"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "business_orders"
ADD CONSTRAINT "business_orders_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "payment_methods"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "business_orders"
ADD CONSTRAINT "business_orders_paymentRecordId_fkey" FOREIGN KEY ("paymentRecordId") REFERENCES "payment_records"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "business_orders"
ADD CONSTRAINT "business_orders_courierId_fkey" FOREIGN KEY ("courierId") REFERENCES "couriers"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "business_orders"
ADD CONSTRAINT "business_orders_courierVehicleId_fkey" FOREIGN KEY ("courierVehicleId") REFERENCES "courier_vehicles"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "business_order_items"
ADD CONSTRAINT "business_order_items_businessOrderId_fkey" FOREIGN KEY ("businessOrderId") REFERENCES "business_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "business_order_items"
ADD CONSTRAINT "business_order_items_supplierProductId_fkey" FOREIGN KEY ("supplierProductId") REFERENCES "supplier_products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "business_order_items"
ADD CONSTRAINT "business_order_items_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "business_order_items"
ADD CONSTRAINT "business_order_items_courierId_fkey" FOREIGN KEY ("courierId") REFERENCES "couriers"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "business_order_items"
ADD CONSTRAINT "business_order_items_courierVehicleId_fkey" FOREIGN KEY ("courierVehicleId") REFERENCES "courier_vehicles"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "courier_vehicles"
ADD CONSTRAINT "courier_vehicles_courierId_fkey" FOREIGN KEY ("courierId") REFERENCES "couriers"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "payment_records"
ADD CONSTRAINT "payment_records_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "payment_methods"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "virtual_account_numbers"
ADD CONSTRAINT "virtual_account_numbers_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "virtual_account_numbers"
ADD CONSTRAINT "virtual_account_numbers_bussinessOrderId_fkey" FOREIGN KEY ("bussinessOrderId") REFERENCES "business_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "promo_submissions"
ADD CONSTRAINT "promo_submissions_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "promo_providers"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "promo_employees"
ADD CONSTRAINT "promo_employees_employerId_fkey" FOREIGN KEY ("employerId") REFERENCES "promo_employers"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
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
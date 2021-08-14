/*
 Warnings:
 
 - You are about to drop the column `paymentId` on the `business_orders` table. All the data in the column will be lost.
 - You are about to drop the column `shippingDiscount` on the `business_orders` table. All the data in the column will be lost.
 - The `totalPrice` column on the `business_orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.
 - You are about to alter the column `totalWeight` on the `business_orders` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
 - The `totalShippingCost` column on the `business_orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.
 - The `totalPayment` column on the `business_orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.
 
 */
-- DropForeignKey
ALTER TABLE "business_orders" DROP CONSTRAINT "business_orders_paymentId_fkey";
-- AlterTable
ALTER TABLE "addresses"
ADD COLUMN "subdistrict" TEXT,
  ADD COLUMN "ward" TEXT;
-- AlterTable
ALTER TABLE "business_orders" DROP COLUMN "paymentId",
  DROP COLUMN "shippingDiscount",
  ADD COLUMN "paymentMethodId" TEXT,
  ADD COLUMN "totalBillPayment" MONEY,
  ADD COLUMN "totalShippingDiscount" MONEY,
  DROP COLUMN "totalPrice",
  ADD COLUMN "totalPrice" MONEY,
  ALTER COLUMN "totalWeight"
SET DATA TYPE INTEGER,
  DROP COLUMN "totalShippingCost",
  ADD COLUMN "totalShippingCost" MONEY,
  DROP COLUMN "totalPayment",
  ADD COLUMN "totalPayment" MONEY;
-- AlterTable
ALTER TABLE "courier_vehicles"
ADD COLUMN "maxCargoDimensionCubicMeter" DOUBLE PRECISION,
  ADD COLUMN "maxCargoDimensionHeight" INTEGER,
  ADD COLUMN "maxCargoDimensionLength" INTEGER,
  ADD COLUMN "maxCargoDimensionWidth" INTEGER,
  ADD COLUMN "maxWeightCapacity" INTEGER;
-- AlterTable
ALTER TABLE "supplier_products"
ADD COLUMN "tags" JSONB;
-- AlterTable
ALTER TABLE "users"
ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
-- AddForeignKey
ALTER TABLE "business_orders"
ADD FOREIGN KEY ("paymentMethodId") REFERENCES "payments"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
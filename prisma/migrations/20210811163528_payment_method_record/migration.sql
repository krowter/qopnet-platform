/*
 Warnings:
 
 - You are about to drop the `payments` table. If the table is not empty, all the data it contains will be lost.
 - A unique constraint covering the columns `[paymentRecordId]` on the table `business_orders` will be added. If there are existing duplicate values, this will fail.
 
 */
-- DropForeignKey
ALTER TABLE "business_orders" DROP CONSTRAINT "business_orders_paymentMethodId_fkey";
-- AlterTable
ALTER TABLE "business_orders"
ADD COLUMN "paymentRecordId" TEXT;
-- DropTable
DROP TABLE "payments";
-- CreateTable
CREATE TABLE "payment_methods" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "paymentCategory" "PaymentCategory" NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "payment_records" (
  "id" TEXT NOT NULL,
  "amount" MONEY NOT NULL,
  "paymentMethodId" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("id")
);
-- CreateIndex
CREATE UNIQUE INDEX "business_orders_paymentRecordId_unique" ON "business_orders"("paymentRecordId");
-- AddForeignKey
ALTER TABLE "business_orders"
ADD FOREIGN KEY ("paymentMethodId") REFERENCES "payment_methods"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "business_orders"
ADD FOREIGN KEY ("paymentRecordId") REFERENCES "payment_records"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "payment_records"
ADD FOREIGN KEY ("paymentMethodId") REFERENCES "payment_methods"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
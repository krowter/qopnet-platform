/*
 Warnings:
 
 - You are about to drop the column `amount` on the `payment_records` table. All the data in the column will be lost.
 
 */
-- CreateEnum
CREATE TYPE "PaymentRecordStatus" AS ENUM (
  'PENDING',
  'PAID',
  'CANCELLED',
  'OUTDATED',
  'INVALID'
);
-- DropForeignKey
ALTER TABLE "admin_profiles" DROP CONSTRAINT "admin_profiles_userId_fkey";
-- AlterTable
ALTER TABLE "payment_records" DROP COLUMN "amount",
  ADD COLUMN "accountHolderName" TEXT,
  ADD COLUMN "accountNumber" TEXT,
  ADD COLUMN "amountDue" MONEY,
  ADD COLUMN "amountPaid" MONEY,
  ADD COLUMN "proofImages" JSONB [],
  ADD COLUMN "status" "PaymentRecordStatus",
  ADD COLUMN "uniqueDigits" DECIMAL(65, 30);
-- AddForeignKey
ALTER TABLE "admin_profiles"
ADD FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
/*
 Warnings:
 
 - The values [COD,TRANSFER,VIRTUALACCOUNT] on the enum `PaymentCategory` will be removed. If these variants are still used in the database, this will fail.
 
 */
-- AlterEnum
BEGIN;
CREATE TYPE "PaymentCategory_new" AS ENUM (
  'CASH_ON_DELIVERY',
  'TRANSFER_MANUAL',
  'TRANSFER_VIRTUAL_ACCOUNT',
  'INSTALMENT',
  'CREDIT',
  'LOAN'
);
ALTER TABLE "payment_methods"
ALTER COLUMN "paymentCategory" TYPE "PaymentCategory_new" USING ("paymentCategory"::text::"PaymentCategory_new");
ALTER TYPE "PaymentCategory"
RENAME TO "PaymentCategory_old";
ALTER TYPE "PaymentCategory_new"
RENAME TO "PaymentCategory";
DROP TYPE "PaymentCategory_old";
COMMIT;
/*
  Warnings:

  - The values [DRAFT,WAITING_FOR_PAYMENT,PAID,WAITING_FOR_CONFIRMATION,PROCESSED,ONDELIVERY,REFUNDED] on the enum `BusinessOrderItemStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [WAITING_FOR_PICKUP,ONDELIVERY] on the enum `BusinessOrderStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BusinessOrderItemStatus_new" AS ENUM ('WAITING_FOR_PICKUP', 'ON_DELIVERY', 'IN_WAREHOUSE', 'DELIVERED', 'CONFIRMED', 'COMPLAINED', 'CANCELED');
ALTER TABLE "business_order_items" ALTER COLUMN "status" TYPE "BusinessOrderItemStatus_new" USING ("status"::text::"BusinessOrderItemStatus_new");
ALTER TYPE "BusinessOrderItemStatus" RENAME TO "BusinessOrderItemStatus_old";
ALTER TYPE "BusinessOrderItemStatus_new" RENAME TO "BusinessOrderItemStatus";
DROP TYPE "BusinessOrderItemStatus_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "BusinessOrderStatus_new" AS ENUM ('DRAFT', 'WAITING_FOR_PAYMENT', 'PAID', 'WAITING_FOR_CONFIRMATION', 'PROCESSED', 'ON_DELIVERY', 'DELIVERED', 'CONFIRMED', 'COMPLAINED', 'CANCELED', 'REFUNDED');
ALTER TABLE "business_orders" ALTER COLUMN "status" TYPE "BusinessOrderStatus_new" USING ("status"::text::"BusinessOrderStatus_new");
ALTER TYPE "BusinessOrderStatus" RENAME TO "BusinessOrderStatus_old";
ALTER TYPE "BusinessOrderStatus_new" RENAME TO "BusinessOrderStatus";
DROP TYPE "BusinessOrderStatus_old";
COMMIT;

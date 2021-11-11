/*
  Warnings:

  - The `status` column on the `business_orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "BusinessOrderStatus" AS ENUM ('DRAFT', 'WAITING_FOR_PAYMENT', 'PAID', 'WAITING_FOR_CONFIRMATION', 'PROCESSED', 'WAITING_FOR_PICKUP', 'ONDELIVERY', 'DELIVERED', 'CONFIRMED', 'COMPLAINED', 'CANCELED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "BusinessOrderItemStatus" AS ENUM ('DRAFT', 'WAITING_FOR_PAYMENT', 'PAID', 'WAITING_FOR_CONFIRMATION', 'PROCESSED', 'WAITING_FOR_PICKUP', 'ONDELIVERY', 'DELIVERED', 'CONFIRMED', 'COMPLAINED', 'CANCELED', 'REFUNDED');

-- AlterTable
ALTER TABLE "business_order_items" ADD COLUMN     "status" "BusinessOrderItemStatus";

-- AlterTable
ALTER TABLE "business_orders" DROP COLUMN "status",
ADD COLUMN     "status" "BusinessOrderStatus";

-- DropEnum
DROP TYPE "OrderStatus";

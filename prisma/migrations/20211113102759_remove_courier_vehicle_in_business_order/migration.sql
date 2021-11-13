/*
  Warnings:

  - You are about to drop the column `courierVehicleId` on the `business_orders` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "business_orders" DROP CONSTRAINT "business_orders_courierVehicleId_fkey";

-- AlterTable
ALTER TABLE "business_orders" DROP COLUMN "courierVehicleId";

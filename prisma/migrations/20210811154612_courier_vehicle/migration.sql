/*
 Warnings:
 
 - You are about to drop the column `courierId` on the `business_order_items` table. All the data in the column will be lost.
 - You are about to drop the column `fleetId` on the `business_order_items` table. All the data in the column will be lost.
 
 */
-- AlterTable
ALTER TABLE "business_order_items" DROP COLUMN "courierId",
  DROP COLUMN "fleetId";
-- AlterTable
ALTER TABLE "business_orders"
ADD COLUMN "shipmentCourierId" TEXT,
  ADD COLUMN "shipmentCourierVehicleId" TEXT;
-- CreateTable
CREATE TABLE "couriers" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "courier_vehicles" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "courierId" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("id")
);
-- AddForeignKey
ALTER TABLE "business_orders"
ADD FOREIGN KEY ("shipmentCourierId") REFERENCES "couriers"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "business_orders"
ADD FOREIGN KEY ("shipmentCourierVehicleId") REFERENCES "courier_vehicles"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "courier_vehicles"
ADD FOREIGN KEY ("courierId") REFERENCES "couriers"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
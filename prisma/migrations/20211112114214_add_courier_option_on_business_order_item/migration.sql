-- AlterTable
ALTER TABLE "business_order_items" ADD COLUMN     "shipmentCourierId" TEXT;

-- AddForeignKey
ALTER TABLE "business_order_items" ADD CONSTRAINT "business_order_items_shipmentCourierId_fkey" FOREIGN KEY ("shipmentCourierId") REFERENCES "couriers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

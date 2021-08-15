-- DropForeignKey
ALTER TABLE "admin_profiles" DROP CONSTRAINT "admin_profiles_userId_fkey";
-- DropForeignKey
ALTER TABLE "business_order_items" DROP CONSTRAINT "business_order_items_businessOrderId_fkey";
-- DropForeignKey
ALTER TABLE "business_order_items" DROP CONSTRAINT "business_order_items_supplierId_fkey";
-- DropForeignKey
ALTER TABLE "business_order_items" DROP CONSTRAINT "business_order_items_supplierProductId_fkey";
-- DropForeignKey
ALTER TABLE "wholesalers" DROP CONSTRAINT "wholesalers_ownerId_fkey";
-- AddForeignKey
ALTER TABLE "admin_profiles"
ADD FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "wholesalers"
ADD FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "business_order_items"
ADD FOREIGN KEY ("businessOrderId") REFERENCES "business_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "business_order_items"
ADD FOREIGN KEY ("supplierProductId") REFERENCES "supplier_products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "business_order_items"
ADD FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
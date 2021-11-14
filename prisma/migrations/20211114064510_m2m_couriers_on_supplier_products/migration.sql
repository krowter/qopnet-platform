/*
  Warnings:

  - You are about to drop the `_CourierToSupplierProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CourierToSupplierProduct" DROP CONSTRAINT "_CourierToSupplierProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_CourierToSupplierProduct" DROP CONSTRAINT "_CourierToSupplierProduct_B_fkey";

-- DropTable
DROP TABLE "_CourierToSupplierProduct";

-- CreateTable
CREATE TABLE "_couriers_on_suppplier_products" (
    "courierId" TEXT NOT NULL,
    "supplierProductId" TEXT NOT NULL,

    CONSTRAINT "_couriers_on_suppplier_products_pkey" PRIMARY KEY ("courierId","supplierProductId")
);

-- AddForeignKey
ALTER TABLE "_couriers_on_suppplier_products" ADD CONSTRAINT "_couriers_on_suppplier_products_courierId_fkey" FOREIGN KEY ("courierId") REFERENCES "couriers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_couriers_on_suppplier_products" ADD CONSTRAINT "_couriers_on_suppplier_products_supplierProductId_fkey" FOREIGN KEY ("supplierProductId") REFERENCES "supplier_products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

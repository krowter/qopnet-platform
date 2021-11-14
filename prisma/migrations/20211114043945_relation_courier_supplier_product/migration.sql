-- CreateTable
CREATE TABLE "_CourierToSupplierProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CourierToSupplierProduct_AB_unique" ON "_CourierToSupplierProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_CourierToSupplierProduct_B_index" ON "_CourierToSupplierProduct"("B");

-- AddForeignKey
ALTER TABLE "_CourierToSupplierProduct" ADD FOREIGN KEY ("A") REFERENCES "couriers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourierToSupplierProduct" ADD FOREIGN KEY ("B") REFERENCES "supplier_products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM (
    'DRAFT',
    'WAITING_FOR_PAYMENT',
    'PAID',
    'WAITING_FOR_CONFIRMATION',
    'PROCESSED',
    'WAITING_FOR_PICKUP',
    'ONDELIVERY',
    'DELIVERED',
    'CONFIRMED',
    'COMPLAINED',
    'CANCELED',
    'REFUNDED'
);
-- CreateEnum
CREATE TYPE "PaymentCategory" AS ENUM ('COD', 'TRANSFER', 'VIRTUALACCOUNT');
-- CreateTable
CREATE TABLE "business_orders" (
    "id" TEXT NOT NULL,
    "status" "OrderStatus",
    "ownerId" TEXT,
    "shipmentAddressId" TEXT,
    "paymentId" TEXT,
    "totalItems" INTEGER,
    "totalPrice" DECIMAL(65, 30),
    "totalWeight" DECIMAL(65, 30),
    "totalShippingCost" DECIMAL(65, 30),
    "shippingDiscount" DECIMAL(65, 30),
    "totalPayment" DECIMAL(65, 30),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "business_order_items" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "supplierId" TEXT NOT NULL,
    "supplierProductId" TEXT NOT NULL,
    "businessOrderId" TEXT NOT NULL,
    "courierId" TEXT,
    "fleetId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "paymentCategory" "PaymentCategory" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);
-- AddForeignKey
ALTER TABLE "business_orders"
ADD FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "business_orders"
ADD FOREIGN KEY ("shipmentAddressId") REFERENCES "addresses"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "business_orders"
ADD FOREIGN KEY ("paymentId") REFERENCES "payments"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "business_order_items"
ADD FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "business_order_items"
ADD FOREIGN KEY ("supplierProductId") REFERENCES "supplier_products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "business_order_items"
ADD FOREIGN KEY ("businessOrderId") REFERENCES "business_orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
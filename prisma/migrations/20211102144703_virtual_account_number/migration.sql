-- CreateTable
CREATE TABLE "virtual_account_numbers" (
    "id" TEXT NOT NULL,
    "vaNumber" TEXT NOT NULL,
    "instCode" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "bussinessOrderId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "virtual_account_numbers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "virtual_account_permata_logs" (
    "id" TEXT NOT NULL,
    "requestObject" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "virtual_account_permata_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "virtual_account_numbers_bussinessOrderId_key" ON "virtual_account_numbers"("bussinessOrderId");

-- AddForeignKey
ALTER TABLE "virtual_account_numbers" ADD CONSTRAINT "virtual_account_numbers_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "virtual_account_numbers" ADD CONSTRAINT "virtual_account_numbers_bussinessOrderId_fkey" FOREIGN KEY ("bussinessOrderId") REFERENCES "business_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

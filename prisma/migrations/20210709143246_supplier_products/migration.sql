/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `supplier_products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "supplier_products" DROP COLUMN "imageUrl",
ADD COLUMN     "images" JSONB,
ALTER COLUMN "slug" DROP NOT NULL,
ALTER COLUMN "sku" DROP NOT NULL,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "price" DROP NOT NULL,
ALTER COLUMN "priceMax" DROP NOT NULL,
ALTER COLUMN "priceMin" DROP NOT NULL,
ALTER COLUMN "supplierId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "suppliers" ALTER COLUMN "handle" DROP NOT NULL,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "nationalTax" DROP NOT NULL,
ALTER COLUMN "certificationFile" DROP NOT NULL;

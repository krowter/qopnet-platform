/*
  Warnings:

  - The `handle` column on the `profiles` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `slug` column on the `supplier_products` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `handle` column on the `suppliers` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[handle]` on the table `merchants` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[handle]` on the table `profiles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `supplier_products` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[handle]` on the table `suppliers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[handle]` on the table `wholesalers` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `handle` on the `merchants` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `ownerId` to the `supplier_products` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `email` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `handle` on the `wholesalers` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "merchants" DROP COLUMN "handle",
ADD COLUMN     "handle" CITEXT NOT NULL;

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "handle",
ADD COLUMN     "handle" CITEXT;

-- AlterTable
ALTER TABLE "supplier_products" ADD COLUMN     "ownerId" TEXT NOT NULL,
DROP COLUMN "slug",
ADD COLUMN     "slug" CITEXT;

-- AlterTable
ALTER TABLE "suppliers" DROP COLUMN "handle",
ADD COLUMN     "handle" CITEXT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "email",
ADD COLUMN     "email" CITEXT NOT NULL;

-- AlterTable
ALTER TABLE "wholesalers" DROP COLUMN "handle",
ADD COLUMN     "handle" CITEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "merchants.handle_unique" ON "merchants"("handle");

-- CreateIndex
CREATE UNIQUE INDEX "profiles.handle_unique" ON "profiles"("handle");

-- CreateIndex
CREATE UNIQUE INDEX "supplier_products.slug_unique" ON "supplier_products"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "suppliers.handle_unique" ON "suppliers"("handle");

-- CreateIndex
CREATE UNIQUE INDEX "users.email_unique" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "wholesalers.handle_unique" ON "wholesalers"("handle");

-- AddForeignKey
ALTER TABLE "supplier_products" ADD FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

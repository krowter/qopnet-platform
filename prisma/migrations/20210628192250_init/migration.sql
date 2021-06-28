-- CreateTable
CREATE TABLE "Profile" (
    "id" uuid REFERENCES auth.users NOT NULL,
    "handle" CITEXT NOT NULL,
    "name" TEXT NOT NULL,
    PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "SupplierOrganization" (
    "id" TEXT NOT NULL,
    "handle" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar_url" TEXT,
    "national_tax_number" TEXT,
    "certification_file" TEXT,
    "classification" TEXT,
    "address" TEXT,
    "warehouses" TEXT,
    PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "MerchantOrganization" (
    "id" TEXT NOT NULL,
    "handle" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar_url" TEXT,
    "address" TEXT,
    PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "SupplierProduct" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "price" MONEY NOT NULL,
    "price_max" MONEY NOT NULL,
    "price_min" MONEY NOT NULL,
    PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "MerchantProduct" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "price" MONEY NOT NULL,
    PRIMARY KEY ("id")
);
-- CreateIndex
CREATE UNIQUE INDEX "Profile.handle_unique" ON "Profile"("handle");
-- CreateIndex
CREATE UNIQUE INDEX "SupplierOrganization.handle_unique" ON "SupplierOrganization"("handle");
-- CreateIndex
CREATE UNIQUE INDEX "MerchantOrganization.handle_unique" ON "MerchantOrganization"("handle");
-- CreateIndex
CREATE UNIQUE INDEX "SupplierProduct.slug_unique" ON "SupplierProduct"("slug");
-- CreateIndex
CREATE UNIQUE INDEX "MerchantProduct.slug_unique" ON "MerchantProduct"("slug");
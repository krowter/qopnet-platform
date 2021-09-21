-- RenameIndex
ALTER INDEX "financing_services.handle_unique" RENAME TO "financing_services_handle_key";

-- RenameIndex
ALTER INDEX "merchant_products.slug_unique" RENAME TO "merchant_products_slug_key";

-- RenameIndex
ALTER INDEX "merchants.handle_unique" RENAME TO "merchants_handle_key";

-- RenameIndex
ALTER INDEX "profiles.handle_unique" RENAME TO "profiles_handle_key";

-- RenameIndex
ALTER INDEX "supplier_products.slug_unique" RENAME TO "supplier_products_slug_key";

-- RenameIndex
ALTER INDEX "suppliers.handle_unique" RENAME TO "suppliers_handle_key";

-- RenameIndex
ALTER INDEX "users.email_unique" RENAME TO "users_email_key";

-- RenameIndex
ALTER INDEX "wholesalers.handle_unique" RENAME TO "wholesalers_handle_key";

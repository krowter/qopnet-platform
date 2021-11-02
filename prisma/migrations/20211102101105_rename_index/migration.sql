-- RenameIndex
ALTER INDEX "admin_profiles_userId_unique" RENAME TO "admin_profiles_userId_key";

-- RenameIndex
ALTER INDEX "business_orders_paymentRecordId_unique" RENAME TO "business_orders_paymentRecordId_key";

-- RenameIndex
ALTER INDEX "fund_beneficiaries_profileId_unique" RENAME TO "fund_beneficiaries_profileId_key";

-- RenameIndex
ALTER INDEX "fund_beneficiaries_userId_unique" RENAME TO "fund_beneficiaries_userId_key";

-- RenameIndex
ALTER INDEX "profiles_userId_unique" RENAME TO "profiles_userId_key";

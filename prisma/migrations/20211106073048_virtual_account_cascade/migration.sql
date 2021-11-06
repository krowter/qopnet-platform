-- DropForeignKey
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_profileId_fkey";

-- DropForeignKey
ALTER TABLE "virtual_account_numbers" DROP CONSTRAINT "virtual_account_numbers_ownerId_fkey";

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "virtual_account_numbers" ADD CONSTRAINT "virtual_account_numbers_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

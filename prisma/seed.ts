import { PrismaClient, Supplier, SupplierProduct } from '@prisma/client'
import axios, { AxiosResponse } from 'axios'
const prisma = new PrismaClient()

import qopnetProductsData from './qopnet-products.json'
import qopnetOneProductsData from './qopnet-products-one.json'

// https://www.prisma.io/docs/guides/database/seed-database#seeding-your-database-with-typescript

interface SupplierData {
  name: string
  handle: string
  ownerId: string
}

// Image URL example
// https://rryitovbrajppywbpmit.supabase.co/storage/v1/object/public/images/anekabusa/AB-001.jpeg

// Get storageUrl from env
const storageUrl = process.env.NX_SUPABASE_URL
const ownerId = 'ckr86vmxt005010pjeh4mqs6n' // qopnetlabs@gmail.com profile.id

async function createSupplier(supplierData: SupplierData) {
  return await prisma.supplier.upsert({
    where: {
      handle: supplierData.handle,
    },
    update: supplierData,
    create: supplierData,
  })
}

async function deleteEverything() {
  await prisma.user.deleteMany()
  await prisma.profile.deleteMany()
  await prisma.address.deleteMany()

  await prisma.businessOrderItem.deleteMany()
  await prisma.businessOrder.deleteMany()

  await prisma.supplier.deleteMany()
  await prisma.supplierProduct.deleteMany()

  await prisma.courier.deleteMany()
  await prisma.courierVehicle.deleteMany()

  await prisma.paymentMethod.deleteMany()
  await prisma.paymentRecord.deleteMany()
}

async function createSupplierProductsFromJSON({
  data, // JSON data
  supplier, // Supplier in JSON
}: {
  data: any
  supplier: Supplier
}) {
  // Map to put the ownerId and supplierId per product
  data = data.map((product: SupplierProduct) => {
    product.ownerId = supplier.ownerId
    product.supplierId = supplier.id
    return product
  })

  // Create many supplier products
  await prisma.supplierProduct.createMany({
    data: data,
    skipDuplicates: true,
  })
}

async function createSupplierProductsFromURL({
  productsUrl,
  supplier,
}: {
  productsUrl: string
  supplier: Supplier
}) {
  // download data from gist
  let { data: products }: AxiosResponse<any[]> = await axios.get(productsUrl)

  // re-map
  // add ids and update storage url based on environment
  products = products.map((product) => {
    product.ownerId = supplier.ownerId
    product.supplierId = supplier.id

    if (product.images) {
      product.images = product.images.map(
        (image: string) =>
          `${storageUrl}/storage/v1/object/public/images/${supplier.handle}/${image}`
      )
    }

    return product
  })

  // create supplierProduct -- aneka busa
  await prisma.supplierProduct.createMany({
    data: products,
    skipDuplicates: true,
  })
}

async function seedQopnetProducts() {
  const supplierData: SupplierData = {
    name: 'Qopnet',
    handle: 'qopnet',
    ownerId: 'ckr86vmxt005010pjeh4mqs6n',
  }

  // create supplier
  const supplier: Supplier = await createSupplier(supplierData)

  // start creating supplierData
  await createSupplierProductsFromJSON({
    data: qopnetOneProductsData, // Will be qopnetProductsData
    supplier,
  })
}

async function seedAnekaBusaProducts() {
  const productsUrl =
    'https://gist.github.com/qopnetlabs/414f0a5e3404e6555165ccc67ff79b60/raw'

  const supplierData = {
    name: 'Aneka Busa (PT. Aneka Busa Indonesia)',
    handle: 'anekabusa',
    ownerId: 'ckr86vmxt005010pjeh4mqs6n',
  }

  // create supplier
  const supplier: Supplier = await createSupplier(supplierData)

  // start creating supplierData
  await createSupplierProductsFromURL({
    productsUrl,
    supplier,
  })
}

/**
 * Main function to Prisma seed
 */

async function main() {
  // Remove all
  await deleteEverything()

  // Seed data
  await seedQopnetProducts()
  await seedAnekaBusaProducts()
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

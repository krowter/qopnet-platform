import { PrismaClient, Supplier } from '@prisma/client'
import axios, { AxiosResponse } from 'axios'
const prisma = new PrismaClient()

import qopnetProductsData from './qopnet-products.json'

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

async function removeExistingProducts(supplierId: string) {
  return await prisma.supplierProduct.deleteMany({
    where: {
      ownerId,
      supplierId: supplierId, // new supplier or existing supplier
    },
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

  // remove existing products
  await removeExistingProducts(supplier.id)

  // start creating supplierData
  await createSupplierProductsFromJSON({
    data: qopnetProductsData,
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

  // remove existing products
  await removeExistingProducts(supplier.id)

  // start creating supplierData
  await createSupplierProductsFromURL({
    productsUrl,
    supplier,
  })
}

async function createSupplierProductsFromJSON({
  data, // JSON data
  supplier, // Supplier in JSON
}: {
  data: any
  supplier: Supplier
}) {
  // Create many supplier products
  await prisma.supplierProduct.createMany({
    data: data,
    skipDuplicates: true,
  })
}

/**
 * Main function to Prisma seed
 */

async function main() {
  // Seeds
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

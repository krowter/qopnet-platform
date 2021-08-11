/**
 * https://prisma.io/docs/guides/database/seed-database#seeding-your-database-with-typescript
 */

import {
  PrismaClient,
  User,
  Profile,
  Address,
  Courier,
  CourierVehicle,
  PaymentMethod,
  PaymentRecord,
  Supplier,
  SupplierProduct,
} from '@prisma/client'
import axios, { AxiosResponse } from 'axios'
const prisma = new PrismaClient()

import usersData from './data/users.json'
import profilesData from './data/profiles.json'
import addressesData from './data/addresses.json'
import suppliersData from './data/suppliers.json'
import businessOrdersData from './data/business-orders.json'
import couriersData from './data/couriers.json'
import courierVehiclesData from './data/courier-vehicles.json'
import paymentMethodsData from './data/payments-methods.json'
import paymentRecordsData from './data/payments-records.json'

import qopnetProductsData from './qopnet-products.json'
import qopnetOneProductsData from './qopnet-products-one.json'

// -----------------------------------------------------------------------------

// Get storageUrl from env
const storageUrl = process.env.NX_SUPABASE_URL
const ownerId = 'ckr86vmxt005010pjeh4mqs6n' // qopnetlabs@gmail.com profile.id

// -----------------------------------------------------------------------------

async function deleteEverything() {
  console.log({
    message: 'Delete everything',
  })

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

// -----------------------------------------------------------------------------

async function createSupplierProductsFromJSON({
  data, // JSON data
  supplier,
}: {
  data: any
  supplier: any
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
  supplier: any
}) {
  // download data from gist
  let { data: products }: AxiosResponse<any[]> = await axios.get(productsUrl)

  // re-map
  // add ids and update storage url based on environment
  products = products.map((product) => {
    product.ownerId = supplier.ownerId
    product.supplierId = supplier.id

    // Image URL example
    // https://rryitovbrajppywbpmit.supabase.co/storage/v1/object/public/images/anekabusa/AB-001.jpeg
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

// -----------------------------------------------------------------------------

const seedUsers = async () => {
  const users = await prisma.user.createMany({
    data: usersData,
  })
  console.log({ users })
}

const seedProfiles = async () => {
  const profiles = await prisma.profile.createMany({
    data: profilesData,
  })
  console.log({ profiles })
}

const seedAddresses = async () => {
  const addresses = await prisma.address.createMany({
    data: addressesData,
  })
  console.log({ addresses })
}

const seedSuppliers = async () => {
  const suppliers = await prisma.supplier.createMany({
    data: suppliersData,
  })
  console.log({ suppliers })
}

const seedBusinessOrder = async () => {
  const businessOrders = await prisma.businessOrder.createMany({
    // @ts-ignore
    data: businessOrdersData,
  })
  console.log({ businessOrders })
}

const seedCouriers = async () => {
  const couriers = await prisma.courier.createMany({
    data: couriersData,
  })
  console.log({ couriers })
}

const seedCourierVehicles = async () => {
  const courierDeliveree = await prisma.courier.findFirst({
    where: { name: 'Deliveree' },
  })
  const courierLalamove = await prisma.courier.findFirst({
    where: { name: 'Lalamove' },
  })
  const courierMasKargo = await prisma.courier.findFirst({
    where: { name: 'Mas Kargo' },
  })

  const courierVehiclesDeliveree = await prisma.courierVehicle.createMany({
    data: courierVehiclesData.map((vehicle) => {
      return {
        name: vehicle.name.concat(` ${courierDeliveree?.name}`),
        courierId: `${courierDeliveree?.id}`,
      }
    }),
  })

  const courierVehiclesLalamove = await prisma.courierVehicle.createMany({
    data: courierVehiclesData.map((vehicle) => {
      return {
        name: vehicle.name.concat(` ${courierLalamove?.name}`),
        courierId: `${courierLalamove?.id}`,
      }
    }),
  })

  const courierVehiclesMasKargo = await prisma.courierVehicle.createMany({
    data: courierVehiclesData.map((vehicle) => {
      return {
        name: vehicle.name.concat(` ${courierMasKargo?.name}`),
        courierId: `${courierMasKargo?.id}`,
      }
    }),
  })

  console.log({
    courierVehiclesDeliveree,
    courierVehiclesLalamove,
    courierVehiclesMasKargo,
  })
}

const seedPaymentMethods = async () => {
  const paymentMethods = await prisma.paymentMethod.createMany({
    data: paymentMethodsData,
  })
  console.log({ paymentMethods })
}

const seedPaymentRecords = async () => {
  const paymentRecords = await prisma.paymentRecord.createMany({
    data: paymentRecordsData,
  })
  console.log({ paymentRecords })
}

// -----------------------------------------------------------------------------

async function seedQopnetProducts() {
  const supplier = {
    id: 'ckrqopnet0001swpjglh6i6nl',
  }

  // start creating supplierData
  await createSupplierProductsFromJSON({
    data: qopnetOneProductsData, // Will be qopnetProductsData
    supplier,
  })
}

async function seedAnekaBusaProducts() {
  const productsUrl =
    'https://gist.github.com/qopnetlabs/414f0a5e3404e6555165ccc67ff79b60/raw'

  const supplier = {
    id: 'ckrzfccqz0001swpjglh6i6nl',
  }

  // start creating supplierData
  await createSupplierProductsFromURL({
    productsUrl,
    supplier,
  })
}

/**
 * -----------------------------------------------------------------------------
 * Main function to Prisma seed
 */

async function main() {
  // Remove all
  await deleteEverything()

  // Seed data
  await seedUsers()
  await seedProfiles()
  await seedAddresses()
  await seedSuppliers()
  // await seedQopnetProducts()
  // await seedAnekaBusaProducts()
  await seedBusinessOrder()
  await seedCouriers()
  await seedCourierVehicles()
  await seedPaymentMethods()
  await seedPaymentRecords()
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

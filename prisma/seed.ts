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

import promoEmployerData from './data/qopnet-promo-employer.json'
import promoEmployeeData from './data/qopnet-promo-employee.json'

// -----------------------------------------------------------------------------

// Check env
console.info({ env: process.env.NX_NODE_ENV })

// Get storageUrl from env
const storageUrl = process.env.NX_SUPABASE_URL

// qopnetlabs@gmail.com profile.id
const qopnetlabsProfileId = 'ckr86vmxt005010pjeh4mqs6n'

// Currently only for qopnetlabs@gmail.com
// Assign id based on the environment
const qopnetlabsUserId =
  process.env.NX_NODE_ENV === 'production'
    ? 'cb0a71e6-da95-4631-acc0-bbd3f0d39e5c' // production
    : process.env.NX_NODE_ENV === 'staging'
    ? '4f312b35-1554-4283-9d75-cd10d48cdfe7' // staging
    : 'b09ea7f6-27aa-44ce-9354-68ed5bfdd195' // development

// -----------------------------------------------------------------------------

async function deleteEverything() {
  console.info({
    message: 'Delete everything',
  })

  await prisma.user.deleteMany()
  await prisma.profile.deleteMany()
  await prisma.adminProfile.deleteMany()
  await prisma.address.deleteMany()

  await prisma.wholesaler.deleteMany()

  await prisma.supplier.deleteMany()
  await prisma.supplierProduct.deleteMany()

  await prisma.merchant.deleteMany()
  await prisma.merchantProduct.deleteMany()

  await prisma.financingService.deleteMany()
  await prisma.fundBeneficiary.deleteMany()
  await prisma.fundBenefactor.deleteMany()

  await prisma.businessOrderItem.deleteMany()
  await prisma.businessOrder.deleteMany()

  await prisma.courier.deleteMany()
  await prisma.courierVehicle.deleteMany()

  await prisma.paymentMethod.deleteMany()
  await prisma.paymentRecord.deleteMany()

  await prisma.promoProvider.deleteMany()
  await prisma.promoSubmission.deleteMany()
  await prisma.promoEmployer.deleteMany()
  await prisma.promoEmployee.deleteMany()
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

  // Create Qopnet supplier products
  const qopnetSupplierProducts = await prisma.supplierProduct.createMany({
    data: data,
    skipDuplicates: true,
  })

  console.info({ qopnetSupplierProducts })
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
  const anekaBusaSupplierProducts = await prisma.supplierProduct.createMany({
    data: products,
    skipDuplicates: true,
  })

  console.info({ anekaBusaSupplierProducts })
}

// -----------------------------------------------------------------------------

const seedUsers = async () => {
  // Should check existing users in Supabase auth.users
  // To get their id

  const users = await prisma.user.createMany({
    data: usersData.map((user) => {
      return {
        id: qopnetlabsUserId,
        email: user?.email,
      }
    }),
  })
  console.info({ users })
}

const seedProfiles = async () => {
  const profiles = await prisma.profile.createMany({
    data: profilesData.map((user) => {
      return {
        id: qopnetlabsProfileId,
        handle: 'qopnetlabs',
        name: 'Qopnet Labs',
        userId: qopnetlabsUserId,
      }
    }),
  })
  console.info({ profiles })
}

const seedAddresses = async () => {
  const addresses = await prisma.address.createMany({
    data: addressesData,
  })
  console.info({ addresses })
}

const seedSuppliers = async () => {
  const suppliers = await prisma.supplier.createMany({
    data: suppliersData,
  })
  console.info({ suppliers })
}

const seedBusinessOrder = async () => {
  const businessOrders = await prisma.businessOrder.createMany({
    // Ignore OrderStatus enumerable
    // @ts-ignore
    data: businessOrdersData,
  })
  console.info({ businessOrders })
}

const seedCouriers = async () => {
  const couriers = await prisma.courier.createMany({
    data: couriersData,
  })
  console.info({ couriers })
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

  console.info({
    courierVehiclesDeliveree,
    courierVehiclesLalamove,
    courierVehiclesMasKargo,
  })
}

const seedPaymentMethods = async () => {
  const paymentMethods = await prisma.paymentMethod.createMany({
    // Ignore PaymentCategory enumerable
    // @ts-ignore
    data: paymentMethodsData,
  })
  console.info({ paymentMethods })
}

const seedPaymentRecords = async () => {
  const paymentRecords = await prisma.paymentRecord.createMany({
    data: paymentRecordsData,
  })
  console.info({ paymentRecords })
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
  await createSupplierProductsFromURL({
    productsUrl:
      'https://gist.github.com/qopnetlabs/414f0a5e3404e6555165ccc67ff79b60/raw',
    supplier: {
      id: 'ckrzfccqz0001swpjglh6i6nl',
      handle: 'anekabusa',
    },
  })
}

async function seedPromoEmployees() {
  const promoEmployer = await prisma.promoEmployer.create({
    data: promoEmployerData[0],
  })

  const promoEmployees = await prisma.promoEmployee.createMany({
    // @ts-ignore
    data: promoEmployeeData.map((employee) => {
      employee.employerId = promoEmployer.id
      // @ts-ignore
      employee.birthDate = new Date(employee.birthDate)
      return employee
    }),
  })

  console.log({ promoEmployees })
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
  await seedQopnetProducts()
  await seedAnekaBusaProducts()

  await seedBusinessOrder()

  await seedCouriers()
  await seedCourierVehicles()

  await seedPaymentMethods()
  await seedPaymentRecords()

  await seedPromoEmployees()
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

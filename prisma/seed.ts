/**
 * https://prisma.io/docs/guides/database/seed-database#seeding-your-database-with-typescript
 */

import { PrismaClient, SupplierProduct } from '@prisma/client'
const prisma = new PrismaClient()

import couriersData from './data/couriers.json'
import courierVehiclesData from './data/courier-vehicles.json'
import paymentMethodsData from './data/payments-methods.json'
import paymentRecordsData from './data/payments-records.json'

import usersDevData from './data/users-dev.json'
import usersStgData from './data/users-stg.json'
import usersPrdData from './data/users-prd.json'

import profilesDevData from './data/profiles-dev.json'
import profilesStgData from './data/profiles-stg.json'
import profilesPrdData from './data/profiles-prd.json'

import addressesData from './data/addresses.json'
import suppliersData from './data/suppliers.json'

import supplierProductsQopnetData from './data/supplier-products-qopnet.json'
import supplierProductsAnekaBusaData from './data/supplier-products-anekabusa.json'
import supplierProductsArdenaData from './data/supplier-products-ardena.json'

import businessOrdersData from './data/business-orders.json'

import promoEmployerData from './data/qopnet-promo-employer.json'
import promoEmployeeData from './data/qopnet-promo-employee.json'

// -----------------------------------------------------------------------------

// Check env
console.info({ env: process.env.NX_NODE_ENV })

// Get storageUrl from env
const storageUrl = process.env.NX_SUPABASE_URL

// Default user for all environments: qopnetlabs@gmail.com
// Set profile.id
const qopnetlabsProfileId = 'ckr86vmxt005010pjeh4mqs6n'
// Set id based on the environment
const qopnetlabsUserId =
  process.env.NX_NODE_ENV === 'production'
    ? 'cb0a71e6-da95-4631-acc0-bbd3f0d39e5c' // production
    : process.env.NX_NODE_ENV === 'staging'
    ? '4f312b35-1554-4283-9d75-cd10d48cdfe7' // staging
    : 'b09ea7f6-27aa-44ce-9354-68ed5bfdd195' // development

// -----------------------------------------------------------------------------

async function deleteEverything() {
  console.info({ message: 'Delete everything' })

  await prisma.user.deleteMany()
  await prisma.profile.deleteMany()
  await prisma.adminProfile.deleteMany()
  await prisma.address.deleteMany()

  await prisma.wholesaler.deleteMany()

  // Before supplier and supplierProduct
  // Unless have cascade delete
  await prisma.businessOrderItem.deleteMany()
  await prisma.businessOrder.deleteMany()

  await prisma.supplier.deleteMany()
  await prisma.supplierProduct.deleteMany()

  await prisma.merchant.deleteMany()
  await prisma.merchantProduct.deleteMany()

  await prisma.financingService.deleteMany()
  await prisma.fundBeneficiary.deleteMany()
  await prisma.fundBenefactor.deleteMany()

  await prisma.courier.deleteMany()
  await prisma.courierVehicle.deleteMany()

  await prisma.paymentMethod.deleteMany()
  await prisma.paymentRecord.deleteMany()

  await prisma.promoProvider.deleteMany()
  await prisma.promoSubmission.deleteMany()
  await prisma.promoEmployer.deleteMany()
  await prisma.promoEmployee.deleteMany()

  await prisma.virtualAccountNumber.deleteMany()
  await prisma.virtualAccountPermataLog.deleteMany()
}

// -----------------------------------------------------------------------------

async function createSupplierProducts({
  data, // JSON data
  supplier,
}: {
  data: any
  supplier: any
}) {
  const defaultCourier = await prisma.courier.findFirst({
    where: { name: 'Deliveree' },
  })

  console.log({ defaultCourier })

  // Map to put the ownerId and supplierId per product
  data = data.map((product: SupplierProduct) => {
    product.ownerId = supplier.ownerId
    product.supplierId = supplier.id
    // product.couriers = { courier: { connect: { id: defaultCourier?.id } } }
    return product
  })

  // Create Qopnet supplier products
  const qopnetSupplierProducts = await prisma.supplierProduct.createMany({
    data: {
      ...data,
      couriers: { courier: { connect: { id: defaultCourier?.id } } },
    },
    skipDuplicates: true,
  })

  // console.info({ qopnetSupplierProducts })
}

/* 
  Dynamic environment aware to generate the image url automatically
*/
async function createSupplierProductsDynamic({
  data,
  supplier,
}: {
  data: any
  supplier: any
}) {
  // Add id and update storage url based on environment
  const products = data.map((product: any) => {
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

  await prisma.supplierProduct.createMany({
    data: products,
    skipDuplicates: true,
  })
}

// -----------------------------------------------------------------------------

const seedUsers = async () => {
  // Should check existing users in Supabase auth.users
  // To get their id

  const usersData =
    process.env.NX_NODE_ENV === 'production'
      ? usersPrdData // production
      : process.env.NX_NODE_ENV === 'staging'
      ? usersStgData // staging
      : usersDevData // development

  const users = await prisma.user.createMany({
    data: usersData,
  })

  // console.info({ users })
}

const seedProfiles = async () => {
  const profilesData =
    process.env.NX_NODE_ENV === 'production'
      ? profilesPrdData // production
      : process.env.NX_NODE_ENV === 'staging'
      ? profilesStgData // staging
      : profilesDevData // development

  const profiles = await prisma.profile.createMany({
    data: profilesData,
  })
  // console.info({ profiles })
}

const seedAddresses = async () => {
  const addresses = await prisma.address.createMany({
    data: addressesData,
  })
  // console.info({ addresses })
}

const seedSuppliers = async () => {
  const suppliers = await prisma.supplier.createMany({
    data: suppliersData,
  })
  // console.info({ suppliers })
}

const seedBusinessOrder = async () => {
  const businessOrders = await prisma.businessOrder.createMany({
    // Ignore OrderStatus enumerable
    // @ts-ignore
    data: businessOrdersData,
  })
  // console.info({ businessOrders })
}

const seedCouriers = async () => {
  const couriers = await prisma.courier.createMany({
    data: couriersData,
  })
  // console.info({ couriers })
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

  // console.info({
  //   courierVehiclesDeliveree,
  //   courierVehiclesLalamove,
  //   courierVehiclesMasKargo,
  // })
}

const seedPaymentMethods = async () => {
  const paymentMethods = await prisma.paymentMethod.createMany({
    // Ignore PaymentCategory enumerable
    // @ts-ignore
    data: paymentMethodsData,
  })
  // console.info({ paymentMethods })
}

const seedPaymentRecords = async () => {
  const paymentRecords = await prisma.paymentRecord.createMany({
    data: paymentRecordsData,
  })
  // console.info({ paymentRecords })
}

// -----------------------------------------------------------------------------

async function seedQopnetProducts() {
  await createSupplierProducts({
    data: supplierProductsQopnetData,
    supplier: {
      id: 'ckrqopnet0001swpjglh6i6nl',
      handle: 'qopnet',
    },
  })
}

async function seedAnekaBusaProducts() {
  await createSupplierProductsDynamic({
    data: supplierProductsAnekaBusaData,
    supplier: {
      id: 'ckrzfccqz0001swpjglh6i6nl',
      handle: 'anekabusa',
    },
  })
}

async function seedArdenaProducts() {
  await createSupplierProducts({
    data: supplierProductsArdenaData,
    supplier: {
      id: 'cksqy7lfk1299423mckvv1mnp2',
      handle: 'ardena',
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

  // console.info({ promoEmployees })
}

/**
 * -----------------------------------------------------------------------------
 * Main function to Prisma seed
 */

async function main() {
  // Remove all
  await deleteEverything()

  // Seed data
  await seedCouriers()
  // await seedCourierVehicles()

  await seedUsers()
  await seedProfiles()
  await seedAddresses()

  await seedSuppliers()
  await seedQopnetProducts()
  await seedAnekaBusaProducts()
  await seedArdenaProducts()

  await seedBusinessOrder()

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

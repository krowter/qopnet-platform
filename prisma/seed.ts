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

  await prisma.couriersOnSupplierProducts.deleteMany()

  await prisma.supplier.deleteMany()
  await prisma.supplierProduct.deleteMany()

  await prisma.courier.deleteMany()
  await prisma.courierVehicle.deleteMany()

  await prisma.merchant.deleteMany()
  await prisma.merchantProduct.deleteMany()

  await prisma.financingService.deleteMany()
  await prisma.fundBeneficiary.deleteMany()
  await prisma.fundBenefactor.deleteMany()

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
  data: supplierProducts, // JSON data
  supplier,
}: {
  data: any
  supplier: any
}) {
  const defaultCourier = await prisma.courier.findFirst({
    where: { name: 'Deliveree' },
  })
  // console.info({ defaultCourier })

  // Loop over to put custom field per product
  supplierProducts.forEach(async (product) => {
    product.ownerId = supplier.ownerId
    product.supplierId = supplier.id
    product.couriers = {
      create: { courier: { connect: { id: defaultCourier?.id } } },
    }

    console.info(product.slug)
    await prisma.supplierProduct.create({ data: product })
  })

  // console.info({ message })
}

/* 
  Dynamic environment aware to generate the image url automatically
*/
async function createSupplierProductsDynamic({
  data: supplierProducts, // JSON data
  supplier,
}: {
  data: any
  supplier: any
}) {
  const defaultCourier = await prisma.courier.findFirst({
    where: { name: 'Kurir toko sendiri' },
  })

  // Loop over to put custom field per product
  supplierProducts.forEach(async (product) => {
    product.ownerId = supplier.ownerId
    product.supplierId = supplier.id
    product.couriers = {
      create: { courier: { connect: { id: defaultCourier?.id } } },
    }

    // Image URL example
    // https://abcdefghijklmno.supabase.co/storage/v1/object/public/images/supplier-name/XX-000.jpeg
    if (product.images) {
      product.images = product.images.map(
        (image: string) =>
          `${storageUrl}/storage/v1/object/public/images/${supplier.handle}/${image}`
      )
    }

    console.info(product.slug)
    await prisma.supplierProduct.create({
      data: product,
    })
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

  await seedSuppliers()

  await seedAddresses()

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

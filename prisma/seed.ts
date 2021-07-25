import { PrismaClient } from '@prisma/client'
import axios, { AxiosResponse } from 'axios'
const prisma = new PrismaClient()

async function main() {
  // image url example
  // https://rryitovbrajppywbpmit.supabase.co/storage/v1/object/public/images/anekabusa/AB-001.jpeg

  // get storageUrl
  const storageUrl = process.env.NX_SUPABASE_URL
  const ownerId = 'ckr86vmxt005010pjeh4mqs6n' // qopnetlabs@gmail.com profile.id
  const supplierHandle = 'anekabusa'
  const supplierData = {
    name: 'Aneka Busa (PT. Aneka Busa Indonesia)',
    handle: supplierHandle,
  }

  // create supplier -- aneka busa
  const supplier = await prisma.supplier.upsert({
    where: {
      handle: supplierHandle,
    },
    update: supplierData,
    create: supplierData,
  })

  // remove existing products
  await prisma.supplierProduct.deleteMany({
    where: {
      ownerId,
      supplierId: supplier.id, // new supplier or existing supplier
    },
  })

  // start creating supplierData
  // download data from gist
  let { data: products }: AxiosResponse<any[]> = await axios.get(
    'https://gist.github.com/qopnetlabs/414f0a5e3404e6555165ccc67ff79b60/raw'
  )

  // re-map
  // add ids and update storage url based on environment
  products = products.map((product) => {
    product.ownerId = ownerId
    product.supplierId = supplier.id
    product.images = product.images.map(
      (image: string) =>
        `${storageUrl}/storage/v1/object/public/images/${supplierHandle}/${image}`
    )

    return product
  })

  // create supplierProduct -- aneka busa
  await prisma.supplierProduct.createMany({
    data: products,
    skipDuplicates: true,
  })
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

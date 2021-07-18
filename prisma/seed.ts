import { Prisma, PrismaClient } from '@prisma/client'
import axios, { AxiosResponse } from 'axios'
const prisma = new PrismaClient()

async function main() {
  // image url example
  // https://rryitovbrajppywbpmit.supabase.co/storage/v1/object/public/images/anekabusa-AB-001-2.jpeg
  // get storageUrl
  const storageUrl = process.env.NX_SUPABASE_URL

  const ownerId = 'ckr86vmxt005010pjeh4mqs6n' // qopnetlabs@gmail.com profile.id

  // create supplier -- aneka busa
  const newSupplier = await prisma.supplier.create({
    data: {
      name: 'PT. Aneka Busa Internasional',
      handle: 'anekabusa'
    },
  })

  // download data from gist
  let {
    data: products,
  }: AxiosResponse<any[]> =
    await axios.get(
      'https://gist.githubusercontent.com/hwindo/c5d6dbeadb97048bc696d2bbba659a2b/raw/806e7196f42c520d2121b0dbd19549535e332b39/anekabusa_produst.json'
      
    )

  products = products.map((product) => {
    product.ownerId = ownerId
    product.supplierId = newSupplier.id
    product.images = product.images.map((image: string) => `${storageUrl}/storage/v1/object/public/images/${image}`)

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

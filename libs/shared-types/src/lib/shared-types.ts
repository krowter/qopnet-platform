export type User = {
  id: string
  email: string
  profile: Profile
}

export type Profile = {
  id: string
  handle?: string
  name?: string
  avatarUrl?: string
  phone?: string

  // Relations
  userId: string
  addresses: Address[]

  // Timestamp
  createdAt?: string
  updatedAt?: string
}

export type Address = {
  id: string
  street: string
  streetDetails: string
  city: string
  state: string
  zip: string
  countryCode: string

  // Relations
  profileId?: string
  profile?: Profile
  wholesalerId?: string
  wholesaler?: Wholesaler
  supplierId?: string
  supplier?: Supplier
  merchantId?: string
  merchant?: Merchant

  // Timestamp
  createdAt?: string
  updatedAt?: string
}

export type Wholesaler = {
  id: string
  handle: string
  name: string

  // Relations
  addresses: Address[]
  ownerId: string // Currently the owner should only be Qopnet Admin
  owner: Profile

  // Timestamp
  createdAt?: string
  updatedAt?: string
}

export enum SupplierCategory {
  PRODUCER,
  DISTRIBUTOR,
}

export type Supplier = {
  id: string
  handle?: string // seller.domain ala tokopedia/shopify
  name?: string
  avatarUrl?: string
  nationalTax?: string
  certificationFile?: string
  category?: SupplierCategory

  // Relations
  ownerId: string
  owner: Profile
  addresses: Address[]
  supplierProducts: SupplierProduct[]

  // Timestamp
  createdAt?: string
  updatedAt?: string
}

export type SupplierProduct = {
  id: string
  slug: string
  sku: string
  name: string
  description: string
  imageUrl: string
  price: number
  priceMax: number
  priceMin: number

  // Custom data
  images: Image[]

  // Relations
  supplierId: string
  supplier: Supplier

  // Timestamp
  createdAt?: string
  updatedAt?: string
}

export type Image = {
  id: string
  objectId?: string // object id of image in Supabase Storage
  position?: number // position of image in the images
}

export type Merchant = {
  id: string
  handle?: string
  name?: string
  avatarUrl?: string

  // Relations
  ownerId?: string
  owner?: Profile
  addresses: Address[]
  // Timestamp
  createdAt?: string
  updatedAt?: string
}

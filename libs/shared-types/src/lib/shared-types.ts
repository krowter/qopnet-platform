export type User = {
  id: string
  email: string
  profile: Profile
}

export type Profile = {
  id: string
  address: Address
  avatarUrl: string
  handle: string
  name: string
  phone: string
  userId: string
}

export type Address = {
  id: string
  city: string
  countryCode: string
  state: string
  street: string
  streetDetails: string
  zip: string
}

export type Supplier = {
  id: string
  handle: string
  name: string
  avatarUrl: string
  nationalTax: string
  certificationFile: string
  address: Address
}

export type Merchant = {
  id: string
  handle: string
  name: string
  address: Address
}

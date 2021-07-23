# Data Model

Mostly used temporarily before merged into Prisma.

## User

## Profile

## AdminProfile

## Address

## Wholesaler

## Supplier

## SupplierProduct

## Merchant

## MerchantCart

## MerchantOrder

## MerchantInvoice

## Funder

- `public.funders`
- Yang meminjamkan.

Contoh:

1. Duha Syariah
   - Financing for the purchase of goods, Umrah travel, halal tourism, education, and invoice financing in accordance with Sharia principles.
   - API: https://duhasyariah.id/documentation
2. Amartha

```json
{
  "name": "Duha Syariah",
  "website": "https://duhasyariah.id",
  "phone": "+62 8 1234 5678",
  "beneficiaryRequests": [],
  "fundedMerchants": []
}
```

## FundBeneficiary

- `public.fund_beneficiaries`
- Yang meminjam atau dipinjamkan.
- User already has email
- Profile already has phone and address

```json
{
  "id": "cuid()",
  "nationalId": "12345678901234567890", // KTP
  "birthPlace": "Surakarta",
  "birthDate": "1960-01-01",
  "income": 30240000, // in Rupiah
  "status": "ACCEPTED", // | REJECTED | PENDING
  "merchant": [{ "id": "" }],
  "funder": { "id": "", "name": "Duha Syariah" },
  "benefactors": [{ "id": "", "name": "Duha Syariah" }],
  "profile": { "id": "cuid()", "name": "Joko Widodo" },
  "user": { "id": "cuid()", "email": "jokowi@indonesia.go.id" }
}
```

## FundBenefactor

- `public.fund_benefactors`

---

## Courier

1. Deliveree
2. Lalamove
3. Mas Kargo

## CourierFleet

1. Mobil
2. Van
3. Mobil Box
4. Tronton
5. etc

## CourierSchedule

1. 24 hours
2. 1-2 days

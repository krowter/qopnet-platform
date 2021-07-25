# Data Model

Mostly used temporarily before merged into Prisma.

## User

## Profile

## AdminProfile

---

## Address

## Wholesaler

---

## Supplier

## SupplierProduct

---

## Merchant

## MerchantCart

## MerchantOrder

## MerchantInvoice

---

## FinancingService

The organization which organize the fund.

Examples:

1. Duha Syariah
   - Financing for the purchase of goods, Umrah travel, halal tourism, education, and invoice financing in accordance with Sharia principles.
   - https://duhasyariah.id/documentation
2. ALAMI Sharia Funding
3. Amartha P2P

```json
{
  "name": "Duha Syariah",
  "website": "https://duhasyariah.id",
  "phone": "+62 8 1234 5678",
  "fundBeneficiariesRequests": [],
  "fundBeneficiaries": []
}
```

## FundBeneficiary

People who receive the fund. This acts as the information details for the prospective people from merchants.

```json
{
  "nationalId": "12345678901234567890", // KTP
  "birthPlace": "Surakarta",
  "birthDate": "1960-01-01",
  "income": 30240000, // in Rupiah
  "status": "ACCEPTED", // PENDING | ACCEPTED | REJECTED
  "merchant": [{ "id": "" }],
  "funder": { "id": "", "name": "Duha Syariah" },
  "benefactors": [{ "id": "", "name": "Duha Syariah" }],
  "profile": { "id": "cuid()", "name": "Joko Widodo" },
  "user": { "id": "cuid()", "email": "jokowi@indonesia.go.id" }
}
```

## FundBenefactor

People who fund the money to financing services. Qopnet might not know these data.

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

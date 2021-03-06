# Qopnet API Specification

The Qopnet API spec/schema is mostly defined using Postman API collection for now at [qopnet.postman.co](https://qopnet.postman.co). It is based on the diagrams of [Qopnet System on Whimsical](https://whimsical.com/qopnet-system-BAkpdmuWFtp9gubFHGbCjf).

Documentaion on Postman:

- https://documenter.getpostman.com/view/16425870/TzefB4GG
- https://qopnet.postman.co

Base URL:

```sh
# development
http://localhost:4000

# staging
https://api-staging.qopnet.id

# production
https://api.qopnet.id
```

## /

## /api

## /auth

### /auth/signup

### /auth/signin

### /auth/signout

## /api/users

## /api/profiles

| Method | Endpoint         |
| ------ | ---------------- |
| `GET`  | /api/profiles    |
| `GET`  | /api/profiles/my |

## /api/suppliers

| Method   | Endpoint                      |
| -------- | ----------------------------- |
| `GET`    | /api/suppliers                |
| `GET`    | /api/suppliers/:supplierParam |
| `POST`   | /api/suppliers                |
| `PUT`    | /api/suppliers/:supplierParam |
| `DELETE` | /api/suppliers/:supplierParam |

## /api/suppliers/products

## /api/financing

## /api/business/orders

### Admin

| Method   | Endpoint                                 |
| -------- | ---------------------------------------- |
| `GET`    | /api/business/orders                     |
| `GET`    | /api/business/orders/:businessOrderParam |
| `POST`   | /api/business/orders                     |
| `PUT`    | /api/business/orders/:businessOrderParam |
| `DELETE` | /api/business/orders                     |
| `DELETE` | /api/business/orders/:businessOrderParam |

### User

| Label | Method | Endpoint                     | Description                                 |
| ----- | ------ | ---------------------------- | ------------------------------------------- |
| A     | `GET`  | /api/business/orders/my      | Get my all business orders                  |
| B     | `GET`  | /api/business/orders/my/cart | Get my cart or draft business order         |
| C     | `POST` | /api/business/orders/my/cart | Create my cart of draft business order      |
| D     | `PUT`  | /api/business/orders/my/cart | Update my cart with one business order item |

Rules:

1. Get my all business orders (A) is always available.
2. If my cart (B) is not exist, create my cart first (C).
3. If my cart (B) exist, update my cart with one business order item (D).
   - (D) Should check if existing business order item already exist.
   - If exist, increment quantity only.
   - If not exist, append new record.
4. Update my cart (D) can automatically create my cart if it is not exist.
   - This can bypass rule (2)
5. Delete my cart is not available, only able to clear the items.

---

## Permata VA Service

### Staging API: https://api-staging.qopnet.id

- GetBill https://api-staging.qopnet.id/api/payments/va/permata/getbill
- PayBill https://api-staging.qopnet.id/api/payments/va/permata/paybill
- RevBill https://api-staging.qopnet.id/api/payments/va/permata/revbill

### Production API: https://api.qopnet.id

- GetBill https://api.qopnet.id/api/payments/va/permata/getbill
- PayBill https://api.qopnet.id/api/payments/va/permata/paybill
- RevBill https://api.qopnet.id/api/payments/va/permata/revbill

### Frontend UI: https://qopnet.id

- https://qopnet.id/cart/payment Where there will be Permata VA option
- https://qopnet.id/dashboard/orders Where the Virtual Account number will generated and appear

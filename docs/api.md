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

## /api/suppliers

| Method | Endpoint                      |
| ------ | ----------------------------- |
| GET    | /api/suppliers                |
| GET    | /api/suppliers/:supplierParam |
| POST   | /api/suppliers                |
| PUT    | /api/suppliers/:supplierParam |
| DELETE | /api/suppliers/:supplierParam |

## /api/suppliers/products

## /api/financing

## /api/business/orders

| Method | Endpoint                              |
| ------ | ------------------------------------- |
| GET    | /api/business/orders                  |
| GET    | /api/business/orders/:businessOrderId |
| POST   | /api/business/orders                  |
| PUT    | /api/business/orders/:businessOrderId |
| DELETE | /api/business/orders                  |
| DELETE | /api/business/orders/:businessOrderId |

## /api/profiles | orders

| Method | Endpoint                                 |
| ------ | ---------------------------------------- |
| GET    | /api/profiles/:profileParam/orders/draft |
| GET    | /api/profiles/:profileParam/orders       |

1. If DRAFT Order is not empty, then get the `businessOrder` data.
2. If DRAFT Order is empty, then backend create new `BusinessOrder` automatically, then get the `businessOrder` data.
   - The logic is the same with `POST /api/business/orders`.

```http
GET /api/profiles/:profileParam/orders/draft
{
  businessOrder: {
    id: "",
    ownerId: "",
    owner: {}
  }
}
```

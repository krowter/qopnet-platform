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
| GET    | /api/profiles    |
| GET    | /api/profiles/my |

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

### General

| Method | Endpoint                              |
| ------ | ------------------------------------- |
| GET    | /api/business/orders                  |
| GET    | /api/business/orders/:businessOrderId |
| POST   | /api/business/orders                  |
| PUT    | /api/business/orders/:businessOrderId |
| DELETE | /api/business/orders                  |
| DELETE | /api/business/orders/:businessOrderId |

### Profile

| Method | Endpoint                     | Description                        |
| ------ | ---------------------------- | ---------------------------------- |
| GET    | /api/business/orders/my      | Get my all business orders         |
| GET    | /api/business/orders/my/cart | Get my draft business order (cart) |
| POST   | /api/business/orders/my      | Create my business order (cart)    |

1. If my cart is not exist, create my cart first.
2. If my cart exist, update my cart with one business order item.
   - Should check if existing business order item already exist
   - If exist, increment quantity only.
   - If not exist, append new record.

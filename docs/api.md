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

## /api/business-orders

| Method | Endpoint                              |
| ------ | ------------------------------------- |
| GET    | /api/business/orders                  |
| GET    | /api/business/orders/:userParam       |
| GET    | /api/business/orders/:supplierParam   |
| GET    | /api/business/orders/:merchantparam   |
| POST   | /api/business/orders                  |
| PUT    | /api/business/orders/:businessOrderId |
| DELETE | /api/business/orders                  |
| DELETE | /api/business/orders/:businessOrderId |

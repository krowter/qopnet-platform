# Qopnet API Specification

The Qopnet API spec/schema will be defined using Postman collection or Swagger.
These all based on the diagrams of Qopnet System on Whimsical.

Base URL:

```
http://localhost:4000
https://staging-api.qopnet.id
https://production-api.qopnet.id
```

Spec format:

```md
## /api/endpoint

The `DataModel` description.
```




---
# USERS 
## /api/users

All `User` data.

Can be created for:

- `Wholesaler`
- `Supplier`
- `Merchant`
- `Logistic`
- `Customer`

### /api/users/:id
One `User` data.
should return User data with its `admin-profile` and `profile` if exist

## /api/users/:id/admin-profile
return only user's admin profile for public usage

One `Admin-Profile` is owned by one `User`.

## /api/users/:id/profile
return only user's profile for public usage

One `Profile` is owned by one `User`.

## Queries

| query | example                       |
|-------| ------------------------------|
| role  | `/api/users?role=admin`       |
| page  | `/api/users?page=1`           |

---
# SUPPLIERS

## /api/suppliers

All `Supplier` data
### /api/suppliers/:id

One `Supplier` data with all their `Addresses`

### /api/suppliers/:id/products

All `SupplierProduct` data.

### /api/suppliers/:id/products/:id

One `SupplierProduct` sold by the `Supplier` only.

For example:

- Sugar 100kg
- Egg 10kg

### /api/suppliers/:id/orders

All `SupplierMerchantOrder` data.

### /api/suppliers/:id/orders/:id

One `SupplierMerchantOrder` data

## Queries
| query         | example                                               |
|---------------|-------------------------------------------------------|
| category      | `/api/suppliers?category=factory`                     |
| page          | `/api/suppliers?page=1`                               |
| Product Status| `/api/suppliers/:id/orders?status=instock`            |
| Order Status  | `/api/suppliers/:id/orders?status=pending`            |

---
# MERCHANTS
A merchant has many `MerchantOrders`, one `MerchantCarts`, many `Addresses`
## /api/merchants

All `Merchant` data.

### /api/merchants/:id

One `Merchant` data with all their `Addresses`
### /api/merchants/:id/carts

All `MerchantCart` data.

### /api/merchants/:id/carts/:id

One `MerchantCart` used by `Merchant` when shopping for the products sold by `Supplier`.
One `MerchantCart` contain relation to `SupplierProduct` table


### /api/merchants/:id/orders/

All `MerchantOrders` data

### /api/merchants/:id/orders/:id

One `MerchantOrders` data, with their `Logistics` data

## Queries
| query         | example                                               |
|---------------|-------------------------------------------------------|
| category      | `/api/merchants?category=retail`                      |
| page          | `/api/merchants?page=1`                               |
| Order Status  | `/api/merchants/:id/orders?status=pending`            |


### /api/merchants/:id/products (TBD)

All `MerchantProduct` data.

### /api/merchants/:id/products/:id (TBD)

One `MerchantProduct` sold by the `Merchant` only.

For example:

- Fried Rice
- Fried Noodle
- Bread
- Cake
- Tea
- Hot Coffee
- Ice Coffee

---
# WHOLESALER
## /api/wholesalers

All `Wholesalers` data.

## /api/wholesalers/:id

One `Wholesalers` data with all `Addresses` data

## /api/wholesalers/:id/orders
All `SupplierMerchantOrder` data
Wholesalers can see and do CRUD for all orders happened in B2B
## Queries
| query         | example                                               |
|---------------|-------------------------------------------------------|
| Order page    | `/api/wholealers/:id/orders?page=1`                   |
| Order Status  | `/api/wholealers/:id/orders?status=pending`           |


---
# LOGISTICS
## /api/logistics

All `Logistic` data.

## /api/logistics/:id

One `Logistic` data.

---
# CUSTOMERS (TBD)
## /api/customers

All `Customer` data.

### /api/customers/:id

One `Customer` data.

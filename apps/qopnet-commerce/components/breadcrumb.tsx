import NextLink from 'next/link'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Link as ChakraLink,
  Text,
} from '@chakra-ui/react'

import { Icon } from '@qopnet/qopnet-ui'

export const BreadcrumbCart = () => {
  return (
    <Breadcrumb separator={<Icon name="chevron-right" />}>
      <BreadcrumbItem>
        <BreadcrumbLink as={NextLink} href="/cart" passHref>
          <ChakraLink>Cart</ChakraLink>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink as={NextLink} href="/cart/shipment" passHref>
          <ChakraLink>Shipment</ChakraLink>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink as={NextLink} href="/cart/payment" passHref>
          <ChakraLink>Payment</ChakraLink>
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  )
}

export const BreadcrumbOrders = () => {
  return (
    <Breadcrumb separator={<Icon name="chevron-right" />}>
      <BreadcrumbItem>
        <BreadcrumbLink as={NextLink} href="/dashboard" passHref>
          <ChakraLink>Dashboard</ChakraLink>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink as={NextLink} href="/dashboard/orders" passHref>
          <ChakraLink>Semua Pesanan</ChakraLink>
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  )
}

export const BreadcrumbOrder = ({ businessOrderParam }) => {
  return (
    <Breadcrumb separator={<Icon name="chevron-right" />}>
      <BreadcrumbItem>
        <BreadcrumbLink as={NextLink} href="/dashboard" passHref>
          <ChakraLink>Dashboard</ChakraLink>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink as={NextLink} href="/dashboard/orders" passHref>
          <ChakraLink>Semua Pesanan</ChakraLink>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink
          as={NextLink}
          href={`/dashboard/orders/${businessOrderParam}`}
          passHref
        >
          <ChakraLink>{businessOrderParam}</ChakraLink>
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  )
}

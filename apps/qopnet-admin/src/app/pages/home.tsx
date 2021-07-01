import { Link } from 'react-router-dom'
import {
  Box,
  Heading,
  SimpleGrid,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Button,
  useColorModeValue,
} from '@chakra-ui/react'

import { DefaultLayout } from '../layouts'

export const Home = () => {
  return (
    <DefaultLayout>
      <HomeLayout>
        <Stack id="home-intro">
          <Heading as="h1" size="xl">
            Qopnet Admin
          </Heading>
          <p>Manage business operation and database</p>
        </Stack>

        <Stack id="home-business" spacing={5}>
          <Heading as="h2" size="lg">
            Business
          </Heading>
          <SimpleGrid columns={2} spacing={5} minChildWidth="350px">
            <DashboardCard
              withHelpText
              name="Commerce Volume"
              amount={360}
              to="/volume"
            />
            <DashboardCard
              withHelpText
              name="Balance"
              amountPrefix="Rp "
              amount={320500000}
              to="/balance"
            />
          </SimpleGrid>
        </Stack>

        <Stack id="home-database">
          <Heading as="h2" size="lg">
            Database
          </Heading>
          <SimpleGrid columns={2} spacing={5} minChildWidth="300px">
            <DashboardCard name="Name" amount={123} to="/" />
            <DashboardCard name="Name" amount={123} to="/" />
            <DashboardCard name="Name" amount={123} to="/" />
          </SimpleGrid>
        </Stack>
      </HomeLayout>
    </DefaultLayout>
  )
}

export const HomeLayout = ({ children }: { children: JSX.Element[] }) => {
  return (
    <Stack
      id="home-layout"
      px={10}
      py={5}
      spacing={10}
      color={useColorModeValue('orange.900', 'orange.100')}
    >
      {children}
    </Stack>
  )
}

export const DashboardCard = ({
  name,
  amountPrefix,
  amount,
  to,
  withHelpText = false,
  children,
}: {
  name: string
  amountPrefix?: string
  amount: number | 0
  to: string
  withHelpText?: boolean
  children?: JSX.Element | JSX.Element[]
}) => {
  return (
    <Box
      p={5}
      boxShadow="xs"
      rounded="base"
      bg={useColorModeValue('gray.50', 'gray.900')}
    >
      <Stat as={Stack} mb={5}>
        <StatLabel as={Heading} size="md">
          {name}
        </StatLabel>
        <StatNumber as={Heading} size="xl">
          {amountPrefix}
          {Number(amount).toLocaleString()}
        </StatNumber>
        {withHelpText && <StatHelpText>1 Jan 2021 - 1 July 2021</StatHelpText>}
      </Stat>
      <Button as={Link} to={to} size="sm" colorScheme="orange">
        Manage
      </Button>
    </Box>
  )
}

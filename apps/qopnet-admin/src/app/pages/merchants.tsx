import {
  Box,
  Flex,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react'
import useSWR from 'swr'

import { DefaultLayout } from '../layouts'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

type Address = {
  city: string
  countryCode: string
  state: string
  street: string
  streetDetails: string
  zip: string
}

type Merchant = {
  handle: string
  name: string
  address: Address
}

export const Merchants = () => {
  const { data, error } = useSWR('/api/merchants', fetcher)
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading ...</div>
  return (
    <DefaultLayout>
      <Box p={5}>
        <Flex alignItems="center">
          <Box h={5} w={5} borderRadius={20} bg="#4C2602" />
          <Text ml={5} fontWeight={700}>
            All merchants
          </Text>
          <Text ml={5} fontWeight={500}>
            {data.length} merchants
          </Text>
          <Box ml="auto" h={5} w={5} borderRadius={20} bg="#4C2602" />
        </Flex>
        <VStack id="merchants-all" mt={5} spacing={10}>
          <Table variant="simple" size="sm">
            <Tbody>
              {data.map((item: Merchant, index: number) => {
                //generates a random color -> #56eec7
                const randomColor =
                  '#' + Math.floor(Math.random() * 16777215).toString(16)
                return (
                  <Tr key={`${item?.name ?? ''}-${index}`}>
                    <Td>#{index}</Td>
                    <Td>
                      <Box
                        w={5}
                        h={5}
                        bgColor={randomColor}
                        borderRadius={20}
                      />
                    </Td>
                    <Td>{item?.handle}</Td>
                    <Td>{item?.name}</Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        </VStack>
      </Box>
    </DefaultLayout>
  )
}

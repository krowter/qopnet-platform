import { Link } from 'react-router-dom'
import { Link as ChakraLink, Heading, VStack } from '@chakra-ui/react'

import { BlankLayout } from '../layouts'

export const NotFound = () => {
  return (
    <BlankLayout>
      <VStack id="not-found-container" mt={20} spacing={10}>
        <Heading as="h1" size="xl">
          Page Not Found
        </Heading>
        <ChakraLink as={Link} to="/" color="orange.500">
          Back to Home
        </ChakraLink>
      </VStack>
    </BlankLayout>
  )
}

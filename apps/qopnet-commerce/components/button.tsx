import NextLink from 'next/link'
import { Button } from '@chakra-ui/react'

export const NextLinkButton = (props) => {
  const { href, children } = props

  return (
    <NextLink href={href} passHref>
      <Button as="a" {...props}>
        {children}
      </Button>
    </NextLink>
  )
}

export default NextLinkButton

import NextLink from 'next/link'
import { Button } from '@chakra-ui/react'

export interface NextLinkButtonProps {
  href: string | ''
  children: string | JSX.Element | JSX.Element[]
  colorScheme: string
}

export function NextLinkButton(props: NextLinkButtonProps) {
  return (
    <NextLink passHref href={props.href}>
      <Button as="a" {...props}>
        {props.children}
      </Button>
    </NextLink>
  )
}

export default NextLinkButton

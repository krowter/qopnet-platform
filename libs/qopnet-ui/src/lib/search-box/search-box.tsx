import { chakra, InputGroup, Input, InputLeftElement } from '@chakra-ui/react'

import { Icon } from '@qopnet/qopnet-ui'

export interface SearchBoxProps {
  placeholder: string
}

export function SearchBox(props: SearchBoxProps) {
  const handleSearch = () => {
    console.log('Searching {keyword}')
  }

  return (
    <chakra.form onSubmit={handleSearch} width="100%" maxWidth="500px">
      <InputGroup size="sm" maxWidth="500px">
        <InputLeftElement>
          <Icon name="search" />
        </InputLeftElement>
        <Input type="text" placeholder={props.placeholder} />
      </InputGroup>
    </chakra.form>
  )
}

export default SearchBox

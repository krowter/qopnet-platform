import { chakra, InputGroup, Input, InputLeftElement } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

import { Icon } from '@qopnet/qopnet-ui'

export type DataItem = {
  name: string
}

export interface SearchBoxProps {
  placeholder: string
  dataToFilter: DataItem[]
}

export function SearchBox(props: SearchBoxProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const handleSearch = (data: { keyword?: string }) => {
    console.log({
      data: {
        keyword: data?.keyword,
      },
    })
    console.log({
      dataToFilter: props.dataToFilter,
    })
    console.log({
      message: `Searching ${data.keyword}...`,
    })
  }

  return (
    <chakra.form
      onSubmit={handleSubmit(handleSearch)}
      width="100%"
      maxWidth="500px"
    >
      <InputGroup size="sm" maxWidth="500px">
        <InputLeftElement>
          <Icon name="search" />
        </InputLeftElement>
        <Input
          type="text"
          placeholder={props.placeholder}
          {...register('keyword', { required: true })}
        />
        {errors.keyword && <span>{errors.message}</span>}
      </InputGroup>
    </chakra.form>
  )
}

export default SearchBox

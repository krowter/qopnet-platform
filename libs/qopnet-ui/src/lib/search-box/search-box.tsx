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

export interface SearchKeywordParams {
  dataToFilter: DataItem[]
  keyword: string | undefined
}

export function SearchBox(props: SearchBoxProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  // For React Hook Form handleSubmit
  const handleSearch = (data: { keyword?: string | undefined }) => {
    searchDataByKeyword({
      dataToFilter: props?.dataToFilter,
      keyword: data?.keyword,
    })
  }

  // For now it's only a filter on the frontend
  // Later on it can be improved to be a request to the backend
  const searchDataByKeyword = (params: SearchKeywordParams) => {
    console.log({ params })
    // return foundData
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

import { chakra, InputGroup, Input, InputLeftElement } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

import { Icon } from '@qopnet/qopnet-ui'

export type DataItem = {
  name: string
}

export interface SearchBoxProps {
  placeholder: string
  dataToFilter: DataItem[]
  setFilteredData?: () => void
}

export interface SearchKeywordParams {
  dataToFilter: DataItem[]
  keyword: string
}

export function SearchBox(props: SearchBoxProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  // For React Hook Form handleSubmit
  const handleSearch = (data: { keyword: string }) => {
    const formData = {
      dataToFilter: props?.dataToFilter,
      keyword: data?.keyword,
    }
    searchDataByKeyword(formData)
  }

  // For now it's only a filter on the frontend
  // Later on it can be improved to be a request to the backend
  const searchDataByKeyword = (params: SearchKeywordParams) => {
    const filteredData = params.dataToFilter.filter((item, index) => {
      return item.name.toLowerCase().includes(params.keyword.toLowerCase())
    })
    console.log({ filteredData })

    // props.setFilteredData(filteredData)
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

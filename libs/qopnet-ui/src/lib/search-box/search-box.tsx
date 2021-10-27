import styled from '@emotion/styled'

/* eslint-disable-next-line */
export interface SearchBoxProps {}

const StyledSearchBox = styled.div`
  color: black;
`

export function SearchBox(props: SearchBoxProps) {
  return (
    <StyledSearchBox>
      <h1>Search Box</h1>
    </StyledSearchBox>
  )
}

export default SearchBox

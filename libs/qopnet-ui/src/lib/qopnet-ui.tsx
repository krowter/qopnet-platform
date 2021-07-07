import styled from '@emotion/styled'

/* eslint-disable-next-line */
export interface QopnetUiProps {}

const StyledQopnetUi = styled.div`
  color: pink;
`

export function QopnetUi(props: QopnetUiProps) {
  return (
    <StyledQopnetUi>
      <h1>Welcome to qopnet-ui!</h1>
    </StyledQopnetUi>
  )
}

export default QopnetUi

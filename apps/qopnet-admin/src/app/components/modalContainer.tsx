import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  CloseButton,
} from '@chakra-ui/react'

type Props = {
  children?: JSX.Element | JSX.Element[]
  title: string
  open: boolean
  size: string
  onClose: () => void
}

export const ModalContainer: React.FC<Props> = (props) => {
  return (
    <Modal onClose={props.onClose} size={props.size} isOpen={props.open}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{props.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {props.children}
          {/* <Lorem count={2} /> */}
        </ModalBody>
        {/* <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter> */}
      </ModalContent>
    </Modal>
  )
}

import { Button, HStack } from '@chakra-ui/react'
import { Link, useRouteMatch } from 'react-router-dom'

export const ModifierButtons = ({
  supplierParam,
  productParam,
  editRoute,
}: {
  supplierParam?: string
  productParam?: string
  editRoute?: string
}) => {
  return (
    <HStack ml="auto">
      <Button
        variant="outline"
        size="xs"
        colorScheme="orange.900"
        type="submit"
      >
        Simpan
      </Button>
      <Button variant="outline" size="xs" colorScheme="orange.900">
        Batal
      </Button>
      <Button
        as={Link}
        to={editRoute || ''}
        variant="outline"
        size="xs"
        colorScheme="orange.900"
      >
        Ubah
      </Button>
      <Button variant="outline" size="xs" colorScheme="orange.900">
        Hapus
      </Button>
    </HStack>
  )
}

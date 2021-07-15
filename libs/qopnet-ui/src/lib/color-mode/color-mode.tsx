import { IconButton, useColorMode } from '@chakra-ui/react'

import { Icon } from '../icon/icon'

export interface ToggleColorModeButton {
  size?: string
  rounded?: string
}

export const ToggleColorModeButton = (props: ToggleColorModeButton) => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <IconButton
      aria-label="Change color mode"
      variant="ghost"
      onClick={toggleColorMode}
      {...props}
    >
      {colorMode === 'light' ? <Icon name="moon" /> : <Icon name="sun" />}
    </IconButton>
  )
}

export default ToggleColorModeButton

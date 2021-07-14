// 1. Import `extendTheme` function
import { extendTheme, ThemeConfig } from '@chakra-ui/react'

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

// 3. Extend the theme
const theme = extendTheme({ config })

export default theme

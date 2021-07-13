import {
  FaCircle as CircleIcon,
  FaMoon as MoonIcon, // Light Icon
  FaSun as SunIcon, // Dark Icon
  FaSearch as SearchIcon,
} from 'react-icons/fa'

export interface IconProps {
  name: string | ''
}

export const Icon = (props: IconProps) => {
  switch (props.name) {
    /**
     * General icons
     */
    case 'circle':
      return <CircleIcon />
    case 'sun':
      return <SunIcon />
    case 'moon':
      return <MoonIcon />
    case 'search':
      return <SearchIcon />

    /**
     * When nothing found
     */
    default:
      return <CircleIcon />
  }
}

export default Icon

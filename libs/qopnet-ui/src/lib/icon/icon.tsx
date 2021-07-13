import {
  FaCircle as Circle,
  FaMoon as Moon, // Light Icon
  FaSun as Sun, // Dark Icon
  FaSearch as Search,
  FaShoppingCart as Cart,
  FaSignOutAlt as SignOut,

  // Category
  FaBoxes as All,
  FaCertificate as New,
  FaMoneyBillAlt as Cheap,
  FaDoorOpen as Saving,
  FaLemon as Fruit,
  FaCarrot as Vegetable,
  FaPercentage as Promo,
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
      return <Circle />
    case 'sun':
      return <Sun />
    case 'moon':
      return <Moon />
    case 'search':
      return <Search />
    case 'cart':
      return <Cart />
    case 'signout':
      return <SignOut />

    /**
     * Category
     */
    case 'all':
      return <All />
    case 'new':
      return <New />
    case 'fruit':
      return <Fruit />
    case 'vegetable':
      return <Vegetable />
    case 'cheap':
      return <Cheap />
    case 'saving':
      return <Saving />
    case 'promo':
      return <Promo />

    /**
     * When nothing found
     */
    default:
      return <Circle />
  }
}

export default Icon

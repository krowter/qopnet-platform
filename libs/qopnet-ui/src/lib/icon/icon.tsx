import {
  FaCircle as Circle,
  FaMoon as Moon, // Light Icon
  FaSun as Sun, // Dark Icon
  FaSearch as Search,
  FaShoppingCart as Cart,
  FaSignOutAlt as SignOut,
  FaPlus as Increment,
  FaMinus as Decrement,
  FaHome as Home,
  FaUser as Users,
  FaIdBadge as Profiles,
  FaBuilding as Supplier,
  FaRegBuilding as Suppliers,
  FaCarrot as SuppliersProducts,
  FaEye as Show,
  FaEyeSlash as Hide,

  // Category
  FaBoxes as All,
  FaCertificate as New,
  FaMoneyBillAlt as Cheap,
  FaDoorOpen as Saving,
  FaLemon as Fruit,
  FaCarrot as Vegetable,
  FaPercentage as Promo,
} from 'react-icons/fa'
import { FiMenu as Menu } from 'react-icons/fi'

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
    case 'increment':
      return <Increment />
    case 'decrement':
      return <Decrement />
    case 'home':
      return <Home />
    case 'users':
      return <Users />
    case 'profiles':
      return <Profiles />
    case 'supplier':
      return <Supplier />
    case 'suppliers':
      return <Suppliers />
    case 'suppliers-products':
      return <SuppliersProducts />
    case 'menu':
      return <Menu />
    case 'show':
      return <Show />
    case 'hide':
      return <Hide />

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

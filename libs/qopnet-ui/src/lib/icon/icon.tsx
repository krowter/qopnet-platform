import {
  FaCircle as Circle,
  FaMoon as Moon, // Light Icon
  FaSun as Sun, // Dark Icon
  FaSearch as Search,
  FaShoppingCart as Cart,
  FaSignOutAlt as SignOut,
  FaPlus as Plus,
  FaMinus as Minus,
  FaHome as Home,
  FaUser as Users,
  FaIdBadge as Profile,
  FaBuilding as Supplier,
  FaCarrot as SupplierProduct,
  FaEye as Show,
  FaEyeSlash as Hide,
  FaWalking as Shop,
  FaCubes as Category,
  FaSortNumericDown as SKU,

  // Form
  FaSmile as Name,
  FaIdBadge as Handle,
  FaPhone as Phone,

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
    case 'plus':
      return <Plus />
    case 'minus':
      return <Minus />
    case 'home':
      return <Home />
    case 'users':
      return <Users />
    case 'profiles':
      return <Profile />
    case 'profile':
      return <Profile />
    case 'suppliers':
      return <Supplier />
    case 'supplier':
      return <Supplier />
    case 'suppliers-products':
      return <SupplierProduct />
    case 'supplier-product':
      return <SupplierProduct />
    case 'menu':
      return <Menu />
    case 'show':
      return <Show />
    case 'hide':
      return <Hide />
    case 'shop':
      return <Shop />
    case 'category':
      return <Category />
    case 'sku':
      return <SKU />

    /**
     * Form
     */
    case 'name':
      return <Name />
    case 'handle':
      return <Handle />
    case 'phone':
      return <Phone />

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

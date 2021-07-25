import {
  FaBold as SubName,
  FaBoxes as All,
  FaBuilding as Supplier,
  FaCarrot as SupplierProduct,
  FaCarrot as Vegetable,
  FaCertificate as New,
  FaCircle as Circle,
  FaCubes as Category,
  FaDoorOpen as Saving,
  FaEye as Show,
  FaEyeSlash as Hide,
  FaFont as Name,
  FaHome as Home,
  FaIdBadge as Handle,
  FaIdBadge as Profile,
  FaLemon as Fruit,
  FaMinus as Minus,
  FaMoneyBillAlt as Cheap,
  FaMoon as Moon, // Light Icon
  FaPercentage as Promo,
  FaPhone as Phone,
  FaPlus as Plus,
  FaSearch as Search,
  FaShoppingCart as Cart,
  FaSignOutAlt as SignOut,
  FaSortNumericDown as SKU,
  FaSun as Sun, // Dark Icon
  FaUser as Users,
  FaWalking as Shop,
  FaLeaf as Organic,
  FaEgg as Dairy,
  FaBaby as Baby,
  FaMoneyBill as Price,
  FaSort as Order,
  FaMoneyBillWave as Finance,
} from 'react-icons/fa'
import { FiMenu as Menu } from 'react-icons/fi'
import { MdFreeBreakfast as Breakfast } from 'react-icons/md'
import {
  GiSlicedBread as Carb,
  GiChickenLeg as Protein,
  GiChipsBag as Snack,
  GiSquareBottle as Spice,
} from 'react-icons/gi'

export interface IconProps {
  name: string | ''
}

export const Icon = (props: IconProps) => {
  switch (props.name) {
    /**
     * General icons
     */
    case 'all':
      return <All />
    case 'cart':
      return <Cart />
    case 'category':
      return <Category />
    case 'cheap':
      return <Cheap />
    case 'circle':
      return <Circle />
    case 'fruit':
      return <Fruit />
    case 'handle':
      return <Handle />
    case 'hide':
      return <Hide />
    case 'home':
      return <Home />
    case 'menu':
      return <Menu />
    case 'minus':
      return <Minus />
    case 'moon':
      return <Moon />
    case 'name':
      return <Name />
    case 'new':
      return <New />
    case 'phone':
      return <Phone />
    case 'plus':
      return <Plus />
    case 'profile':
      return <Profile />
    case 'profiles':
      return <Profile />
    case 'promo':
      return <Promo />
    case 'saving':
      return <Saving />
    case 'search':
      return <Search />
    case 'shop':
      return <Shop />
    case 'show':
      return <Show />
    case 'signout':
      return <SignOut />
    case 'sku':
      return <SKU />
    case 'subname':
      return <SubName />
    case 'sun':
      return <Sun />
    case 'supplier-product':
      return <SupplierProduct />
    case 'supplier':
      return <Supplier />
    case 'suppliers-products':
      return <SupplierProduct />
    case 'suppliers':
      return <Supplier />
    case 'users':
      return <Users />
    case 'vegetable':
      return <Vegetable />
    case 'organic':
      return <Organic />
    case 'breakfast':
      return <Breakfast />
    case 'carb':
      return <Carb />
    case 'protein':
      return <Protein />
    case 'dairy':
      return <Dairy />
    case 'baby':
      return <Baby />
    case 'snack':
      return <Snack />
    case 'spice':
      return <Spice />
    case 'price':
      return <Price />
    case 'order':
      return <Order />
    case 'finance':
      return <Finance />

    /**
     * When nothing found
     */
    default:
      return <Circle />
  }
}

export default Icon

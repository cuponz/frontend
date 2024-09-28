import { CiShoppingCart } from "react-icons/ci";

const ShoppingCartIcon = () => {
  return (
    <div className="group relative p-2 flex items-center justify-center">
      <CiShoppingCart className="text-3xl" />
      <span className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-gray-900 transition-all duration-300"></span>
    </div>
  );
};

export default ShoppingCartIcon;

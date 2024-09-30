import { CiUser } from "react-icons/ci";

const ShopOwnerInfo = () => {
  return (
    <div className="container mx-auto  justify-center">
      <div className="grid grid-cols-[auto_1fr] sm:gap-5 items-center p-6  gap-0">
        <div className="w-24 h-24">
          {/* svg delete */}
          <CiUser className="text-8xl m-2 " style={{ color: "#46467A" }} />
        </div>
        <div className="ml-6">
          <h2 className="sm:text-2xl font-medium text-gray-900 text-lg">
            GadgetHub
          </h2>
          <p className="sm:text-xl text-gray-500 text-sm">
            myemailorphone@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShopOwnerInfo;

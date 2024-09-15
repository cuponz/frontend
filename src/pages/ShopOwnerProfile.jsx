import Navbar from "../components/navbar";
import ShopOwnerInfo from "../components/ShopOwnerInfo";
import ShopCoupon from "../components/ShopProfileCoupon";

function App() {
  return (
    <div>
      <Navbar />
      <div className="pt-16 sm:px-6 container">
        <ShopOwnerInfo />
        <ShopCoupon />
      </div>
    </div>
  );
}

export default App;

import Navbar from "../components/navbar";
import ShopOwnerInfo from "../components/ShopOwnerInfo";
import MiniNav from "../components/ShopOwnerMiniNav";

function App() {
  return (
    <div>
      <Navbar />
      <div className="pt-16 sm:px-6 ">
        <ShopOwnerInfo />
        <MiniNav />
      </div>
    </div>
  );
}

export default App;

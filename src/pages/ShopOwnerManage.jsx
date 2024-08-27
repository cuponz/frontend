import Navbar from "../components/navbar";
import ShopOwnerInfo from "../components/ShopOwnerInfo";

function App() {
  return (
    <div>
      <Navbar />
      <div className="pt-16 p-6">
        <ShopOwnerInfo />
      </div>
    </div>
  );
}

export default App;

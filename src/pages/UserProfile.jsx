import Navbar from "../components/navbar";
import UserInfo from "../components/UserInfo";
import MiniNav from "../components/UserProfileMiniNav";

function App() {
  return (
    <div>
      <Navbar />
      <div className="pt-16 sm:px-6 ">
        <UserInfo />
        <MiniNav />
      </div>
    </div>
  );
}

export default App;

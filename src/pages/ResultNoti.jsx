import Navbar from "../components/navbar";
// import PopupSuccess from "../components/PopupSuccess";
import PopupFail from "../components/PopupFail";

function App() {
  return (
    <div>
      <Navbar />
      <div className="pt-16 sm:px-6 ">
        {/* <PopupSuccess /> */}
        <PopupFail errorType="expired" couponId={1} />
      </div>
    </div>
  );
}

export default App;

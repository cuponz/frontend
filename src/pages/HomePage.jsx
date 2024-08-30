import Navbar from "../components/Navbar";
import Footer from "../components/footer";

function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">{/* Your main content goes here */}</main>
        <Footer />
      </div>
    </>
  );
}
export default App;

import Navbar from "../components/Core/Navbar";
import Footer from "../components/Core/Footer";
import { ToastContainer } from "react-toastify";

const Layout = ({ children }) => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <ToastContainer />
      </div>
    </>
  );
};

export default Layout;

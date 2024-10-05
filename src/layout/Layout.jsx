import Navbar from "@/components/Core/Navbar";
import Footer from "@/components/Core/Footer";
import { Toaster } from "sonner";

const Layout = ({ children }) => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Toaster closeButton richColors position="bottom-right" />
      </div>
    </>
  );
};

export default Layout;

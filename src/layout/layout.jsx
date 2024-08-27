import Navbar from "../components/Navbar";
const Layout = ({ children }) => {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <main>{children}</main>
    </>
  );
};

export default Layout;

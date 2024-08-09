import { Link } from "react-router-dom";
import Footer from "../components/footer";

export default function ErrorPage() {
  return (
    <>
      <div className='flex flex-col gap-2'>
        '404 Not Found'
        <Link to="/">Home</Link>
        <Footer/>
      </div>
    </>
  );
}

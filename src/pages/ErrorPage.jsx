import { Link } from "react-router-dom";
import Layout from "@/layout/Layout";

export default function ErrorPage() {
  return (
    <>
      <Layout>
        <div className="flex flex-col gap-2">
          404 Not Found
          <Link to="/">Home</Link>
        </div>
      </Layout>
    </>
  );
}

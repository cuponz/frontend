import Layout from "../layout/layout";
import Carousel from "../components/Carousel";
import Banner from "../components/banner";
import HomeCouponList from "../components/HomeCouponList";

import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import image4 from "../assets/image4.jpg";
import image5 from "../assets/image5.png";

const App = () => {
  const carouselImages = [image3, image4, image5];
  const rightImages = [image2, image1];

  return (
    <div className="App">
      <Layout>
        <div className="pt-16 p-6">
          <Carousel images={carouselImages} rightImages={rightImages} />
          <Banner />
          <HomeCouponList />
        </div>
      </Layout>
    </div>
  );
};

export default App;

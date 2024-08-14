import Navbar from "../components/navbar";

// function App() {
//   return (
//     <>
//       <Navbar />
//     </>
//   );
// }
import Carousel from "../components/Carousel";

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
      <Navbar />
      <Carousel images={carouselImages} rightImages={rightImages} />
    </div>
  );
};

export default App;

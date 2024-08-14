import Navbar from "../components/navbar";

// function App() {
//   return (
//     <>
//       <Navbar />
//     </>
//   );
// }
import Carousel from "../components/Carousel";

const App = () => {
  const images = [
    "https://via.placeholder.com/800x400.png?text=Slide+1",
    "https://via.placeholder.com/800x400.png?text=Slide+2",
    "https://via.placeholder.com/800x400.png?text=Slide+3",
  ];

  const rightImages = [
    "https://via.placeholder.com/400x200.png?text=Top+Image",
    "https://via.placeholder.com/400x200.png?text=Bottom+Image",
  ];

  return (
    <div className="App">
      <Navbar />
      <Carousel images={images} rightImages={rightImages} />
    </div>
  );
};

export default App;

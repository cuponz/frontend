import { useState } from "react";
import PropTypes from "prop-types";

const Carousel = ({ images, rightImages }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? combinedImages.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === combinedImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Combine carousel images and right images for small screens
  const combinedImages = [...images, ...rightImages];

  return (
    <div className="flex flex-col md:flex-row justify-center items-center w-full max-w-7xl mx-auto">
      {/* Carousel */}
      <div className="w-full md:w-3/5 relative h-[400px]">
        <div className="overflow-hidden relative h-full">
          <div
            className="flex transition-transform duration-700 ease-in-out h-full"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {combinedImages.map((image, index) => (
              <div
                key={index}
                className="min-w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
              ></div>
            ))}
          </div>
        </div>

        <button
          className="absolute top-1/2 left-0 transform -translate-y-1/2 text-white bg-gray-800 bg-opacity-50 p-2"
          onClick={prevSlide}
        >
          &#10094;
        </button>

        <button
          className="absolute top-1/2 right-0 transform -translate-y-1/2 text-white bg-gray-800 bg-opacity-50 p-2"
          onClick={nextSlide}
        >
          &#10095;
        </button>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {combinedImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${
                currentIndex === index ? "bg-white" : "bg-gray-500"
              }`}
            ></button>
          ))}
        </div>
      </div>

      {/* Right Images Split Vertically for Larger Screens */}
      <div className="hidden md:flex w-2/5 ml-4 flex-col space-y-4 h-[400px]">
        <div
          className="w-full h-1/2 bg-cover bg-center"
          style={{ backgroundImage: `url(${rightImages[0]})` }}
        ></div>
        <div
          className="w-full h-1/2 bg-cover bg-center"
          style={{ backgroundImage: `url(${rightImages[1]})` }}
        ></div>
      </div>
    </div>
  );
};

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  rightImages: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Carousel;

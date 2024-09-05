import React from "react";
import "./abouustcomp.css";

const AboutUs = () => {
  return (
    <div className="flex flex-col items-center text-gray-800 w-full">
      <section className="bg-light-purple p-12 w-full text-left lg:pl-24">
        <div className="w-full lg:w-1/2 text-left">
          <h1 className="text-4xl text-custom-purple mb-5">
            What Is CuponZ And How Valid Is It?
          </h1>
          <p className="text-lg mb-8 text-black">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry’s standard dummy text
            ever since the 1500s.
          </p>
          <div className="flex gap-5">
            <button className="py-2 px-4 bg-yellow-300 text-gray-800 rounded cursor-pointer text-lg hover:bg-yellow-400">
              Search Coupons
            </button>
            <button className="py-2 px-4 border border-black text-custom-purple rounded cursor-pointer bg-transparent text-lg hover:bg-custom-purple hover:text-white">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      <section className="p-12 bg-white w-full lg:w-1/2 text-left lg:pr-10">
        <h2 className="text-3xl text-custom-purple mb-5">
          Our Company Overview
        </h2>
        <p className="text-base mb-8 leading-relaxed">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry’s standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
        <div className="flex gap-5 mb-8">
          <button className="py-2 px-4 border border-black text-custom-purple rounded cursor-pointer bg-transparent text-lg hover:bg-custom-purple hover:text-white">
            Company
          </button>
          <button className="py-2 px-4 border border-black text-custom-purple rounded cursor-pointer bg-transparent text-lg hover:bg-custom-purple hover:text-white">
            Products
          </button>
          <button className="py-2 px-4 border border-black text-custom-purple rounded cursor-pointer bg-transparent text-lg hover:bg-custom-purple hover:text-white">
            Our Team
          </button>
        </div>
        <p className="text-base mb-8 leading-relaxed">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry’s standard dummy text ever
          since the 1500s.
        </p>
        <button className="py-2 px-6 bg-custom-purple text-white rounded cursor-pointer text-lg">
          Learn More
        </button>
      </section>
    </div>
  );
};

export default AboutUs;

// import React from "react";
// import "./abouustcomp.css";

// const AboutUs = () => {
//   return (
//     <div className="about-us">
//       <section className="upper-section">
//         <div className="up-sec">
//           <h1>What Is CuponZ And How Valid Is It?</h1>
//           <p>
//             Lorem Ipsum is simply dummy text of the printing and typesetting
//             industry. Lorem Ipsum has been the industry’s standard dummy text
//             ever since the 1500s.
//           </p>
//           <div className="hero-buttons">
//             <button className="search-btn">Search Coupons</button>
//             <button className="contact-btn">Contact Us</button>
//           </div>
//         </div>
//       </section>

//       <section className="lower-section">
//         <h2>Our Company Overview</h2>
//         <p>
//           Lorem Ipsum is simply dummy text of the printing and typesetting
//           industry. Lorem Ipsum has been the industry’s standard dummy text ever
//           since the 1500s, when an unknown printer took a galley of type and
//           scrambled it to make a type specimen book.
//         </p>
//         <div className="overview-buttons">
//           <button className="company-btn">Company</button>
//           <button className="products-btn">Products</button>
//           <button className="team-btn">Our Team</button>
//         </div>
//         <p>
//           Lorem Ipsum is simply dummy text of the printing and typesetting
//           industry. Lorem Ipsum has been the industry’s standard dummy text ever
//           since the 1500s.
//         </p>
//         <button className="learn-more-btn">Learn More</button>
//       </section>
//     </div>
//   );
// };

//  export default AboutUs;

// import React from "react";

// const AboutUs = () => {
//   return (
//     <div className="about-us mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//       <section className="upper-section bg-purple-100 p-6 md:p-12 w-full text-left">
//         <div className="up-sec w-full md:w-3/4 lg:w-1/2">
//           <h1 className="text-4xl mb-5">What Is CuponZ And How Valid Is It?</h1>
//           <p className="text-lg mb-8">
//             Lorem Ipsum is simply dummy text of the printing and typesetting
//             industry. Lorem Ipsum has been the industry’s standard dummy text
//             ever since the 1500s.
//           </p>
//           <div className="hero-buttons flex flex-wrap gap-5">
//             <button className="search-btn py-2 px-4 bg-transparent border border-green-500 text-green-500 rounded hover:bg-green-500 hover:text-white">
//               Search Coupons
//             </button>
//             <button className="contact-btn py-2 px-4 bg-transparent border border-green-500 text-green-500 rounded hover:bg-green-500 hover:text-white">
//               Contact Us
//             </button>
//           </div>
//         </div>
//       </section>

//       <section className="lower-section p-6 md:p-12 bg-white w-full md:w-3/4 lg:w-1/2 text-left">
//         <h2 className="text-3xl mb-5">Our Company Overview</h2>
//         <p className="text-lg mb-8">
//           Lorem Ipsum is simply dummy text of the printing and typesetting
//           industry. Lorem Ipsum has been the industry’s standard dummy text ever
//           since the 1500s, when an unknown printer took a galley of type and
//           scrambled it to make a type specimen book.
//         </p>
//         <div className="overview-buttons flex flex-wrap gap-5 mb-8">
//           <button className="company-btn py-2 px-4 border border-custom-purple text-custom-purple rounded hover:bg-custom-purple hover:text-white">
//             Company
//           </button>
//           <button className="products-btn py-2 px-4 border border-custom-purple text-custom-purple rounded hover:bg-custom-purple hover:text-white">
//             Products
//           </button>
//           <button className="team-btn py-2 px-4 border border-custom-purple text-custom-purple rounded hover:bg-custom-purple hover:text-white">
//             Our Team
//           </button>
//         </div>
//         <p className="text-lg mb-8">
//           Lorem Ipsum is simply dummy text of the printing and typesetting
//           industry. Lorem Ipsum has been the industry’s standard dummy text ever
//           since the 1500s.
//         </p>
//         <button className="learn-more-btn py-2 px-6 bg-custom-purple text-white rounded">
//           Learn More
//         </button>
//       </section>
//     </div>
//   );
// };

// export default AboutUs;

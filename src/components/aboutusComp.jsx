import React from "react";
import "./abouustcomp.css";

const AboutUs = () => {
  return (
    <div className="flex flex-col items-center text-gray-800 w-full">
      {/* Section 1: What Is CuponZ And How Valid Is It? */}
      <div className="w-full flex flex-col lg:flex-row p-12 bg-light-purple">
        <div className="flex-1 text-left">
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
            <button className="py-2 px-4 border border-purple-600 text-custom-purple rounded cursor-pointer bg-transparent text-lg hover:bg-custom-purple hover:text-white">
              Contact Us
            </button>
          </div>
        </div>
        <div className="flex-1">
          {/* Image on the right side after the content */}
          <img
            src="https://media.discordapp.net/attachments/1222361206166130779/1277571993188696146/image.png?ex=66e0c4e3&is=66df7363&hm=31c27449666cdc9c68d39ba9aa5a0bfb3e547c3c81c4ffeb6199827574136c87&=&format=webp&quality=lossless&width=686&height=573"
            alt="CuponZ Image"
            style={{ width: "100%", height: "auto" }}
            //style={{ width: "512px", height: "418px" }}
          />
        </div>
      </div>

      {/* Section 2: Our Company Overview */}
      <div className="w-full flex flex-col lg:flex-row p-12 bg-white">
        <div className="flex-1">
          {/* Image on the left side before the content */}
          <img
            src="https://media.discordapp.net/attachments/1222361206166130779/1277571993679560794/image.png?ex=66e0c4e3&is=66df7363&hm=affa2a47d1092b9e1c99f097cf31b409cd4b9a84f98af5132473ed2b50e429d7&=&format=webp&quality=lossless&width=767&height=573"
            alt="Company Overview Image"
            style={{ width: "100%", height: "auto" }}
            //style={{ width: "792px", height: "528px" }}
          />
        </div>
        <div className="flex-1 text-left lg:pl-10">
          <h2 className="text-3xl text-custom-purple mb-5">
            Our Company Overview
          </h2>
          <p className="text-base mb-8 leading-relaxed">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry’s standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
          <div className="flex flex-wrap gap-5 mb-8">
            <button className="py-2 px-4 border border-violet-400  text-custom-purple rounded cursor-pointer bg-transparent text-lg hover:bg-custom-purple hover:text-white border-violet-400">
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
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. industry.
          </p>
          <button className="py-2 px-6 bg-custom-purple text-white rounded cursor-pointer text-lg">
            Learn More
          </button>
        </div>
      </div>
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

// export default AboutUs;

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

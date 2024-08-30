import React from 'react';
import './abouustcomp.css';

const AboutUs = () => {
  return (
    <div className="about-us">
      <section className="upper-section">
        <div className='up-sec'>
        <h1>What Is CuponZ And How Valid Is It?</h1>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s.
        </p>
        <div className="hero-buttons">
          <button className="search-btn">Search Coupons</button>
          <button className="contact-btn">Contact Us</button>
        </div>
        </div>
      </section>
      
      <section className="lower-section">
        <h2>Our Company Overview</h2>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        </p>
        <div className="overview-buttons">
          <button className="company-btn">Company</button>
          <button className="products-btn">Products</button>
          <button className="team-btn">Our Team</button>
        </div>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s.
        </p>
        <button className="learn-more-btn">Learn More</button>
      </section>
    </div>
  );
};

export default AboutUs;

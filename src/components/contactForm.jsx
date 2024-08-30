import React, { useState } from 'react';
import "./contact_form.css"

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    subject: 'generalInquiry',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="contact-form-container">
      <div className="contact-info">
        <h2>Contact Information</h2>
        <p>Say something to start a live chat!</p>
        <ul className='ul-u'>
          <li><i className="fas fa-phone-alt"></i> +012 3456 789</li>
          <li><i className="fas fa-envelope"></i> demo@gmail.com</li>
          <li><i className="fas fa-map-marker-alt"></i> 132 Dartmouth Street Boston, Massachusetts 02156 United States</li>
        </ul>
        <div className="social-icons">
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-facebook"></i></a>
        </div>
        <div className="svg-container">
        <svg width="208" height="209" viewBox="0 0 208 209" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="162.5" cy="160.5" r="134.5" fill="#F9B0C3"/>
            <circle cx="69" cy="69" r="69" fill="#FFCE3D"/>
        </svg>
    </div>
      </div>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <h2>Select Subject:</h2>
        <div className="form-group radio-group">
        <div>
    <input
      type="radio"
      id="generalInquiry"
      name="subject"
      value="generalInquiry"
      checked={formData.subject === 'generalInquiry'}
      onChange={handleChange}
    />
    <label htmlFor="generalInquiry">General Inquiry</label>
  </div>
  <div>
    <input
      type="radio"
      id="technicalSupport"
      name="subject"
      value="technicalSupport"
      checked={formData.subject === 'technicalSupport'}
      onChange={handleChange}
    />
    <label htmlFor="technicalSupport">Technical Support</label>
  </div>
  <div>
    <input
      type="radio"
      id="billing"
      name="subject"
      value="billing"
      checked={formData.subject === 'billing'}
      onChange={handleChange}
    />
    <label htmlFor="billing">Billing</label>
  </div>
        </div>
        <div className="form-group">
          <textarea
            name="message"
            placeholder="Write your message..."
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="button-container">
          <button type="submit">Send Message</button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;

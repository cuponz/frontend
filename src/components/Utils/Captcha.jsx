import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const ReCaptcha = ({ onChange }) => {
  return (
    <div className="captcha-container">
      <ReCAPTCHA
        sitekey="6Lek6F8qAAAAADo97IiYMw9J_4wSWyKAvNmeJUnK"
        onChange={onChange}
      />
    </div>
  );
};

export default ReCaptcha;
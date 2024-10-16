import { useEffect } from "react";

const ReCaptchaV3 = ({ onVerify }) => {
	useEffect(() => {
		// Ensure reCAPTCHA is loaded
		const loadRecaptchaScript = () => {
			if (
				!document.querySelector(
					'[src="https://www.google.com/recaptcha/api.js?render=6Le95mAqAAAAACNrixGV0kZyrNmfHEYoKlerEKP5"]'
				)
			) {
				const script = document.createElement("script");
				script.src = `https://www.google.com/recaptcha/api.js?render=6Le95mAqAAAAACNrixGV0kZyrNmfHEYoKlerEKP5`;
				script.async = true;
				document.body.appendChild(script);
			}
		};

		loadRecaptchaScript();

		// Define the function to execute reCAPTCHA and pass the token back
		const executeReCaptcha = async (action) => {
			try {
				const token = await window.grecaptcha.execute(
					"6Le95mAqAAAAACNrixGV0kZyrNmfHEYoKlerEKP5",
					{
						action,
					}
				);
				console.log(token);
				onVerify(token);
			} catch (error) {
				console.error("reCAPTCHA failed:", error);
			}
		};

		// Provide a way to call reCAPTCHA execution externally
		window.executeReCaptcha = executeReCaptcha;
	}, [onVerify]);

	return null;
};

export default ReCaptchaV3;

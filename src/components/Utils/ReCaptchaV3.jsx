import { useEffect, useCallback } from "react";

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

/**
 * ReCaptchaV3 component to handle Google reCAPTCHA v3 verification.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {function} props.onVerify - Callback function to handle the verification token.
 *
 * @example
 * <ReCaptchaV3 onVerify={(token) => console.log(token)} />
 *
 * @returns {null} This component does not render any visible elements.
 *
 * @description
 * This component loads the Google reCAPTCHA v3 script and provides a method to execute the reCAPTCHA
 * and obtain a verification token. The token is passed to the provided `onVerify` callback function.
 *
 * The reCAPTCHA script is loaded when the component mounts and removed when the component unmounts.
 * The `executeReCaptcha` function is attached to the `window` object to allow external execution.
 */
const ReCaptchaV3 = ({ onVerify }) => {
	const loadRecaptchaScript = useCallback(() => {
		if (
			!document.querySelector(
				`[src="https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}"]`,
			)
		) {
			const script = document.createElement("script");
			script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
			script.async = true;
			script.defer = true;
			document.body.appendChild(script);
		}
	}, []);

	// Define the function to execute reCAPTCHA and pass the token back
	const executeReCaptcha = useCallback(
		async (action) => {
			if (!window.grecaptcha) {
				console.error("reCAPTCHA has not loaded yet.");
				return;
			}

			try {
				const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, {
					action,
				});
				return onVerify(token);
			} catch (error) {
				console.error("reCAPTCHA failed:", error);
			}
		},
		[onVerify],
	);

	useEffect(() => {
		loadRecaptchaScript();

		return () => {
			// Cleanup function to remove the script when component unmounts
			const script = document.querySelector(
				`[src="https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}"]`,
			);
			if (script) {
				document.body.removeChild(script);
			}

			// Remove the global executeReCaptcha function
			delete window.executeReCaptcha;
		};
	}, [loadRecaptchaScript]);

	useEffect(() => {
		window.executeReCaptcha = executeReCaptcha;
	}, [onVerify]);

	return null;
};

export default ReCaptchaV3;

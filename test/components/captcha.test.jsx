import { render } from "@testing-library/react";
import ReCaptchaV3 from "../../src/components/Utils/ReCaptchaV3";
import { vi } from "vitest";

const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

describe("ReCaptchaV3", () => {
	let mockVerify;

	beforeEach(() => {
		// Reset mocks before each test
		mockVerify = vi.fn();
		// Mock global window.grecaptcha
		global.grecaptcha = {
			execute: vi.fn(() => Promise.resolve("mock-token")),
		};
	});

	it("loads the reCAPTCHA script if not present", () => {
		render(<ReCaptchaV3 onVerify={mockVerify} />);

		// Check if the script is appended to the document body
		const scriptTag = document.querySelector(
			`[src="https://www.google.com/recaptcha/api.js?render=${siteKey}"]`,
		);
		expect(scriptTag).toBeInTheDocument();
	});

	it("calls the grecaptcha execute function and verifies the token", async () => {
		render(<ReCaptchaV3 onVerify={mockVerify} />);

		// Call the external executeReCaptcha function
		await window.executeReCaptcha("test-action");

		expect(global.grecaptcha.execute).toHaveBeenCalledWith(siteKey, {
			action: "test-action",
		});
		expect(mockVerify).toHaveBeenCalledWith("mock-token");
	});

	it("handles grecaptcha failure gracefully", async () => {
		global.grecaptcha.execute = vi.fn(() =>
			Promise.reject(new Error("grecaptcha error")),
		);

		render(<ReCaptchaV3 onVerify={mockVerify} />);

		await window.executeReCaptcha("test-action");

		expect(global.grecaptcha.execute).toHaveBeenCalled();
		expect(mockVerify).not.toHaveBeenCalled();
	});

	it("does not load the reCAPTCHA script if already present", () => {
		// Append a mock script tag to the document body
		const script = document.createElement("script");
		script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
		document.body.appendChild(script);

		render(<ReCaptchaV3 onVerify={mockVerify} />);

		// Ensure no additional script tags are added
		/**
		 * Selects all script tags in the document that have a source URL matching the Google reCAPTCHA API with the provided site key.
		 *
		 * @constant {NodeList} scriptTags - A NodeList of script elements with the specified src attribute.
		 */
		const scriptTags = document.querySelectorAll(
			`[src="https://www.google.com/recaptcha/api.js?render=${siteKey}"]`,
		);
		expect(scriptTags.length).toBe(1);
	});
});

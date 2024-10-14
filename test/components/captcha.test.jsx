import { render } from "@testing-library/react";
import ReCaptchaV3 from "../../src/components/Utils/ReCaptchaV3";
import { vi } from "vitest";

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
			'[src="https://www.google.com/recaptcha/api.js?render=6Le95mAqAAAAACNrixGV0kZyrNmfHEYoKlerEKP5"]',
		);
		expect(scriptTag).toBeInTheDocument();
	});

	it("calls the grecaptcha execute function and verifies the token", async () => {
		render(<ReCaptchaV3 onVerify={mockVerify} />);

		// Call the external executeReCaptcha function
		await window.executeReCaptcha("test-action");

		expect(global.grecaptcha.execute).toHaveBeenCalledWith(
			"6Le95mAqAAAAACNrixGV0kZyrNmfHEYoKlerEKP5",
			{ action: "test-action" },
		);
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
});

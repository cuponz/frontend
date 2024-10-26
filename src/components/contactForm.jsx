import { useState } from "react";
import { useTranslations } from "../store/languages";

/**
 * ContactForm component renders a contact form with fields for first name, last name, email, phone number, subject, and message.
 * It also includes a section with contact information and social media links.
 *
 * @component
 * @example
 * return (
 *   <ContactForm />
 * )
 *
 * @returns {JSX.Element} The rendered contact form component.
 */
const ContactForm = () => {
	const { t } = useTranslations();
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phoneNumber: "",
		subject: "generalInquiry",
		message: "",
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Form submitted:", formData);
	};

	return (
		<div className="flex flex-col md:flex-row justify-between p-5 border border-gray-300 rounded-lg bg-white max-w-5xl mx-auto mt-20 shadow-lg overflow-hidden mb-20">
			<div className="w-full md:w-2/5 p-8 relative  bg-purple-600 text-white rounded-t-lg md:rounded-l-lg md:rounded-t-none">
				<h2 className="mb-2 text-2xl font-semibold">
					{t(["contactUs", "contactInfo"])}
				</h2>
				<p className="text-sm mb-6">{t(["contactUs", "quote"])}</p>
				<ul className="list-none p-0">
					<li className="mb-4 flex items-center">
						<i className="fas fa-phone-alt mr-3"></i> +61 430 770 907
					</li>
					<li className="mb-4 flex items-center">
						<i className="fas fa-envelope mr-3"></i> sadimdshaik@gmail.com
					</li>
					<li className="mb-4 flex items-center">
						<i className="fas fa-map-marker-alt mr-3"></i>{" "}
						{t(["contactUs", "address"])}
					</li>
				</ul>
				<div className="social-icons  mt-auto flex space-x-4">
					<a href="#" className="text-white text-lg hover:text-yellow-400">
						<i className="fab fa-twitter"></i>
					</a>
					<a href="#" className="text-white text-lg hover:text-yellow-400">
						<i className="fab fa-instagram"></i>
					</a>
					<a href="#" className="text-white text-lg hover:text-yellow-400">
						<i className="fab fa-facebook"></i>
					</a>
				</div>
				{/* Acceptable SVG */}
				<div className="svg-container absolute bottom-0 right-0 pointer-events-none">
					<svg
						width="180"
						height="180"
						viewBox="0 0 208 209"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<circle cx="162.5" cy="160.5" r="134.5" fill="#F9B0C3" />
						<circle cx="69" cy="69" r="69" fill="#FFCE3D" />
					</svg>
				</div>
			</div>

			{/* Right side - 3/5 width on medium screens and up, full width on small screens */}
			<form className="w-full md:w-3/5 p-8 bg-white" onSubmit={handleSubmit}>
				<div className="form-group flex flex-col md:flex-row justify-between mb-6 gap-4">
					<input
						type="text"
						name="firstName"
						placeholder={t(["contactUs", "form", "fname"])}
						value={formData.firstName}
						onChange={handleChange}
						className="    p-3 border border-gray-300 rounded w-full"
						required
					/>
					<input
						type="text"
						name="lastName"
						placeholder={t(["contactUs", "form", "lname"])}
						value={formData.lastName}
						onChange={handleChange}
						className="p-3 border border-gray-300 rounded w-full "
						required
					/>
				</div>
				<div className="form-group flex flex-col md:flex-row justify-between mb-6 gap-4">
					<input
						type="email"
						name="email"
						placeholder={t(["contactUs", "form", "email"])}
						value={formData.email}
						onChange={handleChange}
						className="p-3 border border-gray-300 rounded w-full"
						required
					/>
					<input
						type="tel"
						name="phoneNumber"
						placeholder={t(["contactUs", "form", "phoneNumber"])}
						value={formData.phoneNumber}
						onChange={handleChange}
						className="p-3 border border-gray-300 rounded w-full"
						required
					/>
				</div>
				<h2 className="text-lg font-semibold mb-4">
					{t(["contactUs", "form", "selection", "title"])}
				</h2>
				<div className="form-group radio-group flex flex-col md:flex-row justify-between items-start mb-6">
					<div className="mb-4 md:mb-0">
						<input
							type="radio"
							id="generalInquiry"
							name="subject"
							value="generalInquiry"
							checked={formData.subject === "generalInquiry"}
							onChange={handleChange}
							className="mr-2"
						/>
						<label htmlFor="generalInquiry" className="text-gray-700">
							{t(["contactUs", "form", "selection", "generalInquiry"])}
						</label>
					</div>
					<div className="mb-4 md:mb-0">
						<input
							type="radio"
							id="technicalSupport"
							name="subject"
							value="technicalSupport"
							checked={formData.subject === "technicalSupport"}
							onChange={handleChange}
							className="mr-2"
						/>
						<label htmlFor="technicalSupport" className="text-gray-700">
							{t(["contactUs", "form", "selection", "technicalSupport"])}
						</label>
					</div>
					<div>
						<input
							type="radio"
							id="billing"
							name="subject"
							value="billing"
							checked={formData.subject === "billing"}
							onChange={handleChange}
							className="mr-2"
						/>
						<label htmlFor="billing" className="text-gray-700">
							{t(["contactUs", "form", "selection", "billing"])}
						</label>
					</div>
				</div>
				<div className="form-group mb-6">
					<textarea
						name="message"
						placeholder={t(["contactUs", "form", "selection", "message"])}
						value={formData.message}
						onChange={handleChange}
						className="   w-full p-3 border border-gray-300 rounded"
						// w-full p-3 border-b-2 border-gray-300 focus:border-purple-600 outline-none text-gray-700 placeholder-gray-500
						required
					></textarea>
				</div>
				<div className="text-right">
					<button
						type="submit"
						className="bg-yellow-400 text-white py-3 px-8 rounded-md hover:bg-yellow-500 font-semibold"
					>
						{t(["contactUs", "button"])}
					</button>
				</div>
			</form>
		</div>
	);
};

export default ContactForm;

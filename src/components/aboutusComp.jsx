import { useTranslations } from "../store/languages";
import { useState } from "react";
import { Link } from "react-router-dom";
import img1 from "../assets/image2.png";
import img2 from "../assets/image5.png";
import img7 from "../assets/image7.png";

const AboutUs = () => {
	const { t } = useTranslations();
	const [activeSection, setActiveSection] = useState("Company");

	const sectionContent = {
		Company: {
			title: t(["aboutUsPage", "company", "title"]),
			content: t(["aboutUsPage", "company", "content"]),
			image: img1,
		},
		Products: {
			title: t(["aboutUsPage", "products", "title"]),
			content: t(["aboutUsPage", "products", "content"]),
			image: img2,
		},
		Team: {
			title: t(["aboutUsPage", "team", "title"]),
			content: t(["aboutUsPage", "team", "content"]),
			image: img1,
		},
	};

	return (
		<div className="flex flex-col items-center text-gray-800">
			<section className="w-full flex flex-col md:flex-row">
				<div className="w-full md:w-1/2 bg-[#e0dffe] py-12 px-5 md:px-24 flex flex-col justify-center min-h-[400px]">
					<h1 className="text-3xl md:text-4xl mb-5 text-[#4b4b92] font-bold">
						{t(["aboutUsPage", "header"])}
					</h1>
					<p className="text-lg mb-8">{t(["aboutUsPage", "description"])}</p>
					<div className="flex gap-5">
						<Link to="/coupon">
							<button className="bg-[#ffda44] text-gray-800 px-6 py-2 rounded-md hover:bg-[#ffd000]">
								{t(["aboutUsPage", "searchCoupons"])}
							</button>
						</Link>
						<Link to="/contactus">
							<button className="border border-[#6d50bf] text-[#6d50bf] px-6 py-2 rounded-md hover:bg-[#6d50bf] hover:text-white transition duration-300">
								{t(["aboutUsPage", "contactUs"])}
							</button>
						</Link>
					</div>
				</div>
				<div className="w-full md:w-1/2 h-64 md:h-auto">
					<img
						src={img7}
						alt={t(["aboutUsPage", "imageAlt"])}
						className="w-full h-full object-cover object-center"
					/>
				</div>
			</section>

			<section className="w-full py-12 px-5 md:px-24 bg-white">
				<div className="flex flex-col md:flex-row items-center justify-between mb-8">
					<div className="w-full md:w-1/2 mb-8 md:mb-0 md:mr-8">
						<img
							src={sectionContent[activeSection].image}
							alt={sectionContent[activeSection].title}
							className="rounded-lg shadow-lg max-w-full h-auto"
						/>
					</div>
					<div className="w-full md:w-1/2">
						<h2 className="text-2xl md:text-3xl mb-5 text-[#4b4b92] font-semibold">
							{sectionContent[activeSection].title}
						</h2>
						<p className="text-base mb-8 leading-relaxed">
							{sectionContent[activeSection].content}
						</p>

						<div className="flex flex-wrap gap-4">
							{Object.keys(sectionContent).map((sectionKey) => (
								<button
									key={sectionKey}
									className={`px-6 py-2 rounded-md transition duration-300 ${
										activeSection === sectionKey
											? "bg-[#6d50bf] text-white"
											: "border border-[#6d50bf] text-[#6d50bf] hover:bg-[#6d50bf] hover:text-white"
									}`}
									onClick={() => setActiveSection(sectionKey)}
								>
									{t([
										"aboutUsPage",
										"sectionNames",
										sectionKey.toLowerCase().replace(" ", ""),
									])}
								</button>
							))}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default AboutUs;

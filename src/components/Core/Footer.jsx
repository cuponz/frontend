import { Link } from "react-router-dom";
import logo from "../../assets/logofooter.png";
import { useTranslations } from "../../store/languages";

const Footer = () => {
	const { t } = useTranslations();
	const links = [
		{ to: "/", text: t(["footer", "home"]) },
		{ to: "/coupon", text: t(["footer", "coupons"]) },
		{ to: "/contactus", text: t(["footer", "contactUs"]) },
		{ to: "/aboutus", text: t(["footer", "aboutUs"]) },
	];

	return (
		<footer className="bg-indigo-800 text-gray-200 py-8 px-4">
			<div className="container mx-auto">
				<div className="flex flex-col md:flex-row justify-between items-center mb-8">
					<div className="flex items-center mb-4 md:mb-0">
						<img src={logo} alt="CuponZ Logo" className="h-10 mr-2" />
					</div>
					<nav className="flex flex-wrap justify-center md:justify-end space-x-4 md:space-x-8">
						{links.map((link) => (
							<Link
								key={link.to}
								to={link.to}
								className="hover:text-white hover:underline transition-colors duration-200 mb-2 md:mb-0"
							>
								{link.text}
							</Link>
						))}
					</nav>
				</div>
				<hr className="border-gray-600 mb-5" />
				<div className="flex flex-col md:flex-row justify-between items-center">
					<div className="mb-4 md:mb-0">
						<span>{t(["footer", "copyright"])}</span>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;

import Navbar from "@/components/Core/Navbar";
import Footer from "@/components/Core/Footer";
import { Toaster } from "sonner";

import { useTranslations } from "@/store/languages";

/**
 * Layout component that wraps the main content with a Navbar, Footer, and Toaster.
 *
 * @param {Object} props - The properties object.
 * @param {boolean} props.isProtected - Indicates if the layout is for a protected route.
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 * @returns {JSX.Element} The rendered layout component.
 */
const Layout = ({ isProtected, children }) => {
	const { language } = useTranslations();

	return (
		<div className="flex flex-col min-h-screen">
			<Navbar isProtected={isProtected} />
			<main className={`flex-1 ${language === "urdu" ? "text-right" : ""}`}>
				{children}
			</main>
			<Footer />
			<Toaster closeButton richColors position="bottom-right" />
		</div>
	);
};

export default Layout;

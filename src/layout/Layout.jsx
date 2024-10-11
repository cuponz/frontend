import Navbar from "@/components/Core/Navbar";
import Footer from "@/components/Core/Footer";
import { Toaster } from "sonner";

import { useTranslations } from "@/store/languages";

const Layout = ({ children }) => {
	const { language } = useTranslations();

	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />
			<main className={`flex-1 ${language === "urdu" ? "text-right" : ""}`}>{children}</main>
			<Footer />
			<Toaster closeButton richColors position="bottom-right" />
		</div>
	);
};

export default Layout;

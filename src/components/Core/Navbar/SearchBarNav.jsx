import { useState, useEffect, useCallback } from "react";
import { CiSearch } from "react-icons/ci";
import { FaShop } from "react-icons/fa6";
import couponData from "../../../data/couponData.json";
import { useTranslations } from "@/store/languages";
import { motion, AnimatePresence } from "framer-motion";

const SearchBarNav = () => {
	const { t } = useTranslations();
	const [searchTerm, setSearchTerm] = useState("");
	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
	const [filteredShops, setFilteredShops] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const generateRandomColor = () => {
		const letters = "0123456789ABCDEF";
		let color = "#";
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedSearchTerm(searchTerm);
		}, 500);

		return () => clearTimeout(timer);
	}, [searchTerm]);

	useEffect(() => {
		if (debouncedSearchTerm) {
			searchShops(debouncedSearchTerm);
		} else {
			setFilteredShops([]);
			setIsLoading(false);
		}
	}, [debouncedSearchTerm]);

	const searchShops = useCallback((value) => {
		setIsLoading(true);
		setTimeout(() => {
			const results = couponData
				.filter((coupon) =>
					coupon.shopName.toLowerCase().includes(value.toLowerCase()),
				)
				.reduce((unique, coupon) => {
					if (!unique.some((item) => item.shopName === coupon.shopName)) {
						unique.push({ id: coupon.id, shopName: coupon.shopName });
					}
					return unique;
				}, []);
			setFilteredShops(results);
			setIsLoading(false);
		}, 300);
	}, []);

	const handleSearchChange = (e) => {
		const value = e.target.value;
		setSearchTerm(value);
	};

	return (
		<div className="relative w-full">
			<div className="relative">
				<input
					id="search-input"
					type="text"
					placeholder={t(["navigation", "searchBar"])}
					value={searchTerm}
					onChange={handleSearchChange}
					className="w-full pl-10 pr-4 py-2 border rounded-full shadow-md"
				/>
				<CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
			</div>

			<AnimatePresence>
				{(filteredShops.length > 0 || isLoading) && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.2 }}
						className="absolute z-10 w-full mt-2 bg-white shadow-lg rounded-lg max-h-60 overflow-y-auto"
					>
						{isLoading ? (
							<div className="flex justify-center items-center p-4">
								<motion.div
									animate={{ rotate: 360 }}
									transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
									className="w-6 h-6 border-t-2 border-blue-500 rounded-full"
								/>
							</div>
						) : (
							filteredShops.map((shop) => (
								<motion.div
									key={shop.id}
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -10 }}
									transition={{ duration: 0.2 }}
									className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
								>
									<FaShop
										className="h-8 w-8 rounded-full mr-3"
										style={{ color: generateRandomColor() }}
									/>
									<span>{shop.shopName}</span>
								</motion.div>
							))
						)}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default SearchBarNav;

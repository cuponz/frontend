import { useState, useEffect, useCallback } from "react";
import { CiSearch } from "react-icons/ci";
import { FaShop } from "react-icons/fa6";
import { useTranslations } from "@/store/languages";
import { motion, AnimatePresence } from "framer-motion";

import { useQuery } from "@tanstack/react-query";
import { searchShops } from "@/api/user";
import { Link } from "react-router-dom";

/**
 * SearchBarNav component provides a search bar with debounced input and displays filtered shop results.
 *
 * @component
 * @example
 * return (
 *   <SearchBarNav />
 * )
 *
 * @returns {JSX.Element} The rendered search bar component.
 *
 * @description
 * This component includes:
 * - An input field for search terms.
 * - Debounced search functionality to limit the number of queries.
 * - A list of filtered shops displayed as search results.
 * - Loading spinner while fetching search results.
 *
 * @hook
 * - useTranslations: Hook to get translation function.
 * - useState: Hook to manage search term and debounced search term states.
 * - useEffect: Hook to handle debouncing of search term.
 * - useQuery: Hook to fetch filtered shops based on debounced search term.
 *
 * @param {Object} props - The component props.
 * @param {string} props.searchTerm - The current search term.
 * @param {string} props.debouncedSearchTerm - The debounced search term.
 * @param {Array} props.filteredShops - The list of filtered shops.
 * @param {boolean} props.isLoading - Loading state for the search results.
 *
 * @function handleSearchChange
 * @description Updates the search term state when the input value changes.
 * @param {Object} e - The event object.
 * @param {string} e.target.value - The new value of the input field.
 */
const SearchBarNav = () => {
	const { t } = useTranslations();
	const [searchTerm, setSearchTerm] = useState("");
	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedSearchTerm(searchTerm);
		}, 500);

		return () => clearTimeout(timer);
	}, [searchTerm]);

	const { data: filteredShops = [], isLoading } = useQuery({
		queryKey: ["shops", debouncedSearchTerm],
		queryFn: () => searchShops(debouncedSearchTerm),
		enabled: !!debouncedSearchTerm,
	});

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
								<Link
									key={shop.id}
									to={`/shop/?id=${shop.id}&name=${shop.name}`}
								>
									<motion.div
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -10 }}
										transition={{ duration: 0.2 }}
										className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
									>
										{shop.avatar_url ? (
											<img
												src={shop.avatar_url}
												className="h-8 w-8 mr-3 rounded-full object-cover"
											/>
										) : (
											<FaShop
												className="h-8 w-8 rounded-full mr-3"
												style={{ color: "grey" }}
											/>
										)}
										<span>{shop.name}</span>
									</motion.div>
								</Link>
							))
						)}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default SearchBarNav;

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useIsCategoriesOpenStore } from "../../../store/categories";
import { CiCircleChevRight } from "react-icons/ci";

/**
 * CategoriesMenu component renders a menu with groups and categories.
 * It handles the display of categories based on the selected group and
 * manages the state for mobile view and active group.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.groups - The list of groups to display.
 * @param {Array} props.categories - The list of categories to display.
 * @param {Object} props.categoriesButtonRef - Ref to the categories button element.
 * @param {Object} props.categoriesButtonMobileRef - Ref to the categories button element for mobile view.
 *
 * @returns {JSX.Element} The rendered CategoriesMenu component.
 */
const CategoriesMenu = ({
	groups,
	categories,
	categoriesButtonRef,
	categoriesButtonMobileRef,
}) => {
	const [activeGroup, setActiveGroup] = useState(null);
	// const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
	const [isMobile, setIsMobile] = useState(false);
	const navigate = useNavigate();
	const menuRef = useRef(null);

	const setIsCategoriesOpen = useIsCategoriesOpenStore(
		(state) => state.setIsCategoriesOpen,
	);

	const handleResize = () => {
		if (typeof window !== "undefined") {
			setIsMobile(window.innerWidth < 768);
		}
	};

	const handleClickOutside = (event) => {
		if (
			menuRef.current &&
			!menuRef.current.contains(event.target) &&
			!(
				categoriesButtonRef.current &&
				categoriesButtonRef.current.contains(event.target)
			) &&
			!(
				categoriesButtonMobileRef.current &&
				categoriesButtonMobileRef.current.contains(event.target)
			)
		) {
			setIsCategoriesOpen(false);
		}
	};

	useEffect(() => {
		handleResize();
	}, []);

	useEffect(() => {
		window.addEventListener("resize", handleResize);
		document.addEventListener("mousedown", handleClickOutside);

		// Set initial active group
		if (groups.length > 0) {
			setActiveGroup(groups[0].id);
		}

		return () => {
			window.removeEventListener("resize", handleResize);
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [setIsCategoriesOpen, groups]);

	const handleChangeCategory = (category) => () => {
		setIsCategoriesOpen(false);
		navigate(`/coupon?categories[]=${category}`);
	};

	const handleGroupClick = (groupId) => {
		if (isMobile) {
			setActiveGroup(activeGroup === groupId ? null : groupId);
		} else {
			setActiveGroup(groupId);
		}
	};

	return (
		<div
			ref={menuRef}
			className="absolute left-0 mt-2 w-full bg-[#e5e1f7] border-t border-gray-200 shadow-lg max-h-[80vh] overflow-y-auto"
		>
			<div className="flex flex-col md:flex-row">
				<ul className="md:w-1/4 bg-[#E9E7F9] p-4 border-b md:border-b-0 md:border-r border-gray-200">
					{groups.map((group) => (
						<li
							key={group.id}
							className={`hover:bg-purple-100 px-4 py-2 cursor-pointer ${
								activeGroup === group.id ? "bg-purple-100" : ""
							}`}
							onClick={() => handleGroupClick(group.id)}
						>
							<div className="flex items-center justify-between">
								<span className="truncate mr-2">{group.name}</span>
								<CiCircleChevRight
									className={`flex-shrink-0 transition-transform duration-200 ease-in-out ${
										activeGroup === group.id ? "rotate-90" : ""
									}`}
								/>
							</div>
						</li>
					))}
				</ul>
				<div className="md:w-3/4 p-4">
					{groups.map((group) => {
						if (activeGroup === group.id) {
							const groupCategories = categories.filter(
								(category) => category.group_id === group.id,
							);
							return (
								<div key={group.id} className="mb-4">
									<div className="px-4 py-2 font-bold">
										{group.name} Categories
									</div>
									<ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
										{groupCategories.map((category) => (
											<li
												key={category.id}
												className="hover:bg-purple-100 px-4 py-2 cursor-pointer rounded"
												onClick={handleChangeCategory(category.name)}
											>
												{category.name}
											</li>
										))}
									</ul>
								</div>
							);
						}
						return null;
					})}
				</div>
			</div>
		</div>
	);
};

export default CategoriesMenu;

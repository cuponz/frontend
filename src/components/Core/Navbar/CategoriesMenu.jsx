import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useIsCategoriesOpenStore } from "../../../store/categories";
import { CiCircleChevRight } from "react-icons/ci";

/**
 * @typedef {Object} Group
 * @property {string|number} id - Unique identifier for the group
 * @property {string} name - Display name of the group
 */

/**
 * @typedef {Object} Category
 * @property {string|number} id - Unique identifier for the category
 * @property {string} name - Display name of the category
 * @property {string|number} group_id - ID of the parent group
 */

/**
 * @typedef {Object} CategoriesMenuProps
 * @property {Group[]} groups - Array of category groups
 * @property {Category[]} categories - Array of categories
 * @property {React.RefObject} categoriesButtonRef - Reference to desktop categories button
 * @property {React.RefObject} categoriesButtonMobileRef - Reference to mobile categories button
 */

/**
 * Handles window resize events and updates mobile view state
 *
 * @returns {void}
 */

/**
 * Handles clicks outside the menu to close it
 *
 * @param {MouseEvent} event - Click event
 * @returns {void}
 */

/**
 * Navigates to filtered coupon list when category is selected
 *
 * @param {string} category - Selected category name
 * @returns {Function} Click handler function
 */

/**
 * Updates active group state based on click and device type
 *
 * @param {string|number} groupId - ID of clicked group
 * @returns {void}
 */

/**
 * CategoriesMenu component renders a menu with groups and categories.
 * It handles the display of categories based on the selected group and
 * manages the state for mobile view and active group.
 *
 * @component
 * @param {CategoriesMenuProps} props - Component props
 * @returns {JSX.Element} Rendered menu component
 *
 * @example
 * <CategoriesMenu
 *   groups={groupsData}
 *   categories={categoriesData}
 *   categoriesButtonRef={buttonRef}
 *   categoriesButtonMobileRef={mobileButtonRef}
 * />
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

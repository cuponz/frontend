import { useSearchParams } from "react-router-dom";
import MultiSelectDropdown from "../../Utils/MultiSelectDropdown";
import { useTranslations } from "../../../store/languages";
import { useCategoryStore } from "../../../store/categories";
import { useCouponFiltersStore } from "../../../store/filters";

const FilterBoard = ({ closeFilterBoard }) => {
	const { t } = useTranslations();
	const [_, setSearchParams] = useSearchParams();

	const categories = useCategoryStore((state) =>
		state.categories.map((category) => category.name)
	);
	const [appliedFilters, setStartDate, setEndDate, storeSetSelectedCategories] =
		useCouponFiltersStore((state) => [
			state.appliedFilters,
			state.setStartDate,
			state.setEndDate,
			state.setSelectedCategories,
		]);

	const setSelectedCategories = (categories) => {
		setSearchParams({ "categories[]": categories });
		storeSetSelectedCategories(categories);
	};

	const resetFilters = () => {
		setSelectedCategories([]);
		setStartDate("");
		setEndDate("");
	};

	const appliedFilterCount =
		appliedFilters.selectedCategories.length +
		(appliedFilters.startDate ? 1 : 0) +
		(appliedFilters.endDate ? 1 : 0);

	return (
		<div className="p-4 h-full flex flex-col space-y-4">
			<div className="flex justify-between items-center mb-4 border-b pb-2">
				<h2 className="text-lg font-medium">
					{t(["filter", "display"])} ({appliedFilterCount})
				</h2>
				<button onClick={closeFilterBoard} className="text-2xl font-bold">
					&times;
				</button>
			</div>

			<div className="flex flex-col space-y-3">
				<MultiSelectDropdown
					label="Categories"
					options={categories}
					selectedOptions={appliedFilters.selectedCategories}
					setSelectedOptions={setSelectedCategories}
				/>
				<div className="flex flex-col">
					<label htmlFor="start-date" className="text-gray-700 font-medium">
						{t(["filter", "startDate"])}
					</label>
					<input
						type="date"
						id="start-date"
						value={appliedFilters.startDate}
						onChange={(e) => setStartDate(e.target.value)}
						className="w-full px-4 py-2 border-2 border-yellow-600 rounded-md shadow-md focus:outline-none focus:border-blue-500"
					/>
				</div>
				<div className="flex flex-col">
					<label htmlFor="end-date" className="text-gray-700 font-medium">
						{t(["filter", "endDate"])}
					</label>
					<input
						type="date"
						id="end-date"
						value={appliedFilters.endDate}
						onChange={(e) => setEndDate(e.target.value)}
						className="w-full px-4 py-2 border-2 border-yellow-600 rounded-md shadow-md focus:outline-none focus:border-blue-500"
					/>
				</div>
			</div>

			<div className="mt-auto flex space-x-4">
				<button
					onClick={resetFilters}
					className="w-full bg-red-500 text-white px-3 py-2 rounded-md shadow-md hover:bg-red-600 focus:outline-none"
				>
					{t(["filter", "reset"])}
				</button>
				<button
					onClick={closeFilterBoard} // Close the filter board when applying filters
					className="w-full bg-green-500 text-white px-3 py-2 rounded-md shadow-md hover:bg-green-600 focus:outline-none"
				>
					{t(["filter", "apply"])}
				</button>
			</div>
		</div>
	);
};

export default FilterBoard;

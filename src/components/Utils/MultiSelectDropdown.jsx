import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

/**
 * MultiSelectDropdown component renders a multi-select dropdown using the react-select library.
 *
 * @param {Object} props - The component props.
 * @param {string} props.label - The label for the dropdown.
 * @param {Array<string>} props.options - The list of options to display in the dropdown.
 * @param {Array<string>} props.selectedOptions - The list of currently selected options.
 * @param {Function} props.setSelectedOptions - The function to update the selected options.
 *
 * @returns {JSX.Element} The rendered MultiSelectDropdown component.
 */
const MultiSelectDropdown = ({
	label,
	options,
	selectedOptions,
	setSelectedOptions,
}) => {
	const handleChange = (selected) => {
		setSelectedOptions(selected ? selected.map((option) => option.value) : []);
	};

	options ??= [];

	return (
		<div style={{ marginBottom: "16px" }}>
			<label>{label}</label>
			<Select
				isMulti
				options={options.map((option) => ({ label: option, value: option }))}
				value={options
					.filter((option) => selectedOptions.includes(option))
					.map((value) => ({ label: value, value }))}
				onChange={handleChange}
				components={animatedComponents}
				className="basic-multi-select"
				classNamePrefix="select"
			/>
		</div>
	);
};

export default MultiSelectDropdown;

import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

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

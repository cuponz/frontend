const Button = ({
	onClick,
	className,
	colour,
	disabled,
	children,
	...props
}) => {
	return (
		<button
			onClick={onClick}
			className={`px-4 py-2 text-white rounded-md shadow-md bg-${colour} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${colour} focus:ring-offset-${colour} ${className} ${
				disabled ? "opacity-50 cursor-not-allowed" : `hover:brightness-90`
			}`}
			disabled={disabled}
			{...props}
		>
			{children}
		</button>
	);
};

export default Button;

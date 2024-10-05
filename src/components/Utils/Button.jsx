const Button = ({ onClick, className, colour, disabled, children, ...props }) => {
  return (
    <button
			onClick={onClick}
			className={`px-4 py-2 text-white rounded-md shadow-md bg-${colour}-500 ${className} ${
				disabled
          ? "opacity-50 cursor-not-allowed"
          : `hover:bg-${colour}-600`
			}`}
      disabled={disabled}
			{...props}
    >
      {children}
    </button>
  );
};

export default Button;
const Banner = ({
  message,
  bgColor = "bg-blue-500",
  textColor = "text-white",
}) => {
  return (
    <div
      className={`${bgColor} ${textColor} py-4 px-6 text-center rounded-md shadow-md`}
    >
      <p className="text-lg font-semibold">{message}</p>
    </div>
  );
};

export default Banner;

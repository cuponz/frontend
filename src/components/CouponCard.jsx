const CouponCard = ({
  logo,
  title,
  description,
  keywords,
  startDate,
  endDate,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between h-full">
      <div className="flex flex-col items-center text-center mb-4 flex-grow">
        <div className="mb-4">
          <img src={logo} alt={title} className="h-16 w-16 object-contain" />
        </div>
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="mt-2 text-gray-600 text-sm">{description}</p>
        <p className="mt-2 text-gray-600 text-sm">
          <strong>Time:</strong> {startDate} to {endDate}
        </p>

        {keywords && keywords.length > 0 && (
          <p className="mt-2 text-gray-500">
            <strong>Keywords:</strong> {keywords.join(", ")}
          </p>
        )}
      </div>
      <div className="mt-auto">
        <button className="bg-[#46467A] text-white px-4 py-2 rounded-md hover:bg-green-700 w-full">
          Redeem Now
        </button>
      </div>
    </div>
  );
};

export default CouponCard;

import { useQuery } from "@tanstack/react-query";
import { usingRedemptionById } from "../api/redemptions";
import LoadingSpinner from "./Utils/LoadingSpinner";

const PopupSuccess = ({ redeem }) => {
  const { isPending, data } = useQuery({
		queryKey: ["redemptions", "using", redeem.redemption_id],
		queryFn: () => usingRedemptionById(redeem.redemption_id),
		retry: false,
  });

  if (isPending) {
    return <LoadingSpinner />
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-sm">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-green-500 rounded-full p-2">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
        </div>
        <h2 className="text-3xl font-semibold mb-4 text-center">
          Redeem Successfully
        </h2>
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-center">
            {data.title}
          </h3>
          <div className="mt-2">
            <p>
              <span className="font-semibold">Category:</span>{" "}
              {data.category}
            </p>
            <p>
              <span className="font-semibold">Shop:</span> {data.shop}
            </p>
            <p>
              <span className="font-semibold">Redeem Code:</span>{" "}
              {data.code}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupSuccess;

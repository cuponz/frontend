import { useState } from "react";
import QRCode from "react-qr-code";
import { Link } from "react-router-dom";

const CouponPopup = ({ coupon, onClose }) => {
	const redemptionLink = `${window.location.origin}/redeem/${coupon.id}`;

	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		navigator.clipboard
			.writeText(coupon.code)
			.then(() => {
				setCopied(true);
				setTimeout(() => setCopied(false), 2000);
			})
			.catch(err => {
				console.error('Failed to copy!', err);
			});
	};

  const formattedDate = (new Date(coupon.end_date)).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
			<div className="bg-white rounded-lg w-96 p-6 relative shadow-lg border-4 border-gray-300">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

				<div className="flex justify-center mb-4">
					<img src={coupon.logo_url} alt={coupon.title} className="w-100 object-contain" />
				</div>

				<h2 className="text-xl font-semibold mb-2 text-center">{coupon.title}</h2>

				<div className="mt-6 flex items-center bg-blue-100 rounded-md p-2 border-4 border-indigo-900 border-dashed">
					<input
						type="text"
						value={coupon.code}
						readOnly
						className="flex-grow bg-transparent border-none outline-none text-black text-2xl font-normal font-mono"
					/>
					<button
						onClick={handleCopy}
						className="ml-2 text-blue-500 hover:text-blue-700 focus:outline-none"
						aria-label="Copy Coupon Code"
					>
						{copied ? 'Copied!' : 'Copy'}
					</button>
				</div>

				{!coupon.url && (
					<>
						<div className="text-center text-black text-xl font-normal font-['Inder']">OR</div>

						<div className="flex justify-center">
							<QRCode value={redemptionLink} size={256} />
						</div>
					</>
				)}

				<br />
				<div className="text-[#46467a] text-base font-bold">Offer Details:</div>
				<div className="w-96 text-justify text-[#183346] text-sm font-normal">
					{coupon.desc}
				</div>

				<br />
				<div>
					<span className="text-[#46467a] text-base font-bold">Expiration Date:</span>
					<span className="text-[#183346] text-base font-normal">{" " + formattedDate}</span>
				</div>

				{coupon.url ? (
					<p className="mt-4">
						Please visit the shop website at: <Link href={coupon.url} className="text-blue-500 underline">{coupon.url}</Link>
					</p>
				) : (
					<p className="mt-4">
						Scan the QR code or visit: <a href={redemptionLink} className="text-blue-500 underline">{redemptionLink}</a>
					</p>
				)}

			</div>
		</div>
	);
};

export default CouponPopup;

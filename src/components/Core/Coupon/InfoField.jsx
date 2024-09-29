import { useState } from "react";
import { CouponRequirementType } from "../../../constants";
import { useMutation } from "@tanstack/react-query";
import { redeemCoupon } from "../../../api/redemptions";
import { toast } from "react-toastify";
import { useUserStore } from "../../../store/user";

const InfoField = ({ onClose, coupon, onRedeem }) => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState({
    email: false,
    phone: false,
  });

  const user = useUserStore((state) => state.user);

  const infoMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: redeemCoupon,
    onSuccess: (_) => {
      toast.success("Redeem successful!");
    },
    onError: (err) => {
      toast.error(`Redeem failed. ${err.message}`);
    },
  });

  const showEmailField =
    coupon.requirement_type !== CouponRequirementType.PhoneNumber;
  const showPhoneField =
    coupon.requirement_type !== CouponRequirementType.Email;

  const isEmailRequired =
    coupon.requirement_type === CouponRequirementType.Email ||
    coupon.requirement_type === CouponRequirementType.EmailAndPhone;

  const isPhoneRequired =
    coupon.requirement_type === CouponRequirementType.PhoneNumber ||
    coupon.requirement_type === CouponRequirementType.EmailAndPhone;

  const isEmailOrPhoneRequired =
    coupon.requirement_type === CouponRequirementType.EmailOrPhone;

  const handleSubmit = (e) => {
    e.preventDefault();

    let hasError = false;
    const newErrors = { email: false, phone: false };

    if (isEmailRequired && (!formData.email || formData.email.length === 0)) {
      newErrors.email = true;
      hasError = true;
      toast.error("Email is required.");
    }

    if (isPhoneRequired && (!formData.phone || formData.phone.length === 0)) {
      newErrors.phone = true;
      hasError = true;
      toast.error("Phone number is required.");
    }

    if (
      (isEmailOrPhoneRequired && !formData.email && !formData.phone) ||
      (formData.email.length === 0 && formData.phone.length === 0)
    ) {
      newErrors.email = true;
      newErrors.phone = true;
      hasError = true;
      toast.error("Please provide either an email or a phone number.");
    }

    setErrors(newErrors);

    if (hasError) {
      return;
    }

    console.log("Redeeming with:", formData);
    infoMutation.mutate({
      user_id: user ? user.id : undefined,
      coupon_id: coupon.id,
      user_email: formData.email.length > 0 ? formData.email : undefined,
      user_phone: formData.phone.length > 0 ? formData.phone : undefined,
    });
    onRedeem();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: false });
  };

  const handleClose = () => {
    setFormData({ email: "", phone: "" });
    setErrors({ email: false, phone: false });
    onClose();
  };

  const guidanceMessage = (() => {
    switch (coupon.requirement_type) {
      case CouponRequirementType.Email:
        return "Please enter your email to redeem the coupon.";
      case CouponRequirementType.PhoneNumber:
        return "Please enter your phone number to redeem the coupon.";
      case CouponRequirementType.EmailOrPhoneNumber:
        return "Please enter your email or phone number to redeem the coupon.";
      case CouponRequirementType.EmailAndPhoneNumber:
        return "Please enter both your email and phone number to redeem the coupon.";
      default:
        return "Please enter your details to redeem the coupon.";
    }
  })();

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      aria-modal="true"
      role="dialog"
    >
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4 text-center">
          {guidanceMessage}
        </h2>
        <form onSubmit={handleSubmit}>
          {showEmailField && (
            <input
              type="email"
              name="email"
              className={`w-full p-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded mb-4`}
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required={isEmailRequired}
            />
          )}
          {showPhoneField && (
            <input
              type="tel"
              name="phone"
              className={`w-full p-2 border ${
                errors.phone ? "border-red-500" : "border-gray-300"
              } rounded mb-4`}
              placeholder="Phone Number"
              pattern="\d{10,15}"
              value={formData.phone}
              onChange={handleChange}
              required={isPhoneRequired}
            />
          )}
          <div className="flex justify-between gap-4">
            <button
              type="submit"
              className="flex-1 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition duration-200"
            >
              Redeem code
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InfoField;

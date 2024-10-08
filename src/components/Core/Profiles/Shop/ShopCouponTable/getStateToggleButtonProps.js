import { CouponState } from "@/constants";

const getStateToggleButtonProps = (state) => {
  switch (state) {
    case CouponState.Active:
      return {
        text: 'Pause',
        colour: 'blue-500',
        disabled: false,
      };
    case CouponState.Pause:
      return {
        text: 'Start',
        colour: 'green-500',
        disabled: false,
      };
    default:
      return {
        text: 'Pause',
        colour: 'blue-500',
        disabled: true,
      };
  }
};

export default getStateToggleButtonProps;

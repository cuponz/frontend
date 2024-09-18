import { UserType } from "../../../constants";
import { useUserStore } from "../../../store/user";

import LoadingSpinner from "../../Utils/LoadingSpinner";

const UserInfo = () => {
  const user = useUserStore(state => state.user);

  const getContactInfo = () => {
    if (user.email) {
      return user.email;
    } else if (user.phone_number) {
      return user.phone_number;
    } else {
      return "No contact information provided";
    }
  };

  if (!user) {
    return <LoadingSpinner />
  }

  return (
    <div className="container mx-auto justify-center">
      <div className="grid grid-cols-[auto_1fr] sm:gap-5 items-center p-6 gap-0">
        <div className="w-24 h-24">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="96"
            height="96"
            viewBox="0 0 132 132"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M111.252 114.041C117.812 107.878 123.037 100.434 126.606 92.1712C130.175 83.9081 132.01 75.0008 132 66C132 29.5477 102.452 0 66 0C29.5477 0 4.40623e-05 29.5477 4.40623e-05 66C-0.0103704 75.0008 1.82548 83.9081 5.3941 92.1712C8.96273 100.434 14.1883 107.878 20.7477 114.041C32.9793 125.596 49.174 132.023 66 132C82.826 132.023 99.0207 125.596 111.252 114.041ZM26.3662 105.343C31.1187 99.3969 37.1496 94.5981 44.0111 91.3028C50.8725 88.0074 58.3882 86.3001 66 86.3076C73.6118 86.3001 81.1274 88.0074 87.9889 91.3028C94.8504 94.5981 100.881 99.3969 105.634 105.343C100.449 110.58 94.2754 114.736 87.4718 117.569C80.6682 120.402 73.3698 121.856 66 121.846C58.6302 121.856 51.3318 120.402 44.5282 117.569C37.7246 114.736 31.5512 110.58 26.3662 105.343ZM91.3846 45.6923C91.3846 52.4247 88.7102 58.8814 83.9496 63.6419C79.1891 68.4025 72.7324 71.0769 66 71.0769C59.2676 71.0769 52.8109 68.4025 48.0504 63.6419C43.2898 58.8814 40.6154 52.4247 40.6154 45.6923C40.6154 38.9599 43.2898 32.5032 48.0504 27.7427C52.8109 22.9821 59.2676 20.3077 66 20.3077C72.7324 20.3077 79.1891 22.9821 83.9496 27.7427C88.7102 32.5032 91.3846 38.9599 91.3846 45.6923Z"
              fill="#46467A"
            />
          </svg>
        </div>
        <div className="ml-6">
          <h2 className="sm:text-2xl font-medium text-gray-900 text-lg">
            {user.name} ({Object.keys(UserType)[user.type]})
          </h2>
          <p className="sm:text-xl text-gray-500 text-sm">{getContactInfo()}</p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;

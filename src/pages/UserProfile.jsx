import UserInfo from "../components/Core/Profiles/UserInfo";
import MiniNav from "../components/Core/Profiles/UserProfileMiniNav";

function UserProfile() {
  return (
    <div>
      <div className="pt-16 sm:px-6">
        <UserInfo />
        <MiniNav />
      </div>
    </div>
  );
}

export default UserProfile;
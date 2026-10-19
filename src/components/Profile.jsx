import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProfileStore } from "../store/useProfileStore";

export default function Profile({ isCollapse }) {
  const { profile, getProfile } = useProfileStore();
  useEffect(() => {
    getProfile();
  }, [getProfile]);
  return (
    <Link
      to={"/profile"}
      className="flex items-center h-10 px-2.25 hover:bg-dark-second rounded-xl transition-all duration-300"
    >
      <div className="w-8! h-8! bg-link-hover rounded-full p-2 flex items-center justify-center font-medium text-sm shrink-0 text-white">
        {profile?.images?.length === 0 ? (
          <div>
            {profile.firstName.slice(0, 1)}
            {profile.lastName.slice(0, 1)}
          </div>
        ) : (
          <div>
            <img src={profile.images?.[0].url} alt="profile Image" />
          </div>
        )}
      </div>
      <span
        className={`whitespace-nowrap font-medium text-base transition-all duration-300 ease-in-out truncate ${isCollapse ? "opacity-0 max-w-0 ml-0" : "opacity-100 max-w-full ml-3"}`}
      >
        {profile.firstName} {profile.lastName}
      </span>
    </Link>
  );
}

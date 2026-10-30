import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useProfileStore } from "../store/useProfileStore";

export default function Profile({ isCollapse, setIsCollapse }) {
  const { profile, getProfile } = useProfileStore();
  const location = useLocation();
  useEffect(() => {
    getProfile();
  }, [getProfile]);

  if (!profile) return null;

  const isActive = location.pathname === `/profile`;

  return (
    <Link
      to={"/profile"}
      onClick={() => setIsCollapse(false)}
      className={`flex items-center h-10 px-2.25 rounded-xl transition-all duration-300 ${isActive ? "bg-link-hover" : "bg-transparent hover:bg-light-second dark:hover:bg-dark-second"}`}
    >
      <div className="w-8! h-8! bg-link-hover rounded-full overflow-hidden flex items-center justify-center font-medium text-sm shrink-0 text-white">
        {profile?.images?.length === 0 ? (
          <div>
            {profile?.firstName?.[0]}
            {profile.lastName?.[0]}
          </div>
        ) : (
          <div className="w-full h-full">
            <img src={profile.images?.[0].url} alt="" className="w-full h-full object-cover" />
          </div>
        )}
      </div>
      <span
        className={`whitespace-nowrap font-medium text-base text-black dark:text-white transition-all duration-300 ease-in-out truncate ${isCollapse ? "md:opacity-0 md:max-w-0 md:ml-0 ml-2" : "md:opacity-100 md:max-w-full md:ml-2"} ${isActive ? "text-white" : ""}`}
      >
        {profile.firstName} {profile.lastName}
      </span>
    </Link>
  );
}

import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useProfileStore } from "../store/useProfileStore";

export default function Profile({ isCollapse }) {
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
      className={`flex items-center h-10 px-2.25 rounded-xl transition-all duration-300 ${isActive ? "bg-link-hover" : "bg-transparent hover:bg-dark-second"}`}
    >
      <div className="w-8! h-8! bg-link-hover rounded-full overflow-hidden flex items-center justify-center font-medium text-sm shrink-0 text-white">
        {profile?.images?.length === 0 ? (
          <div>
            {profile?.firstName?.[0]}
            {profile.lastName?.[0]}
          </div>
        ) : (
          <div>
            <img src={profile.images?.[0].url} alt="" />
          </div>
        )}
      </div>
      <span
        className={`whitespace-nowrap font-medium text-base transition-all duration-300 ease-in-out truncate ${isCollapse ? "opacity-0 max-w-0 ml-0" : "opacity-100 max-w-full ml-2"}`}
      >
        {profile.firstName} {profile.lastName}
      </span>
    </Link>
  );
}

import { BadgeCheck, Camera, Trash } from "lucide-react";
import { useEffect } from "react";
import Loading from "../../components/Loading";
import PageHeader from "../../components/PageHeader";
import { useProfileStore } from "../../store/useProfileStore";

export default function ProfilePage() {
  const { profile, loading, error, getProfile } = useProfileStore();

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;
  return (
    <div>
      <PageHeader>
        <h1 className="font-medium text-xl leading-[110%]">Profile</h1>
      </PageHeader>
      {profile.length === 0 ? (
        <div>Profile topilmadi</div>
      ) : (
        <div>
          <div className="w-full md:w-[30%] bg-light-main dark:bg-dark-main p-4 rounded-lg shadow-lg">
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-link-hover relative overflow-hidden group">
                  {profile?.images?.length === 0 ? (
                    <div>
                      <h1 className="font-bold text-4xl text-white">
                        {profile.firstName[0]}
                        {profile.lastName[0]}
                      </h1>
                      <div className="group-hover:flex hidden absolute top-0 left-0 w-full h-full bg-black/50 items-center justify-center cursor-pointer">
                        <Camera className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <img src={profile.images?.[0].url} alt="profile image" />
                      <div className="group-hover:flex hidden absolute top-0 left-0 w-full h-full bg-black/50 items-center justify-center cursor-pointer">
                        <Trash className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  )}
                </div>
                <button
                  title="Admin"
                  className="absolute bottom-0 right-0 bg-white rounded-full p-0.5"
                >
                  <BadgeCheck className="text-link-hover" />
                </button>
              </div>
            </div>
            <div className="mt-4">
              <h1 className="font-medium text-lg leading-[110%] text-center">
                {profile.firstName} {profile.lastName}
              </h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

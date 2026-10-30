import { Plus, SquarePen, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loading from "../../components/Loading";
import NoData from "../../components/NoData";
import PageHeader from "../../components/PageHeader";
import Pagination from "../../components/Pagination";
import { useAnnouncementStore } from "../../store/useAnnouncementStore";
import { useNotificationStore } from "../../store/useNotificationStore";

export default function AnnouncementsPage() {
  const navigate = useNavigate();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const { showNotification } = useNotificationStore();

  const [confirm, setConfirm] = useState(false);
  const {
    announcements,
    totalPages,
    loading,
    error,
    getAnnouncements,
    deletAnnouncement,
  } = useAnnouncementStore();

  useEffect(() => {
    getAnnouncements(currentPage);
  }, [currentPage, getAnnouncements]);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
  };

  const handleDelete = async () => {
    if (!selectedId) return;

    setDeleteLoading(true);
    const res = await deletAnnouncement(selectedId);
    setDeleteLoading(false);
    setConfirm(false);

    if (res?.ok ?? true) {
      showNotification("success", "Yangilik muvaffaqiyatli o'chirildi");
      getAnnouncements(currentPage);
    } else {
      showNotification(
        "error",
        res?.data?.message || res?.message || "O'chirishda xatolik yuz berdi",
      );
    }
  };

  if (loading) return <Loading />;
  if (error) return <p>Error</p>;
  return (
    <div>
      <PageHeader>
        <h1 className="font-medium text-xl leading-[110%]">E'lonlar</h1>
        <button
          onClick={() => navigate("/announcements/add")}
          className="h-8 md:h-auto flex items-center gap-1 px-3 py-1 border border-link-hover rounded-lg text-link-hover font-medium"
        >
          <Plus className="w-5 h-5" />
          <span className="hidden md:block">E'lon qo'shish</span>
        </button>
      </PageHeader>
      {announcements.length === 0 ? (
        <NoData />
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 min-[1800px]:grid-cols-5! min-[2500px]:grid-cols-7! gap-4">
            {announcements.map((item) => (
              <div
                key={item.id}
                className="w-full bg-light-main dark:bg-dark-main rounded-lg shadow"
              >
                <div className="aspect-video overflow-hidden rounded-t-lg group mb-2 w-full">
                  <img
                    src={item.images[0].url}
                    alt={item.title.uz}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="px-2 pb-2 flex-1">
                  <h1 className="font-medium text-lg leading-[110%] line-clamp-2">
                    {item.title.uz}
                  </h1>
                  <div
                    dangerouslySetInnerHTML={{ __html: item.description.uz }}
                    className="line-clamp-3 text-sm leading-[130%] my-2"
                  ></div>
                  <div className="flex items-center">
                    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-2">
                      <button
                        onClick={() =>
                          navigate(`/announcements/add/${item.id}`)
                        }
                        className="w-full lg:w-auto px-2 py-1 flex items-center justify-center gap-1 border border-link-hover text-link-hover rounded-sm font-medium text-sm"
                      >
                        <SquarePen className="w-4 h-4" />
                        Tahrirlash
                      </button>
                      <button
                        onClick={() => {
                          setSelectedId(item.id);
                          setConfirm(true);
                        }}
                        disabled={deleteLoading}
                        className="w-full lg:w-auto px-2 py-1 flex items-center justify-center gap-1 border border-red-500 text-red-500 rounded-sm font-medium text-sm"
                      >
                        <Trash className="w-4 h-4" />
                        O'chirish
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="flex items-center justify-center pt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onChangePage={handlePageChange}
        />
      </div>
      <div
        onClick={() => {
          setConfirm(false);
        }}
        className={`absolute top-0 left-0 z-100 w-full h-full bg-black/70 flex items-center justify-center ${confirm ? "block" : "hidden"}`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-light-main dark:bg-dark-main p-6 rounded-lg"
        >
          <h2 className="font-medium text-xl max-w-50 text-center text-black dark:text-white">
            Haqiqattan ham o'chirmoqchimisiz?
          </h2>
          <div className="flex items-center justify-end gap-3 pt-6">
            <button
              onClick={() => setConfirm(false)}
              className="border border-black dark:border-white text-black dark:text-white px-3 py-1 rounded-sm"
            >
              Yo'q
            </button>
            <button
              disabled={deleteLoading}
              onClick={handleDelete}
              className="border border-link-hover text-white bg-link-hover px-3 py-1 rounded-sm"
            >
              Ha
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

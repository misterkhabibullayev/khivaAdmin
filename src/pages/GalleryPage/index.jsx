import { Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loading from "../../components/Loading";
import NoData from "../../components/NoData";
import PageHeader from "../../components/PageHeader";
import Pagination from "../../components/Pagination";
import { useGalleryStore } from "../../store/useGalleryStore";

export default function GalleryPage() {
  const navigate = useNavigate();
  const [deleteLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [confirm, setConfirm] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const { gallery, totalPages, loading, error, getGallery, deleteGallery } =
    useGalleryStore();

  useEffect(() => {
    getGallery(currentPage);
  }, [currentPage, getGallery]);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
  };

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;
  return (
    <div>
      <PageHeader>
        <h1 className="font-medium text-xl leading-[110%]">Galereya</h1>
        <button
          onClick={() => navigate("/gallery/add")}
          className="h-8 md:h-auto flex items-center gap-1 px-3 py-1 border border-link-hover rounded-lg text-link-hover font-medium"
        >
          <Plus className="w-5 h-5" />
          <span className="hidden md:block">Rasm qo'shish</span>
        </button>
      </PageHeader>
      {gallery.length === 0 ? (
        <NoData />
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
            {gallery.map((item) => (
              <div
                key={item.id}
                className="relative group w-full h-full bg-light-main dark:bg-dark-main rounded-lg shadow overflow-hidden"
              >
                <div className="aspect-video overflow-hidden group mb-2 w-full flex items-center justify-center">
                  <img
                    src={item.url}
                    alt={`gallery-${item.id}`}
                    className="absolute inset-0 w-full h-full object-cover origin-center"
                  />
                </div>
                <div className="absolute top-0 left-0 w-full h-full bg-black/50 hidden items-center justify-center p-3 group-hover:flex transition-all duration-300">
                  <button
                    onClick={() => {
                      setSelectedId(item.id);
                      setConfirm(true);
                    }}
                    disabled={deleteLoading}
                    className="w-full lg:w-auto px-2 py-1 flex items-center justify-center gap-1 border border-red-500 text-red-500 rounded-sm font-medium text-sm hover:bg-red-500 hover:text-white transition-all duration-300"
                  >
                    <Trash className="w-4 h-4" />
                    O'chirish
                  </button>
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
              onClick={async () => {
                await deleteGallery(selectedId);
                setConfirm(false);
              }}
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

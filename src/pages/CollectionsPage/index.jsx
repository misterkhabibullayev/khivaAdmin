import { Plus, SquarePen, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import PageHeader from "../../components/PageHeader";
import { useCollectionsStore } from "../../store/useCollectionsStore";

export default function CollectionsPage() {
  const navigate = useNavigate();
  const { collections, loading, error, getCollections, deleteCollection } =
    useCollectionsStore();

  const [deleteLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    getCollections();
  }, [getCollections]);

  if (loading) return <Loading />;
  if (error) return <p>Error</p>;
  return (
    <div>
      <PageHeader>
        <h1 className="font-medium text-xl leading-[110%]">Kolleksiyalar</h1>
        <button
          onClick={() => navigate("/collections/add")}
          className="flex items-center gap-1 px-3 py-1 border border-link-hover rounded-lg text-link-hover font-medium"
        >
          <Plus className="w-5 h-5" />
          Kolleksiya qo'shish
        </button>
      </PageHeader>
      {collections.length === 0 ? (
        <div>Ma'lumot yo'q</div>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {collections.map((item) => (
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
                  <p className="line-clamp-3 text-sm leading-[130%] my-2">
                    {item.description.uz}
                  </p>
                  <div className="flex items-center">
                    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-2">
                      <button
                        onClick={() => navigate(`/collections/add/${item.id}`)}
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
                await deleteCollection(selectedId);
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

import { Eye, Plus, SquarePen, Trash } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import PageHeader from "../../components/PageHeader";
import { useCollectionsStore } from "../../store/useCollectionsStore";
import { formatDate } from "../../utils/formDate";

export default function CollectionsPage() {
  const navigate = useNavigate();
  const { collections, loading, error, getCollections, deleteCollection } =
    useCollectionsStore();

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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {collections.map((item) => (
              <div
                key={item.id}
                className="w-full bg-light-main dark:bg-dark-main p-2 rounded-lg"
              >
                <div className="aspect-video  relative overflow-hidden rounded-lg group cursor-pointer">
                  <img
                    src={item.images[0].url}
                    alt={item.title.uz}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-black/40 items-center justify-center hidden group-hover:flex transition-all duration-300">
                    <Eye className="text-white w-5 h-5" />
                  </div>
                </div>
                <div>
                  <h1>{item.title.uz}</h1>
                  <span>Yaratildi: {formatDate(item.createdAt)}</span>
                </div>
                <div className="flex gap-2 items-center justify-center">
                  <button
                    onClick={() => navigate(`/employees/add/${item.id}`)}
                    className="w-28.5 px-3 py-1 flex items-center justify-center gap-1 border border-link-hover text-link-hover rounded-sm font-medium text-sm"
                  >
                    <SquarePen className="w-4 h-4" />
                    Tahrirlash
                  </button>
                  <button
                    className="w-28.5 px-3 py-1 flex items-center justify-center gap-1 border border-red-500 text-red-500 rounded-sm font-medium text-sm"
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
    </div>
  );
}

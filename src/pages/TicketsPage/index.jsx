import {
  Calendar,
  CheckCircle,
  Clock,
  Edit3,
  Plus,
  ShieldAlert,
  Trash2,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loading from "../../components/Loading";
import NoData from "../../components/NoData";
import PageHeader from "../../components/PageHeader";
import Pagination from "../../components/Pagination";
import { useTicketsStore } from "../../store/useTicketsStore";
import { formatDate } from "../../utils/formDate";

export default function TicketsPage() {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const [confirm, setConfirm] = useState(false);

  const {
    tickets,
    loading,
    error,
    ticketsTotalPages,
    getTickets,
    deleteTicket,
  } = useTicketsStore();

  useEffect(() => {
    getTickets?.(currentPage);
  }, [currentPage, getTickets]);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
  };

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;
  return (
    <div>
      <PageHeader>
        <h1 className="font-medium text-xl leading-[110%]">
          Chipta Ta'riflari
        </h1>
        <button
          onClick={() => navigate("/tickets/add")}
          className="h-8 md:h-auto flex items-center gap-1 px-3 py-1 border border-link-hover rounded-lg text-link-hover font-medium"
        >
          <Plus className="w-5 h-5" />
          <span className="hidden md:block">Chipta qo'shish</span>
        </button>
      </PageHeader>
      {tickets.length === 0 ? (
        <NoData />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {tickets.map((item) => (
            <div className="bg-light-main dark:bg-dark-main border border-link-hover rounded-lg p-5 flex flex-col justify-between shadow-lg">
              <div>
                <div className="flex flex-col gap-3 mb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-link-hover flex items-center justify-center">
                      {item.category}
                    </span>
                    <div className="text-xl font-extrabold text-link-hover">
                      {Number(item.price).toLocaleString()}{" "}
                      <span className="text-sm font-normal text-black/50 dark:text-white/50">
                        so'm
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white leading-snug">
                      {item.title?.uz}
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5 py-3 my-2 border-y border-link-hover text-sm">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-black dark:text-white" />
                    <span className="text-black dark:text-white">
                      Sig'im:{" "}
                      <strong className="text-black dark:text-white">
                        {item.personCount || 1} kishi
                      </strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-black dark:text-white" />
                    <span className="text-black dark:text-white">
                      Vaqt:{" "}
                      <strong className="text-black dark:text-white">
                        {item.visitingHours}
                      </strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-black dark:text-white" />
                    <span className="text-black dark:text-white">
                      Muddat:{" "}
                      <strong className="text-black dark:text-white">
                        {item.validDays || 1} kun
                      </strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ShieldAlert className="w-4 h-4 text-black dark:text-white" />
                    <span
                      className="truncate text-black dark:text-white"
                      title={item.ageRestriction}
                    >
                      Yosh:{" "}
                      <strong className="text-black dark:text-white">
                        {item.ageRestriction}
                      </strong>
                    </span>
                  </div>
                </div>

                <div className="mt-3">
                  <p className="text-sm font-semibold text-black dark:text-white mb-2 uppercase tracking-wider">
                    Kiritilgan xizmatlar:
                  </p>
                  <ul className="space-y-1.5">
                    {item.includedServices?.map((service, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm text-black/50 dark:text-white/50"
                      >
                        <CheckCircle className="w-4 h-4 text-link-hover shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-link-hover flex items-center justify-between">
                <span className="text-sm text-black dark:text-white">
                  Amal qiladi: {formatDate(item.validFrom)} —{" "}
                  {formatDate(item.validTo)}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate(`/tickets/add/${item.id}`)}
                    className="p-2 text-black dark:text-white hover:text-amber-500 hover:bg-amber-500/10 rounded-lg transition-colors cursor-pointer"
                    title="Tahrirlash"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedId(item.id);
                      setConfirm(true);
                    }}
                    className="p-2 text-black dark:text-white hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                    title="O'chirish"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center justify-center pt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={ticketsTotalPages}
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
                await deleteTicket(selectedId);
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

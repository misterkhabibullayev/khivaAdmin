import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";
import { useTicketsStore } from "../../store/useTicketsStore";
import { formatDate } from "../../utils/formDate";

export default function OrderTickets() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const { orders, ordersTotalPages, ordersLoading, error, getOrders } =
    useTicketsStore();
  useEffect(() => {
    getOrders?.(currentPage);
  }, [currentPage, getOrders]);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
  };

  if (ordersLoading) return <Loading />;
  if (error) return <p>{error}</p>;

  return (
    <div className="w-full">
      <div className="w-full overflow-x-auto p-3">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 xl:gap-7 min-w-max">
          {orders.map((item) => (
            <div
              key={item.id}
              className="flex items-stretch h-auto bg-link-hover relative text-white shadow-sm"
            >
              <div className="w-15 h-50 bg-link-hover flex items-center justify-center relative">
                <p className="-rotate-90 whitespace-nowrap font-bold text-xl">
                  {item.ticketNumber}
                </p>
              </div>
              <div className="flex flex-col items-center justify-between h-50">
                <div className="w-5 h-5 bg-light-second dark:bg-dark-second rounded-full -translate-y-1/2"></div>
                <div className="w-px flex-1 h-full border-l border-dashed border-light-main dark:border-dark-main"></div>
                <div className="w-5 h-5 bg-light-second dark:bg-dark-second rounded-full translate-y-1/2"></div>
              </div>
              <div className="w-full h-50 p-6 grid grid-cols-1 grid-rows-3 gap-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm uppercase font-medium">
                      Xaridor:
                    </span>
                    <h1 className="font-bold text-xl">{item.customerName}</h1>
                  </div>
                  <div className="px-3 py-1 bg-light-second dark:bg-dark-second rounded-2xl text-black dark:text-white">
                    <p className="text-sm">{item.status}</p>
                  </div>
                </div>
                <div className="w-full grid grid-cols-3">
                  <div>
                    <p className="text-sm font-medium">Tashrif sanasi</p>
                    <p className="font-bold">{formatDate(item.visitDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Kishilar soni</p>
                    <p className="font-bold">{item.totalPersons}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Telefon</p>
                    <p className="font-bold">{item.customerPhone}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-medium">
                    Amal qilish muddati {formatDate(item.validUntil)}
                  </p>
                  <p className="font-mono">ID: {item.id.slice(0, 12)}...</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center pt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={ordersTotalPages}
          onChangePage={handlePageChange}
        />
      </div>
    </div>
  );
}

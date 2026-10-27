import { Eye, Plus, SquarePen, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loading from "../../components/Loading";
import NoData from "../../components/NoData";
import PageHeader from "../../components/PageHeader";
import Pagination from "../../components/Pagination";
import { Icons } from "../../icons/Icons";
import { useEmployeesStore } from "../../store/useEmployeesStore";

export default function EmployeesPage() {
  const {
    employees,
    totalPages,
    loading,
    error,
    getEmployees,
    deleteEmployee,
  } = useEmployeesStore();
  const [deleteLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

  const [confirm, setConfirm] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    getEmployees(currentPage);
  }, [currentPage, getEmployees]);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
  };

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;

  return (
    <div className="">
      <PageHeader>
        <h1 className="font-medium text-xl leading-[110%]">Xodimlar</h1>
        <button
          onClick={() => navigate("/employees/add")}
          className="h-8 md:h-auto flex items-center gap-1 px-3 py-1 border border-link-hover rounded-lg text-link-hover font-medium"
        >
          <Plus className="w-5 h-5" />
          <span className="hidden md:block">Xodim qo'shish</span>
        </button>
      </PageHeader>
      {employees.length === 0 ? (
        <NoData />
      ) : (
        <PhotoProvider>
          <div className="w-full bg-light-main dark:bg-dark-main rounded-xl shadow-sm border border-link-hover overflow-hidden whitespace-nowrap">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50 dark:bg-link-hover/50 border-b border-link-hover text-xs font-semibold text-black dark:text-white uppercase tracking-wider ">
                    <th className="py-2 px-3 w-18">Rasm</th>
                    <th className="py-2 px-3">F.I.Sh</th>
                    <th className="py-2 px-3">Tug'ilgan kuni</th>
                    <th className="py-2 px-3">Lavozimi</th>
                    <th className="py-2 px-3 text-center">Amallar</th>
                  </tr>
                </thead>
                <tbody className="w-full divide-y divide-link-hover text-sm text-gray-700 dark:text-white">
                  {employees.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50/50 dark:hover:bg-dark-second transition-colors"
                    >
                      <td className="py-2 px-3 flex items-start justify-center">
                        <PhotoView src={item.images[0].url}>
                          <div className="relative w-8 h-8 overflow-hidden rounded-full group transition-all duration-300 cursor-pointer border border-gray-200">
                            <img
                              src={item.images[0].url}
                              alt={item.fullName}
                              className="w-full h-full object-cover object-top"
                            />
                            <div className="absolute top-0 left-0 w-full h-full bg-black/40 items-center justify-center hidden group-hover:flex transition-all duration-300">
                              <Eye className="text-white w-4 h-4" />
                            </div>
                          </div>
                        </PhotoView>
                      </td>
                      <td className="py-2 px-3">
                        <h3 className="font-medium text-base whitespace-normal">
                          {item.fullName}
                        </h3>
                      </td>
                      <td className="py-2 px-3">
                        <span className="text-gray-500 dark:text-light-second pt-2">
                          {item.birthDate
                            ? item.birthDate.split("-").reverse().join("-")
                            : "Ko'rsatilmagan"}
                        </span>
                      </td>
                      <td className="py-2 px-3">
                        <p className="text-left whitespace-normal">
                          {item.position?.uz || "Ko'rsatilmagan"}
                        </p>
                      </td>
                      <td className="py-2 px-3">
                        <div className="flex gap-2 items-center justify-center">
                          <button
                            onClick={() =>
                              navigate(`/employees/add/${item.id}`)
                            }
                            className="w-28.5 px-3 py-1 flex items-center justify-center gap-1 border border-link-hover text-link-hover rounded-sm font-medium text-sm"
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
                            className="w-28.5 px-3 py-1 flex items-center justify-center gap-1 border border-red-500 text-red-500 rounded-sm font-medium text-sm"
                          >
                            {deleteLoading ? (
                              <Icons.smallLoadingIcon className="w-4 h-4" />
                            ) : (
                              <Trash className="w-4 h-4" />
                            )}
                            O'chirish
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </PhotoProvider>
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
          if (!deleteLoading) setConfirm(false);
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
                await deleteEmployee(selectedId);
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

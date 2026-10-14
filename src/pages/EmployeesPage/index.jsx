import { Link } from "react-router-dom";
import { useEmployeesStore } from "../../store/useEmployeesStore";
import { useEffect } from "react";
import Loading from "../../components/Loading";
import { CalendarDays, Plus, SquarePen, Trash } from "lucide-react";

export default function EmployeesPage() {
  const { employees, loading, error, getEmployees } = useEmployeesStore();

  useEffect(() => {
    getEmployees();
  }, [getEmployees]);

  if (loading) return <Loading />;
  if (error) return <p>Error</p>;
  return (
    <div>
      <div className="relative">
        <div className="sticky top-0 left-0 flex flex-col items-center justify-between">
          <div className="h-6 bg-light-second w-full"></div>
          <div className="bg-light-second w-full">
            <div className="flex items-center justify-between w-full bg-light-main px-4 py-2 rounded-lg shadow-lg">
              <h2 className="font-semibold text-xl">Xodimlar</h2>
              <Link
                to={"/employees/add"}
                className="px-4 py-2 bg-link-hover text-white text-base rounded-lg flex items-center gap-1"
              >
                <Plus />
                Xodim qo'shish
              </Link>
            </div>
          </div>
        </div>
        <div className="py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {employees.map((item) => (
              <div key={item.id} className="bg-white p-3 rounded-lg shadow">
                <div className="rounded-full overflow-hidden aspect-square w-40 flex items-start justify-center mx-auto my-3">
                  <img src={item?.images?.[0].url} alt="image" />
                </div>
                <h2 className="font-medium text-lg text-center leading-[110%]">
                  {item.fullName}
                </h2>
                <p className="text-base text-center leading-[130%] my-3">
                  {item?.position?.uz}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-base text-gray-500 flex items-center gap-1 justify-center">
                    <CalendarDays className="text-gray-500 w-5 h-5" />
                    {item?.birthDate}
                  </p>
                  <div className="flex items-center gap-2">
                    <button className="px-2 py-1 bg-link-hover text-white rounded-lg">
                      <SquarePen className="w-5 h-5" />
                    </button>
                    <button className="px-2 py-1 bg-red-600 rounded-lg text-white">
                      <Trash className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

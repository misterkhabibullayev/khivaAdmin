import { useEmployeesStore } from "../../store/useEmployeesStore";
import { useEffect } from "react";
import { Eye, Plus, SquarePen, Trash } from "lucide-react";
import PageHeader from "../../components/PageHeader";
import { Link } from "react-router-dom";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import EmployeesSkeleton from "../../components/EmployeesSkeleton";

export default function EmployeesPage() {
  const { employees, loading, error, getEmployees } = useEmployeesStore();

  useEffect(() => {
    getEmployees();
  }, [getEmployees]);

  if (loading) return <EmployeesSkeleton />;
  if (error) return <p>Error</p>;
  return (
    <div>
      <PageHeader>
        <h1 className="font-medium text-xl leading-[110%]">Xodimlar</h1>
        <Link
          to={"/employees/add"}
          className="flex items-center gap-1 px-4 py-1 bg-link-hover rounded-lg text-white"
        >
          <Plus className="w-5 h-5" />
          Xodim qo'shish
        </Link>
      </PageHeader>
      <PhotoProvider>
        <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-200 text-xs font-semibold text-black uppercase tracking-wider">
                  <th className="py-3.5 px-4 w-22">Rasm</th>
                  <th className="py-3.5 px-4">F.I.Sh / Tug'ilgan kuni</th>
                  <th className="py-3.5 px-4">Lavozimi</th>
                  <th className="py-3.5 px-4 text-center">Amallar</th>
                </tr>
              </thead>
              <tbody className="w-full divide-y divide-gray-200 text-sm text-gray-700">
                {employees.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="py-2 px-4 flex items-start">
                      <PhotoView src={item.images[0].url}>
                        <div className="relative w-13 h-13 overflow-hidden rounded-full group transition-all duration-300 cursor-pointer">
                          <img
                            src={item.images[0].url}
                            alt={item.fullName}
                            className="w-full h-full object-cover border border-gray-200"
                          />
                          <div className="absolute top-0 left-0 w-full h-full bg-black/40 items-center justify-center hidden group-hover:flex transition-all duration-300">
                            <Eye className="text-white w-4.5 h-4.5" />
                          </div>
                        </div>
                      </PhotoView>
                    </td>
                    <td className="py-2 px-4">
                      <h3 className="font-medium text-base">{item.fullName}</h3>
                      <span className="text-gray-500 pt-2">
                        {item.birthDate}
                      </span>
                    </td>
                    <td className="py-2 px-4">
                      <p className="text-left">
                        {item.position?.uz || "Ko'rsatilmagan"}
                      </p>
                    </td>
                    <td className="py-2">
                      <div className="flex flex-col gap-2 items-center">
                        <button className="w-28.5 px-3 py-0.5 flex items-center justify-center gap-1 bg-link-hover text-white rounded-sm text-sm">
                          <SquarePen className="w-4.5 h-4.5" />
                          Tahrirlash
                        </button>
                        <button className="w-28.5 px-3 py-0.5 flex items-center justify-center gap-1 bg-red-500 text-white rounded-sm">
                          <Trash className="w-4.5 h-4.5" />
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
    </div>
  );
}

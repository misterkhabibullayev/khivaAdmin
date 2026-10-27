import { Hash, Mail, Plus, Trash, UserCheck, UserShield } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import NoData from "../../components/NoData";
import PageHeader from "../../components/PageHeader";
import { useAdminsStore } from "../../store/useAdminsStore";

export default function AdminsPage() {
  const { admins, loading, error, getAdmins, deleteAdmin } = useAdminsStore();

  const [deleteLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getAdmins();
  }, [getAdmins]);

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;
  return (
    <div>
      <PageHeader>
        <h1 className="font-medium text-xl leading-[110%]">Adminlar</h1>
        <button
          onClick={() => navigate("/admins/add")}
          className="h-8 md:h-auto flex items-center gap-1 px-3 py-1 border border-link-hover rounded-lg text-link-hover font-medium"
        >
          <Plus className="w-5 h-5" />
          <span className="hidden md:block">Admin qo'shish</span>
        </button>
      </PageHeader>
      {admins.length === 0 ? (
        <NoData />
      ) : (
        <div className="overflow-x-auto rounded-t-xl border border-link-hover bg-light-main dark:bg-dark-main">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-link-hover/50 border-b border-link-hover text-xs font-semibold text-black dark:text-white uppercase tracking-wider ">
                <th className="py-2 px-3">
                  <Hash className="w-3.5 h-3.5" />
                </th>
                <th className="py-2 px-3">F.I.Sh</th>
                <th className="py-2 px-3">Email</th>
                <th className="py-2 px-3">Rol</th>
                <th className="py-2 px-3">Holati</th>
                <th className="py-2 px-3">Ro'yxatdan o'tgan</th>
                <th className="py-2 px-3">Amallar</th>
              </tr>
            </thead>
            <tbody className="w-full divide-y divide-link-hover text-sm text-gray-700 dark:text-white">
              {admins.map((item, index) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50/50 dark:hover:bg-dark-second transition-colors"
                >
                  <td className="py-2 px-3">{index + 1}</td>
                  <td className="py-2 px-3">
                    <h3 className="font-medium text-base whitespace-normal">
                      {item.firstName} {item.lastName}
                    </h3>
                  </td>
                  <td className="py-2 px-3">
                    <span className="text-gray-500 dark:text-light-second flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5" />
                      {item.email}
                    </span>
                  </td>
                  <td className="py-2 px-3">
                    <span className="text-gray-500 dark:text-light-second flex items-center gap-1 capitalize">
                      <UserShield className="w-3.5 h-3.5" />
                      {item.role}
                    </span>
                  </td>
                  <td className="py-2 px-3">
                    <p className="text-left whitespace-normal flex items-center gap-1">
                      <UserCheck className="w-3.5 h-3.5" />
                      {item.emailVerified ? "Tasdiqlangan" : "Tasdiqlanmagan"}
                    </p>
                  </td>
                  <td className="py-2 px-3">
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="py-2 px-3">
                    <button
                      onClick={() => {
                        setSelectedId(item.id);
                        setConfirm(true);
                      }}
                      disabled={deleteLoading}
                      className="w-28.5 px-3 py-1 flex items-center justify-center gap-1 border border-red-500 text-red-500 rounded-sm font-medium text-sm"
                    >
                      <Trash className="w-4 h-4" />
                      O'chirish
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
                await deleteAdmin(selectedId);
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

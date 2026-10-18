import { Hash, Mail, Shield, UserCheck } from "lucide-react";
import { useEffect } from "react";
import Loading from "../../components/Loading";
import PageHeader from "../../components/PageHeader";
import { useUsersStore } from "../../store/useUsersStore";

export default function UsersPage() {
  const { users, loading, error, getUsers } = useUsersStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  console.log(users);

  if (loading) return <Loading />;
  if (error) return <div className="p-4">Xatolik yuz berdi {error}</div>;
  return (
    <>
      <PageHeader>
        <h1 className="font-medium text-xl leading-[110%]">Foydalanuvchilar</h1>
        <span className="text-xs text-zinc-400">
          Jami: {Array.isArray(users) ? users.length : 0} ta
        </span>
      </PageHeader>
      <div className="mt-4">
        {!Array.isArray(users) || users.length === 0 ? (
          <div className="text-center py-12 text-zinc-500 bg-light-main dark:bg-dark-main rounded-xl border border-zinc-800">
            Foydalanuvchilar topilmadi
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-light-main dark:bg-dark-main">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50 dark:bg-link-hover/50 border-b border-link-hover text-xs font-semibold text-white uppercase tracking-wider ">
                  <th className="py-2 px-3">
                    <Hash className="w-3.5 h-3.5" />
                  </th>
                  <th className="py-2 px-3">F.I.Sh</th>
                  <th className="py-2 px-3">Email</th>
                  <th className="py-2 px-3">Rol</th>
                  <th className="py-2 px-3">Holati</th>
                  <th className="py-2 px-3">Ro'yxatdan o'tgan</th>
                </tr>
              </thead>
              <tbody className="w-full divide-y divide-link-hover text-sm text-gray-700 dark:text-white">
                {users.map((item, index) => (
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
                    <td className="py-2 px-3 flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5" />
                      {item.email}
                    </td>
                    <td className="py-2 px-3">
                      <span className="text-gray-500 dark:text-light-second flex items-center gap-1 capitalize">
                        <Shield className="w-3.5 h-3.5" />
                        {item.role}
                      </span>
                    </td>
                    <td className="py-2 px-3">
                      <p className="text-left whitespace-normal flex items-center gap-1">
                        <UserCheck className="w-3.5 h-3.5" />
                        {item.emailVerified ? "Tasdiqlangan" : ""}
                      </p>
                    </td>
                    <td className="py-2 px-3">
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString()
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

import { Eye, Hash, Mail, Phone, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Loading from "../../components/Loading";
import NoData from "../../components/NoData";
import PageHeader from "../../components/PageHeader";
import Pagination from "../../components/Pagination";
import { useInquiriesStore } from "../../store/useInquiriesStroe";

export default function InquiriesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [deleteLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [confirm, setConfirm] = useState(false);

  const [expandedId, setExpandedId] = useState(null);

  const toggleAccordion = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };
  const currentPage = Number(searchParams.get("page")) || 1;
  const {
    inquiries,
    totalPages,
    loading,
    error,
    getInquiries,
    deleteInquiries,
  } = useInquiriesStore();

  useEffect(() => {
    getInquiries(currentPage);
  }, [currentPage, getInquiries]);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
  };

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;
  return (
    <div>
      <PageHeader>
        <h1 className="font-medium text-xl leading-[110%]">So'rovlar</h1>
      </PageHeader>
      {inquiries.length === 0 ? (
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
                <th className="py-2 px-3">Phone</th>
                <th className="py-2 px-3">Yuborgan vaqti</th>
                <th className="py-2 px-3 text-center">Xabarni ko'rish</th>
                <th className="py-2 px-3 text-center">Amallar</th>
              </tr>
            </thead>
            <tbody className="w-full divide-y divide-link-hover text-sm text-gray-700 dark:text-white">
              {inquiries.map((item, index) => {
                const isExpanded = expandedId === item.id;
                return (
                  <React.Fragment key={item.id}>
                    <tr className="hover:bg-gray-50/50 dark:hover:bg-dark-second transition-colors">
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
                          <Phone className="w-3.5 h-3.5" />
                          {item.phone}
                        </span>
                      </td>
                      <td className="py-2 px-3">
                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleDateString()
                          : "-"}
                      </td>
                      <td className="py-2 px-3 flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => toggleAccordion(item.id)}
                          className={`px-3 py-1 flex items-center justify-center gap-1 border border-link-hover text-link-hover rounded-sm font-medium text-sm transition-colors ${isExpanded ? "bg-link-hover text-white" : ""}`}
                        >
                          <Eye className="w-4 h-4" />
                          Ko'rish
                        </button>
                      </td>
                      <td className="py-2 px-3">
                        <button
                          onClick={() => {
                            setSelectedId(item.id);
                            setConfirm(true);
                          }}
                          disabled={deleteLoading}
                          className="px-3 py-1 flex items-center justify-center gap-1 border border-red-500 text-red-500 rounded-sm font-medium text-sm mx-auto"
                        >
                          <Trash className="w-4 h-4" />
                          O'chirish
                        </button>
                      </td>
                    </tr>
                    <tr
                      className={`bg-light-second dark:bg-dark-second transition-colors duration-300 ${
                        !isExpanded ? "border-transparent" : ""
                      }`}
                    >
                      <td colSpan={7} className="p-0">
                        <div
                          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                            isExpanded
                              ? "grid-rows-[1fr] opacity-100"
                              : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <div className="px-6 py-3">
                              <span className="text-xs font-semibold uppercase tracking-wider text-link-hover">
                                Murojaat xabari:
                              </span>
                              <p className="mt-1 text-sm font-normal text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap wrap-break-words">
                                {item.message || "Xabar matni mavjud emas."}
                              </p>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
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
                await deleteInquiries(selectedId);
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

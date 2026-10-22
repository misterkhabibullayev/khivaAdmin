import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Loading from "../../components/Loading";
import NoData from "../../components/NoData";
import PageHeader from "../../components/PageHeader";
import Pagination from "../../components/Pagination";
import { useInquiriesStore } from "../../store/useInquiriesStroe";

export default function InquiriesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const { inquiries, totalPages, loading, error, getInquiries } =
    useInquiriesStore();

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
        <div>
          <div>
            {inquiries.map((item) => (
              <div key={item.id}>
                <h1>
                  {item.firstName} {item.lastName}
                </h1>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="flex items-center justify-center pt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onChangePage={handlePageChange}
        />
      </div>
    </div>
  );
}

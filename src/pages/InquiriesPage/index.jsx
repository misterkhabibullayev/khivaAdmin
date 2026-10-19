import { useEffect } from "react";
import Loading from "../../components/Loading";
import PageHeader from "../../components/PageHeader";
import { useInquiriesStore } from "../../store/useInquiriesStroe";

export default function InquiriesPage() {
  const { inquiries, loading, error, getInquiries } = useInquiriesStore();
  console.log(inquiries);

  useEffect(() => {
    getInquiries();
  }, [getInquiries]);

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;
  return (
    <div>
      <PageHeader>
        <h1 className="font-medium text-xl leading-[110%]">So'rovlar</h1>
      </PageHeader>
      {inquiries.length === 0 ? (
        <div></div>
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
    </div>
  );
}

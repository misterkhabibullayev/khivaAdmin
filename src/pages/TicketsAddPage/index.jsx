import PageHeader from "../../components/PageHeader";

export default function TicketsAddPage() {
  return (
    <div>
      <PageHeader>
        <h1 className="font-medium text-xl leading-[110%]">Chipta qo'shish</h1>
      </PageHeader>
      <div>
        <button>Chipta ta'riflari</button>
        <button>Buyurtma qilingan chiptalar</button>
      </div>
    </div>
  );
}

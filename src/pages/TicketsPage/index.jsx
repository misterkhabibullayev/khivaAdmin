import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";

export default function TicketsPage() {
  const navigate = useNavigate();
  return (
    <div>
      <PageHeader>
        <h1 className="font-medium text-xl leading-[110%]">Chiptalar</h1>
        <button
          onClick={() => navigate("/tickets/add")}
          className="h-8 md:h-auto flex items-center gap-1 px-3 py-1 border border-link-hover rounded-lg text-link-hover font-medium"
        >
          <Plus className="w-5 h-5" />
          <span className="hidden md:block">Chipta qo'shish</span>
        </button>
      </PageHeader>
      <div></div>
    </div>
  );
}

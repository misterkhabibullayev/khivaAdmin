import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function EmployeesAddPage() {
  return (
    <div className="py-6">
      <div className="flex justify-between">
        <Link to={"/employees"}>
          <ArrowLeft />
        </Link>
        <div className="w-1/2">
          <form>
            <div className="flex flex-col gap-2">
              <label htmlFor="fullName">Ism Familiya F.I.Sh</label>
              <input type="text" className="outline-none border border-black rounded-lg p-2" />
            </div>
          </form>
        </div>
        <div className="w-6 h-6"></div>
      </div>
    </div>
  );
}

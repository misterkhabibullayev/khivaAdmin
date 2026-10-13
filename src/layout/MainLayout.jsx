import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Aside from "../components/Aside";

export default function MainLayout() {
  return (
    <>
      <div className="flex h-screen w-full overflow-hidden bg-light-main">
        <Aside />
        <div className="flex flex-1 flex-col h-full min-w-0">
          <Header />
          <main className="flex-1 overflow-y-auto p-6 bg-light-second">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

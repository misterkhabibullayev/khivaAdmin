import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Aside from "../components/Aside";
import { Suspense } from "react";
import MainLoading from "../components/MainLoading";

export default function MainLayout() {
  return (
    <>
      <div className="flex w-full h-screen overflow-hidden bg-light-main">
        <Aside />
        <div className="flex flex-1 flex-col h-full min-w-0">
          <Header />
          <main className="flex-1 overflow-y-auto bg-light-second p-6">
            <Suspense fallback={<MainLoading />}>
              <Outlet />
            </Suspense>
          </main>
        </div>
      </div>
    </>
  );
}

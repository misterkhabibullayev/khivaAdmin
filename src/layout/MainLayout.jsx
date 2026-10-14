import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Aside from "../components/Aside";
import { Suspense } from "react";
// import Loading from "../components/Loading";

export default function MainLayout() {
  return (
    <>
      <div className="flex w-full min-h-screen overflow-hidden bg-light-main">
        <Aside />
        <div className="flex flex-1 flex-col h-full min-w-0 overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto bg-light-second">
            <Suspense>
              <div className="p-6">
                <Outlet />
              </div>
            </Suspense>
          </main>
        </div>
      </div>
    </>
  );
}

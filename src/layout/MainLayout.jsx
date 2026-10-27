import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Aside from "../components/Aside";
import Header from "../components/Header";
import MainLoading from "../components/MainLoading";
import Notification from "../components/Notifications";
import { useNotificationStore } from "../store/useNotificationStore";

export default function MainLayout() {
  const { notification, closeNotification } = useNotificationStore();
  return (
    <>
      <div className="flex w-full h-screen overflow-hidden bg-light-main dark:bg-dark-main">
        <Aside />
        <div className="flex flex-1 flex-col h-full min-w-0">
          <Header />
          <main className="flex-1 overflow-y-overlay overflow-x-hidden bg-light-second dark:bg-dark-second p-6">
            <Suspense fallback={<MainLoading />}>
              <Outlet />
            </Suspense>
          </main>
        </div>
        <Notification message={notification} onClose={closeNotification} />
      </div>
    </>
  );
}

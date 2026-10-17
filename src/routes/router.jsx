import { ProtectedRoute } from "../components/Routes/ProtectedRoute";
import { PublicRoute } from "../components/Routes/PublicRoute";
import MainLayout from "../layout/MainLayout";
import {
  AdminsPage,
  AnnouncementsPage,
  CollectionsAddPage,
  CollectionsPage,
  EmployeesAddPage,
  EmployeesPage,
  GalleryPage,
  HomePage,
  InquiriesPage,
  LoginPage,
  NewsPage,
  TicketsPage,
  UsersPage,
} from "../pages";

export const router = [
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "/news",
            element: <NewsPage />,
          },
          {
            path: "/admins",
            element: <AdminsPage />,
          },
          {
            path: "employees",
            element: <EmployeesPage />,
          },
          {
            path: "employees/add",
            element: <EmployeesAddPage />,
          },
          {
            path: "employees/add/:id",
            element: <EmployeesAddPage />,
          },
          {
            path: "collections",
            element: <CollectionsPage />,
          },
          {
            path: "collections/add",
            element: <CollectionsAddPage />
          },
          {
            path: "announcements",
            element: <AnnouncementsPage />,
          },
          {
            path: "gallery",
            element: <GalleryPage />,
          },
          {
            path: "users",
            element: <UsersPage />,
          },
          {
            path: "inquiries",
            element: <InquiriesPage />,
          },
          {
            path: "tickets",
            element: <TicketsPage />,
          },
        ],
      },
    ],
  },
];

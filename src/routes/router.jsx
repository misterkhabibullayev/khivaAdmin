import { ProtectedRoute } from "../components/Routes/ProtectedRoute";
import { PublicRoute } from "../components/Routes/PublicRoute";
import MainLayout from "../layout/MainLayout";
import {
  AdminAddPage,
  AdminsPage,
  AnnouncementsAddPage,
  AnnouncementsPage,
  CollectionsAddPage,
  CollectionsPage,
  EmployeesAddPage,
  EmployeesPage,
  GalleryAddPage,
  GalleryPage,
  HomePage,
  InquiriesPage,
  LoginPage,
  NewsAddPage,
  NewsPage,
  ProfilePage,
  TicketsPage,
  UsersPage,
} from "../pages";
import TicketsAddPage from "../pages/TicketsAddPage";

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
            path: "/news/add",
            element: <NewsAddPage />,
          },
          {
            path: "/news/add/:newsId",
            element: <NewsAddPage />,
          },
          {
            path: "/admins",
            element: <AdminsPage />,
          },
          {
            path: "/admins/add",
            element: <AdminAddPage />,
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
            element: <CollectionsAddPage />,
          },
          {
            path: "collections/add/:cid",
            element: <CollectionsAddPage />,
          },
          {
            path: "announcements",
            element: <AnnouncementsPage />,
          },
          {
            path: "announcements/add",
            element: <AnnouncementsAddPage />,
          },
          {
            path: "announcements/add/:anId",
            element: <AnnouncementsAddPage />,
          },
          {
            path: "gallery",
            element: <GalleryPage />,
          },
          {
            path: "gallery/add",
            element: <GalleryAddPage />,
          },
          {
            path: "",
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
          {
            path: "tickets/add",
            element: <TicketsAddPage />,
          },
          {
            path: "profile",
            element: <ProfilePage />,
          },
        ],
      },
    ],
  },
];

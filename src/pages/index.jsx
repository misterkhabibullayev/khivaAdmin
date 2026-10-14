import { lazy } from "react";

const HomePage = lazy(() => import("./HomePage"));
const AdminsPage = lazy(() => import("./AdminsPage"));
const NewsPage = lazy(() => import("./NewsPage"));
const LoginPage = lazy(() => import("./LoginPage"));
const EmployeesPage = lazy(() => import("./EmployeesPage"));
const EmployeesAddPage = lazy(() => import("./EmployeesAddPage"));
const CollectionsPage = lazy(() => import("./CollectionsPage"));
const AnnouncementsPage = lazy(() => import("./Announcements"));
const GalleryPage = lazy(() => import("./GalleryPage"));
const UsersPage = lazy(() => import("./UsersPage"));
const InquiriesPage = lazy(() => import("./InquiriesPage"));
const TicketsPage = lazy(() => import("./TicketsPage"));

export {
  HomePage,
  AdminsPage,
  NewsPage,
  LoginPage,
  EmployeesPage,
  EmployeesAddPage,
  CollectionsPage,
  AnnouncementsPage,
  GalleryPage,
  UsersPage,
  InquiriesPage,
  TicketsPage,
};

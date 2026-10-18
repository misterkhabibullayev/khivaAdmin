import { lazy } from "react";

const HomePage = lazy(() => import("./HomePage"));
const AdminsPage = lazy(() => import("./AdminsPage"));
const NewsPage = lazy(() => import("./NewsPage"));
const NewsAddPage = lazy(() => import("./NewsAddPage"));
const LoginPage = lazy(() => import("./LoginPage"));
const EmployeesPage = lazy(() => import("./EmployeesPage"));
const EmployeesAddPage = lazy(() => import("./EmployeesAddPage"));
const CollectionsPage = lazy(() => import("./CollectionsPage"));
const CollectionsAddPage = lazy(() => import("./CollectionsAddPage"));
const AnnouncementsPage = lazy(() => import("./Announcements"));
const AnnouncementsAddPage = lazy(() => import("./AnnounCementsAddPage"));
const GalleryPage = lazy(() => import("./GalleryPage"));
const GalleryAddPage = lazy(() => import("./GalleryAddPage"));
const UsersPage = lazy(() => import("./UsersPage"));
const InquiriesPage = lazy(() => import("./InquiriesPage"));
const TicketsPage = lazy(() => import("./TicketsPage"));

export {
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
  TicketsPage,
  UsersPage,
};

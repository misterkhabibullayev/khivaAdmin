import {
  Image,
  Layers,
  Mail,
  Megaphone,
  Newspaper,
  Ticket,
  TicketCheck,
  Users,
  UserShield,
} from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import PageHeader from "../../components/PageHeader";
import { useAdminsStore } from "../../store/useAdminsStore";
import { useAnnouncementStore } from "../../store/useAnnouncementStore";
import { useCollectionsStore } from "../../store/useCollectionsStore";
import { useEmployeesStore } from "../../store/useEmployeesStore";
import { useGalleryStore } from "../../store/useGalleryStore";
import { useInquiriesStore } from "../../store/useInquiriesStroe";
import { useNewsStore } from "../../store/useNewsStore";
import { useTicketsStore } from "../../store/useTicketsStore";
import { useUsersStore } from "../../store/useUsersStore";

export default function HomePage() {
  const { users, loading, error, getUsers } = useUsersStore();
  const { employees, getEmployees } = useEmployeesStore();
  const { collections, getCollections } = useCollectionsStore();
  const { announcements, getAnnouncements } = useAnnouncementStore();
  const { news, getNews } = useNewsStore();
  const { gallery, getGallery } = useGalleryStore();
  const { inquiries, getInquiries } = useInquiriesStore();
  const { tickets, getTickets } = useTicketsStore();
  const { orders, getOrders } = useTicketsStore();
  const { admins, getAdmins } = useAdminsStore();

  useEffect(() => {
    getUsers?.();
    getEmployees?.();
    getCollections?.();
    getAnnouncements?.();
    getNews?.();
    getGallery?.();
    getInquiries?.();
    getTickets?.();
    getOrders?.();
    getAdmins?.();
  }, [
    getUsers,
    getEmployees,
    getCollections,
    getAnnouncements,
    getNews,
    getGallery,
    getInquiries,
    getTickets,
    getOrders,
    getAdmins,
  ]);

  const stats1 = [
    {
      id: 1,
      title: "Foydalanuvchilar",
      count: users.length || 0,
      icon: Users,
      path: "/users",
    },
    {
      id: 2,
      title: "So'rovlar",
      count: inquiries.length || 0,
      icon: Mail,
      path: "/inquiries",
    },
    {
      id: 3,
      title: "Sotilgan Chiptalar",
      count: orders.length || 0,
      icon: TicketCheck,
      path: "/ordertickets",
    },
    {
      id: 4,
      title: "Adminlar",
      count: admins.length || 0,
      icon: UserShield,
      path: "/admins",
    },
  ];

  const stats = [
    {
      id: 1,
      title: "Xodimlar",
      count: employees.length || 0,
      icon: UserShield,
      path: "/employees",
    },
    {
      id: 2,
      title: "Kolleksiyalar",
      count: collections.length || 0,
      icon: Layers,
      path: "/collections",
    },
    {
      id: 3,
      title: "Yangiliklar",
      count: news.length || 0,
      icon: Newspaper,
      path: "/news",
    },
    {
      id: 4,
      title: "E'lonlar",
      count: announcements.length || 0,
      icon: Megaphone,
      path: "/announcements",
    },
    {
      id: 5,
      title: "Galereya",
      count: gallery.length || 0,
      icon: Image,
      path: "/gallery",
    },
    {
      id: 6,
      title: "Chipta Ta'riflari",
      count: tickets.length || 0,
      icon: Ticket,
      path: "/tickets",
    },
  ];

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <PageHeader>
        <h1 className="font-medium text-xl leading-[110%] text-black dark:text-white">
          Bosh Menyu
        </h1>
      </PageHeader>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {stats1.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className="px-3 pr-7 py-7 border-2 border-l-4 bg-light-main dark:bg-dark-main border-link-hover rounded-lg flex items-center relative overflow-hidden"
            >
              <div className="text-black dark:text-white flex flex-col gap-2">
                <span className="font-medium text-base leading-[110%]">
                  {item.title}
                </span>
                <span className="font-bold text-2xl leading-[130%]">
                  {item.count}
                </span>
              </div>
              <div className="w-full h-full flex flex-1 items-start justify-end z-20">
                <item.icon className="w-7 h-7 text-link-hover" />
              </div>
              <div className="absolute -right-5 -top-5 z-10 w-28 h-28 bg-light-second dark:bg-dark-second rounded-full"></div>
            </Link>
          ))}
        </div>
        <div className="grid grid-cols-1 min-[456px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6">
          {stats.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className="p-3 border-2 border-l-4 bg-light-main dark:bg-dark-main border-link-hover rounded-lg flex items-center relative overflow-hidden"
            >
              <div className="text-black dark:text-white flex flex-col gap-2">
                <span className="font-medium text-base leading-[110%]">
                  {item.title}
                </span>
                <span className="font-bold text-xl leading-[130%]">
                  {item.count}
                </span>
              </div>
              <div className="w-full h-full flex flex-1 items-start justify-end z-20">
                <item.icon className="w-6 h-6 text-link-hover" />
              </div>
              <div className="absolute -right-5 -top-5 z-10 w-20 h-20 bg-light-second dark:bg-dark-second rounded-full"></div>
            </Link>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
          <div className="">
            <h1 className="font-bold text-xl mb-2">So'nggi yangiliklar</h1>
            <div className="flex flex-col items-center gap-4">
              {news.slice(0, 2).map((item) => (
                <div
                  key={item.id}
                  className="w-full bg-light-main dark:bg-dark-main rounded-lg shadow-sm flex overflow-hidden"
                >
                  <div className="aspect-video w-[30%] overflow-hidden rounded-l-lg group">
                    <img
                      src={item.images[0].url}
                      alt={item.title.uz}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 flex-1 border border-l-0 border-link-hover rounded-r-lg">
                    <h1 className="font-medium text-lg leading-[110%] line-clamp-2 min-h-10">
                      {item.title.uz}
                    </h1>
                    <div
                      dangerouslySetInnerHTML={{ __html: item.description.uz }}
                      className="line-clamp-3 text-sm leading-[130%] my-2"
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="">
            <h1 className="font-bold text-xl mb-2">So'nggi e'lonlar</h1>
            <div className="flex flex-col items-center gap-4">
              {announcements.slice(0, 2).map((item) => (
                <div
                  key={item.id}
                  className="w-full bg-light-main dark:bg-dark-main rounded-lg shadow-sm flex overflow-hidden"
                >
                  <div className="aspect-video w-[30%] overflow-hidden rounded-l-lg group">
                    <img
                      src={item.images[0].url}
                      alt={item.title.uz}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 flex-1 border border-l-0 border-link-hover rounded-r-lg">
                    <h1 className="font-medium text-lg leading-[110%] line-clamp-2 min-h-10">
                      {item.title.uz}
                    </h1>
                    <div
                      dangerouslySetInnerHTML={{ __html: item.description.uz }}
                      className="line-clamp-3 text-sm leading-[130%] my-2"
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

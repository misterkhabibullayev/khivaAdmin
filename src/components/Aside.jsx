import { motion } from "framer-motion";
import {
  Briefcase,
  Home,
  Image,
  Layers,
  LogOut,
  Mail,
  Megaphone,
  Newspaper,
  Ticket,
  TicketCheck,
  Users,
  UserShield,
  X,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSidebarStore } from "../store/useSideBarStore";
import Profile from "./Profile";

export default function Aside() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isCollapse, setIsCollapse } = useSidebarStore();
  const navbar = [
    {
      id: 1,
      path: "/",
      name: "Bosh menyu",
      icon: Home,
    },
    {
      id: 2,
      path: "employees",
      name: "Xodimlar",
      icon: Briefcase,
    },
    {
      id: 3,
      path: "collections",
      name: "Kolleksiyalar",
      icon: Layers,
    },
    {
      id: 4,
      path: "news",
      name: "Yangiliklar",
      icon: Newspaper,
    },
    {
      id: 5,
      path: "announcements",
      name: "E'lonlar",
      icon: Megaphone,
    },
    {
      id: 6,
      path: "gallery",
      name: "Galereya",
      icon: Image,
    },
    {
      id: 7,
      path: "users",
      name: "Foydalanuvchilar",
      icon: Users,
    },
    {
      id: 8,
      path: "inquiries",
      name: "So'rovlar",
      icon: Mail,
    },
    {
      id: 9,
      path: "tickets",
      name: "Chipta Ta'riflari",
      icon: Ticket,
    },
    {
      id: 10,
      path: "ordertickets",
      name: "Sotilgan Chiptalar",
      icon: TicketCheck,
    },
    {
      id: 11,
      path: "admins",
      name: "Adminlar",
      icon: UserShield,
    },
  ];

  const handleNavClick = () => {
    if (window.innerWidth < 768) {
      setIsCollapse(false);
    }
  };
  return (
    <>
      {isCollapse && (
        <div
          onClick={() => setIsCollapse(false)}
          className="fixed inset-0 bg-black/60 z-40 md:hidden transition-opacity"
        />
      )}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 h-screen shrink-0 bg-light-main dark:bg-dark-main border-r border-link-hover transition-[width,transform] duration-300 ease-in-out select-none flex flex-col
          ${isCollapse ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          w-64 ${isCollapse ? "md:w-21" : "md:w-64"}
        `}
      >
        <div className="h-16 shrink-0 flex items-center justify-between border-b border-link-hover/20 md:border-b-0 px-5 overflow-hidden">
          <div className="flex items-center">
            <img
              src="/Images/logo.png"
              alt=""
              className="w-10 h-10 object-contain shrink-0"
            />
            <h2
              className={`font-bold text-base md:text-lg leading-[110%] text-link-hover pt-1.5 transition-all duration-300 ease-in-out ${isCollapse ? "md:opacity-0 md:max-w-0 md:ml-0 ml-2" : "md:opacity-100 md:max-w-40 md:ml-2"}`}
            >
              KhivaMuseum
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setIsCollapse(false)}
            className="md:hidden text-black dark:text-white hover:text-white dark:hover:text-black p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex flex-col flex-1 min-h-0">
          <div className="w-full flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-4">
            <nav className="w-full flex flex-col gap-2 relative">
              {navbar.map((item) => {
                const Icon = item.icon;

                const isActive =
                  location.pathname === `/${item.path}` ||
                  (item.path === "/" && location.pathname === "/");
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={handleNavClick}
                    className={`relative z-10 h-10 px-3.5 flex items-center transition-all duration-300 rounded-xl hover:bg-light-second dark:hover:bg-dark-second text-base ${isActive ? "text-white" : ""}`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavBackground"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 40,
                        }}
                        className="absolute inset-0 bg-link-hover -z-10 rounded-lg"
                      />
                    )}
                    <Icon className="w-5 h-5 shrink-0 transition-all duration-300" />
                    <span
                      className={`whitespace-nowrap font-medium text-sm transition-all duration-300 ease-in-out ${isCollapse ? "md:opacity-0 md:max-w-0 md:ml-0 ml-3" : "md:opacity-100 md:max-w-full md:ml-3"}`}
                    >
                      {item.name}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="shrink-0 flex flex-col justify-end gap-2 mb-4 px-4 pt-4">
            <Profile isCollapse={isCollapse} setIsCollapse={setIsCollapse} />
            <button
              onClick={() => {
                localStorage.removeItem("admin_token");
                navigate("/login");
                setIsCollapse(false);
              }}
              className="flex items-center justify-center border border-link-hover w-full py-1 px-3 rounded-xl"
            >
              <LogOut className="w-5 h-5" />
              <span
                className={`whitespace-nowrap font-medium text-sm transition-all duration-300 ease-in-out ${isCollapse ? "opacity-0 max-w-0 ml-0" : "opacity-100 max-w-full ml-3"}`}
              >
                Chiqish
              </span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

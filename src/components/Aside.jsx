import { motion } from "framer-motion";
import {
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Home,
  Image,
  Layers,
  LogOut,
  Mail,
  Megaphone,
  Newspaper,
  Ticket,
  Users,
  UserShield,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Profile from "./Profile";

export default function Aside() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapse, setIsCollapse] = useState(false);
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
      name: "Chiptalar",
      icon: Ticket,
    },
    {
      id: 10,
      path: "admins",
      name: "Adminlar",
      icon: UserShield,
    },
  ];
  return (
    <aside
      className={`min-h-full shrink-0 border-r border-link-hover transition-all duration-300 ease-in-out select-none ${isCollapse ? "w-21" : "w-64"}`}
    >
      <div className="h-16 flex items-center px-5 overflow-hidden">
        <img
          src="/Images/logo.png"
          alt=""
          className="w-10 h-10 object-contain shrink-0"
        />
        <h2
          className={`font-bold text-xl leading-[110%] text-link-hover pt-1.5 transition-all duration-300 ease-in-out ${isCollapse ? "opacity-0 max-w-0 ml-0" : "opacity-100 max-w-40 ml-2"}`}
        >
          KhivaMuseum
        </h2>
      </div>
      <div className="flex flex-col h-full">
        <nav className="w-full flex flex-col gap-2 p-4 relative">
          {navbar.map((item) => {
            const Icon = item.icon;

            const isActive =
              location.pathname === `/${item.path}` ||
              (item.path === "/" && location.pathname === "/");
            return (
              <Link
                key={item.id}
                to={item.path}
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
                  className={`whitespace-nowrap font-medium text-sm transition-all duration-300 ease-in-out ${isCollapse ? "opacity-0 max-w-0 ml-0" : "opacity-100 max-w-full ml-3"}`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
          <div className="absolute top-2 -right-3.5 z-10 rounded-full">
            <button
              onClick={() => setIsCollapse((prev) => !prev)}
              className="border border-link-hover p-1 text-link-hover rounded-full bg-light-main dark:bg-dark-main"
            >
              {isCollapse ? (
                <ChevronRight className="w-4.5 h-4.5" />
              ) : (
                <ChevronLeft className="w-4.5 h-4.5" />
              )}
            </button>
          </div>
        </nav>
        <div className="flex-1 flex flex-col justify-end gap-2 pb-20 px-4">
          <Profile isCollapse={isCollapse} />
          <button
            onClick={() => {
              localStorage.removeItem("admin_token");
              navigate("/login");
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
  );
}

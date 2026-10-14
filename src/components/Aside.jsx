import {
  Briefcase,
  Home,
  Image,
  Layers,
  Mail,
  Megaphone,
  Newspaper,
  Ticket,
  Users,
  UserShield,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function Aside() {
  const location = useLocation();
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
    <aside className="w-64 min-h-screen shrink-0 border-r border-link-hover flex flex-col">
      <div className="flex items-center justify-center py-2 gap-2">
        <img src="/Images/logo.png" alt="" className="h-10" />
        <h2 className="font-bold text-lg leading-[110%] text-link-hover pt-2">KhivaMuseum</h2>
      </div>
      <nav className="w-full flex flex-col gap-2 p-4">
        {navbar.map((item) => {
          const Icon = item.icon;

          const isActive =
            location.pathname === `/${item.path}` ||
            (item.path === "/" && location.pathname === "/");
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`relative z-10 flex items-center gap-2 transition-all duration-300 p-2 rounded-lg hover:bg-light-second text-base ${isActive ? "text-white" : ""}`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNavBackground"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 30,
                  }}
                  className="absolute inset-0 bg-link-hover -z-10 rounded-lg"
                />
              )}
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

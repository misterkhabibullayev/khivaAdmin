import { Menu } from "lucide-react";
import { useSidebarStore } from "../store/useSideBarStore";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const { toggleCollapse } = useSidebarStore();
  return (
    <div className="w-full h-14 box-border border-b border-link-hover px-6 py-2 flex items-center justify-between gap-2 md:gap-6 shrink-0 bg-light-main dark:bg-dark-main">
      <div className="flex items-center justify-center">
        <button onClick={toggleCollapse}>
          <Menu className="w-7 h-7 text-link-hover" />
        </button>
      </div>
      <div
        id="pageHeaderChildren"
        className="flex flex-1 items-center justify-between w-full"
      ></div>
      <div>
        <ThemeToggle />
      </div>
    </div>
  );
}

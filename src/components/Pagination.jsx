import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ currentPage, totalPages, onChangePage }) {
  if (!totalPages || totalPages <= 1) return null;

  const getPaginationItems = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const items = [];

    items.push(1);

    if (currentPage <= 3) {
      items.push(2, 3, 4, "...", totalPages);
    } else if (currentPage >= totalPages - 2) {
      items.push(
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      );
    } else {
      items.push(
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages,
      );
    }

    return items;
  };

  const pages = getPaginationItems();
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onChangePage(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-9 h-9 flex items-center justify-center border border-link-hover rounded-md disabled:opacity-40 disabled:cursor-not-allowed hover:bg-link-hover hover:text-white text-link-hover transition-colors duration-300"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <div className="flex items-center gap-2">
        {pages.map((item, index) => {
          if (item === "...") {
            return (
              <span
                key={`dots-${index}`}
                className="w-9 h-9 flex items-center justify-center text-link-hover font-bold select-none"
              >
                ...
              </span>
            );
          }

          const isActive = currentPage === item;

          return (
            <button
              key={item}
              onClick={() => onChangePage(item)}
              className={`w-9 h-9 flex items-center justify-center rounded-md font-medium text-xl transition-colors duration-300 ${
                isActive
                  ? "bg-link-hover text-white shadow-sm"
                  : "border border-link-hover text-link-hover hover:bg-link-hover hover:text-white"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>
      <button
        onClick={() => onChangePage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-9 h-9 flex items-center justify-center border border-link-hover rounded-md disabled:opacity-40 disabled:cursor-not-allowed hover:bg-link-hover hover:text-white text-link-hover transition-colors duration-300"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}

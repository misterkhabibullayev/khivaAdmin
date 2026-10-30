import { CircleCheck, CircleX, X } from "lucide-react";
import { useEffect } from "react";

const notificationTypes = {
  success: {
    icon: <CircleCheck className="w-5 h-5 text-green-500 shrink-0" />,
    border: "border-green-500",
  },
  error: {
    icon: <CircleX className="w-5 h-5 text-red-500 shrink-0" />,
    border: "border-red-500",
  },
};

export default function Notification({ message, onClose, duration = 4000 }) {
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [message, onClose, duration]);

  if (!message) return null;

  const currentType = notificationTypes[message.type] || notificationTypes.info;

  return (
    <div
      className={`fixed top-2 right-1/2 translate-x-1/2 z-60 px-3 py-2 rounded-lg shadow-lg flex items-stretch gap-3 border transition-all duration-300 bg-light-main dark:bg-dark-main text-black dark:text-white ${currentType.border}`}
    >
      <div className="pt-0.5">{currentType.icon}</div>

      <div className="flex-1 max-w-70">
        <p className="text-sm font-medium leading-snug break-all">
          {message.text}
        </p>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="text-gray-400 hover:text-black dark:hover:text-white transition-colors p-0.5 cursor-pointer shrink-0 ml-1"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function PageHeader({ children }) {
  const [container, setContainer] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setContainer(document.getElementById("pageHeaderChildren"));
  }, []);

  if (!container) return null;
  return createPortal(children, container);
}

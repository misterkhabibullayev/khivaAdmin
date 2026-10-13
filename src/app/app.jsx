import { useRoutes } from "react-router-dom";
import { router } from "../routes/router";

export default function App() {
  const routes = useRoutes(router);
  return routes;
}

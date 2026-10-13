import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { router } from "../routes/router";
import Loading from "../components/Loading";

export default function App() {
  const routes = useRoutes(router);
  return <Suspense fallback={<Loading />}>{routes}</Suspense>;
}

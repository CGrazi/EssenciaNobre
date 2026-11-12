import { Route, Routes } from "react-router-dom";
import Layout from "@/components/Layout";
import NotFound from "@/pages/NotFound";
import { routes } from "@/routes";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={<route.Page />} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

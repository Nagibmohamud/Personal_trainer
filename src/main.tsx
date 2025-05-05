import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ScheduleApp from "./ScheduleApp.tsx";
import StatsApp from "./StatsApp.tsx";
import TrainingApp from "./TrainingApp.tsx";
import CustomersApp from "./CustomersApp.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TrainingApp />,
  },
  {
    path: "/customers",
    element: <CustomersApp />,
  },
  { path: "/calendar", element: <ScheduleApp /> },
  {
    path: "/stats",
    element: <StatsApp />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

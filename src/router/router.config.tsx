import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { ProfilePage } from "../pages";
import { Home } from "../pages/home/home.page";

export const routerConfig = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile/:id",
        element: <ProfilePage />,
      },
    ],
  },
]);

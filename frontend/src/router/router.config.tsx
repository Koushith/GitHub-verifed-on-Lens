import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import {
  HirePage,
  JobDetails,
  JobListing,
  ProfilePage,
  SignUpPage,
  Verify,
} from "../pages";
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
        path: "/verify",
        element: <Verify />,
      },
      {
        path: "/profile/:id",
        element: <ProfilePage />,
      },
      {
        path: "/hire",
        element: <HirePage />,
      },
      {
        path: "/job-listings",
        element: <JobListing />,
      },
      {
        path: "/job-detail/:id",
        element: <JobDetails />,
      },
      {
        path: "/signup",
        element: <SignUpPage />,
      },
    ],
  },
]);

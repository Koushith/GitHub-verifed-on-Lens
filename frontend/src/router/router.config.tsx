import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import {
  JobDetails,
  JobListing,
  NewJobListingPage,
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
        element: <JobListing />,
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
        path: "/new-job-listing",
        element: <NewJobListingPage />,
      },
      {
        path: "/signup",
        element: <SignUpPage />,
      },
    ],
  },
]);

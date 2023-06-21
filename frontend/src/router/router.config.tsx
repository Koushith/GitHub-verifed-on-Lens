import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import {
  JobDetails,
  JobListing,
  NewJobListingPage,
  ProfilePage,
  SignupPage,
  UserProfilePage,
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
        path: "/profile/",
        element: <ProfilePage />,
        errorElement: <h1>Somethin went wrong</h1>,
      },
      {
        path: "/profile/:id",
        element: <UserProfilePage />,
        errorElement: <h1>Somethin went wrong</h1>,
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
        element: <SignupPage />,
      },
    ],
  },
]);

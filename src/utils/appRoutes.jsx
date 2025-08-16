import { lazy } from "react";
import ThslCreateTrip from "../pages/Trips/ThslCreateTrip";
import CompletedTripDetails from "../pages/Trips/Completed-Trip-Details";
import LoginPage from "../pages/Login/Login";

const Home = lazy(() => import("../pages/Home/Home"));
const Trips = lazy(() => import("../pages/Trips/Trips"));
const Alerts = lazy(() => import("../pages/Alerts/Alerts"));
const Sensors = lazy(() => import("../pages/Sensors/Sensors"));
const Deployments = lazy(() => import("../pages/Deployments/Deployments"));
const Groups = lazy(() => import("../pages/Groups/Groups"));
const Users = lazy(() => import("../pages/Users/Users"));
const ViewGroup = lazy(() => import("../pages/Groups/ViewGroup"));

export const appRoutes = [
  {
    path: "/home",
    element: <Home />,
    label: "Home",
    icon: "/assets/images/Home.svg",
  },
  {
    path: "/trips",
    element: <Trips />,
    label: "Trips",
    icon: "/assets/images/Trips.svg",
  },
  {
    path: "/alerts",
    element: <Alerts />,
    label: "Alerts",
    icon: "/assets/images/Alerts.svg",
  },
  {
    path: "/sensors",
    element: <Sensors />,
    label: "Sensors",
    icon: "/assets/images/Sensors.svg",
  },
  {
    path: "/deployments",
    element: <Deployments />,
    label: "Deployments",
    icon: "/assets/images/Deployments.svg",
  },
  {
    path: "/groups",
    element: <Groups />,
    label: "Groups",
    icon: "/assets/images/Groups.svg",
  },
  {
    path: "/groups/:groupId",
    element: <ViewGroup />,
  },
  {
    path: "/users",
    element: <Users />,
    label: "Users",
    icon: "/assets/images/Users.svg",
  },
  {
    path: "/trips/ThslCreateTrip",
    element: <ThslCreateTrip />,
  },
  // {
  //   path: "/trips/ongoingpage/:sensorId/:tripName",
  //   element: <TripsOngoingdetailsPage />,
  // },
  {
    path: "/trips/CompletedTripDetails/:sensorId/:tripName",
    element: <CompletedTripDetails />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
];

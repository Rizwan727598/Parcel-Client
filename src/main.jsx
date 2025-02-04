import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "./Components/Layout";
import ThemeProvider from "./Context/ThemeContext";
import AuthProvider from "./Providers/AuthProvider";
import PrivateRoute from "./Components/PrivateRoute";
import "./index.css";

// Import Public Pages
import Home from "./Components/HomePage";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import NotFound from "./Components/NotFound";
import PaymentSuccess from "./Components/PaymentSuccess";
import PaymentPage from "./Components/PaymentPage";

// Dashboard Layout
import DashboardLayout from "./Components/DashboardLayout";

// User Dashboard Components
import BookParcel from "./Components/BookParcel";
import MyParcels from "./Components/MyParcels";
import MyProfile from "./Components/MyProfile";

// Admin Dashboard Components
import Statistics from "./Components/Statistics";
import AllParcels from "./Components/AllParcels";
import AllUsers from "./Components/AllUsers";
import AllDeliveryMen from "./Components/AllDeliveryMen";

// Delivery Men Dashboard Components
import MyDeliveryList from "./Components/MyDeliveryList";
import MyReviews from "./Components/MyReviews";
import TopDeliveryMen from "./Components/TopDeliveryMen";
// import ViewLocation from "./Components/ViewLocation";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Main layout with Navbar
    children: [
      { path: "/", element: <Home /> },
      { path: "signIn", element: <SignIn /> },
      { path: "signUp", element: <SignUp /> },
      { path: "payment-success", element: <PaymentSuccess /> },
      { path: "payment", element: <PaymentPage /> },
      { path: "top-delivery", element: <TopDeliveryMen /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout /> {/* Sidebar and Dashboard UI */}
      </PrivateRoute>
    ),
    children: [
      { path: "book-parcel", element: <BookParcel /> },
      { path: "my-parcels", element: <MyParcels /> },
      { path: "my-profile", element: <MyProfile /> },

      // Admin Routes
      { path: "statistics", element: <Statistics /> },
      { path: "all-parcels", element: <AllParcels /> },
      { path: "all-users", element: <AllUsers /> },
      { path: "all-delivery-men", element: <AllDeliveryMen /> },

      // Delivery Men Routes
      { path: "my-delivery-list", element: <MyDeliveryList /> },
      { path: "my-reviews", element: <MyReviews /> },
      // { path: "view-location/:id", element: <ViewLocation /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <ToastContainer position="top-right" autoClose={3000} />
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);

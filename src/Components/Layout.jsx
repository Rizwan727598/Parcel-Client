import React from "react";
import Navbar from "./Navbar";
// import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
// import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow p-6">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;

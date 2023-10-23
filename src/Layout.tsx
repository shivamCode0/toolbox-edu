import React from "react";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";
import "src/scss/main.scss";
import "src/scss/other.scss";
import Navbar from "./components/Navbar";

export default function Layout() {
  return (
    <div className="app">
      <Navbar />
      <div className="contentandsidebar">
        <Sidebar />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

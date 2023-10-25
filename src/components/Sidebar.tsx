import { Link, useLocation } from "react-router-dom"; // You can replace this with the appropriate routing component if needed
import { Dropdown } from "react-bootstrap";
import { BiLogoBootstrap, BiHome, BiSpreadsheet } from "react-icons/bi";
import { IoIosPaper, IoIosBook, IoIosSchool, IoIosAnalytics } from "react-icons/io";
import type { IconType } from "react-icons";
import React from "react";
import { ReactComponent as Logo } from "src/img/logo.svg";

function Sidebar() {
  const location = useLocation();
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark h-100" style={{ width: "280px" }}>
      <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <Logo height={20} style={{ filter: "invert(1) drop-shadow(0 0 4px rgba(0, 0, 0, 0.5)" }} />
        <span className="fs-4"></span>
      </Link>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        {(
          [
            ["Dashboard", "/", BiSpreadsheet],
            ["AI Writing Evaluator", "/essay", IoIosPaper],
            ["Lesson Plan Creator", "/lessonplan", IoIosBook],
            ["Assessment Generator", "/assessment", IoIosSchool],
            ["Student Analytics", "/analytics", IoIosAnalytics],
          ] as [string, string, IconType][]
        ).map(([text, link, Icon], index) => (
          <li key={index}>
            <Link to={link} className={`nav-link text-white ${location.pathname === link ? "active" : ""}`}>
              <Icon className="bi me-2" size={24} />
              {text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;

import React from "react";
import { Link, useLocation } from "react-router-dom"; // You can replace this with the appropriate routing component if needed
import { Dropdown } from "react-bootstrap";
import { ReactComponent as Logo } from "src/img/logo.svg";
import { links } from "src/util";

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
        {links.map(([text, link, Icon], index) => (
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

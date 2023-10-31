import React from "react";
import { Link } from "react-router-dom";
import { links } from "src/util";

// links except first
const links2 = links.slice(1);

export default function Home() {
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-1"></div>
        <div className="col-10">
          <h1 className="text-center">Welcome to Teacher's Toolbox</h1>
          <p>This is a collection of tools that can help teachers in their day to day work. The tools are listed below. Click on the tool you want to use.</p>
          <hr />
          <div className="row">
            {links2.map(([text, link, Icon], index) => (
              <div className="col-4" key={index}>
                <Link to={link} className="btn btn-primary btn-lg w-100" style={{ height: "10em" }}>
                  <Icon className="bi my-4" size={64} />
                  <br />
                  {text}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

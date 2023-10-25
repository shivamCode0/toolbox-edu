import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "src/img/logo.svg";

export default function WebNav({}) {
  return (
    <Navbar bg="primary" variant="dark" style={{ height: "4rem" }}>
      <div className="w-100">
        <div className="container-fluid">
          <div className="text-center">
            <Link to="/" className="navbar-brand">
              <Logo height={28} style={{ filter: "invert(1) drop-shadow(0 0 4px rgba(0, 0, 0, 0.5)" }} />
            </Link>
          </div>
        </div>
      </div>
    </Navbar>
  );
}

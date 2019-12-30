import Link from "next/link";
import "./Nav.css";
export default function Nav() {
  return (
    <div>
      <nav className="navbar navbar-light navbar-expand-md fixed-top navigation-clean-button">
        <div className="container">
          <a className="navbar-brand" href="#">
            Loa Loa Media
          </a>
          <button
            data-toggle="collapse"
            className="navbar-toggler"
            data-target="#navcol-1"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navcol-1">
            <ul className="nav navbar-nav mr-auto">
              <li className="nav-item" role="presentation">
                <a className="nav-link active" href="#">
                  Quy trình làm việc
                </a>
              </li>
              <li className="nav-item" role="presentation">
                <a className="nav-link" href="#">
                  Bảng giá
                </a>
              </li>
              <li className="nav-item" role="presentation">
                <a className="nav-link" href="#">
                  Dự án
                </a>
              </li>
            </ul>
            <span className="navbar-text actions">
              <a
                className="btn btn-light action-button"
                role="button"
                href="tel:0332813077"
              >
                Liên hệ ngay
              </a>
            </span>
          </div>
        </div>
      </nav>
    </div>
  );
}

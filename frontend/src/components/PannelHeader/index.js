import styles from "./PannelHeader.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import DropDownNav from "../DropDownNav";

const cx = classNames.bind(styles);

function PannelHeader() {
  return (
    <div className={cx("header")}>
      <div className={cx("navbar","pd-16")}>
        <div className={cx("navbar-wrap")}>
          <div className={cx("navbar-header")}>
            <Link to="/" className={cx("navbrand-link")}>
              .Blog
            </Link>
          </div>
          <ul className={cx("nav","display","hide")}>
            <li className={cx("nav-item")}>
              <Link to="/" className={cx("nav-link")}>
                Home
              </Link>
            </li>
            <li className={cx("nav-item")}>
              <Link to="/dashboard" className={cx("nav-link")}>
                Dashboard
              </Link>
            </li>
          </ul>
        </div>
        <DropDownNav/>
      </div>
    </div>
  );
}

export default PannelHeader;

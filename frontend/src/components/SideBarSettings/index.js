import classNames from "classnames/bind";
import styles from "./SideBarSettings.module.scss";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { ACCOUNTURL as DELETEACCOUNTURL } from "../../constants/index";
import { UserState } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function SideBarSettings() {
  const links = [
    { id: 0, name: "General", url: "/account" },
    { id: 1, name: "Password", url: "/account/password" },
  ];
  const [idLinkSelected, setIdLinkSelected] = useState(0);
  const { user, setUser } = UserState();
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    try {
      const res = await axios.delete(DELETEACCOUNTURL, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setUser(null);
      console.log(res);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={cx("sidebar")}>
      <div className={cx("sidebar-wrap")}>
        <div className={cx("list")}>
          {links.map((link, index) => {
            return (
              <NavLink
                key={index}
                to={link.url}
                className={cx("link", { active: index === idLinkSelected })}
                onClick={() => setIdLinkSelected(index)}
              >
                {link.name}
              </NavLink>
            );
          })}
          {/* <Link to="/account" className={cx("link",{"active":true})}>General</Link>
                <Link to="/account/password" className={cx("link",{"active":false})}>Password</Link> */}
        </div>
        <button className={cx("btn-delete")} onClick={handleDeleteAccount}>
          Delete Account
        </button>
      </div>
    </div>
  );
}

export default SideBarSettings;

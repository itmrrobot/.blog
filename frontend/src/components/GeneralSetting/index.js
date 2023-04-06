import axios from "axios";
import classNames from "classnames/bind";
import { useState } from "react";
import { UserState } from "../../context/AuthContext";
import {ACCOUNTURL as UPDATEACCOUNTURL} from "../../constants/index";
import SideBarSettings from "../SideBarSettings";
import styles from "./GeneralSetting.module.scss";
import {validate,capitalFirstLetter} from "../../utils/util";
import { MessageState } from "../../context/MessageContext";

const cx = classNames.bind(styles);

function GeneralSetting() {
  const {user,setUser} = UserState();
  const {setIsSuccess,setIsShow} = MessageState();
  const [formValues,setFormValues] = useState({});
  const [formErrors,setFormErrors] = useState({});
  console.log(user.user.name);

  const handleChange = (e) => {
    const {name,value} = e.target;
    setFormValues({...formValues,[name]:value});
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    try {
      const res = await axios.patch(UPDATEACCOUNTURL,formValues,{
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      setUser({...user,user:res.data});
      setIsShow(true);
      setIsSuccess(true);
    } catch(e) {
      setIsShow(true);
      setIsSuccess(false);
    }
  }

  if(window.location.href==="http://localhost:3000/account") {
    console.log(window.location.href);
  } else {
    console.log("Error");
  }

  return (
    <div className={cx("wrap-global")}>
      <div className={cx("wrapper")}>
        <div className={cx("wrap-header")}>
          <svg
            height="42px"
            width="42px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z" />
          </svg>
          <h1 className={cx("title")}>
            <span className={cx("display-name")}>{capitalFirstLetter(user.user.name)}</span>
            <span className={cx("slash")}>/</span>
            General
          </h1>
        </div>
        <div className={cx("wrap")}>
          <SideBarSettings />
          <form className={cx("form")} onSubmit={handleSubmit}>
            <div className={cx("form-group")}>
              <label>Username</label>
              <input type="text" name="name" defaultValue={user.user.name} className={cx("form-input")} onChange={handleChange}/>
            </div>
            <div className={cx("form-group")}>
              <label>Email</label>
              <input type="email" name="email" defaultValue={user.user.email} className={cx("form-input")} onChange={handleChange}/>
            </div>
            <button className={cx("btn-update")}>Change</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default GeneralSetting;

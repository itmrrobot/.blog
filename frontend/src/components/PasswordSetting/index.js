import axios from "axios";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import SideBarSettings from "../SideBarSettings";
import styles from "./PasswordSetting.module.scss";
import {ACCOUNTPASSWORDURL} from "../../constants/index";
import { UserState } from "../../context/AuthContext";
import {ACCOUNTURL as UPDATEACCOUNTURL} from "../../constants/index";
import { validateNewPassword as validate ,capitalFirstLetter} from "../../utils/util";
import { MessageState } from "../../context/MessageContext";

const cx = classNames.bind(styles);

function PasswordSetting() {
  const {user} = UserState();
  const {setIsSuccess,setIsShow} = MessageState();
  const [oldPassword,setOldPassword] = useState('');
  const [newPassword,setNewPassword] = useState('');
  const [data,setData] = useState({});
  const [errorMsg,setErrorMsg] = useState({});

  useEffect(() => {
    const controller = new AbortController();
    const checkPassword = async() => {
      try {
        const res = await axios.post(ACCOUNTPASSWORDURL,{email:user.user.email,password:oldPassword},{
          signal: controller.signal,
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })
        setData(res.data);
      } catch(e) {
        throw new Error(e);
      }
    }
    checkPassword();
    return () => {
      controller.abort();
    }
  },[oldPassword]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    setErrorMsg(validate(newPassword));
    try {
      if(data.isCorrectPassword) {
        const res = await axios.patch(UPDATEACCOUNTURL,{password:newPassword},{
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })
        setIsSuccess(true);
      } else {
        errorMsg.oldPassword = "Old password is incorrect";
        setIsSuccess(false);
      }
      setIsShow(true);
    } catch(e) {
      setIsSuccess(false);
      setIsShow(true);
    }
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
            Password
          </h1>
        </div>
        <div className={cx("wrap")}>
          <SideBarSettings />
          <form className={cx("form")} onSubmit={handleSubmit}>
            <div className={cx("form-group")}>
              <label>Old Password</label>
              <input type="password" name="oldPassword" value={oldPassword} className={cx("form-input")} onChange={(e) => setOldPassword(e.target.value)}/>
            </div>
            <div className={cx("form-group")}>
              <label className={cx('mt-24')}>Password</label>
              <input type="password" name="password" value={newPassword} className={cx("form-input")} onChange={(e) => setNewPassword(e.target.value)}/>
              {errorMsg&&<p className={cx("danger")}>{errorMsg.password}</p>}
            </div>
            <button className={cx("btn-update")}>Change</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PasswordSetting;

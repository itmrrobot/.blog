import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toolbar } from "./toolbar";
import { formats } from "./formats";
import styles from "./Write.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";
import axios from "axios";
import { UserState } from "../../context/AuthContext";
import { MessageState } from "../../context/MessageContext";
import Login from "../Login";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function Write() {
  const modules = { toolbar: toolbar };
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [file, setFile] = useState(null);
  const { setIsSuccess, setIsShow } = MessageState();
  const url = "http://localhost:4000";
  const { user } = UserState();

  const upload = async () => {
    const formData = new FormData();
    formData.append("blog-image", file);
    try {
      const res = await axios.post(url + "/blog/upload", formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log("Success");
    } catch (e) {
      console.log(e);
    }
  };

  const createFormData = () => {
    const formData = new FormData();
    if (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg") {
      formData.append("image", file);
    }
    formData.append("title", title);
    formData.append("info", body);
    return formData;
  };

  console.log(file);
  const handleSave = async () => {
    const formData = createFormData();
    localStorage.setItem("formData", formData);
  };

  const handlePublish = async () => {
    const formData = createFormData();
    try {
      if (file.type === "image/jpeg" || file.type === "image/png") {
        const res = await axios.post(url + "/blogs", formData, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setIsSuccess(true);
      } else {
        setIsSuccess(false);
      }
      setIsShow(true);
    } catch (e) {
      setIsSuccess(false);
      setIsShow(true);
      console.log(e);
    }
  };

  return (
    <>
      {user!==null?<div className={cx("wrap-write")}>
        <div className={cx("write-left")}>
          <input
            type="text"
            className={cx("write-title")}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className={cx("text-editor")}>
            <ReactQuill
              theme="snow"
              modules={modules}
              formats={formats}
              className={cx("editor")}
              value={body}
              onChange={setBody}
            ></ReactQuill>
          </div>
        </div>
        <div className={cx("write-right")}>
          <h3 className={cx("title")}>Publish</h3>
          <div className={cx("status")}>
            <b>Status:</b> Draft
          </div>
          <div className={cx("visibility")}>
            <b>Visibility:</b> Public
          </div>
          <label htmlFor="fileUpload" className={cx("btn-upload")}>
            Upload image
          </label>
          <input
            type="file"
            id="fileUpload"
            className={cx("fileUpload")}
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          <div className={cx("group-btn")}>
            <button className={cx("btn-save")} onClick={handleSave}>
              Lưu
            </button>
            <button className={cx("btn-update")} onClick={handlePublish}>
              Tạo
            </button>
          </div>
        </div>
      </div>:<div className={cx('wrap-message')}>
            <h3 className={cx('title')}>Bạn phải đăng nhập để tạo blog</h3>
            <Link to="/login" className={cx('link')}>Đăng nhập tại đây</Link>
        </div>}
    </>
  );
}

export default Write;

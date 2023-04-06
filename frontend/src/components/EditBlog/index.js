import style from "./EditBlog.module.scss";
import classNames from "classnames/bind";
import ReactQuill from "react-quill";
import { toolbar } from "../Write/toolbar";
import { formats } from "../Write/formats";
import { useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import { PATHBLOGSURL } from "../../constants";
import { UserState } from "../../context/AuthContext";
import {MessageState} from "../../context/MessageContext";

const cx = classNames.bind(style);

function EditBlog() {
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const modules = { toolbar: toolbar };
  const {user} = UserState();
  const {setIsSuccess,setIsShow} = MessageState();
  const navigate = useNavigate();
  const {id} = useParams();

  const handleUpdate = async () => {
    try {
      await axios.patch(PATHBLOGSURL+`/${id}`,{title:title,info:body},{
        headers: {
          'Authorization': `Bearer ${user.token}`    
        }
      });
      setIsSuccess(true);
    } catch(e) {
      setIsSuccess(false);
      console.log(e);
    }
    setIsShow(true);
  }

  const handleBack = () => {
    navigate('/dashboard');
  }

  return (
    <div className={cx("wrap")}>
      <h2 className={cx("title")}>Edit Blog</h2>
      <div className={cx('group')}>
        <label>Tiêu đề</label>
        <input
          type="text"
          className={cx("input")}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className={cx('group')}>
        <label>Nội dung</label>
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        className={cx("editor")}
        value={body}
        onChange={setBody}
      />
      </div>
      <div className={cx('group-btn')}>
        <button className={cx('btn')} onClick={handleUpdate}>Cập nhật</button>
        <button className={cx('btn')} onClick={handleBack}>Quay lại</button>
      </div>
    </div>
  );
}

export default EditBlog;

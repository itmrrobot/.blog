import axios from "axios";
import styles from './SingleBlog.module.scss';
import classNames from "classnames/bind";
import {useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment";
import MessageForm from "../MessageForm";

const cx = classNames.bind(styles);

function SingleBlog() {
    const [blog,setBlog] = useState([]);
    const {id} = useParams();
    const time = moment(blog.createdAt).format('DD/MM/YYYY');
    const imagePath = 'http://localhost:4000/images';
    useEffect(() => {
        const controller = new AbortController();
        axios.get(`http://localhost:4000/blogs/${id}`,{
            signal: controller.signal
        })
        .then((respone) => {
            setBlog(respone.data);
        })
        .catch((e) => {
            throw new Error(e);
        })
        return () => {
            controller.abort();
        }
    },[id])
    return (
      <div className={cx("wrap")}>
        <h2 className={cx("title")}>{blog.title}</h2>
        <div className={cx("wrap-post")}>
          <div className={cx("user")}>
            <svg
              width="14px"
              height="14px"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
            </svg>
            <span className={cx("name")}>{blog.authorName}</span>
          </div>
          <div className={cx("time")}>
            <svg
              width="14px"
              height="14px"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M232 120C232 106.7 242.7 96 256 96C269.3 96 280 106.7 280 120V243.2L365.3 300C376.3 307.4 379.3 322.3 371.1 333.3C364.6 344.3 349.7 347.3 338.7 339.1L242.7 275.1C236 271.5 232 264 232 255.1L232 120zM256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0zM48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48C141.1 48 48 141.1 48 256z" />
            </svg>
            <span className={cx("date")}>{time}</span>
          </div>
        </div>
        <img src={imagePath + blog.image} alt="" className={cx("img")} />
        <div className={cx("para")} dangerouslySetInnerHTML={{ __html: blog.info }} />
        <MessageForm/>
      </div>
    );
}

export default SingleBlog;
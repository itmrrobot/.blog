import styles from "./ListBlog.module.scss";
import classnames from "classnames/bind";
import { useEffect, useState } from "react";
import axios from "axios";
import blog from "../../assets/img/blog.jpg";
import moment from "moment";
import Pagination from "../Pagination";
import { Link } from "react-router-dom";

const cx = classnames.bind(styles);

function ListBlog() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogPerPage, setBlogPerPage] = useState(4);
  const [pageNumberLimit,setPageNumberLimit] = useState(2);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(2);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(1);
  const lastBlogIndex = currentPage * blogPerPage;
  const firstBlogIndex = lastBlogIndex - blogPerPage;
  const blogs = data.slice(firstBlogIndex, lastBlogIndex);
  const imagePath = "http://localhost:4000/images";
  useEffect(() => {
    const controller = new AbortController();
    axios
      .get("http://localhost:4000/blogs", {
        signal: controller.signal,
      })
      .then((respone) => {
        setIsLoading(true);
        setData(respone.data);
      })
      .catch((err) => {
        throw new Error(err);
      });
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className={cx("list-blog")}>
      {blogs.map((item, index) => {
        const time = moment(item.createdAt).format("DD/MM/YYYY");
        return (
          <div className={cx("item")} key={index}>
            <Link to={`/blogs/${item._id}`}>
              <img src={imagePath + item.image} alt="" className={cx("img")} />
            </Link>
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
                <span className={cx("name")}>{item.authorName}</span>
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
            <h3>
              <Link to={`/blogs/${item._id}`} className={cx("title")}>
                {item.title}
              </Link>
            </h3>
            <p
              className={cx("para")}
              dangerouslySetInnerHTML={{ __html: item.info }}
            ></p>
            <div className={cx("wrap-btn")}>
              <Link to={`/blogs/${item._id}`} className={cx("btn-read")}>
                Đọc Thêm
              </Link>
            </div>
          </div>
        );
      })}
      <Pagination
        currentPage={currentPage}
        totalBlog={data.length}
        blogPerPage={blogPerPage}
        setCurrentPage={setCurrentPage}
        maxPageNumberLimit={maxPageNumberLimit}
        minPageNumberLimit={minPageNumberLimit}
        setMaxPageNumberLimit={setMaxPageNumberLimit}
        setMinPageNumberLimit={setMinPageNumberLimit}
        pageNumberLimit={pageNumberLimit}
      />
    </div>
  );
}

export default ListBlog;

import classNames from "classnames/bind";
import style from "./Pagination.module.scss";

const cx = classNames.bind(style);

function Pagination({ ...props }) {
  const {
    currentPage,
    totalBlog,
    blogPerPage,
    setCurrentPage,
    maxPageNumberLimit,
    minPageNumberLimit,
    setMaxPageNumberLimit,
    setMinPageNumberLimit,
    pageNumberLimit,
    style,
    anotherStyle
  } = props;
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalBlog / blogPerPage); i++) {
    pages.push(i);
  }

  const handlePrev = () => {
    if(currentPage>1) {
        setCurrentPage(currentPage-1)
    }
    if((currentPage-1)%pageNumberLimit===0&&currentPage>1) {
      setMaxPageNumberLimit(maxPageNumberLimit-pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit-pageNumberLimit);
    }
  }

  const handleNext = () => {
    if(currentPage<pages.length) {
      setCurrentPage(currentPage+1);
    }
    if(currentPage+1>maxPageNumberLimit&&currentPage<pages.length) {
      setMaxPageNumberLimit(maxPageNumberLimit+pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit+pageNumberLimit);
    }
  }
  return (
    <div className={cx("pagination")}>
        <button className={cx("btn")} onClick={handlePrev} style={style}>
            <svg width="8px" height="14px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
        </button>
      {pages.map((page, index) => {
        if(page<maxPageNumberLimit+1&&page>=minPageNumberLimit) {
            return (
              <button
                onClick={() => setCurrentPage(page)}
                key={index}
                className={cx("btn",{"btn--active":page===currentPage})}
                style={anotherStyle}
              >
                {page}
              </button>
            );
        } else {
            return null;
        }
      })}
      <button className={cx("btn")} onClick={handleNext} style={style}>
        <svg width="8px" height="14px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M246.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L178.7 256 41.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/></svg>
      </button>
    </div>
  );
}

export default Pagination;

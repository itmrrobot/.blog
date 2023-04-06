import styles from "./SideBar.module.scss";
import classNames from "classnames/bind";
import banner from "../../assets/img/banner.png";
import banner_hawk_host from "../../assets/img/banner_hawk_host.png";
import booking from "../../assets/img/booking.webp";
import { SearchState } from "../../context/SearchContext";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function SideBar() {
  const { setSearch } = SearchState();
  const navigate = useNavigate();
  const advertise = [
    { title: "Booking nên đặt", img: booking, link: "" },
    { title: "Hosting nên dùng", img: banner_hawk_host, link: "" },
    { title: "VPS nên dùng", img: banner, link: "" },
  ];

  const handleChange = (e) => {
   if(e.which===13) {
    setSearch(e.target.value);
    navigate('/news');
    e.target.value = '';
   }
  }

  return (
    <div className={cx("wrap")}>
      <div className={cx("search")}>
        <h3 className={cx("title")}>Tìm kiếm</h3>
        <input
          type="text"
          placeholder="Search"
          className={cx("search-input")}
          onKeyDown={handleChange}
        />
      </div>
      {advertise.map((advertise, index) => {
        return (
          <div key={index} className={cx("advertise")}>
            <h3 className={cx("title")}>{advertise.title}</h3>
            <a href="/" className={cx("link")}>
              <img src={advertise.img} alt="advertise" className={cx("img")} />
            </a>
          </div>
        );
      })}
    </div>
  );
}

export default SideBar;

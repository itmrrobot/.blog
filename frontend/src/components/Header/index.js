import logo from '../../assets/img/logo-blog-13.png';
import {Link} from 'react-router-dom';
import DropDownNav from '../DropDownNav';
import { UserState } from '../../context/AuthContext';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Header() {
    const {user} = UserState();
    const [isShow,setIsShow] = useState(true);
    const [isHide,setIsHide] = useState(false);

    return (
      <div className={cx("header")}>
        <div className={cx("navbar","navbar-position")}>
          <div className={cx("navbar-header")}>
            <Link to="/" className={cx("navbrand-link")}>
              <img src={logo} alt="" className={cx("brand-logo")} />
            </Link>
          </div>
          <div className={cx("bars",{"hide":isHide})} onClick={() => {setIsShow(false);setIsHide(true)}}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>
          </div>
          <div className={cx("xmark",{"hide":isShow})} onClick={() => {setIsShow(true);setIsHide(false)}}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/></svg>
          </div>
          <ul className={cx("nav","nav-r","display",{"hide":isShow})}>
            <li className={cx("nav-item")}>
              <Link to="/" className={cx("nav-link")}>
                Home
              </Link>
            </li>
            <li className={cx("nav-item")}>
              <Link to="/blog/create" className={cx("nav-link")}>
                Tạo blog
              </Link>
            </li>
            <li className={cx("nav-item")}>
              <Link to="/about" className={cx("nav-link")}>
                Giới Thiệu
              </Link>
            </li>
            <li className={cx("nav-item")}>
              <Link to="/news" className={cx("nav-link")}>
                Tin tức
              </Link>
            </li>
            {
              user===null?
            
                <>
                <li className={cx("nav-item")}>
                  <Link to="/login" className={cx("nav-link")}>
                    Đăng nhập
                  </Link>
                </li>
                <li className={cx("nav-item")}>
                  <Link to="/register" className={cx("nav-link")}>
                    Đăng kí
                  </Link>
                </li>
                </>:
              <>
              <DropDownNav/>
            </>
            }
          </ul>
        </div>
      </div>
    );
}

export default Header;
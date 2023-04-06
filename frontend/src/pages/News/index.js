import styles from './News.module.scss';
import classnames from 'classnames/bind';
import SideBar from '../../components/SideBar';
import ListNews from '../../components/ListNews';

const cx = classnames.bind(styles);

function News() {
    return(
        <div className={cx('wrap-global')}>
            <div className={cx('content')}>
                <ListNews/>
            </div>
            <div className={cx('sidebar')}>
                <SideBar/>
            </div>
        </div>
    )
}

export default News;
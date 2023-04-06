import styles from './PannelLayout.module.scss';
import classNames from 'classnames/bind';
import PannelHeader from '../../PannelHeader';
import MessageModal from '../../MessageModal/index';

const cx = classNames.bind(styles);

function PannelLayout({children}) {
    return (
        <div className={cx('wrapper')}>
            <PannelHeader/>
            <MessageModal/>
            <div className={cx('content')}>
                {children}
            </div>
        </div>
    )
}

export default PannelLayout;
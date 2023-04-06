import { MessageState } from '../../context/MessageContext';
import styles from './MessageModal.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function MessageModal() {
    const {setIsSuccess,isSuccess,isShow,setIsShow} = MessageState();
    return (
        <>
            {isShow&&<div className={cx('modal')} onClick={(e) => {setIsShow(false);e.stopPropagation()}}></div>}
            {isShow&&<div className={cx('modal-content')}>
                {isSuccess===true?<div className={cx('icon-message','success')}>
                    <svg width="36px" height="36px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#4ac85f" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>   
                </div>:
                <div className={cx('icon-message','error')}>
                    <svg width="36px" height="36px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="#fd6161" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>        
                </div>}        
                <h3 className={cx('title')}>{isSuccess===true?<>Thành công</>:<>Lỗi</>}</h3>
                <button className={cx('btn-close')} onClick={() => setIsShow(false)}>
                    &times;
                </button>
            </div>}
        </>
    )
}

export default MessageModal;
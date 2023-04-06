import classNames from "classnames/bind";
import styles from "./MessageForm.module.scss";

const cx = classNames.bind(styles);

function MessageForm() {
    return (
        <div className={cx('wrap-form')}>
            <form className={cx('form')} action="/" method="post">
                <h2 className={cx('title')}>Message</h2>
                <div className={cx('form-wrap')}>
                    <div className={cx('form-container-input')}>
                        <input type="text" placeholder="Tên" className={cx('form-input')} required/>
                    </div>
                    <div className={cx('form-container-input')}>
                        <input type="email" placeholder="Email" className={cx('form-input')} required/>
                    </div>
                </div>
                <textarea className={cx('form-message')} placeholder="Bình luận"></textarea>
                <button className={cx('form-btn')}>Gửi bình luận</button>
            </form>
        </div>
    )
}

export default MessageForm;
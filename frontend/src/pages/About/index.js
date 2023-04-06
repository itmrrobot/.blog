import classNames from "classnames/bind";
import SideBar from "../../components/SideBar";
import styles from './About.module.scss';

const cx = classNames.bind(styles);

function About() {
    return (
        <div className={cx('wrap-global')}>
            <div className={cx('content','pd-left-38','pd-left-right-18')}>
                <h1 className={cx('title')}>Giới thiệu</h1>
                <p className={cx('para')}>Bạn đang truy cập <h4 className={cx('name')}>.blog</h4> (tên cũ Chia Sẻ Coupon), blog cá nhân chia sẻ nhiều thông tin như khuyến mại, du lịch, công nghệ, tiếng anh, coupon giảm giá Tên miền, Hosting, VPS/Server và WordPress.</p>
                <p className={cx('para')}>Mình là Nguyễn Nhân, thiết kế, quản lý và biên soạn nội dung trên .blog. Công việc chính của mình là developer, mình có đầy đủ những kĩ năng của một full-stack developer. Blog này là nơi mình chia sẻ lại trải nghiệm cá nhân, những thứ hay ho khi sử dụng Tên miền, Hosting hay Server, học tập, khám phá công nghệ. Ngoài ra, có thể thêm những kiến thức mà mình học được nữa.</p>
                <p className={cx('para')}>Đến với <h4 className={cx('name')}>.blog</h4>, bạn sẽ có cơ hội đăng ký được những tên miền .COM hoặc .NET từ những nhà cung cấp dịch vụ lớn nhất thế giới với giá rất rẻ, chỉ 0.99$ cho một năm sử dụng. Hoặc những gói Hosting giảm tới 88%, còn được tặng kèm thêm cả tên miền Free nữa. Trên thế giới có rất nhiều chương trình khuyến mại hay mà các công ty Việt Nam khó có thể cung cấp được.</p>
                <p className={cx('para')}>Với những chương trình giới thiệu, bổ ích trên website .blog.com, bạn sẽ cần một tài khoản để nhận được nhiều thông báo mới nhất đến từ website của mình</p>
                <p className={cx('para')}>Tất cả mọi ý kiến thắc mắc, hỏi đáp, hướng dẫn các bạn nên chủ động comment trên blog, vì có rất nhiều bạn rất giỏi gắn bó lâu năm với .blog sẵn sàng hỗ trợ. Ngoài ra, có thể gửi mail cho <h4 className={cx('name')}>admin@blog.com</h4>, tuy nhiên mình bận công việc nên nhiều khi vẫn bị bỏ sót email.</p>
                <p className={cx('para')}>Chúc bạn sẽ học tập, khám phá được nhiều thứ nhất với <h4 className={cx('name')}>.blog</h4>.</p>
                <p className={cx('para')}>Một số link trên <h4 className={cx('name')}>.blog</h4> là link affiliate. Tuy nhiên, mình cam kết chỉ giới thiệu những nhà cung cấp có uy tín, dịch vụ chất lượng cao mà thôi. Các bạn cứ yên tâm sử dụng.</p>
                <p className={cx('para')}><h4 className={cx('name')}>Admin</h4><br/><i>Nguyễn Nhân</i></p>
            </div>
            <div className={cx('sidebar')}>
                <SideBar/>
            </div>
        </div>
    )
}

export default About;
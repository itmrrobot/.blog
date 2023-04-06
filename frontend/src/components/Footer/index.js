import './Footer.css';

function Footer() {
    return (
      <div className="wrap-footer">
        <div className="footer">
          <div className="footer-info">
            <div className="footer-item">
              <h4 className="footer-title">Liên hệ</h4>
              <div className="footer-desc">
                Developer Nhân
                <br />
                Email: nhannguyentri05@gmail.com
              </div>
            </div>
            <div className="footer-item">
              <h4 className="footer-title">Giới thiệu</h4>
              <div className="footer-desc">
                .blog là blog cá nhân cung cấp nhiều
                <br />
                thông tin hữu ích
              </div>
            </div>
            <div className="footer-item">
              <h4 className="footer-title">Mạng xã hội</h4>
              <div className="footer-list">
                <a href="/" className="footer-link">Facebook</a>
                <a href="/" className="footer-link">Instagram</a>
                <a href="/" className="footer-link">Twitter</a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
            <div className="footer-copyright-wrap">
                <div>Copyright © 2022 .blog!</div>
                <div>Cảm ơn bạn đã ghé thăm .blog</div>
            </div>
        </div>
      </div>
    );
}

export default Footer;
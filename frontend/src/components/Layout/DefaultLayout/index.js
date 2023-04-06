import Footer from "../../Footer";
import Header from "../../Header";
import MessageModal from "../../MessageModal";
import './DefaultLayout.css'

function DefaultLayout({children}) {
    return (
        <div className="wrapper">
            <Header/>
            <MessageModal/>
            <div className="wrap-content">
                {children}
            </div>
            <Footer/>
        </div>
    )
}

export default DefaultLayout;
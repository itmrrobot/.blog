import SideBar from "../../components/SideBar";
import SingleBlog from "../../components/SingleBlog";

function BlogDetail() {
    return (
        <div className='wrap-global'>
            <div className='content'>
                <SingleBlog/>
            </div>
            <div className='sidebar'>
                <SideBar/>
            </div>
        </div>
    )
}

export default BlogDetail;
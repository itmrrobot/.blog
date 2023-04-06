import SideBar from '../../components/SideBar';
import ListBlog from '../../components/ListBlog';
import './Home.scss';

function Home() {
    return(
        <div className='wrap-global'>
            <div className='content'>
                <ListBlog/>
            </div>
            <div className='sidebar'>
                <SideBar/>
            </div>
        </div>
    )
}

export default Home;
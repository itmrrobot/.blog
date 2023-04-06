import styles from './PannelBlogs.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { PATHBLOGSURL, USERBLOGSURL } from '../../constants';
import { UserState } from '../../context/AuthContext';
import Pagination from '../Pagination';
import {Link} from 'react-router-dom';

const cx = classNames.bind(styles);

function PannelBlogs() {
    const [data,setData] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    const [blogPerPage,setBlogPerPage] = useState(5);
    const [currentPage,setCurrentPage] = useState(1);
    const [pageNumberLimit,setPageNumberLimit] = useState(2);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(2);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(1);
    const lastBlogIndex = currentPage * blogPerPage;
    const firstBlogIndex = lastBlogIndex - blogPerPage;
    const blogs = data.slice(firstBlogIndex, lastBlogIndex);
    const style = {borderRadius:0,margin:0,padding:"3px 6px"}
    const anotherStyle = {borderRadius:0,margin:0,padding:"3px 6px",borderBottom:"1px solid #ccc",borderTop:"1px solid #ccc",borderLeft:"none",borderRight:"none"}
    const {user} = UserState();
    useEffect(() => {
        const controller = new AbortController();
        const fetchBlogs = async () => {
            try {
                const res = await axios.get(USERBLOGSURL,{
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                setData(res.data);
            } catch(e) {
                console.log(e);
            }
        }
        fetchBlogs();
        return () => {
            controller.abort();
        }
    },[user.token]);

    const handleDelete = async(id) => {
        const blogs = data.filter(d => d._id!==id);
        try {
            await axios.delete(PATHBLOGSURL+`/${id}`,{
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
        } catch(e) {
            console.log(e);
        }
        setData(blogs);
    }

    return (
        <div className={cx('wrap')}>
            <h2 className={cx('title')}>Blogs</h2>
            <div className={cx('list')}>
                <h3 className={cx('title-list')}>Blog list</h3>
                <div className={cx('table-wrap')}>
                <table className={cx('table-blogs')}>
                    <thead>
                        <tr className={cx('thead-row')}>
                            <th>ID</th>
                            <th className={cx('w-d')}>Tiêu đề</th>
                            <th>Nội dung</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map((item,index) => {
                            return (
                                <tr key={index} className={cx('tbody-row')}>
                                    <td>{item._id.slice(0,6)}</td>
                                    <td>{item.title}</td>
                                    <td dangerouslySetInnerHTML={{__html:item.info}} className={cx('content')}></td>
                                    <td>
                                        <div className={cx('group-action')}>
                                        <div className={cx('btn-delete')} onClick={() => handleDelete(item._id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>
                                        </div>
                                        <Link to='/blog/create' className={cx('link-create')}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>
                                        </Link>
                                        <Link to={`/blog/edit/${item._id}`} className={cx('btn-update')}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M142.9 142.9c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5c0 0 0 0 0 0H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5c7.7-21.8 20.2-42.3 37.8-59.8zM16 312v7.6 .7V440c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2l41.6-41.6c87.6 86.5 228.7 86.2 315.8-1c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.2 62.2-162.7 62.5-225.3 1L185 329c6.9-6.9 8.9-17.2 5.2-26.2s-12.5-14.8-22.2-14.8H48.4h-.7H40c-13.3 0-24 10.7-24 24z"/></svg>
                                        </Link>
                                        <Link to={`/blogs/${item._id}`} className={cx('link-read')}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/></svg>
                                        </Link>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                    <tfoot>
                        <tr className={cx('pagination')}>
                        <Pagination
                        currentPage={currentPage}
                        totalBlog={data.length}
                        blogPerPage={blogPerPage}
                        setCurrentPage={setCurrentPage}
                        maxPageNumberLimit={maxPageNumberLimit}
                        minPageNumberLimit={minPageNumberLimit}
                        setMaxPageNumberLimit={setMaxPageNumberLimit}
                        setMinPageNumberLimit={setMinPageNumberLimit}
                        pageNumberLimit={pageNumberLimit}
                        style={style}
                        anotherStyle={anotherStyle}
                     />
                        </tr>
                    </tfoot>
                </table>
                </div>
            </div>
        </div>
    )
}

export default PannelBlogs;
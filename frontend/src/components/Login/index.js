import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import {useState} from 'react';
import axios from 'axios';
import { UserState } from '../../context/AuthContext';
import {Link, useNavigate} from 'react-router-dom';
import {validate} from '../../utils/util';

const cx = classNames.bind(styles);

function Login() {
    const initialValue = {email:'',password:''};
    const [formValue,setFormValue] = useState(initialValue);
    const [formError,setFormError] = useState({});
    const {setUser} = UserState();
    const navigate = useNavigate();
    
    const url = 'http://localhost:4000'

    const handleChange = (e) => {
        const {name,value} = e.target;
        setFormValue({...formValue,[name]:value});
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setFormError(validate(formValue));
        try {
            const res = await axios.post(url+'/user/login',formValue);
            setUser(res.data);
            navigate('/');
        } catch(e) {
            console.log(e);
        }
    }

    return (
        <div className={cx('wrap')}>
            <form className={cx('form')} onSubmit={handleSubmit}>
                <h3 className={cx('title')}>Đăng nhập</h3>
                <div className={cx('form-group')}>
                    <label>Email</label>
                    <input type='text' name='email' value={formValue.email} placeholder='email' className={cx('form-input')} onChange={handleChange}/>
                    {formError&&<p className={cx('danger')}>{formError.email}</p>}
                </div>
                <div className={cx('form-group')}>
                    <label className={cx('mg-t-16')}>Password</label>
                    <input type='password' name='password' value={formValue.password} placeholder='password' className={cx('form-input')} onChange={handleChange}/>
                    {formError&&<p className={cx('danger')}>{formError.password}</p>}
                </div>
                <button className={cx('btn-login')}>Login</button>
                <p className={cx('question')}>Bạn chưa có tài khoản ?<Link to='/register'>Đăng kí tại đây</Link></p>
            </form>
        </div>
    )
}

export default Login;
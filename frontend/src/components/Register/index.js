import styles from './Register.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import axios from 'axios';
import { UserState } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import {validate} from '../../utils/util';

const cx = classNames.bind(styles);

function Register() {
    const {setUser} = UserState();
    const navigate = useNavigate();
    const initialValue = {name:'',email:'',password:''};
    const [formValues,setFormValues] = useState(initialValue);
    const [formError,setFormError] = useState({});
    const url = 'http://localhost:4000'

    const handleChange = (e) => {
        const {name,value} = e.target;
        setFormValues({...formValues,[name]:value});
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setFormError(validate(formValues));
        try {
            const res = await axios.post(url+'/user',formValues);
            setUser(res.data);
            navigate('/')
        } catch(e) {
            console.log(e);
        }
    }

    return(
        <div className={cx('wrap')}>
            <form className={cx('form')} onSubmit={handleSubmit}>
                <h3 className={cx('title')}>Đăng kí</h3>
                <div className={cx('form-group')}>
                    <label>Username</label>
                    <input type='text' name='name' value={formValues.name} placeholder='username' className={cx('form-input')} onChange={handleChange}/>
                    {formError&&<p className={cx('danger')}>{formError.name}</p>}
                </div>
                <div className={cx('form-group')}>
                    <label className={cx('mg-t-16')}>Email</label>
                    <input type='email' name='email' value={formValues.email} placeholder='email' className={cx('form-input')} onChange={handleChange}/>
                    {formError&&<p className={cx('danger')}>{formError.email}</p>}
                </div>
                <div className={cx('form-group')}>
                    <label className={cx('mg-t-16')}>Password</label>
                    <input type='password' name='password' value={formValues.password} placeholder='password' className={cx('form-input')} onChange={handleChange}/>
                    {formError&&<p className={cx('danger')}>{formError.password}</p>}
                </div>
                <button className={cx('btn-register')}>Register</button>
                <p className={cx('question')}>Bạn đã có tài khoản ?<Link to='/login'>Đăng nhập tại đây</Link></p>
            </form>
        </div>
    )
}

export default Register;
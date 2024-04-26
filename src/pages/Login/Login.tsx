import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createUser, resetUser, UserKey } from '../../redux/states/user';
import { clearLocalStorage } from '../../utils/localStorage.util';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './login.css';

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        clearLocalStorage(UserKey);
        clearLocalStorage("accessToken");
        dispatch(resetUser());
        navigate('/login', { replace: true });
    }, [dispatch, navigate]);

    const onSubmit = async (data: any) => {
        try {
            const response = await axios.post('http://localhost:8000/api/auth/login', data);
            dispatch(createUser(response.data.user));
            navigate(`/private/dashboard`, { replace: true });
            localStorage.setItem('accessToken', response.data.accessToken);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className='container'>
            <div className="login-container">
                <h2>Login</h2>
                <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="user">Username or Email:</label>
                        <input
                            type="text"
                            id="user"
                            {...register('user', { required: true })}
                        />
                        {errors.user && <span className="error-message">Username or Email is required</span>}
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            {...register('password', { required: true })}
                        />
                        {errors.password && <span className="error-message">Password is required</span>}
                    </div>
                    <button type="submit" className="submit-button">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;

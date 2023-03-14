import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { getLogin } from './loginService';


function Login() {
    const schema = yup.object({
        username: yup.string().required("Tên đăng nhập không đươc để trống"),
        password: yup.string().required("Mật khẩu không được để trống"),
    })
    const { register, handleSubmit,
        formState: { errors } } = useForm({
            resolver: yupResolver(schema)
        });
    const onSubmit = (data) => {
        getLogin(data)
            .then((res) => {
                if (res.response.status === 404) {
                    console.log(res.response.message);
                } else {
                    alert('Thành công');
                    // Navigate(`userlist/`)
                }
            })
            .catch(e => {
                console.log(e)
            })

    };
    return (
        <div>
            <div className="tab-content container">
                <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                    <h1 className='mb-5 mt-3'>Đăng nhập</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* <!-- Email input --> */}
                        <div className="form-outline mb-4 ">
                            <label className="form-label" htmlFor="loginName">Username:</label>
                            <input
                                type="username"
                                id="loginName"
                                className="form-control"
                                {...register("username")}
                            />
                            <p className="text-danger">{errors.username?.message}</p>

                        </div>

                        {/* <!-- Password input --> */}
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="loginPassword">Password:</label>

                            <input
                                type="password"
                                id="loginPassword"
                                className="form-control"
                                {...register("password")}

                            />
                            <p className="text-danger">{errors.password?.message}</p>

                        </div>
                        <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>
                    </form>
                </div>

            </div>
            {/* <!-- Pills content --> */}
        </div>
    )
}

export default Login

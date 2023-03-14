import React, { useState, useEffect } from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { updatePass } from './UserService'

function ChangePassword(props) {

    const schema = yup.object({
        oldPassword: yup.string().required("mật khẩu cũ không được để trống"),
        newPassword: yup.string().required("Mật khẩu mới không được để trống"),
        // password: yup.string().required("Mật khẩu không được để trống"),
    })
    const { register, handleSubmit,
        formState: { errors } } = useForm({
            resolver: yupResolver(schema)
        });
    const onSubmit = (data) => {
        updatePass({ ...data, id: props.id })
        .then((res) => {
            if (res.response.status === 404) {
                console.log(res.response.message);
            } else {
                alert('Thành công');
                Navigate(`userlist/`)
            }
        })
        .catch(e=>{
            alert(e.response?.data?.message)
        })
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Đổi mật khẩu</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label className="col-form-label">Mật khẩu cũ</label>
                            <input
                                type="password"
                                id="old-password"
                                className="form-control"
                                {...register("oldPassword")}
                            />
                            <p className="text-danger">{errors.oldPassword?.message}</p>

                        </div>
                        <div className="mb-3">
                            <label className="col-form-label">Mật khẩu mới</label>
                            <input
                                type="password"
                                id="new-password"
                                className="form-control"
                                {...register("newPassword")}
                            />
                            <p className="text-danger">{errors.newPassword?.message}</p>

                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                        <button type="submit" className="btn btn-primary" id="btn-change-password" >Xác nhận</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default ChangePassword

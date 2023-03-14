import React, { useState, useEffect } from 'react'
import { getProvinces, addUser } from './UserService';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

function UserCreate() {
    const [listProvinces, setListProvinces] = useState([]);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState({});
    const [password, setPassword] = useState('');
    const [listUser, setListUser] = useState({});

    const schema = yup.object({
        name: yup.string().required("Tên không được để trống"),
        email: yup.string().matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Email không đúng định dạng").required("email không được để trống"),
        phone: yup.string().matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, "Số điện thoại không đúng định dạng").required("số điện thoại không được để trống"),
        password: yup.string().required("Mật khẩu không được để trống"),

    })
    const { register, handleSubmit, 
        formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
      });
      const onSubmit = data => {
        addUser(data).then((res) => {
            if (res.data === null) {
                toast.error(res.message);
            } else {
                alert('Thành công');
                Navigate(`userlist/`)
            }
        });
      };
    useEffect(() => {
        getProvinces()
            .then((res) => {
                setListProvinces(res.data)
            })
            .catch((err) => err);
    }, []);

    const handleAddUser = () => {
        let obj = {};
        obj.name = name;
        obj.email = email;
        obj.phone = phone;
        obj.address = address;
        obj.password = password;
       
        // setListUser(obj)
        console.log(listUser);
    }
    return (
        <div>
            <div className="container mt-5 mb-5">
                <h2 className="text-center text-uppercase mb-3">Tạo user</h2>

                <div className="row justify-content-center">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="col-md-6">
                            <div className="bg-light p-4">
                                <div className="mb-3">
                                    <label className="col-form-label">Name</label>
                                    <input
                                     type="text"
                                      id="name"
                                       className="form-control"
                                        onChange={e => setName(e.target.value)} 
                                        {...register("name")}
                                        />
                                    <p className="text-danger">{errors.name?.message}</p>
                                </div>
                                <div className="mb-3">
                                    <label className="col-form-label">Email</label>
                                    <input 
                                    type="text"
                                     id="email" 
                                     className="form-control" 
                                     onChange={e => setEmail(e.target.value)} 
                                     {...register("email")}
                                     />
                                    <p className="text-danger">{errors.email?.message}</p>

                                </div>
                                <div className="mb-3">
                                    <label className="col-form-label">Phone</label>
                                    <input type="text" id="phone" className="form-control" onChange={e => setPhone(e.target.value)}   {...register("phone")}/>
                                    <p className="text-danger">{errors.phone?.message}</p>

                                </div>
                                <div className="mb-3">
                                    <label className="col-form-label">Address</label>
                                    <select className="form-select" id="address" onChange={e => setAddress(e.target.value)}  {...register("address")} >
                                        <option data="provinces">Chọn Tỉnh/ thành phố</option>
                                        {listProvinces.map(item => {
                                            return <option key={item.code} value={item.name} data="provinces">{item.name}</option>
                                        }
                                        )}
                                    </select>
                

                                </div>
                                <div className="mb-3">
                                    <label className="col-form-label">Password</label>
                                    <input type="password" id="password" className="form-control" onChange={e => setPassword(e.target.value)}   {...register("password")}/>
                                    <p className="text-danger">{errors.password?.message}</p>

                                </div>
                            </div>
                            <div className="text-center mt-3 d-flex justify-content-between">
                                <button className="btn btn-secondary"><a href='/userlist' style={{ color: "white", textDecoration: "none" }}> Quay lại</a></button>
                                <input className="btn btn-success" type="submit" id="btn-save" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UserCreate

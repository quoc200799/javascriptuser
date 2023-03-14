import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getUserById, getProvinces, forgotPass, updateUser, updateAvatar } from './UserService';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import ChangePassword from './ChangePassword'
import axios from "axios";


function UserDetail() {
  const [listProvinces, setListProvinces] = useState([]);
  const { userId } = useParams();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState({});
  const [item, setItem] = useState();

  useEffect(() => {
    searchUserById();
  }, [])

  const searchUserById = () => {
    getUserById(userId)
      .then((res) => { setItem(res.data); })
      .catch(err => err)
  };
  const handlefogotPass = (id) => {
    forgotPass(id)
      .then((res) => {
        alert("mật khẩu mới của bạn là: " + res.data)
      })
      .catch((err) => err);
  }
  useEffect(() => {
    getProvinces()
      .then((res) => {
        setListProvinces(res.data)
      })
      .catch((err) => err);
  }, []);

  const schema = yup.object({
    name: yup.string().required("Tên không được để trống"),
    email: yup.string().matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Email không đúng định dạng").required("email không được để trống"),
    phone: yup.string().matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, "Số điện thoại không đúng định dạng").required("số điện thoại không được để trống"),
    // password: yup.string().required("Mật khẩu không được để trống"),
  })
  const { register, handleSubmit,
    formState: { errors } } = useForm({
      resolver: yupResolver(schema),

    });
  const onSubmit = data => {
    updateUser({ ...data, id: item?.id }).then(res => {
      if (res.data === null) {
        toast.error(res.message);
      } else {
        alert('Thành công');
      }
    }).catch(e => e);

  };
  // const handleChangeAvatar = (e) => {
  //   const file = e.target.file[0];
  //   updateAvatar.then()
  // }
  const handleChangeAvatar = async (e) => {
    const file = e.target.files[0];
    console.log(file);

    const formData = new FormData();
    formData.append("file", file);

    try {
        const rs = await axios.put(`http://localhost:8080/api/users/${userId}/update-avatar`, formData, {
            headers : {
                "Content-Type" : "multipart/form-data"
            }
        })
        setItem({...item, avatar : rs.data.url});
    } catch (error) {
        console.log(error);
    }
};
  return (
    <div className="container mt-3">

      <h1>UserDetail : {userId}</h1>
      <div className="container mt-5 mb-5">
        <h2 className="text-center text-uppercase mb-3">Thông tin user</h2>

        <div className="row justify-content-center">
          <form onSubmit={handleSubmit(onSubmit)}>

            <div className="col-md-6">
              <div className="bg-light p-4">
                <div className="mb-3">
                  <label className="col-form-label">Fullname</label>
                  <input
                    type="text"
                    id="fullname"
                    className="form-control"
                    defaultValue={item?.name}
                    //  onChange={e => setItem({...item, name:e.target.value})} 
                    {...register("name")}
                  />
                  <p className="text-danger">{errors.name?.message}</p>

                </div>
                <div className="mb-3">
                  <label className="col-form-label">Email</label>
                  <input type="text"
                    id="email"
                    className="form-control"
                    defaultValue={item?.email}
                    //  onChange={e => setEmail(e.target.value)} 
                    {...register("email")}
                  />
                  <p className="text-danger">{errors.email?.message}</p>

                </div>
                <div className="mb-3">
                  <label className="col-form-label">Phone</label>
                  <input
                    type="text"
                    id="phone"
                    className="form-control"
                    defaultValue={item?.phone}
                    // onChange={e => setPhone(e.target.value)}
                    {...register("phone")}
                  />
                  <p className="text-danger">{errors.phone?.message}</p>

                </div>
                <div className="mb-3">
                  <label className="col-form-label">Address</label>
                  <select
                    className="form-select"
                    id="address"
                    // onChange={e => setAddress(e.target.value)}
                    defaultValue={item?.andress}
                    {...register("andress")}
                  >
                    {/* <option data="provinces">{item?.andress}</option> */}
                    {listProvinces.map(item => {
                      return <option key={item.code} value={item.name} data="provinces">{item.name}</option>
                    }
                    )}
                  </select>
                  <p className="text-danger">{errors.andress?.message}</p>

                </div>
                <div className="mb-3">
                  <label className="form-label">Avatar</label>
                  <div className="avatar-preview mb-3 rounded">
                    <img
                      src={item?.avatar ?? "https://via.placeholder.com/200"}
                      alt="avatar"
                      id="avatar-preview"
                      className="rounded"
                    />
                  </div>

                  <label className="btn btn-warning" htmlFor="input">
                    Chọn ảnh
                  </label>
                  <input
                    type="file"
                    id="input"
                    className="d-none"
                    onChange={e => handleChangeAvatar(e)}
                  />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Password</label>
                  <div className="">
                    <button type="button"
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#modal-change-password">
                      Đổi mật khẩu
                    </button>
                    <button className="btn btn-warning" id="btn-forgot-password"
                      onClick={() => handlefogotPass(item?.id)}>
                      Quên mật khẩu
                    </button>
                  </div>
                </div>
              </div>
              <div className="text-center mt-3">
                <button className="btn btn-secondary btn-back">Quay lại</button>
                <button className="btn btn-success" id="btn-save" type='submit'>Cập nhật</button>
              </div>
            </div>
          </form>
        </div>

        {/* <!-- Modal đổi mật khẩu--> */}
        <div className="modal fade" id="modal-change-password" data-bs-backdrop="static" data-bs-keyboard="false"
          tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <ChangePassword
            id={item?.id}
          />
        </div>
      </div>
    </div>
  )
}

export default UserDetail

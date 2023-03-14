import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import { searchByPage,deleteItem } from './UserService';


function UserList() {
  const [list, setList] = useState([]);
  const [type, setType] = useState("posts");
  const [stylehi, setStylehi] = useState(null);


  useEffect(() => {
    search();
  }, [])
  const search = () => {
    let searchObject = {};
    searchByPage()
      .then((res) => setList(res.data))
  };
  const handleDelete = (id) =>{
    deleteItem(id);
    alert("Xoas thanhf coong!");
    search();
  }
  return (
    <div>
      <div className="container mt-5 mb-5">
        <h2 className="text-center text-uppercase">Danh sách user</h2>

        <div className="row justify-content-center">
          <div className="col-md-10">

            <div className="d-flex justify-content-between align-items-center mt-5 mb-4">
              <a href="./userlist/create" className="btn btn-warning">Tạo user</a>
              <input type="text" id="search" className="form-control w-50" placeholder="Tìm kiếm user" />
            </div>

            <div className="bg-light p-4">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {list.map((item, index) =>
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>{item.andress}</td>
                      <td>
                        <a href={`/userlist/${item.id}`} className="btn btn-success">Xem chi tiết</a>
                        <button className="btn btn-danger"  onClick={() => handleDelete(item.id)}>Xóa</button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              <p className="message d-none"></p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default UserList

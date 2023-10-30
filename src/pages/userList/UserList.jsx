import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {userRequest} from '../../requestMethods'

export default function UserList() {
  const [data, setData] = useState([]);

  const handleDelete = (id) => {
    setData(data.filter((item) => item._id !== id));
  };

useEffect(() => {
  
  const getUsers = async () => {
    try {
      const res = await userRequest.get('user');
      setData(res.data);
      console.log(res.data)
   

    } catch (error) {
      console.log(error)
    }
  }
  getUsers()

}, [])


  
  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src="https://static.thenounproject.com/png/881504-200.png" alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "createdAt",
      headerName: "Joined at",
      width: 160,
      valueGetter: (params) => {
        const createdAt = new Date(params.row.createdAt);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return createdAt.toLocaleDateString(undefined, options);
      },
    },
 
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={15}
        checkboxSelection
        getRowId={row=>row._id}
      />
    </div>
  );
}

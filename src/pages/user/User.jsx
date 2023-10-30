import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./user.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { userRequest } from "../../requestMethods";

export default function User() {



  const [user, setuser] = useState('')

  const location = useLocation()
  const userId = location.pathname.split('/')[2]

  //Get User
  useEffect(() => {

    const getUser = async () => {
      const res = await userRequest.get(`user/find/${userId}`)
      setuser(res.data)

    }
    getUser()
  }, [])

  //Update User

  const [inputs, setinputs] = useState('')

  const handleChange = (e) => {
    e.preventDefault();

    setinputs(prev => ({
      ...prev, [e.target.name]: e.target.value
    }
    ))
  }

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const res = await userRequest.put(`user/${userId}`, inputs)
      alert(res.data.username + ' Updated')
      window.location.reload()
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="https://static.thenounproject.com/png/881504-200.png"
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.username}</span>
              {/* <span className="userShowUserTitle">Software Engineer</span> */}
            </div>
          </div>

          {user.isAdmin && (<span className="userShowTitle admin2">Admin</span>)}
          <div className="userShowBottom">
            <span className="userShowTitle">Contact Details</span>

            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">New York | USA</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  name='username'
                  type="text"
                  placeholder="annabeck99"
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>

              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  name="email"
                  type="text"
                  placeholder="annabeck99@gmail.com"
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Admin</label>
                <select name="isAdmin" onChange={handleChange}>
 
                  <option value="false" >Select</option>
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                
                </select>
              </div>


            </div>
            {/* <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="userUpdateButton">Update</button>
            </div> */}
          </form>

          <button className="userUpdateButton" onClick={handleClick}>Update</button>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react"
import { useDispatch } from "react-redux"
import { login } from "../../Redux/apiCalls"


const Login = () => {


    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')

    const dispatch = useDispatch()


    const handleClick = async (e) => {
        e.preventDefault();
      
   login(dispatch, { username, password })
        
        // window.history.back();

//

    }

    return (
      
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            flexDirection: 'column'
        }} >
            <input
                type="text"
                placeholder="Username.."
                style={{padding: '10px', margin: '9px'}}

                

                onChange={(e) => setusername(e.target.value)} />
          

            <input
                type="text"
                placeholder="password.."
                style={{ padding: '10px',margin: '9px' }}


                onChange={
                (e)=>setpassword(e.target.value)
            } />
            
            <button
                onClick={handleClick}
                style={{padding: '10px', width: '100px'}}
            >Login</button>
      
        </div>
        
  )
}

export default Login

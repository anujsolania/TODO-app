
import { useState } from "react"
import { useNavigate } from "react-router-dom"


function SignupLogin() {
    const [username,setusername] = useState("")
    const [password,setpassword] = useState("")
   

    const navigate = useNavigate("/")

    return (
        <div>
            <div>
            
            <ul>
            <h2>HOME PAGE</h2>
                <li>You can SIGNUP/LOGIN/LOGOUT</li>
                <li>You can create/remove/markAsComplete TODOS</li>
            </ul>
            </div>

            <br></br><br></br>
            <button onClick={
                () => {
                    const token = localStorage.getItem("authtoken")
                    if (token) {
                        navigate("/todobnao")
                    } else {
                        alert("Login first")
                    }
                }
            } style={{margin: "10px", padding: "5px", backgroundColor: "skyblue"}} >CREATE TODO</button>
            <br></br><br></br>

            <input style={{margin: "10px", padding: "10px"}} type="text" placeholder="Enter username" 
            onChange={(e) => {setusername(e.target.value)}}></input>
            <br></br>
            <input style={{margin: "10px", padding: "10px"}} type="text" placeholder="Enter password" 
            onChange={(e) => {setpassword(e.target.value)}}></input>
            <br></br>
            <button onClick={
                async () => {
                    const response = await fetch("http://localhost:3000/signup",{
                        method: "POST",
                        body: JSON.stringify({username,password}),
                        headers: {"content-type": "application/json"}
                    })
                    const json = await response.json()
                    alert(json.mssg)
                }
            } style={{margin: "5px", padding: "5px", backgroundColor: "skyblue"}} >SIGNUP</button>
            <button onClick={
                async () => {
                    const response = await fetch("http://localhost:3000/signin",{
                        method: "POST",
                        body: JSON.stringify({username,password}),
                        headers: {"content-type": "application/json"}
                    })
                    const json = await response.json()
                    const token = json.token
                    localStorage.setItem("authtoken",token)
                    alert(json.mssg)
                    if (token) {
                        navigate("/todobnao")
                    }
                }
            } style={{margin: "5px", padding: "5px", backgroundColor: "skyblue"}} >LOGIN</button>
            <button onClick={
                async () => {
                localStorage.removeItem("authtoken")
                localStorage.clear()
                alert("Logged out successfully")
                }
            } style={{margin: "5px", padding: "5px", backgroundColor: "skyblue"}} >LOGOUT</button>
        </div>
    )
}

export default SignupLogin
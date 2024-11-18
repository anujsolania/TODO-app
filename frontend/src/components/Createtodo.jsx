import { useState } from "react"


function Createtodo() {
    const [title,settitle] = useState("")
    const [description,setdescription] = useState("")

    const data = {title,description}
    return (
        <div>
            <input style={{margin: "10px", padding: "10px"}} type="text" placeholder="enter title" 
            onChange={e => settitle(e.target.value)} ></input>
            <br></br>
            <input style={{margin: "10px", padding: "10px"}} type="text" placeholder="enter description"
            onChange={e => setdescription(e.target.value)} ></input>
            <br></br>
            <button style={{margin: "10px", padding: "10px"}} onClick={
                 async () => {
                    const token = localStorage.getItem("authtoken")
                    const response = await fetch("http://localhost:3000/createtodo",{
                        method: "POST",
                        body: JSON.stringify(data),
                        headers: {
                            "content-type": "application/json",
                            "authorization": token
                        }
                    })
                    const json = await response.json()
                    alert(json.mssg)  //accessing the backend mssg
                }
            } >ADD TODO </button>
        </div>
    )
}

export default Createtodo

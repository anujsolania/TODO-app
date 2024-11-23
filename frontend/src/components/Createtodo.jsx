import { useState } from "react"


function Createtodo() {
    const [title,settitle] = useState("")
    const [description,setdescription] = useState("")
    const [duedate,setduedate] = useState("")

    const data = {title,description,duedate}
    return (
        <div>
            <input style={{margin: "10px", padding: "5px"}} type="text" placeholder="enter title" value={title}
            onChange={e => settitle(e.target.value)} ></input>

            <label style={{marginLeft: "10px"}} >DUE DATE(optional) :
            <input style={{margin: "5px", padding: "0px"}} type="date" value={duedate}
            onChange={e => setduedate(e.target.value)} ></input>
            </label>
            <br></br>

            <input style={{margin: "10px", padding: "5px"}} type="text" placeholder="enter description" value={description}
            onChange={e => setdescription(e.target.value)} ></input>
            <br></br>
            <button style={{margin: "10px", padding: "5px"}} onClick={
                 async () => {
                    const token = localStorage.getItem("authtoken")
                    const response = await fetch(`${import.meta.env.VITE_BURL}/createtodo`,{
                        method: "POST",
                        body: JSON.stringify(data),
                        headers: {
                            "content-type": "application/json",
                            "authorization": token
                        }
                    })
                    const json = await response.json()
                    settitle("");
                    setdescription("");
                    setduedate("");
                    alert(json.mssg)  //accessing the backend mssg
                }
            } >ADD TODO </button>
        </div>
    )
}

export default Createtodo

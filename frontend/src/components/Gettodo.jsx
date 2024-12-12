import { useState } from "react"
import { Link } from "react-router-dom"

function Gettodo({proptodos}) {
    const [edit,setedit] = useState(0)

    const [newtitle,setnewtitle] = useState("")
    const [newdescription,setnewdescription] = useState("")
    const [newduedate,setnewduedate] = useState("")

    const data = {newtitle,newdescription,newduedate}

    async function markascompleted(todoid) {
        const token = localStorage.getItem("authtoken")
        const response = await fetch(`${import.meta.env.VITE_BURL}/${todoid}`,{
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "authorization": token,
            }

        })
        const json = await response.json()
        alert(json.mssg)
    }
    
    async function editfn(data,todoid) {
        const token = localStorage.getItem("authtoken")
        const response = await fetch(`${import.meta.env.VITE_BURL}/${todoid}`,{
            method: "PATCH",
            body: JSON.stringify(data),
            headers: {
                "content-type": "application/json",
                "authorization": token,
            }

        })
        const json = await response.json()
        alert(json.mssg)
    }


    return (
        <div style={{margin: "10px", padding: "5px"}} > 
            {proptodos.map(todo => ( 
                <div key={todo._id} >

                <h3>{ 
                edit == todo._id ? <input type="text" value={newtitle} 
                onChange={(e) => {setnewtitle(e.target.value)}} ></input> : todo.title }</h3>

                <h3>{ 
                edit == todo._id ? <input type="text" value={newdescription} 
                onChange={(e) => {setnewdescription(e.target.value)}} ></input> : todo.description }</h3>

                {
                    todo.duedate ?
                    edit == todo._id ?
                    (<input style={{margin: "5px", padding: "0px"}} type="date" value={newduedate}
                    onChange={e => setnewduedate(e.target.value)} ></input>) : (<p>Duedate: {new Date(todo.duedate).toLocaleDateString("en-GB")}</p>) : null
                }

                <button onClick={
                    () => {markascompleted(todo._id)}
                } >{todo.completed ? "completed": "MARK AS COMPLETE"}</button>
                
                <button onClick={
                    () => {
                        if (edit == 0) {
                            if (todo.completed) {
                                alert("Todo's already completed")
                            }
                            else {
                            setnewtitle(todo.title)
                            setnewdescription(todo.description)
                            setnewduedate(todo.duedate ? todo.duedate.split("T")[0] : null)
                            setedit(todo._id)
                            }
                        } else {
                            editfn(data,todo._id)
                            .then(() => {setedit(0)})
                        }
                    }
                }>{edit == todo._id ? "CONFIRM EDIT": "EDIT"}</button>

                <button onClick={
                    async () => {
                        const token = localStorage.getItem("authtoken")
                        const response = await fetch(`${import.meta.env.VITE_BURL}/${todo._id}`,{
                            method: "DELETE",
                            headers: {"authorization": token}
                        })
                        const json = await response.json()
                        console.log(json)
                        alert(json.mssg)
                    }
                } >REMOVE</button>
                </div>

            ))}
            <br></br>
            <Link to="/" >HOME PAGE</Link>
        </div>
    )
}


export default Gettodo

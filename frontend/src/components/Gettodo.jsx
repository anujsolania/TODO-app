import { Link } from "react-router-dom"

function Gettodo({proptodos}) {
    return (
        <div> 
            {proptodos.map(todo => (   
                <div key={todo._id} style={{alignContent: "center"}} >
                <h3>{todo.title}</h3>
                <h3>{todo.description}</h3>
                <button onClick={
                    async () => {
                        const token = localStorage.getItem("authtoken")
                        const response = await fetch(`http://localhost:3000/${todo._id}`,{
                            method: "PATCH",
                            headers: {"authorization": token}
                        })
                        const json = await response.json()
                        alert(json.mssg)
                    }
                } >{todo.completed ? "completed": "MARK AS COMPLETE"}</button>
                <button onClick={
                    async () => {
                        const token = localStorage.getItem("authtoken")
                        const response = await fetch(`http://localhost:3000/${todo._id}`,{
                            method: "DELETE",
                            headers: {"authorization": token}
                        })
                        const json = await response.json()
                        alert(json.mssg)
                    }
                } >REMOVE TODO</button>
                </div>
            ))}
            <br></br>
            <Link to="/" >HOME PAGE</Link>
        </div>
    )
}


export default Gettodo

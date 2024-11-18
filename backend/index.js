const express = require("express")
const cors = require("cors")
const {Todo,User} = require("./db/mongoose")
const { jwt, jwtkey } = require("./jwt/jwt")
const app = express()
const middleware = require("./midddleware/middleware")

app.use(express.json())
app.use(cors())

//SIGNUP
app.post("/signup",async (req,res) => {
    const {username,password} = req.body

    if ((!username) && (!password)) {
        return res.json({mssg: "Enter Username and Password"})
    } 
    if (!username) {
        return res.json({mssg: "Enter Username"})
    } 
    if (!password) {
        return res.json({mssg: "Enter Password"})
    } 

    const result = await User.findOne({username})
    if (result) {
        return res.json({mssg: "Username/User already exists"})
    }
    await User.create({
        username,
        password
    })
    res.json({mssg: "USER CREATED SUCCESSFULLY"})
        
})

//SIGNIN
app.post("/signin",async (req,res) => {
    const {username,password} = req.body

    if ((!username) && (!password)) {
        return res.json({mssg: "Enter Username and Password"})
    } 
    if (!username) {
        return res.json({mssg: "Enter Username"})
    } 
    if (!password) {
        return res.json({mssg: "Enter Password"})
    } 

    const result = await User.findOne({username,password})
    if (!result) {
        return res.json({mssg: "USER DOESN'T EXISTS"})
    }
    const token = jwt.sign({username},jwtkey)

    res.json({mssg: `LOGGED IN SUCCESSFULLY AS ${username}`,token})
})


//CREATE TODOS
app.post("/createtodo",middleware,async (req,res) => {
    const {title, description} = req.body

    const username = req.username
    
    if (!(title&&description)) {
        return res.send("send title/description")
    }

    const response = await User.findOne({username})
    const userid = response._id

    try {
        const response2 = await Todo.create({title,description,userid})
        res.json({mssg: "todo created successfully",response2})
    } catch (error) {
        res.json({mssg: "unable to create todo",error: error.message})
    }
})


//GET TODOS
app.get("/gettodos",middleware,async (req,res) => {
    const username = req.username

    const response = await User.findOne({username})
    const userid = response._id
    
    const response2 = await Todo.find({userid})
    res.json({TODOS: response2})
})


//MARK AS COMPLETED
app.patch("/:_id",middleware,(req,res) => {
    const clickedtodoid = req.params._id

    Todo.updateOne({_id: clickedtodoid},{$set: {completed: true}})
    .then(() => {res.json({mssg: "todo marked as completed"})})
    .catch(() => {res.json({mssg: "UNABLE marked as completed"})} )
})


//REMOVE TODO
app.delete("/:_id",middleware,(req,res) => {
    const clickedtodoid = req.params._id

    Todo.deleteOne({_id: clickedtodoid})
    .then(() => {res.json({mssg: "Todo deleted successfully"})})
    .catch(() => {res.json({mssg: "UNABLE to delete TODO"})} )
})

app.listen(3000)
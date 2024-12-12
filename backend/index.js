const express = require("express")
const cors = require("cors")
const {Todo,User} = require("./db/mongoose")
const { jwt, jwtkey } = require("./jwt/jwt")
const app = express()
const middleware = require("./midddleware/middleware")


app.use(express.json())
app.use(cors({
    origin: "*", // Allow all origins
}));

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
    res.json({mssg: "User created successfully"})
        
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
        return res.json({mssg: "User doesn't exists"})
    }
    const token = jwt.sign({username},jwtkey,{expiresIn: "1h"})

    res.json({mssg: `Logged in successfully as ${username}`,token})
})


//CREATE TODOS
app.post("/createtodo",middleware,async (req,res) => {
    const {title, description,duedate} = req.body

    const username = req.username
    
    if (!(title) && !(description)) {
        return res.json({mssg: "Send title and description"})
    }
    if (!(title)) {
        return res.json({mssg: "Send title"})
    }
    if (!(description)) {
        return res.json({mssg: "Send description"})
    }

    const response = await User.findOne({username})
    const userid = response._id

    try {
        const response2 = await Todo.create({title,description,duedate,userid})
        res.json({mssg: "Todo created successfully",response2})
    } catch (error) {
        res.json({mssg: "Unable to create todo",error: error.message})
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

//MARK AS COMPLETED || EDIT TODO
app.patch("/:_id",middleware,async (req,res) => {
    const clickedtodoid = req.params._id

    const {newtitle,newdescription,newduedate} = req.body

    //FOR MARKING AS COMPLETED
    if ((!newtitle) || (!newdescription)) {
        await Todo.updateOne({_id: clickedtodoid},{$set: {completed: true}})
        return res.json({mssg: "Todo marked as completed"})
    }

    //FOR EDIT 
    const result1 = await Todo.findOne({title: newtitle})
    const result2 = await Todo.findOne({description: newdescription})
    const result3 = await Todo.findOne({duedate: newduedate})

    if ((!result1) && (!result2) && (!result3)) {
        await Todo.updateOne({_id: clickedtodoid},{$set: {title: newtitle,description: newdescription,duedate: newduedate}})
        return res.json({mssg: "Title,Description and Duedate updated successfully"})
    }
    if ((!result1) && (!result2) && (result3)) {
        await Todo.updateOne({_id: clickedtodoid},{$set: {title: newtitle,description: newdescription}})
        return res.json({mssg: "Title and Description updated successfully"})
    }
    if ((result1) && (!result2) && (!result3)) {
        await Todo.updateOne({_id: clickedtodoid},{$set: {title: newtitle}})
        return res.json({mssg: "Description and Duedate updated successfully"})
    }
    if ((!result1) && (result2) && (result3)) {
        await Todo.updateOne({_id: clickedtodoid},{$set: {title: newtitle}})
        return res.json({mssg: "Title updated successfully"})
    }
    if ((result1) && (!result2) && (result3)) {
        await Todo.updateOne({_id: clickedtodoid},{$set: {description: newdescription}})
        return res.json({mssg: "Description updated successfully"})
    }
    if ((result1) && (result2) && (!result3)) {
        await Todo.updateOne({_id: clickedtodoid},{$set: {duedate: newduedate}})
        return res.json({mssg: "Duedate updated successfully"})
    }
    if ((result1) && (result2) && (result3)) {
        return res.json({mssg: "No update detected"})
    }
})


//REMOVE TODO
app.delete("/:_id",middleware,(req,res) => {
    const clickedtodoid = req.params._id

    Todo.deleteOne({_id: clickedtodoid})
    .then(() => {res.json({mssg: "Todo deleted successfully"})})
    .catch(() => {res.json({mssg: "Unable to delete Todo"})} )
})

app.listen(3000)
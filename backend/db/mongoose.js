const mongoose = require("mongoose")

require("dotenv").config()
mongoose.connect(`${process.env.MONGO_URL}`)
.then(() => {console.log("connected to DB")})
.catch((err) => {console.log("Unable to connect DB",err)})

const todoschema = new mongoose.Schema({
    title: {type: String,required: true},
    description: {type: String, required: true},
    completed: {type: Boolean, default: false},
    userid: {type: mongoose.Types.ObjectId,ref: "User",required: true}
})

const userschema = new mongoose.Schema({
    username: {type: String,required: true},
    password: {type: String,required: true},

})

const Todo = new mongoose.model("todo", todoschema)
const User = new mongoose.model("user",userschema)

module.exports = {Todo,User}

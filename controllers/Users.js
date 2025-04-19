import asyncHandler from "express-async-handler"
import User from "../models/Users.js"


const createUser = asyncHandler(async (req, res)=>{
    const { email, password, firstName, lastName, username } = req.body
    console.log(req.body)
    if(!username || !password || !email || !firstName || !lastName){
        return res.status(500).json({ success: false, error: "All fields required to register"})
    }
    const createUser = await User.createUser(email, password, firstName, lastName, username)
    return res.status(201).json({success: true, message: "new user created successfully"})
})

const editUser = asyncHandler( async(req, res, next)=>{})
const findUserByEmail = asyncHandler(async(res, req)=>{
    try{
    const user = await User.findUserByEmail(req.body.email)
        return res.status(200).json({ success: true, data: user})
    }
    catch(err){
        return res.status(500).json({success: false, error: err.message})
    }
})
const findUserById = asyncHandler(async (req, res, next)=>{
        const user = await User.findUserById(req.params.id)
        console.log(user)
        return res.status(200).json({ success: true, data: user})
    
})



export { createUser, editUser, findUserByEmail, findUserById }

import { model, Schema } from "mongoose"
import bcrypt from "bcrypt"

const user = Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,

    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true,

    },
    role: {
        type: String,
        enum: ["CLIENT", "ADMIN"],
        default: "CLIENT"
    },
    plans: {
        type: String
    },
},
{
    statics:{
        createUser: async function(email,password,firstName, lastName, username){
            try{
                const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT))
                const newUser = await this.create({email, password: hashedPassword, firstName, lastName, username})
                return newUser
            }catch(err){
                throw err
            }
        },
        editUser: async function(email, password,firstName,lastName,id){
            try{
                const editableUser = await this.findById(id)
                if(!editableUser){
                    throw err
                }
            }catch(err){
                throw err
            }
        },
        findUserByEmail: async function(email){
            try{
                const User = await this.findOne({email:email})
                return User
            }catch(err){
                throw err
            }
        },
        findUserById: async function(id){
            try{
                const User = await this.findById(id).exec()
                return User
            }catch(err){
                throw err
            }
        }
    }
},{timestamps: true})


export default model("User", user)
import mongoose from "mongoose"


const Connect = () => {
    if(process.env.NODE_ENV === "production"){
    mongoose.connect(process.env.MONGODB_URL)
    }else{
        mongoose.connect(process.env.MONGO_LOCAL)
    }

    mongoose.connection.on("connected", () => {
        console.log("Database connection established")
    })
    mongoose.connection.on("reconnected", () => {
        console.log("Database connection re-established")
    })
    mongoose.connection.on("error", (error) => {
        console.log("Database connection error", error.message)
    })
    mongoose.connection.on("disconnected", () => {
        console.log(`Database disconnected`)
    })
}


export default Connect;
import { Schema, model } from "mongoose";


const path= Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    modules:{
        name: String,
        description: String,
        topics: [String],
        resources: [String],
        estimatedHours: Number,
        projects: [String]
    }
},
{statics:{
    createPath: function(){

    },
    findPath: function(){

    },

}})


export default model("Path", path)
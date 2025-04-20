import { Schema, model } from "mongoose";


const path= Schema({
    name:{
        type: String,
        required: true,
        unique: true,
    },
    progress: {
        type: Number,
        default: 0
    },
    data: {
        type: [{
            title: String,
            description: String,
        },
    ]
    }
})
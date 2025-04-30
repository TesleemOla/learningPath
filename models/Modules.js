import { Schema, model } from "mongoose";

const modules = Schema({
    title: {
        type: String,
        required: true
    },
    details:{
        type: String,
    },
    text:{
        type: String
    },
    resources: {
        type: [String]
    }
},{
    statics: {
        createModule: async function(title, details, text, resources){
            try{
            const exists = await this.findOne({title: title})
            if(!exists){
            const module = await this.create({ title, details, text, resources})
            return module
            }
        }catch(err){
            throw err
        }
        },
        editModule: async function(){},
        getAllModules: async function(){},
        getSingleModule: async function(){},
    }
})


export default model("modules", modules)
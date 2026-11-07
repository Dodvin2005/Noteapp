import mongoose from "mongoose";


export interface Iuser{
    title:string;
    description:string;
    color:string;
    userMail:string;
}
const noteSchema = new mongoose.Schema<Iuser>({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    color:{
        type:String,
        required:true
    },
    userMail:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const notes = mongoose.models.notes || mongoose.model<Iuser>("users", noteSchema)

export default notes
import mongoose from "mongoose";


export interface Iuser{
    name:string;
    email:string;
    password:string;
}
const userSchema = new mongoose.Schema<Iuser>({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}
})

export default mongoose.models.users || mongoose.model<Iuser>("users",userSchema)
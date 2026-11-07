import { connectDB } from "@/lib/mongodb";
import users from "@/models/userModel";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers:[
        CredentialsProvider({
            name:"Credentials",
            credentials:{},
            async authorize(credentials:any){
                await connectDB()
                const user = await users.findOne
                ({email:credentials.email})
                if(!user){
                    return null
                }
                const isMatch = await bcrypt.compare(credentials.password,user.password)
                if(!isMatch){
                    return null
                }
                return{
                    id:user._id,
                    name:user.name,
                    email:user.email
                }
            }
        })
    ],
    pages:{
        signIn : '/login'
    },
    session:{
        strategy:'jwt'
    },
    secret:process.env.NEXTAUTH_SECRET
})
export {handler as GET,handler as POST}

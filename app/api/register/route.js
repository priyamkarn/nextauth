import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from 'bcryptjs'
export async function POST(req)
{
    try{
        const {name,email,password}=await req.json();
        const hashedPassword=await bcrypt.hash(password,10);
        await connectMongoDB();
        await User.create({name,email,password:hashedPassword});
        return NextResponse.json({
            message:"user registered"
        },{status:201})
    } catch(error)
    {
        NextResponse.json({
            message:"An error occured while registering the user."
        },{status:500})
    }
}
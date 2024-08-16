"use client";

import React from 'react'
import Link from 'next/link'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'
function RegisterForm() {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("")
  const [error,setError]=useState("")
  const router = useRouter();
const handlesubmit=async (e)=>
{
  e.preventDefault();

  if(!name || !email || !password)
  {
    setError('all fields are necessary')
    return;
  }
  try {
    const resUserExists = await axios.post("/api/userExists", {
      email
    });

    const { user } = resUserExists.data;

    if (user) {
      setError("User already exists.");
      return;
    }
        const res = await axios.post("/api/register", {
      name,
      email,
      password
    });

    if (res.status === 201) { 
      const form = e.target;
      form.reset();
      router.push("/"); 
    } else {
      console.log("User registration failed.");
    }
  } catch (error) {
    console.log("Error during registration: ", error);
  }
}

  return (
    <div className="grid place-items-center h-screen">
        <div className='shadow-lg p-4 rounded-lg border-t-4 border-green-400'>
            <h1 className='text-xl font-bold my-4'>Register</h1>
            <form className="flex flex-col gap-3" onSubmit={handlesubmit}>
            <input type="text" placeholder='Full Name' onChange={(e)=>
              {
                setName(e.target.value)
              }
            }/>
                <input type="text" placeholder='Email' onChange={(e)=>
                  {
                    setEmail(e.target.value)
                  }
                }/>
                <input type="text" placeholder='Password' onChange={(e)=>
                  {
                    setPassword(e.target.value)
                  }
                }/>
                <button className='bg-green-600 font-bold text-white px-6 py-2 cursor-pointer'>Register</button>
                {
                  error &&(
                    <div className='bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2'>
                    {error}
                </div>
                  )
                }
                <Link href={'/'} className='text-sm mt-3 text-right'>
                Already Have an Account?<span className='underline'>Login</span></Link>
            </form>
        </div>
    </div>
  )
}

export default RegisterForm
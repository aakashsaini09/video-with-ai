"use client"
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const LoginPage = () => {
   const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const router = useRouter();
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const result = await signIn('credentials',{
          email,
          password,
          redirect: false
        })
        if(result?.error){
          console.error("Login failed: ", result);
          alert("Login failed: " + result.error);
          return;
        }
        console.log("Login successful", result);
        router.push('/');
      }
  return (
    <div>
      LoginPage
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="p-2 border rounded bg-black"
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="p-2 border rounded"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">Login</button>
      </form>
      <div>
        <p>Dont have an account? <a href="/register">Register</a></p>
      </div>
    </div>
  )
}

export default LoginPage

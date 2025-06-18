"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(password !== confirmPassword){
          alert("Passwords do not match")
          return;
        }
        try {
          const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          })
          const data = await res.json();
          if(!res.ok){
            throw new Error(data.error || 'Registration failed');
          }
          console.log("Registration successful", data);
          router.push('/login');
        } catch (error) {
          console.error("Something went wrong during registration: ", error);
          return;
        }
    }
  return (
    <div>
      RegisterPage
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
            <input 
            type="password" 
            placeholder="Confirm Password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            className="p-2 border rounded"
            />
            <button type="submit" className="p-2 bg-blue-500 text-white rounded">Register</button>
            </form>
            <div>
              <p>Already have an Account? <a href="/login">Login</a></p>
            </div>
    </div>
  )
}

export default RegisterPage

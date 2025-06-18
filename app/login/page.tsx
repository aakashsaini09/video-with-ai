import React from 'react'

const loginPage = () => {
  return (
    <div>
      LoginPage
      <form className="flex flex-col gap-4">
        <input 
          type="email" 
          placeholder="Email" 
          className="p-2 border rounded bg-black"
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="p-2 border rounded"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">Login</button>
      </form>
    </div>
  )
}

export default loginPage

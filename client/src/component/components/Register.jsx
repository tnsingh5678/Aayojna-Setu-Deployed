import {useState,useEffect} from "react"
import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom"
import Nav from "./Nav"

export default function Register(){
    const[username,setUsername] = useState()
    const[email,setEmail] = useState()
    const[password,setPassword] = useState()

    return(
        <>
        <Nav/>
        <div className="flex object-fill justify-between">
            <div className="w-[100px] h-[100px] rounded-full object-fill float-left m-3 p-auto border-4 border-red-200 border-solid">
            <img src="https://media.geeksforgeeks.org/wp-content/uploads/20230222104738/file.png" className="w-[100px] h-[100px] rounded-full" 
            ></img></div>
            <div className="w-[100px] h-[100px] rounded-full float-right m-3 p-auto">
            <img src="https://upload.wikimedia.org/wikipedia/en/8/83/Indian_Institute_of_Information_Technology%2C_Una_logo.png" className="w-[100px] h-[100px] rounded-full"></img></div>
        </div>
        <div className="flex justify-center">
        <div className="p-[50px] m-[10px] h-50% w-50% center text-center text-white flex justify-start">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Shri_Narendra_Modi%2C_Prime_Minister_of_India.jpg/330px-Shri_Narendra_Modi%2C_Prime_Minister_of_India.jpg" className="w-[300px] h-[300px]"></img>
        </div>
        <div className="p-[50px] m-[10px] h-50% w-50% center flex justify-center text-center text-white ">
            <div className="bg-sky-500">
            <h4>Username</h4>
            <input type="text" className="p-2 m-4 w-[200px] h-7 text-black rounded-xl" placeholder="username" onChange={(e)=>setUsername(e.target.value)}></input><br/>
            <h4>Email</h4>
            <input type="email" className="p-2 m-4 w-[200px] h-7 text-black rounded-xl" placeholder="email" onChange={(e)=>setEmail(e.target.value)}></input><br/>
            <h4>Create Password</h4>
            <input type="password" className="p-2 m-4 w-[200px] h-7 text-black rounded-xl" onChange={(e)=>setPassword(e.target.value)}></input><br/>
            <h4>Confirm Password</h4>
            <input type="password" className="p-2 m-4 w-[200px] h-7 text-black rounded-xl" onChange={(e)=>setPassword(e.target.value)}></input><br/>
            <button className="p-2 m-4 bg-gray-400 rounded-xl" onClick={(e)=>e.preventDefault()} >Click</button> </div>
        </div>
        <div className="p-[50px] m-[10px] h-50% w-50% center text-center text-white flex justify-end">
          <img src="https://upload.wikimedia.org/wikipedia/commons/8/84/Government_of_India_logo.svg" className="w-[100px] h-[100px]"></img>
        </div>

        </div>
        <div>
            <button className="p-2 m-4 bg-gray-400 border-2 rounded-full border-indigo-600" onClick={(e)=>e.preventDefault()}>Register</button>
            <button className="p-2 m-4 bg-gray-400 border-2 rounded-full border-indigo-600" onClick={(e)=>e.preventDefault()} onMouseOver={(e)=>e.style.backgroundColor=red}>Forgot Password?</button>
            <Link to="/user">Login</Link>
        </div>
        </>
    )
}
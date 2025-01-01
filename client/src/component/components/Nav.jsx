import BasicButtonExample from "../utils/Dropdown"
export default function Nav(){
    return(
        <>
        <div className="grid-cols-4 text-center justify-center bg-orange-400">
            <img src="./AS_L2.jpg"></img>
            <button className="m-4 p-2 h-8 bg-slate-300 rounded-xl">Home</button>
            <button className="m-4 p-2 h-8 bg-slate-300 rounded-xl">About</button>
            <button className="m-4 p-2 h-8 bg-slate-300 rounded-xl">Contact Us</button>
            <button className="m-4 p-2 h-8 bg-slate-300 rounded-xl">Docs</button>
            <BasicButtonExample></BasicButtonExample>
            
            
        </div>
        </>
    )
}
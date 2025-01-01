import { BrowserRouter as Router,Routes,Route,Link } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Minister from "./utils/Minister";
import Card from "./utils/Card";
import MOPR from "./data/MOPR";
import HomeNav from "./component/components/HomeNav"
import FooterImage from "./component/components/FooterImage";
import Footer from "./component/components/Footer";
import WhatsNew from "./data/WhatsNew";
import Carddata from "./data/Carddata";

export default function Home(){
   
    return(
        <>
      <div className="flex justify-between bg-sky-400">
      <div>
      <img src="./AS_L2.jpg" className="h-[150px] w-[150px] bg-blue-600 p-1"></img>
      </div>
      <div>

      <video
      src="./TECHNOLOGY.mp4" 
      className="h-[150px] w-[150px] bg-blue-600 p-1 object-cover"
      autoPlay
      loop
      muted
    />
      </div>
      
    
      </div>
        <div className="flex h-auto justify-between bg-orange-400">
        <div className="justify">
      {/* <img src="./AS_L2.jpg" className="h-[100px] w-[100px] bg-blue-600 p-1"></img> */}
      </div>
      
  
        <HomeNav />
      </div>
        
        <div className="flex h-auto justify-center bg-orange-400">
            

        
            

        </div>
        <div className="h-auto w-auto">
            <img src="https://cbpssubscriber.mygov.in/assets/uploads/juGajmc1gOVBUtt5?15"></img>
        </div>
        <div className="bg-blue-800 p-2 h-[50px]">
            <h1 className="text-4xl">Latest News</h1>
        </div>
        <div className="flex  justify-center p-4">
            <div className="w-[400px] m-4 h-auto">
                <MOPR></MOPR>
            </div>
            <div className="w-[400px] m-4 h-auto">
                <WhatsNew></WhatsNew>
            </div>
            <div className="w-[400px] m-4 h-auto">
            <Minister/>
            </div>
        </div>
        <div className="bg-blue-900">
            <div className="text-4xl text-center">Schemes/Initiatives</div>
            <br/>
        
        <div>
            <Carddata></Carddata>
        </div>
        </div>
        <FooterImage></FooterImage>
        <Footer></Footer>
        </>
    )
}
import { Link } from "react-router-dom";
import VideoEmbed from "./Videoembed";
import TwitterEmbedExample from "../../utils/TwitterEmbedExample";

export default function FooterImage() {
  return (
    <>
      <div className="m-4 p-4 grid grid-cols-3 bg-slate-200">
        <h1>Important Links</h1>
        <br />
        <div className="grid col-span-2 h-[150px]">
          <div className="grid grid-cols-3 gap-1 p-1">
          <li><Link to="admin/anchayat-Charter" className="text-left hover:text-blue-700">Panchayat Charter</Link></li>
          <li><Link to="admin/RUTAG" className="text-left hover:text-blue-700">RUTAG</Link></li>
          <li><Link to="admin/Swamita" className="text-left hover:text-blue-700">SWAMITVA</Link></li>
          <li><Link to="admin/Gram-Manchitra" className="text-left hover:text-blue-700">Gram Manchitra</Link></li>
          <li><Link to="admin/VGS" className="text-left hover:text-blue-700">VGS</Link></li>
          <li><Link to="admin/Lok-Sabha" className="text-left hover:text-blue-700">Lok Sabha</Link></li>
          <li><Link to="admin/Raj-Sabha" className="text-left hover:text-blue-700">Raj Sabha</Link></li>
          <li><Link to="admin/PIB-India" className="text-left hover:text-blue-700">PIB India</Link></li>
          <li><Link to="admin/Mission-Antyodaya" className="text-left hover:text-blue-700">Mission Antyodaya</Link></li>
          <li><Link to="admin/NIRD-PR" className="text-left hover:text-blue-700">NIRD-PR</Link></li>
          <li><Link to="admin/GeM-Portal" className="text-left hover:text-blue-700">GeM-Portal</Link></li>
          </div>
        </div>
        <div className="m-2 p-2 flex-wrap">
          <TwitterEmbedExample />
        </div>
      </div>

      <div className="m-4 p-4 grid grid-cols-2">
        <h1 className="text-4xl">Photo Gallery</h1><br />
        <div className="m-2 p-1 grid grid-cols-3">
          <div>
            <img src="https://www.tridenthotels.com/-/media/trident-hotel/Gallery-Images/Udaipur/765x580/aravalli-tarrace.jpg" className="w-full h-auto p-2"></img></div>
          <div><img src="https://www.tridenthotels.com/-/media/trident-hotel/Gallery-Images/Udaipur/765x580/aravalli-tarrace.jpg" className="w-full h-auto p-2"></img></div>
          <div><img src="https://www.tridenthotels.com/-/media/trident-hotel/Gallery-Images/Udaipur/765x580/aravalli-tarrace.jpg" className="w-full h-auto p-2"></img></div>
          <div><img src="https://www.tridenthotels.com/-/media/trident-hotel/Gallery-Images/Udaipur/765x580/aravalli-tarrace.jpg" className="w-full h-auto p-2"></img></div>
          <div><img src="https://www.tridenthotels.com/-/media/trident-hotel/Gallery-Images/Udaipur/765x580/aravalli-tarrace.jpg" className="w-full h-auto p-2"></img></div>
          <div><img src="https://www.tridenthotels.com/-/media/trident-hotel/Gallery-Images/Udaipur/765x580/aravalli-tarrace.jpg" className="w-full h-auto p-2"></img></div>
          <div><img src="https://www.tridenthotels.com/-/media/trident-hotel/Gallery-Images/Udaipur/765x580/aravalli-tarrace.jpg" className="w-full h-auto p-2"></img></div>
          <div><img src="https://www.tridenthotels.com/-/media/trident-hotel/Gallery-Images/Udaipur/765x580/aravalli-tarrace.jpg" className="w-full h-auto p-2"></img></div>
        </div>

        <div className="w-full h-auto p-4">
          <VideoEmbed />
        </div>

      </div>
    </>
  );
}

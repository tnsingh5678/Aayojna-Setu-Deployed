import SideBarHome from "../component/components/SideBarHome";

const menuItems1 = [
  { id: 1, name: "Home", path: "/" },
  { id: 2, name: "About", path: "/about" },
  { id: 3, name: "Contact", path: "/contact" },
  { id: 4, name: "Services", path: "/services" },
  { id: 5, name: "Spatial Planning", path: "/Spatial_Planning" },
  { id: 6, name: "Research Study", path: "/Research_Study" },
  { id: 7, name: "Media & Publicity", path: "/Media&Publicity" },
  { id: 8, name: "Parliament & Co-ordination", path: "/Parliament&Co-ordination" },
  { id: 9, name: "Mission LiFE", path: "/Mission_LiFE" },
  { id: 10, name: "IFD", path: "/IFD" },
  { id: 11, name: "Best Practices", path: "/Best_Practices" },
  { id: 12, name: "Reports", path: "/Reports" },
  { id: 13, name: "Webinars", path: "/Webinars" },
  { id: 14, name: "RTI Documents", path: "/RTI_Documents" },
  { id: 15, name: "Official Language", path: "/Official Language" },

];

const menuItems = [
  { id: 1, name: "Home", path: "/" },
  { id: 2, name: "About", path: "/about" },
  { id: 3, name: "Contacts", path: "/contacts" },
  { id: 4, name: "Schemes", path: "/schemes" },
  { id: 5, name: "Application", path: "/application" }
];

function Sidebardata() {
  return (
    <div>
      <SideBarHome menuItems={menuItems} />
      
    </div>
  );
}

export default Sidebardata;

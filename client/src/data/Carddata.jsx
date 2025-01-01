import Card from "../utils/Card";
export default function Carddata() {
  const data = [
    { key: 0, title: "GPDP", data: "Preparation of PDP for economic development and social justice" },
    { key: 1, title: "Vibrant Gram Sabha", data: "Performance parameters of the key focus areas at the GP/ Village levels are tracked" },
    { key: 2, title: "eGramSwaraj", data: "Aims to bring transparency in decentralised planning, progress reporting and work-based accounting..." },
    { key: 3, title: "AuditOnline", data: "facilitates internal & external audit of Government department / Panchayati Raj Institutions..." },
    { key: 4, title: "Local Government Directory", data: "Aims to keep hierarchy of Local Governments..." },
    { key: 5, title: "ServicePlus", data: "e-Service delivery framework for delivering e-services to citizens.." },
    { key: 6, title: "RGSA", data: "Developing and Strengthening the capacities of PRIs..." },
    { key: 7, title: "TMP", data: "Addresses the training management need of the government organizations.." },
    { key: 8, title: "PANCHAYAT AWARDS", data: "Outstanding performers among Panchayats all over the country..." },
    { key: 9, title: "SVAMITVA", data: "Survey of Villages Abadi and Mapping with Improvised Technology..." },
    { key: 10, title: "SPATAL PLANNING", data: "A common Master Plan framework for the States/ Panchayats..." },
    { key: 11, title: "INDIA@75", data: "Azadi Ka Amrit Mahotsav is an initiative of the Government of India..." }

  ];


  return (
    <>
      <div className="grid grid-cols-5 bg-blue-900">

        {data.map((item) => {
          return <Card title={`${item.title}`} data={`${item.data}`} />
        })}

        





      </div>
    </>
  )



}

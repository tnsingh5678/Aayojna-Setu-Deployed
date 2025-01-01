import { Link } from "react-router-dom";

export default function WhatsNew() {
    const data = [
        { key: "National Panchayat Profile" },
        { key: "Joint DO Letter from Secretary D/O SE&L, Secretary D/o DW&S, Secretary MOPR, Secretary MoRD-reg" },
        { key: "Annual Report 2023-24" },
        { key: "Annual Report 2022-23" },
        { key: "DO Letter to States on PM Surya Ghar 08.07.2024" },
        { key: "PMSG Guidelines for Residential CFA Capex Mode Final 7 June" },
        { key: "Joint Advisory on convening Special Gram Sabhas in the month of July, 2024 and on 2nd October, 2024 - Har Ghar Jal and ODF Plus Model Campaigns" },
        { key: "Hon'ble PMs letter to Gram Pradhans IDY 2024" },
        { key: "DO from Secretary, DoT reg. monetisation of BSNL/MTNL properties" },
        { key: "Scheme Guidelines for implementation of Pilot projects for use of Green Hydrogen in the Transport Sector under the National Green Hydrogen Mission" }

    ];

    return (
        <div>

            <h1 className="text-4xl hover:bg-gray-400">What's New</h1><br/>
            {data.map((e, index) => (
                <div key={index} className="text-left p-1 hover:text-blue-800">
                    <li>
                    <Link to={`/${e.key}`}>
                        {e.key}
                    </Link></li>
                  
                </div>
            ))}
        </div>
    );
}

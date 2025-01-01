// Filename - App.js

import React, { Component } from "react";
import Login from "./Login";

class Bck extends Component {
	render() {
		const myStyle = {
			backgroundImage:
				"url('https://www.india.gov.in/sites/upload_files/npi/files/emigrate.jpg')",
			backgroundSize: "cover",
			
		};
		return (
			<div style={myStyle}>
				
				<Login/>
			</div>
		);
	}
}

export default Bck;

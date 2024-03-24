import React from "react";

export default function Home() {
const email = localStorage.getItem("email");
const account = localStorage.getItem("account");
return (
	<div>
	<h3>Your account: {account} </h3>
	<h3>Your email: {email} </h3>
	</div>
);
}


import React from "react";
import {Link} from 'react-router-dom';
import '../App.css';

const Navi = () => {
    return(
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Media Uptake</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-item nav-link active"><Link to="/bucket">Feed</Link> <span class="sr-only">(current)</span></a>
          <a class="nav-item nav-link"><Link to="/Home">Liked</Link></a>
          <a class="nav-item nav-link"><Link to="/content">Blocked</Link></a>
          <a class="nav-item nav-link"><Link to="/train">Train</Link></a>
        </div>
        <button
		style={button}
		onClick={() => {
		localStorage.removeItem("email");
		localStorage.removeItem("account");
		window.location.reload();
		}}
	>
		{" "}
		Log out
	</button>
      </div>
    </nav>
    <h2>WEB CONTENT</h2>
    </div>
    );
}
const button = {
  width: 80,
  padding: 10,
  borderRadius: 5,
  cursor: "pointer",
  fontSize: 17,
  color: "#be0049",
  backgroundColor: "cream",
  border: "1px #be0049",
  position: "absolute",
  right: 20,
  };
export default Navi;

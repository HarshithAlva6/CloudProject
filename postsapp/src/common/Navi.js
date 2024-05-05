import React from "react";
import {Link} from 'react-router-dom';
import '../App.css';

const Navi = () => {
  const email = localStorage.getItem("email");
  const account = localStorage.getItem("account");
  const amount = localStorage.getItem("amount");
    return(
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Media Uptake</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-item nav-link active"><Link to="/Home" style={{ textDecoration: 'none' }}>Feed</Link></a>
          <a class="nav-item nav-link"><Link to="/Fav" style={{ textDecoration: 'none' }}>Liked</Link></a>
          <a class="nav-item nav-link"><Link to="/Block" style={{ textDecoration: 'none' }}>Blocked</Link></a>
          <a class="nav-item nav-link"><Link to="/Train" style={{ textDecoration: 'none' }}>Train</Link></a>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav">
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Your Profile
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#" id="adminAddress"><i className="bi bi-person-fill me-1"></i>{email}</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#" id="adminBalance"><i className="bi bi-currency-dollar me-1"></i>{account}</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#" id="adminAddress"><i className="bi bi-person-fill me-1"></i>{amount}</a></li>
          </ul>
        </li>
      </ul>
    </div>
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
  top: 5,
  right: 20,
  };
export default Navi;

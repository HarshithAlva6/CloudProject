import React from "react";
import {Link} from 'react-router-dom';

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
          <a class="nav-item nav-link active"><Link to="/customers">Home</Link> <span class="sr-only">(current)</span></a>
          <a class="nav-item nav-link"><Link to="/content">Watched</Link></a>
          <a class="nav-item nav-link" href="#">Watch List</a>
        </div>
      </div>
    </nav>
    <h2>WEB CONTENT</h2>
    </div>
    );
}
export default Navi;
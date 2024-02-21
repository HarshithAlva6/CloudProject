import React, { useEffect, useState } from 'react';
import CustomersList from './CustomersList';
import '../src/images/1.webp';

function UsersList() {
  const [customers, setCustomers] = useState([]);
  
  useEffect(() => {
    async function fetchData() {
        try {
            const response = await CustomersList.getCustomers();
            console.log("What",response.data);
            setCustomers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
            // Handle error if necessary
        }
      }
      fetchData();
  }, []);

  return (
    <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Media Uptake</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-item nav-link active" href="#">Home <span class="sr-only">(current)</span></a>
          <a class="nav-item nav-link" href="#">Watched</a>
          <a class="nav-item nav-link" href="#">Watch List</a>
        </div>
      </div>
    </nav>
      <h2>WEB CONTENT</h2>
      <div className="App-intro">
              <h3>Users</h3>
              <div className = "lalign">
              {customers.map(customer =>
                  <div key={customer.id}>
                    <p><b>Name:</b> {customer.fname} {customer.lname}</p> <p><b>E-mail:</b> {customer.email}</p>
                  </div>
              )}
              </div>     
      </div>
    </div>
  );
}

export default UsersList;
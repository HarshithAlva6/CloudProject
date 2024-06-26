import React, { useEffect, useState } from 'react';
import AxiosList from '../common/AxiosList';

function UsersList() {
  const [customers, setCustomers] = useState([]);
  
  useEffect(() => {
    async function fetchData() {
        try {
            const response = await AxiosList.getCustomers();
            console.log("What",response.data);
            setCustomers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
      }
      fetchData();
  }, []);

  return (
    <div>
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
import axios from 'axios';
 
const USERS_REST_API_URL = 'http://localhost:8080/signup';
class CustomersList {
    getCustomers(){
        return axios.get(USERS_REST_API_URL);
    }
}

export default new CustomersList();
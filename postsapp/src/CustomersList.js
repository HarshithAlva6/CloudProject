import axios from 'axios';
 
const USERS_REST_API_URL = 'http://localhost:8080/signup';
const POSTS_REST_API_URL = "http://localhost:8081/watchlist";
class CustomersList {
    getCustomers(){
        return axios.get(USERS_REST_API_URL);
    }
    getImages(){
        return axios.get(POSTS_REST_API_URL);
    }
}

export default new CustomersList();
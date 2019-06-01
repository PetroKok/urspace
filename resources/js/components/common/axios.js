import axios from 'axios'
import routes from "../helpers/routes_urls";

export default function withStoredHeaders() {
    if (localStorage.getItem('token') === 'undefined') {
        localStorage.removeItem('token');
        window.axios.defaults.headers.common['Authorization'] = null;
        window.location = routes.LOGIN;
    }
    return axios.create({
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('token'),
        }
    })
}
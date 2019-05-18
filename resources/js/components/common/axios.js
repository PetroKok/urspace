import axios from 'axios'

export default function withStoredHeaders() {
    return axios.create({
        headers: {
            'Authorization': "Bearer "+localStorage.getItem('token'),
        }
    })
}
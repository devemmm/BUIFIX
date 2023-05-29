import axios from 'axios'

export default axios.create({
    baseURL: 'https://buifix.yocast.rw',
    // baseURL: 'https://buifix-api.herokuapp.com'
    // baseURL: 'https://4df7-105-178-110-233.eu.ngrok.io',
    // baseURL: 'http://localhost:3000'
});

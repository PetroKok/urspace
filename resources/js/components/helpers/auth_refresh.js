import axios from "../common/axios";
import api_urls from "./api_urls";
import routes from "./routes_urls";

export default function auth_refresh(err) {
    if (err.response.status === 401) {
        axios().get(api_urls.REFRESH + '/' + localStorage.getItem('refresh'))
            .then(res => {
                if (res.status === 200) {
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('refresh', res.data.refresh);
                    window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token;
                    window.location = routes.PROFILE;
                }

            })
    }
}

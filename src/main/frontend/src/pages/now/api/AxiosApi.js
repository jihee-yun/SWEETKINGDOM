import axios from "axios";

const MainAxiosApi = {
    MainInfoGet: async(rankingcard) => {
        return await axios.get(`/auth/main`)
    }
}
export default MainAxiosApi;
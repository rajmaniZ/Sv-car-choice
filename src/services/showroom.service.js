import api from "./api";
import { API_ENDPOINTS } from "../config/api";

const getShowroom = async () => {
    return api.get(
        API_ENDPOINTS.showroom.details
    );
};

export {
    getShowroom
};

export default {
    getShowroom
};
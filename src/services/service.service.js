import api from "./api";
import { API_ENDPOINTS } from "../config/api";

const getPublicServices = async () => {
    return api.get(
        API_ENDPOINTS.services.public
    );
};

const getServiceBySlug = async (slug) => {
    if (!slug) {
        throw new Error(
            "Service slug is required."
        );
    }

    return api.get(
        API_ENDPOINTS.services.detailsBySlug(
            slug
        )
    );
};

export {
    getPublicServices,
    getServiceBySlug
};

export default {
    getPublicServices,
    getServiceBySlug
};
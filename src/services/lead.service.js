import api from "./api";
import { API_ENDPOINTS } from "../config/api";

const createLead = async (payload) => {
    if (!payload || typeof payload !== "object") {
        throw new Error(
            "Lead information is required."
        );
    }

    return api.post(
        API_ENDPOINTS.leads.create,
        payload
    );
};

export {
    createLead
};

export default {
    createLead
};
import api from "./api";
import { API_ENDPOINTS } from "../config/api";

const createExchangeRequest = async (
    formData
) => {
    if (!(formData instanceof FormData)) {
        throw new Error(
            "Exchange request must be submitted as FormData."
        );
    }

    return api.post(
        API_ENDPOINTS.exchangeRequests.create,
        formData
    );
};

export {
    createExchangeRequest
};

export default {
    createExchangeRequest
};
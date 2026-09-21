import api from "./api";
import { API_ENDPOINTS } from "../config/api";

const createSellRequest = async (formData) => {
    if (!(formData instanceof FormData)) {
        throw new Error(
            "Sell request must be submitted as FormData."
        );
    }

    return api.post(
        API_ENDPOINTS.sellRequests.create,
        formData
    );
};

export {
    createSellRequest
};

export default {
    createSellRequest
};
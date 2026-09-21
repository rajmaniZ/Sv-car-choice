import api from "./api";
import { API_ENDPOINTS } from "../config/api";

const getPublicTestimonials = async (
    params = {}
) => {
    return api.get(
        API_ENDPOINTS.testimonials.public,
        params
    );
};

const createTestimonial = async (payload) => {
    if (!payload || typeof payload !== "object") {
        throw new Error(
            "Testimonial information is required."
        );
    }

    return api.post(
        API_ENDPOINTS.testimonials.create,
        payload
    );
};

export {
    getPublicTestimonials,
    createTestimonial
};

export default {
    getPublicTestimonials,
    createTestimonial
};
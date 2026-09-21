import api from "./api";
import { API_ENDPOINTS } from "../config/api";

const getVehicles = async (
    params = {},
    options = {}
) => {
    return api.get(
        API_ENDPOINTS.vehicles.list,
        params,
        options
    );
};

const getFeaturedVehicles = async (
    params = {},
    options = {}
) => {
    return api.get(
        API_ENDPOINTS.vehicles.featured,
        params,
        options
    );
};

const getVehicleById = async (
    id,
    options = {}
) => {
    if (!id) {
        throw new Error(
            "Vehicle ID is required."
        );
    }

    return api.get(
        API_ENDPOINTS.vehicles.details(id),
        {},
        options
    );
};

const getVehicleBySlug = async (
    slug,
    options = {}
) => {
    if (!slug) {
        throw new Error(
            "Vehicle slug is required."
        );
    }

    return api.get(
        API_ENDPOINTS.vehicles.slug(slug),
        {},
        options
    );
};

const getVehicleBrands = async (
    options = {}
) => {
    return api.get(
        API_ENDPOINTS.vehicles.brands,
        {},
        options
    );
};

const getVehicleModels = async (
    brand = "",
    options = {}
) => {
    const params = {};

    const cleanBrand =
        String(
            brand || ""
        ).trim();

    if (cleanBrand) {
        params.brand = cleanBrand;
    }

    return api.get(
        API_ENDPOINTS.vehicles.models,
        params,
        options
    );
};

export {
    getVehicles,
    getFeaturedVehicles,
    getVehicleById,
    getVehicleBySlug,
    getVehicleBrands,
    getVehicleModels
};

export default {
    getVehicles,
    getFeaturedVehicles,
    getVehicleById,
    getVehicleBySlug,
    getVehicleBrands,
    getVehicleModels
};
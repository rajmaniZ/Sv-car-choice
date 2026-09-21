import siteConfig from "../config/site";

const getImageUrl = (
    image,
    fallback = ""
) => {
    if (!image) {
        return fallback;
    }

    if (typeof image === "string") {
        return image;
    }

    if (typeof image !== "object") {
        return fallback;
    }

    if (image.url) {
        return image.url;
    }

    if (image.secureUrl) {
        return image.secureUrl;
    }

    if (image.secure_url) {
        return image.secure_url;
    }

    if (image.src) {
        return image.src;
    }

    if (image.path) {
        return image.path;
    }

    return fallback;
};

const getVehicleImage = (
    vehicle,
    fallback = ""
) => {
    if (!vehicle) {
        return fallback;
    }

    const images = Array.isArray(
        vehicle.images
    )
        ? [...vehicle.images]
        : [];

    if (images.length === 0) {
        return fallback;
    }

    images.sort((a, b) => {
        const orderA =
            Number(a?.order) || 0;

        const orderB =
            Number(b?.order) || 0;

        return orderA - orderB;
    });

    return getImageUrl(
        images[0],
        fallback
    );
};

const getVehicleImages = (
    vehicle
) => {
    if (!vehicle) {
        return [];
    }

    const images = Array.isArray(
        vehicle.images
    )
        ? [...vehicle.images]
        : [];

    images.sort((a, b) => {
        const orderA =
            Number(a?.order) || 0;

        const orderB =
            Number(b?.order) || 0;

        return orderA - orderB;
    });

    return images
        .map((image) =>
            getImageUrl(image)
        )
        .filter(Boolean);
};

const getImageAlt = (
    vehicle,
    fallback = `${siteConfig.name} vehicle`
) => {
    if (!vehicle) {
        return fallback;
    }

    const parts = [
        vehicle.brand,
        vehicle.model,
        vehicle.variant,
        vehicle.modelYear
    ].filter(Boolean);

    return parts.length > 0
        ? parts.join(" ")
        : fallback;
};

export {
    getImageUrl,
    getVehicleImage,
    getVehicleImages,
    getImageAlt
};

export default getImageUrl;
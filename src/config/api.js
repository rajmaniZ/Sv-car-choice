const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

const API_CONFIG = {
    baseURL: API_BASE_URL,
    timeout: 15000
};

const API_ENDPOINTS = {
    auth: {
        login: "/auth/login",
        me: "/auth/me"
    },

    vehicles: {
        list: "/vehicles",
        featured: "/vehicles/featured",
        brands: "/vehicles/brands",
        models: "/vehicles/models",
        details: (id) => `/vehicles/${id}`,
        slug: (slug) => `/vehicles/slug/${slug}`
    },

    leads: {
        create: "/leads"
    },

    testDrives: {
        create: "/test-drives"
    },

    sellRequests: {
        create: "/sell-requests"
    },

    exchangeRequests: {
        create: "/exchange-requests"
    },

    services: {
        public: "/services/public",
        detailsBySlug: (slug) => `/services/slug/${slug}`
    },

    testimonials: {
        create: "/testimonials",
        public: "/testimonials/public"
    },

    showroom: {
        details: "/showroom"
    }
};

export {
    API_CONFIG,
    API_ENDPOINTS
};

export default API_CONFIG;
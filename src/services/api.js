import { API_CONFIG } from "../config/api";

const buildUrl = (endpoint, params = {}) => {
    const url = new URL(
        `${API_CONFIG.baseURL}${endpoint}`,
        window.location.origin
    );

    Object.entries(params).forEach(([key, value]) => {
        if (
            value !== undefined &&
            value !== null &&
            value !== ""
        ) {
            url.searchParams.set(key, value);
        }
    });

    return url.toString();
};

const request = async (
    endpoint,
    options = {}
) => {
    const {
        method = "GET",
        data,
        params,
        headers = {},
        signal
    } = options;

    const controller = new AbortController();

    const timeoutId = setTimeout(() => {
        controller.abort();
    }, API_CONFIG.timeout);

    if (signal) {
        signal.addEventListener(
            "abort",
            () => controller.abort(),
            { once: true }
        );
    }

    const isFormData =
        data instanceof FormData;

    const requestHeaders = {
        ...headers
    };

    if (!isFormData && data !== undefined) {
        requestHeaders["Content-Type"] =
            "application/json";
    }

    const token =
        localStorage.getItem("sv_old_car_choice_token");

    if (token) {
        requestHeaders.Authorization =
            `Bearer ${token}`;
    }

    const requestOptions = {
        method,
        headers: requestHeaders,
        signal: controller.signal
    };

    if (data !== undefined) {
        requestOptions.body = isFormData
            ? data
            : JSON.stringify(data);
    }

    try {
        const response = await fetch(
            buildUrl(endpoint, params),
            requestOptions
        );

        const contentType =
            response.headers.get("content-type") || "";

        const responseData =
            contentType.includes("application/json")
                ? await response.json()
                : await response.text();

        if (!response.ok) {
            const error = new Error(
                responseData?.message ||
                `Request failed with status ${response.status}`
            );

            error.status = response.status;
            error.data = responseData;

            
            if (Array.isArray(responseData?.errors)) {
                error.validationErrors =
                    responseData.errors;
            }

throw error;
        }

        if (
            responseData &&
            typeof responseData === "object" &&
            "success" in responseData
        ) {
            if (!responseData.success) {
                const error = new Error(
                    responseData.message ||
                    "Request failed"
                );

                error.status = response.status;
                error.data = responseData;

                
            if (Array.isArray(responseData?.errors)) {
                error.validationErrors =
                    responseData.errors;
            }

throw error;
            }

            return responseData.data;
        }

        return responseData;
    } catch (error) {
        if (error.name === "AbortError") {
            const timeoutError = new Error(
                "Request timed out. Please try again."
            );

            timeoutError.code = "REQUEST_TIMEOUT";

            throw timeoutError;
        }

        throw error;
    } finally {
        clearTimeout(timeoutId);
    }
};

const api = {
    get: (
        endpoint,
        params = {},
        options = {}
    ) =>
        request(endpoint, {
            ...options,
            method: "GET",
            params
        }),

    post: (
        endpoint,
        data,
        options = {}
    ) =>
        request(endpoint, {
            ...options,
            method: "POST",
            data
        }),

    patch: (
        endpoint,
        data,
        options = {}
    ) =>
        request(endpoint, {
            ...options,
            method: "PATCH",
            data
        }),

    delete: (
        endpoint,
        options = {}
    ) =>
        request(endpoint, {
            ...options,
            method: "DELETE"
        })
};

export {
    request
};

export default api;
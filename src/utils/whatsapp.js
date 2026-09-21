const WHATSAPP_NUMBER = "919161333380";

const cleanValue = (value) => {
    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {
        return "";
    }

    return String(value).trim();
};

const getCurrentPageUrl = () => {
    if (
        typeof window === "undefined"
    ) {
        return "";
    }

    return window.location.href;
};

const getCurrentPageTitle = () => {
    if (
        typeof document === "undefined"
    ) {
        return "";
    }

    return document.title || "";
};

const formatCurrency = (value) => {
    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {
        return "";
    }

    const numericValue = Number(value);

    if (Number.isNaN(numericValue)) {
        return String(value);
    }

    return `₹${numericValue.toLocaleString("en-IN")}`;
};

const buildWhatsAppMessage = ({
    message = "",
    type = "",
    title = "",
    slug = "",
    url = "",
    details = {},
    includePage = true
} = {}) => {
    const lines = [];

    lines.push(
        "Hello SV Old Car Choice,"
    );

    lines.push("");

    if (message) {
        lines.push(
            cleanValue(message)
        );

        lines.push("");
    }

    if (title) {
        lines.push(
            `Page: ${cleanValue(title)}`
        );
    }

    if (type) {
        lines.push(
            `Type: ${cleanValue(type)}`
        );
    }

    if (slug) {
        lines.push(
            `Slug: ${cleanValue(slug)}`
        );
    }

    Object.entries(details).forEach(
        ([key, value]) => {
            if (
                value === undefined ||
                value === null ||
                value === ""
            ) {
                return;
            }

            const label = key
                .replace(
                    /([A-Z])/g,
                    " $1"
                )
                .replace(
                    /^./,
                    (character) =>
                        character.toUpperCase()
                );

            let formattedValue =
                value;

            if (
                key === "price" ||
                key === "expectedPrice" ||
                key === "offerPrice"
            ) {
                formattedValue =
                    formatCurrency(value);
            }

            lines.push(
                `${label}: ${cleanValue(formattedValue)}`
            );
        }
    );

    if (
        includePage &&
        url
    ) {
        lines.push(
            `Page URL: ${cleanValue(url)}`
        );
    }

    lines.push("");

    lines.push(
        "Please provide more details."
    );

    return lines.join("\n");
};

const buildWhatsAppUrl = ({
    message = "",
    type = "",
    title = "",
    slug = "",
    url = "",
    details = {},
    includePage = true
} = {}) => {
    const text = buildWhatsAppMessage({
        message,
        type,
        title,
        slug,
        url,
        details,
        includePage
    });

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        text
    )}`;
};

const openWhatsApp = ({
    message = "",
    type = "",
    title = "",
    slug = "",
    url = "",
    details = {},
    includePage = true,
    target = "_blank"
} = {}) => {
    const whatsappUrl =
        buildWhatsAppUrl({
            message,
            type,
            title,
            slug,
            url,
            details,
            includePage
        });

    if (
        typeof window === "undefined"
    ) {
        return whatsappUrl;
    }

    window.open(
        whatsappUrl,
        target,
        "noopener,noreferrer"
    );

    return whatsappUrl;
};

const getPageContext = () => {
    return {
        url: getCurrentPageUrl(),
        title: getCurrentPageTitle()
    };
};

export {
    WHATSAPP_NUMBER,
    buildWhatsAppMessage,
    buildWhatsAppUrl,
    openWhatsApp,
    getPageContext,
    formatCurrency
};

export default {
    WHATSAPP_NUMBER,
    buildWhatsAppMessage,
    buildWhatsAppUrl,
    openWhatsApp,
    getPageContext,
    formatCurrency
};
const cleanPhone = (value) => {
    if (
        value === null ||
        value === undefined
    ) {
        return "";
    }

    return String(value).replace(
        /[^\d+]/g,
        ""
    );
};

const formatPhone = (value) => {
    const phone = cleanPhone(value);

    if (!phone) {
        return "";
    }

    if (
        phone.startsWith("+91") &&
        phone.length === 13
    ) {
        const number = phone.slice(3);

        return `+91 ${number.slice(
            0,
            5
        )} ${number.slice(5)}`;
    }

    if (
        phone.length === 10 &&
        !phone.startsWith("+")
    ) {
        return `${phone.slice(
            0,
            5
        )} ${phone.slice(5)}`;
    }

    return phone;
};

const getTelLink = (value) => {
    const phone = cleanPhone(value);

    if (!phone) {
        return "";
    }

    return `tel:${phone}`;
};

const getWhatsAppLink = (
    value,
    message = ""
) => {
    const phone = cleanPhone(value);

    if (!phone) {
        return "";
    }

    const normalizedPhone =
        phone.startsWith("+")
            ? phone.slice(1)
            : phone;

    const encodedMessage =
        encodeURIComponent(message);

    return `https://wa.me/${normalizedPhone}${
        message
            ? `?text=${encodedMessage}`
            : ""
    }`;
};

export {
    cleanPhone,
    formatPhone,
    getTelLink,
    getWhatsAppLink
};

export default formatPhone;
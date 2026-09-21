const isRequired = (value) => {
    if (
        value === null ||
        value === undefined
    ) {
        return false;
    }

    return String(value).trim().length > 0;
};

const isEmail = (value) => {
    if (!isRequired(value)) {
        return false;
    }

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        String(value).trim()
    );
};

const isPhone = (value) => {
    if (!isRequired(value)) {
        return false;
    }

    const digits = String(value).replace(
        /\D/g,
        ""
    );

    return (
        digits.length >= 10 &&
        digits.length <= 15
    );
};

const isPositiveNumber = (value) => {
    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {
        return false;
    }

    const number = Number(value);

    return (
        Number.isFinite(number) &&
        number >= 0
    );
};

const isValidYear = (
    value,
    min = 1900,
    max = 2100
) => {
    if (!isRequired(value)) {
        return false;
    }

    const year = Number(value);

    return (
        Number.isInteger(year) &&
        year >= min &&
        year <= max
    );
};

const getValidationMessage = (
    value,
    rules = {}
) => {
    const {
        required = false,
        email = false,
        phone = false,
        minLength,
        maxLength,
        positiveNumber = false,
        year = false
    } = rules;

    if (
        required &&
        !isRequired(value)
    ) {
        return "This field is required";
    }

    if (
        !isRequired(value) &&
        !required
    ) {
        return "";
    }

    const stringValue =
        String(value).trim();

    if (
        email &&
        !isEmail(stringValue)
    ) {
        return "Enter a valid email address";
    }

    if (
        phone &&
        !isPhone(stringValue)
    ) {
        return "Enter a valid phone number";
    }

    if (
        minLength !== undefined &&
        stringValue.length < minLength
    ) {
        return `Minimum ${minLength} characters required`;
    }

    if (
        maxLength !== undefined &&
        stringValue.length > maxLength
    ) {
        return `Maximum ${maxLength} characters allowed`;
    }

    if (
        positiveNumber &&
        !isPositiveNumber(value)
    ) {
        return "Enter a valid number";
    }

    if (
        year &&
        !isValidYear(value)
    ) {
        return "Enter a valid year";
    }

    return "";
};

const validateForm = (
    values = {},
    rules = {}
) => {
    const errors = {};

    Object.entries(rules).forEach(
        ([field, fieldRules]) => {
            const message =
                getValidationMessage(
                    values[field],
                    fieldRules
                );

            if (message) {
                errors[field] = message;
            }
        }
    );

    return {
        isValid:
            Object.keys(errors).length === 0,
        errors
    };
};


const getServerValidationErrors = (
    error,
    fieldMap = {}
) => {
    const serverErrors =
        error?.validationErrors ||
        error?.data?.errors ||
        [];

    if (!Array.isArray(serverErrors)) {
        return {};
    }

    return serverErrors.reduce(
        (result, item) => {
            const backendField =
                item?.field;

            const field =
                fieldMap[backendField] ||
                backendField;

            const message =
                item?.message ||
                "Please check this field.";

            if (
                field &&
                !result[field]
            ) {
                result[field] = message;
            }

            return result;
        },
        {}
    );
};

const getServerErrorMessage = (
    error,
    fallback = "Something went wrong. Please try again."
) => {
    const serverErrors =
        error?.validationErrors ||
        error?.data?.errors ||
        [];

    if (
        Array.isArray(serverErrors) &&
        serverErrors.length > 0
    ) {
        const firstError =
            serverErrors[0];

        if (firstError?.message) {
            return firstError.message;
        }
    }

    return (
        error?.message ||
        fallback
    );
};

const validateEmail = (value) => {
    return isEmail(value);
};

const validatePhone = (value) => {
    return isPhone(value);
};

export {
    isRequired,
    isEmail,
    isPhone,
    isPositiveNumber,
    isValidYear,
    getValidationMessage,
    validateForm,
    
    getServerValidationErrors,
    getServerErrorMessage,
    validateEmail,
    validatePhone
};

export default validateForm;
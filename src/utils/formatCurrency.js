import siteConfig from "../config/site";

const formatCurrency = (
    value,
    options = {}
) => {
    const {
        currency = siteConfig.currency.code,
        locale = siteConfig.currency.locale,
        compact = false,
        maximumFractionDigits = 0
    } = options;

    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {
        return "₹0";
    }

    const numericValue = Number(value);

    if (Number.isNaN(numericValue)) {
        return "₹0";
    }

    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        notation: compact
            ? "compact"
            : "standard",
        maximumFractionDigits
    }).format(numericValue);
};

const formatPrice = (value) => {
    return formatCurrency(value);
};

export {
    formatCurrency,
    formatPrice
};

export default formatCurrency;
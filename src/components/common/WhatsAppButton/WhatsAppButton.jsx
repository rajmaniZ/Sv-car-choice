import {
    FaWhatsapp
} from "react-icons/fa";

import {
    openWhatsApp
} from "../../../utils/whatsapp";

import styles from "./WhatsAppButton.module.css";

const WhatsAppButton = ({
    message = "",
    type = "",
    title = "",
    slug = "",
    url = "",
    details = {},
    label = "WhatsApp",
    variant = "default",
    fullWidth = false,
    className = "",
    includePage = true,
    showIcon = true
}) => {
    const handleClick = () => {
        openWhatsApp({
            message,
            type,
            title,
            slug,
            url:
                url ||
                (
                    typeof window !==
                    "undefined"
                        ? window.location.href
                        : ""
                ),
            details,
            includePage
        });
    };

    const buttonClasses = [
        styles.button,
        styles[`button--${variant}`],
        fullWidth
            ? styles.buttonFull
            : "",
        className
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <button
            type="button"
            className={buttonClasses}
            onClick={handleClick}
        >
            {showIcon && (
                <FaWhatsapp
                    className={styles.icon}
                    aria-hidden="true"
                />
            )}

            <span>
                {label}
            </span>
        </button>
    );
};

export default WhatsAppButton;
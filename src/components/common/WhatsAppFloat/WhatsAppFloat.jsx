import {
    FaWhatsapp
} from "react-icons/fa";

import {
    openWhatsApp
} from "../../../utils/whatsapp";

import styles from "./WhatsAppFloat.module.css";

const WhatsAppFloat = () => {
    const handleClick = () => {
        openWhatsApp({
            message:
                "I would like to know more about this page.",
            type:
                "Website Enquiry",
            title:
                typeof document !==
                "undefined"
                    ? document.title
                    : "",
            url:
                typeof window !==
                "undefined"
                    ? window.location.href
                    : ""
        });
    };

    return (
        <button
            type="button"
            className={styles.button}
            onClick={handleClick}
            aria-label="Contact SV Old Car Choice on WhatsApp"
            title="WhatsApp SV Old Car Choice"
        >
            <FaWhatsapp
                className={styles.icon}
                aria-hidden="true"
            />

            <span className={styles.label}>
                WhatsApp
            </span>
        </button>
    );
};

export default WhatsAppFloat;
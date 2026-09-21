import styles from "./ContactInfo.module.css";

const ContactInfo = ({
    showroom = {},
    phone,
    email,
    address,
    whatsapp
}) => {
    const contactPhone =
        phone ||
        showroom.phone ||
        showroom.mobile ||
        showroom.mobileNumber ||
        "";

    const contactEmail =
        email ||
        showroom.email ||
        "";

    const contactAddress =
        address ||
        showroom.address ||
        "";

    const contactWhatsapp =
        whatsapp ||
        showroom.whatsapp ||
        showroom.whatsappNumber ||
        contactPhone;

    const cleanPhone = String(contactPhone)
        .replace(/[^\d+]/g, "");

    const cleanWhatsapp = String(contactWhatsapp)
        .replace(/\D/g, "");

    return (
        <div className={styles.wrapper}>
            {contactPhone && (
                <a
                    href={`tel:${cleanPhone}`}
                    className={styles.item}
                >
                    <span className={styles.icon}>
                        ☎
                    </span>

                    <span className={styles.content}>
                        <span className={styles.label}>
                            Call Us
                        </span>
                        <span className={styles.value}>
                            {contactPhone}
                        </span>
                    </span>
                </a>
            )}

            {contactWhatsapp && (
                <a
                    href={`https://wa.me/${cleanWhatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.item}
                >
                    <span className={styles.icon}>
                        WA
                    </span>

                    <span className={styles.content}>
                        <span className={styles.label}>
                            WhatsApp
                        </span>
                        <span className={styles.value}>
                            Chat with us
                        </span>
                    </span>
                </a>
            )}

            {contactEmail && (
                <a
                    href={`mailto:${contactEmail}`}
                    className={styles.item}
                >
                    <span className={styles.icon}>
                        @
                    </span>

                    <span className={styles.content}>
                        <span className={styles.label}>
                            Email
                        </span>
                        <span className={styles.value}>
                            {contactEmail}
                        </span>
                    </span>
                </a>
            )}

            {contactAddress && (
                <div className={styles.item}>
                    <span className={styles.icon}>
                        ⌖
                    </span>

                    <span className={styles.content}>
                        <span className={styles.label}>
                            Visit Us
                        </span>
                        <span className={styles.value}>
                            {contactAddress}
                        </span>
                    </span>
                </div>
            )}
        </div>
    );
};

export default ContactInfo;
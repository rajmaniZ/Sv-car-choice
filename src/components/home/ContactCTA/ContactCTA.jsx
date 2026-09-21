import {
    FiArrowRight,
    FiMail,
    FiMapPin,
    FiPhone
} from "react-icons/fi";
import { Link } from "react-router-dom";

import Container from "../../common/Container/Container";

import { useSite } from "../../../context/SiteContext";
import siteConfig from "../../../config/site";

import {
    getTelLink,
    getWhatsAppLink
} from "../../../utils/formatPhone";

import styles from "./ContactCTA.module.css";

const ContactCTA = () => {
    const { site } = useSite();

    const phone =
        site?.contact?.phone ||
        siteConfig.contact.phone;

    const email =
        site?.contact?.email ||
        siteConfig.contact.email;

    const address =
        site?.address?.line ||
        siteConfig.address.line;

    const whatsapp =
        site?.contact?.whatsapp ||
        phone ||
        siteConfig.contact.whatsapp;

    return (
        <section className={styles.section}>
            <Container>
                <div className={styles.wrapper}>
                    <div className={styles.content}>
                        <span className={styles.eyebrow}>
                            Ready to get started?
                        </span>

                        <h2>
                            Let&apos;s find the right
                            vehicle for you.
                        </h2>

                        <p>
                            Tell us what you are looking
                            for, or contact the showroom
                            directly to discuss your next
                            car.
                        </p>

                        <div className={styles.actions}>
                            <Link
                                to="/contact"
                                className={
                                    styles.primaryAction
                                }
                            >
                                Contact Us
                                <FiArrowRight />
                            </Link>

                            <Link
                                to="/inventory"
                                className={
                                    styles.secondaryAction
                                }
                            >
                                Browse Inventory
                            </Link>
                        </div>
                    </div>

                    <div className={styles.contactBox}>
                        <h3>
                            Showroom Contact
                        </h3>

                        <div className={styles.contactList}>
                            {phone && (
                                <a
                                    href={getTelLink(
                                        phone
                                    )}
                                >
                                    <FiPhone />

                                    <span>
                                        {phone}
                                    </span>
                                </a>
                            )}

                            {email && (
                                <a
                                    href={`mailto:${email}`}
                                >
                                    <FiMail />

                                    <span>
                                        {email}
                                    </span>
                                </a>
                            )}

                            {address && (
                                <div>
                                    <FiMapPin />

                                    <span>
                                        {address}
                                    </span>
                                </div>
                            )}
                        </div>

                        {whatsapp && (
                            <a
                                href={getWhatsAppLink(
                                    whatsapp
                                )}
                                target="_blank"
                                rel="noreferrer"
                                className={
                                    styles.whatsapp
                                }
                            >
                                Message on WhatsApp
                                <FiArrowRight />
                            </a>
                        )}
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default ContactCTA;
import {
    FiExternalLink,
    FiMapPin,
    FiPhone,
    FiStar
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

import Container from "../../common/Container/Container";
import styles from "./Footer.module.css";

const Footer = () => {
    const phoneNumber1 = "9161333380";
    const phoneNumber2 = "9415842893";
    const whatsappNumber = "919161333380";

    const googleMapsUrl =
        "https://www.google.com/maps/search/?api=1&query=S.V+Old+Car+Choice+Varanasi";

    const googleProfileUrl =
        "https://www.google.com/search?q=S.V+Old+Car+Choice+Varanasi";

    return (
        <footer className={styles.footer}>
            <div className={styles.main}>
                <Container>
                    <div className={styles.grid}>

                        <div
                            className={`${styles.column} ${styles.brandColumn}`}
                        >
                            <Link
                                to="/"
                                className={styles.logo}
                            >
                                <span className={styles.logoMark}>
                                    <img src="favicon.png" alt="" />
                                </span>

                                <span className={styles.logoName}>
                                    SV Old Car Choice
                                </span>
                            </Link>

                            <p className={styles.description}>
                                Quality used cars, reliable service and
                                straightforward support for buying, selling
                                and exchanging vehicles.
                            </p>

                            <p className={styles.owner}>
                                Owned by{" "}
                                <strong>
                                    Sunil Kumar Gupta
                                </strong>
                            </p>
                        </div>

                        <div className={styles.column}>
                            <h3 className={styles.heading}>
                                Company
                            </h3>

                            <div className={styles.links}>
                                <Link
                                    to="/about"
                                    className={styles.link}
                                >
                                    About Us
                                </Link>

                                <Link
                                    to="/contact"
                                    className={styles.link}
                                >
                                    Contact
                                </Link>
                            </div>
                        </div>

                        <div className={styles.column}>
                            <h3 className={styles.heading}>
                                Vehicles
                            </h3>

                            <div className={styles.links}>
                                <Link
                                    to="/inventory"
                                    className={styles.link}
                                >
                                    Inventory
                                </Link>

                                <Link
                                    to="/sell-your-car"
                                    className={styles.link}
                                >
                                    Sell Your Car
                                </Link>

                                <Link
                                    to="/exchange"
                                    className={styles.link}
                                >
                                    Exchange
                                </Link>
                            </div>
                        </div>

                        <div className={styles.column}>
                            <h3 className={styles.heading}>
                                Services
                            </h3>

                            <div className={styles.links}>
                                <Link
                                    to="/services"
                                    className={styles.link}
                                >
                                    Services
                                </Link>

                                <Link
                                    to="/finance"
                                    className={styles.link}
                                >
                                    Finance
                                </Link>
                            </div>
                        </div>

                        <div
                            className={`${styles.column} ${styles.contactColumn}`}
                        >
                            <h3 className={styles.heading}>
                                Contact
                            </h3>

                            <div className={styles.contactList}>

                                <div className={styles.contactItem}>
                                    <span className={styles.contactLabel}>
                                        <FiPhone />
                                        Phone
                                    </span>

                                    <a
                                        href={`tel:${phoneNumber1}`}
                                        className={styles.contactAction}
                                    >
                                        {phoneNumber1}
                                   
                                    </a>
                                    <a
                                        href={`tel:${phoneNumber1}`}
                                        className={styles.contactAction}
                                    >
                                            {phoneNumber2}
                                   
                                    </a>
                                </div>

                                <div className={styles.contactItem}>
                                    <span className={styles.contactLabel}>
                                        <FaWhatsapp />
                                        WhatsApp
                                    </span>

                                    <a
                                        href={`https://wa.me/${whatsappNumber}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className={styles.contactAction}
                                    >
                                        Chat on WhatsApp
                                        <FiExternalLink />
                                    </a>
                                </div>

                                <div className={styles.contactItem}>
                                    <span className={styles.contactLabel}>
                                        <FiMapPin />
                                        Location
                                    </span>

                                    <span className={styles.contactValue}>
                                        Infront of Krishna Hyundai
                                    </span>

                                    <a
                                        href={googleMapsUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className={styles.contactAction}
                                    >
                                        Open in Google Maps
                                        <FiExternalLink />
                                    </a>
                                </div>

                                <div className={styles.contactItem}>
                                    <span className={styles.contactLabel}>
                                        <FiStar />
                                        Google Profile
                                    </span>

                                    <a
                                        href={googleProfileUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className={styles.contactAction}
                                    >
                                        View Google Profile
                                        <FiExternalLink />
                                    </a>
                                </div>

                            </div>
                        </div>

                    </div>
                </Container>
            </div>

            <div className={styles.bottom}>
                <Container>
                    <div className={styles.bottomInner}>

                        <div className={styles.bottomLeft}>
                            <p className={styles.copyright}>
                                © {new Date().getFullYear()} SV Old Car Choice.
                                All rights reserved.
                            </p>

                            <p className={styles.linkDesigner}>
                                Designed & developed by{" "}
                                <a
                                    href="https://www.digiclick360.in"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    DigiClick360
                                </a>
                            </p>
                        </div>

                        <div className={styles.legalLinks}>
                            <Link
                                to="/privacy-policy"
                                className={styles.legalLink}
                            >
                                Privacy Policy
                            </Link>

                            <Link
                                to="/terms"
                                className={styles.legalLink}
                            >
                                Terms & Conditions
                            </Link>
                        </div>

                    </div>
                </Container>
            </div>

            <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className={styles.whatsappButton}
                aria-label="Chat with us on WhatsApp"
            >
                <FaWhatsapp />

                <span>
                    WhatsApp
                </span>
            </a>
        </footer>
    );
};

export default Footer;
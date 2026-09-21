import {
    Link
} from "react-router-dom";

import Container from "../../common/Container/Container";
import { useSite } from "../../../context/SiteContext";
import {
    footerNavigation
} from "../../../config/navigation";
import siteConfig from "../../../config/site";
import {
    getTelLink,
    getWhatsAppLink
} from "../../../utils/formatPhone";

import styles from "./Footer.module.css";

const Footer = () => {
    const { site } = useSite();

    const name =
        site?.name ||
        siteConfig.name;

    const owner =
        site?.owner ||
        siteConfig.owner;

    const phone =
        site?.contact?.phone ||
        siteConfig.contact.phone;

    const whatsapp =
        site?.contact?.whatsapp ||
        phone ||
        siteConfig.contact.whatsapp;

    const email =
        site?.contact?.email ||
        siteConfig.contact.email;

    const address =
        site?.address?.line ||
        siteConfig.address.line;

    const year = new Date().getFullYear();

    const renderLinks = (items) => {
        return items.map((item) => (
            <li key={item.path}>
                <Link
                    to={item.path}
                    className={styles.link}
                >
                    {item.label}
                </Link>
            </li>
        ));
    };

    return (
        <footer className={styles.footer}>
            <div className={styles.main}>
                <Container>
                    <div className={styles.grid}>
                        <div className={styles.brandColumn}>
                            <Link
                                to="/"
                                className={styles.logo}
                            >
                                <span
                                    className={
                                        styles.logoMark
                                    }
                                >
                                    SV
                                </span>

                                <span
                                    className={
                                        styles.logoName
                                    }
                                >
                                    {name}
                                </span>
                            </Link>

                            <p
                                className={
                                    styles.description
                                }
                            >
                                Quality used cars,
                                reliable service and
                                straightforward support
                                for buying, selling and
                                exchanging vehicles.
                            </p>

                            {owner && (
                                <p
                                    className={
                                        styles.owner
                                    }
                                >
                                    Owned by{" "}
                                    <strong>
                                        {owner}
                                    </strong>
                                </p>
                            )}
                        </div>

                        <div className={styles.column}>
                            <h3
                                className={
                                    styles.heading
                                }
                            >
                                Company
                            </h3>

                            <ul
                                className={
                                    styles.links
                                }
                            >
                                {renderLinks(
                                    footerNavigation
                                        .company
                                )}
                            </ul>
                        </div>

                        <div className={styles.column}>
                            <h3
                                className={
                                    styles.heading
                                }
                            >
                                Vehicles
                            </h3>

                            <ul
                                className={
                                    styles.links
                                }
                            >
                                {renderLinks(
                                    footerNavigation
                                        .vehicles
                                )}
                            </ul>
                        </div>

                        <div className={styles.column}>
                            <h3
                                className={
                                    styles.heading
                                }
                            >
                                Services
                            </h3>

                            <ul
                                className={
                                    styles.links
                                }
                            >
                                {renderLinks(
                                    footerNavigation
                                        .services
                                )}
                            </ul>
                        </div>

                        <div className={styles.contactColumn}>
                            <h3
                                className={
                                    styles.heading
                                }
                            >
                                Contact
                            </h3>

                            {address && (
                                <div
                                    className={
                                        styles.contactItem
                                    }
                                >
                                    <span
                                        className={
                                            styles.contactLabel
                                        }
                                    >
                                        Location
                                    </span>

                                    <span
                                        className={
                                            styles.contactValue
                                        }
                                    >
                                        {address}
                                    </span>
                                </div>
                            )}

                            {phone && (
                                <div
                                    className={
                                        styles.contactItem
                                    }
                                >
                                    <span
                                        className={
                                            styles.contactLabel
                                        }
                                    >
                                        Phone
                                    </span>

                                    <a
                                        href={getTelLink(
                                            phone
                                        )}
                                        className={
                                            styles.contactValue
                                        }
                                    >
                                        {phone}
                                    </a>
                                </div>
                            )}

                            {whatsapp && (
                                <div
                                    className={
                                        styles.contactItem
                                    }
                                >
                                    <span
                                        className={
                                            styles.contactLabel
                                        }
                                    >
                                        WhatsApp
                                    </span>

                                    <a
                                        href={getWhatsAppLink(
                                            whatsapp
                                        )}
                                        target="_blank"
                                        rel="noreferrer"
                                        className={
                                            styles.contactValue
                                        }
                                    >
                                        Chat with us
                                    </a>
                                </div>
                            )}

                            {email && (
                                <div
                                    className={
                                        styles.contactItem
                                    }
                                >
                                    <span
                                        className={
                                            styles.contactLabel
                                        }
                                    >
                                        Email
                                    </span>

                                    <a
                                        href={`mailto:${email}`}
                                        className={
                                            styles.contactValue
                                        }
                                    >
                                        {email}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </Container>
            </div>

            <div className={styles.bottom}>
                <Container>
                    <div className={styles.bottomInner}>
                        <p className={styles.copyright}>
                            © {year} {name}. All rights
                            reserved.
                        </p>

                        <div
                            className={
                                styles.legalLinks
                            }
                        >
                            {footerNavigation.legal.map(
                                (item) => (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={
                                            styles.legalLink
                                        }
                                    >
                                        {item.label}
                                    </Link>
                                )
                            )}
                        </div>
                    </div>
                </Container>
            </div>
        </footer>
    );
};

export default Footer;
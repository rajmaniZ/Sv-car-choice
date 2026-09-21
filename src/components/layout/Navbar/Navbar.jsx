import { useState } from "react";
import {
    FiArrowRight,
    FiMail,
    FiMenu,
    FiPhone,
    FiX
} from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";

import Container from "../../common/Container/Container";
import { useSite } from "../../../context/SiteContext";
import siteConfig from "../../../config/site";
import { navigation } from "../../../config/navigation";

import MobileMenu from "../MobileMenu/MobileMenu";

import styles from "./Navbar.module.css";

const Navbar = () => {
    const { site } = useSite();

    const [menuOpen, setMenuOpen] = useState(false);

    const name =
        site?.name ||
        siteConfig.name ||
        "SV Old Car Choice";

    const phone =
        site?.contact?.phone ||
        siteConfig.contact.phone ||
        "";

    const email =
        site?.contact?.email ||
        siteConfig.contact.email ||
        "";

    const handleMenuToggle = () => {
        setMenuOpen((current) => !current);
    };

    const handleMenuClose = () => {
        setMenuOpen(false);
    };

    return (
        <>
            <header className={styles.header}>
                <Container className={styles.container}>
                    <div className={styles.navbar}>
                        <Link
                            to="/"
                            className={styles.logo}
                            onClick={handleMenuClose}
                            aria-label={`${name} home`}
                        >
                            <span className={styles.logoMark}>
                                <span>SV</span>
                            </span>

                            <span className={styles.logoText}>
                                <span className={styles.logoName}>
                                    {name}
                                </span>

                                <span className={styles.logoTagline}>
                                    Driven by Trust
                                </span>
                            </span>
                        </Link>

                        <nav
                            className={styles.navigation}
                            aria-label="Main navigation"
                        >
                            <ul>
                                {navigation.map((item) => (
                                    <li key={item.path}>
                                        <NavLink
                                            to={item.path}
                                            end={
                                                item.path === "/"
                                            }
                                            className={({
                                                isActive
                                            }) =>
                                                [
                                                    styles.link,
                                                    isActive
                                                        ? styles.active
                                                        : ""
                                                ]
                                                    .filter(Boolean)
                                                    .join(" ")
                                            }
                                        >
                                            {item.label}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        <div className={styles.rightSide}>
                            <div className={styles.contact}>
                                {phone && (
                                    <a
                                        href={`tel:${phone}`}
                                        className={
                                            styles.contactItem
                                        }
                                        aria-label={`Call ${phone}`}
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
                                        className={
                                            styles.contactItem
                                        }
                                        aria-label={`Email ${email}`}
                                    >
                                        <FiMail />

                                        <span>
                                            {email}
                                        </span>
                                    </a>
                                )}
                            </div>

                            <Link
                                to="/test-drive"
                                className={styles.navCta}
                            >
                                <span>
                                    Book a Test Drive
                                </span>

                                <FiArrowRight />
                            </Link>

                            <button
                                type="button"
                                className={styles.menuButton}
                                onClick={handleMenuToggle}
                                aria-label={
                                    menuOpen
                                        ? "Close navigation menu"
                                        : "Open navigation menu"
                                }
                                aria-expanded={menuOpen}
                            >
                                {menuOpen ? (
                                    <FiX />
                                ) : (
                                    <FiMenu />
                                )}
                            </button>
                        </div>
                    </div>
                </Container>
            </header>

            <MobileMenu
                isOpen={menuOpen}
                onClose={handleMenuClose}
            />
        </>
    );
};

export default Navbar;
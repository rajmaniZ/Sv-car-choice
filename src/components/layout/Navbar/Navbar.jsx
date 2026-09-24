import { useState } from "react";
import {
    FaGoogle
} from "react-icons/fa";
import {
    FiArrowRight,
    FiExternalLink,
    FiMail,
    FiMenu,
    FiPhone,
    FiX
} from "react-icons/fi";
import {
    Link,
    NavLink
} from "react-router-dom";

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
        siteConfig.contact?.phone ||
        "";

    const email =
        site?.contact?.email ||
        siteConfig.contact?.email ||
        "";

    const googleProfile =
        site?.contact?.googleProfile ||
        siteConfig.contact?.googleProfile ||
        "https://www.google.com/search?q=S.V+Old+Car+Choice+Varanasi";

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
                            <span className={styles.companyLogo}>
                                <img
                                    src="/favicon.png"
                                    alt="SV Old Car Choice"
                                />
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
                                {navigation
                                    .filter(
                                        (item) =>
                                            !item.external
                                    )
                                    .map((item) => (
                                        <li key={item.path}>
                                            <NavLink
                                                to={item.path}
                                                end={
                                                    item.path === "/"
                                                }
                                                className={({ isActive }) =>
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

                                <li>
                                    <a
                                        href={googleProfile}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.googleLink}
                                        aria-label="View our Google profile"
                                    >
                                        <FaGoogle />
                                        <span>Google</span>
                                        <FiExternalLink />
                                    </a>
                                </li>
                            </ul>
                        </nav>

                        <div className={styles.rightSide}>

                            <div className={styles.contact}>
                                {phone && (
                                    <a
                                        href={`tel:${phone}`}
                                        className={styles.contactItem}
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
                                        className={styles.contactItem}
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
                                onClick={handleMenuClose}
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
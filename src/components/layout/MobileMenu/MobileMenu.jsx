import {
    FiChevronRight,
    FiX
} from "react-icons/fi";
import { NavLink } from "react-router-dom";

import { navigation } from "../../../config/navigation";

import styles from "./MobileMenu.module.css";

const MobileMenu = ({
    isOpen = false,
    onClose
}) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div
            id="mobile-navigation"
            className={styles.wrapper}
        >
            <button
                type="button"
                className={styles.overlay}
                onClick={onClose}
                aria-label="Close navigation menu"
            />

            <aside
                className={styles.menu}
                aria-label="Mobile navigation"
            >
                <div className={styles.header}>
                    <span className={styles.title}>
                        Menu
                    </span>

                    <button
                        type="button"
                        className={styles.closeButton}
                        onClick={onClose}
                        aria-label="Close navigation menu"
                    >
                        <FiX
                            size={22}
                            aria-hidden="true"
                        />
                    </button>
                </div>

                <nav className={styles.navigation}>
                    {navigation.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={onClose}
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
                            <span>
                                {item.label}
                            </span>

                            <FiChevronRight
                                className={
                                    styles.arrow
                                }
                                size={18}
                                aria-hidden="true"
                            />
                        </NavLink>
                    ))}
                </nav>
            </aside>
        </div>
    );
};

export default MobileMenu;
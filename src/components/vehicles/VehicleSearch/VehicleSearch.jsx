import {
    FiSearch,
    FiX
} from "react-icons/fi";

import styles from "./VehicleSearch.module.css";

const VehicleSearch = ({
    value = "",
    onChange,
    onSearch,
    placeholder = "Search by brand, model or vehicle name...",
    className = ""
}) => {
    const handleSubmit = (event) => {
        event.preventDefault();

        const trimmedValue =
            String(value).trim();

        if (
            typeof onSearch ===
            "function"
        ) {
            onSearch(trimmedValue);
            return;
        }

        if (
            typeof onChange ===
            "function"
        ) {
            onChange(trimmedValue);
        }
    };

    const handleChange = (
        event
    ) => {
        if (
            typeof onChange ===
            "function"
        ) {
            onChange(
                event.target.value
            );
        }
    };

    const handleClear = () => {
        if (
            typeof onChange ===
            "function"
        ) {
            onChange("");
        }

        if (
            typeof onSearch ===
            "function"
        ) {
            onSearch("");
        }
    };

    const formClassName = [
        styles.vehicleSearch,
        className
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <form
            className={formClassName}
            onSubmit={handleSubmit}
        >
            <div className={styles.field}>
                <FiSearch
                    className={styles.searchIcon}
                    size={20}
                    aria-hidden="true"
                />

                <input
                    type="search"
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    aria-label="Search vehicles"
                    className={styles.input}
                />

                {value && (
                    <button
                        type="button"
                        className={styles.clear}
                        onClick={handleClear}
                        aria-label="Clear vehicle search"
                    >
                        <FiX
                            size={17}
                            aria-hidden="true"
                        />
                    </button>
                )}
            </div>

            <button
                type="submit"
                className={styles.searchButton}
            >
                <FiSearch
                    size={17}
                    aria-hidden="true"
                />

                <span>
                    Search
                </span>
            </button>
        </form>
    );
};

export default VehicleSearch;
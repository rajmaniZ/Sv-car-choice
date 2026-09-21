import {
    FiChevronDown,
    FiFilter,
    FiRotateCcw
} from "react-icons/fi";

import styles from "./VehicleFilters.module.css";

const DEFAULT_FILTERS = {
    brand: "",
    model: "",
    fuel: "",
    transmission: "",
    ownership: "",
    minPrice: "",
    maxPrice: "",
    minYear: "",
    maxYear: "",
    minKm: "",
    maxKm: "",
    sort: "newest",
    status: ""
};

const VehicleFilters = ({
    filters = {},
    brands = [],
    models = [],
    loadingBrands = false,
    loadingModels = false,
    onChange,
    onReset,
    showStatus = false,
    compact = false
}) => {
    const currentFilters = {
        ...DEFAULT_FILTERS,
        ...filters
    };

    const updateFilter = (
        name,
        value
    ) => {
        if (
            typeof onChange !==
            "function"
        ) {
            return;
        }

        onChange({
            ...currentFilters,
            [name]: value
        });
    };

    const resetFilters = () => {
        if (
            typeof onReset ===
            "function"
        ) {
            onReset();
            return;
        }

        onChange?.({
            ...DEFAULT_FILTERS
        });
    };

    const getOptionValue = (
        item
    ) => {
        if (
            typeof item ===
            "string"
        ) {
            return item;
        }

        return (
            item?.value ||
            item?.name ||
            item?.label ||
            item?.model ||
            ""
        );
    };

    const getOptionLabel = (
        item
    ) => {
        if (
            typeof item ===
            "string"
        ) {
            return item;
        }

        return (
            item?.label ||
            item?.name ||
            item?.value ||
            item?.model ||
            ""
        );
    };

    const hasActiveFilters =
        Object.entries(
            currentFilters
        ).some(
            ([key, value]) => {
                if (
                    key === "sort"
                ) {
                    return (
                        value &&
                        value !==
                            "newest"
                    );
                }

                return (
                    value !== "" &&
                    value !== null &&
                    value !==
                        undefined
                );
            }
        );

    const classes = [
        styles.vehicleFilters,
        compact
            ? styles[
                  "vehicleFilters--compact"
              ]
            : ""
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={classes}>
            <div className={styles.header}>
                <div className={styles.title}>
                    <FiFilter
                        aria-hidden="true"
                    />

                    <h2>
                        Filter Vehicles
                    </h2>
                </div>

                {hasActiveFilters && (
                    <button
                        type="button"
                        className={
                            styles.reset
                        }
                        onClick={
                            resetFilters
                        }
                    >
                        <FiRotateCcw
                            aria-hidden="true"
                        />

                        <span>
                            Reset
                        </span>
                    </button>
                )}
            </div>

            <div className={styles.body}>
                <div className={styles.group}>
                    <label htmlFor="vehicle-filter-brand">
                        Brand
                    </label>

                    <div
                        className={
                            styles.selectWrapper
                        }
                    >
                        <select
                            id="vehicle-filter-brand"
                            value={
                                currentFilters.brand
                            }
                            onChange={(event) =>
                                updateFilter(
                                    "brand",
                                    event
                                        .target
                                        .value
                                )
                            }
                            disabled={
                                loadingBrands
                            }
                        >
                            <option value="">
                                {loadingBrands
                                    ? "Loading Brands..."
                                    : "All Brands"}
                            </option>

                            {brands.map(
                                (
                                    brand,
                                    index
                                ) => {
                                    const value =
                                        getOptionValue(
                                            brand
                                        );

                                    const label =
                                        getOptionLabel(
                                            brand
                                        );

                                    if (!value) {
                                        return null;
                                    }

                                    return (
                                        <option
                                            key={`${value}-${index}`}
                                            value={
                                                value
                                            }
                                        >
                                            {
                                                label
                                            }
                                        </option>
                                    );
                                }
                            )}
                        </select>

                        <FiChevronDown
                            aria-hidden="true"
                        />
                    </div>
                </div>

                <div className={styles.group}>
                    <label htmlFor="vehicle-filter-model">
                        Model
                    </label>

                    <div
                        className={
                            styles.selectWrapper
                        }
                    >
                        <select
                            id="vehicle-filter-model"
                            value={
                                currentFilters.model
                            }
                            onChange={(event) =>
                                updateFilter(
                                    "model",
                                    event
                                        .target
                                        .value
                                )
                            }
                            disabled={
                                !currentFilters.brand ||
                                loadingModels
                            }
                        >
                            <option value="">
                                {!currentFilters.brand
                                    ? "Select Brand First"
                                    : loadingModels
                                      ? "Loading Models..."
                                      : "All Models"}
                            </option>

                            {models.map(
                                (
                                    model,
                                    index
                                ) => {
                                    const value =
                                        getOptionValue(
                                            model
                                        );

                                    const label =
                                        getOptionLabel(
                                            model
                                        );

                                    if (!value) {
                                        return null;
                                    }

                                    return (
                                        <option
                                            key={`${value}-${index}`}
                                            value={
                                                value
                                            }
                                        >
                                            {
                                                label
                                            }
                                        </option>
                                    );
                                }
                            )}
                        </select>

                        <FiChevronDown
                            aria-hidden="true"
                        />
                    </div>
                </div>

                <div className={styles.group}>
                    <label htmlFor="vehicle-filter-fuel">
                        Fuel Type
                    </label>

                    <div
                        className={
                            styles.selectWrapper
                        }
                    >
                        <select
                            id="vehicle-filter-fuel"
                            value={
                                currentFilters.fuel
                            }
                            onChange={(event) =>
                                updateFilter(
                                    "fuel",
                                    event
                                        .target
                                        .value
                                )
                            }
                        >
                            <option value="">
                                All Fuel Types
                            </option>

                            <option value="petrol">
                                Petrol
                            </option>

                            <option value="diesel">
                                Diesel
                            </option>

                            <option value="cng">
                                CNG
                            </option>

                            <option value="electric">
                                Electric
                            </option>

                            <option value="hybrid">
                                Hybrid
                            </option>

                            <option value="other">
                                Other
                            </option>
                        </select>

                        <FiChevronDown
                            aria-hidden="true"
                        />
                    </div>
                </div>

                <div className={styles.group}>
                    <label htmlFor="vehicle-filter-transmission">
                        Transmission
                    </label>

                    <div
                        className={
                            styles.selectWrapper
                        }
                    >
                        <select
                            id="vehicle-filter-transmission"
                            value={
                                currentFilters.transmission
                            }
                            onChange={(event) =>
                                updateFilter(
                                    "transmission",
                                    event
                                        .target
                                        .value
                                )
                            }
                        >
                            <option value="">
                                All Transmissions
                            </option>

                            <option value="manual">
                                Manual
                            </option>

                            <option value="automatic">
                                Automatic
                            </option>

                            <option value="amt">
                                AMT
                            </option>

                            <option value="cvt">
                                CVT
                            </option>

                            <option value="dct">
                                DCT
                            </option>

                            <option value="other">
                                Other
                            </option>
                        </select>

                        <FiChevronDown
                            aria-hidden="true"
                        />
                    </div>
                </div>

                <div className={styles.group}>
                    <label htmlFor="vehicle-filter-ownership">
                        Ownership
                    </label>

                    <div
                        className={
                            styles.selectWrapper
                        }
                    >
                        <select
                            id="vehicle-filter-ownership"
                            value={
                                currentFilters.ownership
                            }
                            onChange={(event) =>
                                updateFilter(
                                    "ownership",
                                    event
                                        .target
                                        .value
                                )
                            }
                        >
                            <option value="">
                                Any Ownership
                            </option>

                            <option value="1st">
                                1st Owner
                            </option>

                            <option value="2nd">
                                2nd Owner
                            </option>

                            <option value="3rd">
                                3rd Owner
                            </option>

                            <option value="4th">
                                4th Owner
                            </option>

                            <option value="5th+">
                                5th+ Owner
                            </option>

                            <option value="unknown">
                                Unknown
                            </option>
                        </select>

                        <FiChevronDown
                            aria-hidden="true"
                        />
                    </div>
                </div>

                <div className={styles.range}>
                    <span
                        className={
                            styles.rangeTitle
                        }
                    >
                        Price Range
                    </span>

                    <div
                        className={
                            styles.rangeFields
                        }
                    >
                        <input
                            type="number"
                            min="0"
                            step="1000"
                            inputMode="numeric"
                            placeholder="Min price"
                            value={
                                currentFilters.minPrice
                            }
                            onChange={(event) =>
                                updateFilter(
                                    "minPrice",
                                    event
                                        .target
                                        .value
                                )
                            }
                        />

                        <span>to</span>

                        <input
                            type="number"
                            min="0"
                            step="1000"
                            inputMode="numeric"
                            placeholder="Max price"
                            value={
                                currentFilters.maxPrice
                            }
                            onChange={(event) =>
                                updateFilter(
                                    "maxPrice",
                                    event
                                        .target
                                        .value
                                )
                            }
                        />
                    </div>
                </div>

                <div className={styles.range}>
                    <span
                        className={
                            styles.rangeTitle
                        }
                    >
                        Manufacturing Year
                    </span>

                    <div
                        className={
                            styles.rangeFields
                        }
                    >
                        <input
                            type="number"
                            min="1900"
                            max="2100"
                            step="1"
                            inputMode="numeric"
                            placeholder="Min year"
                            value={
                                currentFilters.minYear
                            }
                            onChange={(event) =>
                                updateFilter(
                                    "minYear",
                                    event
                                        .target
                                        .value
                                )
                            }
                        />

                        <span>to</span>

                        <input
                            type="number"
                            min="1900"
                            max="2100"
                            step="1"
                            inputMode="numeric"
                            placeholder="Max year"
                            value={
                                currentFilters.maxYear
                            }
                            onChange={(event) =>
                                updateFilter(
                                    "maxYear",
                                    event
                                        .target
                                        .value
                                )
                            }
                        />
                    </div>
                </div>

                <div className={styles.range}>
                    <span
                        className={
                            styles.rangeTitle
                        }
                    >
                        Kilometres
                    </span>

                    <div
                        className={
                            styles.rangeFields
                        }
                    >
                        <input
                            type="number"
                            min="0"
                            step="1000"
                            inputMode="numeric"
                            placeholder="Min km"
                            value={
                                currentFilters.minKm
                            }
                            onChange={(event) =>
                                updateFilter(
                                    "minKm",
                                    event
                                        .target
                                        .value
                                )
                            }
                        />

                        <span>to</span>

                        <input
                            type="number"
                            min="0"
                            step="1000"
                            inputMode="numeric"
                            placeholder="Max km"
                            value={
                                currentFilters.maxKm
                            }
                            onChange={(event) =>
                                updateFilter(
                                    "maxKm",
                                    event
                                        .target
                                        .value
                                )
                            }
                        />
                    </div>
                </div>

                {showStatus && (
                    <div className={styles.group}>
                        <label htmlFor="vehicle-filter-status">
                            Status
                        </label>

                        <div
                            className={
                                styles.selectWrapper
                            }
                        >
                            <select
                                id="vehicle-filter-status"
                                value={
                                    currentFilters.status
                                }
                                onChange={(event) =>
                                    updateFilter(
                                        "status",
                                        event
                                            .target
                                            .value
                                    )
                                }
                            >
                                <option value="">
                                    All Statuses
                                </option>

                                <option value="available">
                                    Available
                                </option>

                                <option value="reserved">
                                    Reserved
                                </option>

                                <option value="sold">
                                    Sold
                                </option>
                            </select>

                            <FiChevronDown
                                aria-hidden="true"
                            />
                        </div>
                    </div>
                )}

                <div className={styles.group}>
                    <label htmlFor="vehicle-filter-sort">
                        Sort By
                    </label>

                    <div
                        className={
                            styles.selectWrapper
                        }
                    >
                        <select
                            id="vehicle-filter-sort"
                            value={
                                currentFilters.sort
                            }
                            onChange={(event) =>
                                updateFilter(
                                    "sort",
                                    event
                                        .target
                                        .value
                                )
                            }
                        >
                            <option value="newest">
                                Newest First
                            </option>

                            <option value="oldest">
                                Oldest First
                            </option>

                            <option value="price-low">
                                Price: Low to High
                            </option>

                            <option value="price-high">
                                Price: High to Low
                            </option>

                            <option value="km-low">
                                Kilometres: Low to High
                            </option>

                            <option value="km-high">
                                Kilometres: High to Low
                            </option>

                            <option value="year-new">
                                Year: Newest First
                            </option>

                            <option value="year-old">
                                Year: Oldest First
                            </option>
                        </select>

                        <FiChevronDown
                            aria-hidden="true"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VehicleFilters;
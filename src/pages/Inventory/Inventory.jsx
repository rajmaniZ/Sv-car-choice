import {
    useMemo,
    useState
} from "react";

import {
    FiSliders,
    FiX,
    FiSearch,
    FiRotateCcw
} from "react-icons/fi";

import Container from "../../components/common/Container/Container";
import Loading from "../../components/common/Loading/Loading";
import ErrorState from "../../components/common/ErrorState/ErrorState";

import VehicleGrid from "../../components/vehicles/VehicleGrid/VehicleGrid";
import VehicleFilters from "../../components/vehicles/VehicleFilters/VehicleFilters";
import VehicleSearch from "../../components/vehicles/VehicleSearch/VehicleSearch";
import VehiclePagination from "../../components/vehicles/VehiclePagination/VehiclePagination";

import PageHero from "../../components/common/PageHero/PageHero";

import useVehicles, {
    useVehicleFilters
} from "../../hooks/useVehicles";

import styles from "./Inventory.module.css";

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
    sort: "newest"
};

const Inventory = () => {
    const [filters, setFilters] =
        useState(DEFAULT_FILTERS);

    const [search, setSearch] =
        useState("");

    const [page, setPage] =
        useState(1);

    const [mobileFilters, setMobileFilters] =
        useState(false);

    const {
        brands,
        models,
        loadingBrands,
        loadingModels,
        fetchModels
    } = useVehicleFilters();

    const params = useMemo(
        () => ({
            ...filters,
            search: search.trim(),
            page,
            limit: 12,
            published: true,
            status: "available"
        }),
        [
            filters,
            search,
            page
        ]
    );

    const {
        vehicles,
        pagination,
        loading,
        error,
        refetch
    } = useVehicles(params);

    const totalVehicles =
        pagination?.total ?? 0;

    const hasSearch =
        search.trim().length > 0;

    const appliedFilters =
        useMemo(() => {
            const items = [];

            if (search.trim()) {
                items.push({
                    key: "search",
                    label: "Search",
                    value: search.trim()
                });
            }

            if (filters.brand) {
                items.push({
                    key: "brand",
                    label: "Brand",
                    value: filters.brand
                });
            }

            if (filters.model) {
                items.push({
                    key: "model",
                    label: "Model",
                    value: filters.model
                });
            }

            if (filters.fuel) {
                items.push({
                    key: "fuel",
                    label: "Fuel",
                    value:
                        filters.fuel
                            .charAt(0)
                            .toUpperCase() +
                        filters.fuel.slice(1)
                });
            }

            if (filters.transmission) {
                items.push({
                    key: "transmission",
                    label: "Transmission",
                    value:
                        filters.transmission
                            .toUpperCase()
                });
            }

            if (filters.ownership) {
                items.push({
                    key: "ownership",
                    label: "Ownership",
                    value:
                        `${filters.ownership} Owner`
                });
            }

            if (
                filters.minPrice ||
                filters.maxPrice
            ) {
                items.push({
                    key: "price",
                    label: "Price",
                    value:
                        [
                            filters.minPrice
                                ? `₹${Number(
                                      filters.minPrice
                                  ).toLocaleString(
                                      "en-IN"
                                  )}`
                                : "Any",
                            filters.maxPrice
                                ? `₹${Number(
                                      filters.maxPrice
                                  ).toLocaleString(
                                      "en-IN"
                                  )}`
                                : "Any"
                        ].join(" - ")
                });
            }

            if (
                filters.minYear ||
                filters.maxYear
            ) {
                items.push({
                    key: "year",
                    label: "Year",
                    value:
                        [
                            filters.minYear ||
                                "Any",
                            filters.maxYear ||
                                "Any"
                        ].join(" - ")
                });
            }

            if (
                filters.minKm ||
                filters.maxKm
            ) {
                items.push({
                    key: "km",
                    label: "Kilometres",
                    value:
                        [
                            filters.minKm
                                ? Number(
                                      filters.minKm
                                  ).toLocaleString(
                                      "en-IN"
                                  )
                                : "Any",
                            filters.maxKm
                                ? Number(
                                      filters.maxKm
                                  ).toLocaleString(
                                      "en-IN"
                                  )
                                : "Any"
                        ].join(" - ")
                });
            }

            if (
                filters.sort &&
                filters.sort !== "newest"
            ) {
                const sortLabels = {
                    oldest:
                        "Oldest First",
                    "price-low":
                        "Price: Low to High",
                    "price-high":
                        "Price: High to Low",
                    "km-low":
                        "Kilometres: Low to High",
                    "km-high":
                        "Kilometres: High to Low",
                    "year-new":
                        "Year: Newest First",
                    "year-old":
                        "Year: Oldest First"
                };

                items.push({
                    key: "sort",
                    label: "Sort",
                    value:
                        sortLabels[
                            filters.sort
                        ] ||
                        filters.sort
                });
            }

            return items;
        }, [
            filters,
            search
        ]);

    const handleSearch = (
        value
    ) => {
        const nextSearch =
            String(value || "").trim();

        setSearch(nextSearch);
        setPage(1);
    };

    const handleFilters = (
        nextFilters
    ) => {
        const normalizedFilters = {
            ...DEFAULT_FILTERS,
            ...(nextFilters || {})
        };

        const nextBrand =
            normalizedFilters.brand || "";

        const currentBrand =
            filters.brand || "";

        if (
            nextBrand !== currentBrand
        ) {
            normalizedFilters.model = "";

            fetchModels(
                nextBrand
            ).catch(() => {});
        }

        setFilters(
            normalizedFilters
        );

        setPage(1);
    };

    const handleClearFilter = (
        filterKey
    ) => {
        if (
            filterKey === "search"
        ) {
            setSearch("");
            setPage(1);
            return;
        }

        if (
            filterKey === "brand"
        ) {
            fetchModels("").catch(
                () => {}
            );

            setFilters(
                (current) => ({
                    ...current,
                    brand: "",
                    model: ""
                })
            );

            setPage(1);
            return;
        }

        if (
            filterKey === "price"
        ) {
            setFilters(
                (current) => ({
                    ...current,
                    minPrice: "",
                    maxPrice: ""
                })
            );

            setPage(1);
            return;
        }

        if (
            filterKey === "year"
        ) {
            setFilters(
                (current) => ({
                    ...current,
                    minYear: "",
                    maxYear: ""
                })
            );

            setPage(1);
            return;
        }

        if (
            filterKey === "km"
        ) {
            setFilters(
                (current) => ({
                    ...current,
                    minKm: "",
                    maxKm: ""
                })
            );

            setPage(1);
            return;
        }

        setFilters(
            (current) => ({
                ...current,
                [filterKey]:
                    filterKey === "sort"
                        ? "newest"
                        : ""
            })
        );

        setPage(1);
    };

    const handleReset = () => {
        fetchModels("").catch(
            () => {}
        );

        setFilters({
            ...DEFAULT_FILTERS
        });

        setSearch("");
        setPage(1);
    };

    const handlePageChange = (
        nextPage
    ) => {
        setPage(nextPage);
        setMobileFilters(false);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const handleMobileFilterToggle =
        () => {
            setMobileFilters(
                (current) => !current
            );
        };

    return (
        <main className={styles.page}>
            <PageHero
                eyebrow="Vehicle Inventory"
                title="Find Your Next Car"
                description="Explore our available used cars and narrow your search by brand, model, price, fuel type, transmission and more."
                contentClassName={
                    styles.heroContent
                }
            >
                <div
                    className={
                        styles.searchWrapper
                    }
                >
                    <VehicleSearch
                        value={search}
                        onChange={
                            handleSearch
                        }
                        onSearch={
                            handleSearch
                        }
                    />

                    <button
                        type="button"
                        className={
                            styles.mobileFilterButton
                        }
                        onClick={
                            handleMobileFilterToggle
                        }
                        aria-expanded={
                            mobileFilters
                        }
                        aria-controls="inventory-filters"
                    >
                        <FiSliders
                            aria-hidden="true"
                        />

                        <span>
                            Filters
                        </span>
                    </button>
                </div>
            </PageHero>

            <section
                className={styles.content}
            >
                <Container>
                    {appliedFilters.length >
                        0 && (
                        <div
                            className={
                                styles.appliedSection
                            }
                        >
                            <div
                                className={
                                    styles.appliedHeader
                                }
                            >
                                <div
                                    className={
                                        styles.appliedTitle
                                    }
                                >
                                    <FiSearch
                                        aria-hidden="true"
                                    />

                                    <span>
                                        Applied
                                        Filters
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    className={
                                        styles.clearAll
                                    }
                                    onClick={
                                        handleReset
                                    }
                                >
                                    <FiRotateCcw
                                        aria-hidden="true"
                                    />

                                    Clear All
                                </button>
                            </div>

                            <div
                                className={
                                    styles.appliedList
                                }
                            >
                                {appliedFilters.map(
                                    (
                                        item
                                    ) => (
                                        <div
                                            key={
                                                item.key
                                            }
                                            className={
                                                styles.filterChip
                                            }
                                        >
                                            <span
                                                className={
                                                    styles.filterChipLabel
                                                }
                                            >
                                                {
                                                    item.label
                                                }
                                            </span>

                                            <span
                                                className={
                                                    styles.filterChipValue
                                                }
                                            >
                                                {
                                                    item.value
                                                }
                                            </span>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleClearFilter(
                                                        item.key
                                                    )
                                                }
                                                aria-label={`Remove ${item.label} filter`}
                                            >
                                                <FiX
                                                    aria-hidden="true"
                                                />
                                            </button>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    )}

                    <div
                        className={
                            styles.layout
                        }
                    >
                        <aside
                            id="inventory-filters"
                            className={[
                                styles.sidebar,
                                mobileFilters
                                    ? styles.sidebarOpen
                                    : ""
                            ]
                                .filter(
                                    Boolean
                                )
                                .join(" ")}
                        >
                            <div
                                className={
                                    styles.filterPanel
                                }
                            >
                                <div
                                    className={
                                        styles.filterHeader
                                    }
                                >
                                    <div>
                                        <span
                                            className={
                                                styles.filterEyebrow
                                            }
                                        >
                                            Refine
                                        </span>

                                        <h2
                                            className={
                                                styles.filterTitle
                                            }
                                        >
                                            Filter Cars
                                        </h2>
                                    </div>

                                    <button
                                        type="button"
                                        className={
                                            styles.closeFilters
                                        }
                                        onClick={() =>
                                            setMobileFilters(
                                                false
                                            )
                                        }
                                        aria-label="Close filters"
                                    >
                                        <FiX
                                            aria-hidden="true"
                                        />
                                    </button>
                                </div>

                                <VehicleFilters
                                    filters={
                                        filters
                                    }
                                    brands={
                                        brands
                                    }
                                    models={
                                        models
                                    }
                                    loadingBrands={
                                        loadingBrands
                                    }
                                    loadingModels={
                                        loadingModels
                                    }
                                    onChange={
                                        handleFilters
                                    }
                                    onReset={
                                        handleReset
                                    }
                                />
                            </div>
                        </aside>

                        <div
                            className={
                                styles.results
                            }
                        >
                            <div
                                className={
                                    styles.resultsHeader
                                }
                            >
                                <div>
                                    <span
                                        className={
                                            styles.resultsEyebrow
                                        }
                                    >
                                        Available
                                        Inventory
                                    </span>

                                    <p
                                        className={
                                            styles.resultsCount
                                        }
                                    >
                                        <strong>
                                            {
                                                totalVehicles
                                            }
                                        </strong>

                                        <span>
                                            {totalVehicles ===
                                            1
                                                ? " vehicle"
                                                : " vehicles"}{" "}
                                            found
                                        </span>
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    className={
                                        styles.mobileResultsFilter
                                    }
                                    onClick={() =>
                                        setMobileFilters(
                                            true
                                        )
                                    }
                                >
                                    <FiSliders
                                        aria-hidden="true"
                                    />

                                    <span>
                                        Filter
                                    </span>
                                </button>
                            </div>

                            {loading ? (
                                <div
                                    className={
                                        styles.loadingState
                                    }
                                >
                                    <Loading
                                        size="large"
                                        text="Loading available vehicles..."
                                    />
                                </div>
                            ) : error ? (
                                <ErrorState
                                    title="Unable to load inventory"
                                    message={
                                        error?.message ||
                                        "We couldn't load the vehicle inventory. Please try again."
                                    }
                                    actionLabel="Try Again"
                                    onAction={
                                        refetch
                                    }
                                />
                            ) : (
                                <VehicleGrid
                                    vehicles={
                                        vehicles
                                    }
                                    columns={3}
                                    emptyTitle="No vehicles found"
                                    emptyMessage="No vehicles match your current search and filters. Try changing your search or removing some filters."
                                />
                            )}

                            {!loading &&
                                !error &&
                                pagination &&
                                pagination.pages >
                                    1 && (
                                    <div
                                        className={
                                            styles.pagination
                                        }
                                    >
                                        <VehiclePagination
                                            pagination={
                                                pagination
                                            }
                                            onPageChange={
                                                handlePageChange
                                            }
                                        />
                                    </div>
                                )}
                        </div>
                    </div>
                </Container>
            </section>
        </main>
    );
};

export default Inventory;
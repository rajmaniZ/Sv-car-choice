import {
    useEffect,
    useState
} from "react";

import {
    FiArrowRight,
    FiSearch,
    FiSliders
} from "react-icons/fi";

import Container from "../../common/Container/Container";
import Button from "../../common/Button/Button";

import {
    getVehicleBrands,
    getVehicleModels
} from "../../../services/vehicle.service";

import styles from "./SearchInventory.module.css";

const SearchInventory = () => {
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);

    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        let active = true;

        const loadBrands = async () => {
            try {
                const data =
                    await getVehicleBrands();

                if (!active) {
                    return;
                }

                setBrands(
                    Array.isArray(data)
                        ? data
                        : []
                );
            } catch {
                if (active) {
                    setBrands([]);
                }
            }
        };

        loadBrands();

        return () => {
            active = false;
        };
    }, []);

    useEffect(() => {
        if (!brand) {
            return undefined;
        }

        let active = true;

        const loadModels = async () => {
            try {
                const data =
                    await getVehicleModels(
                        brand
                    );

                if (!active) {
                    return;
                }

                setModels(
                    Array.isArray(data)
                        ? data
                        : []
                );
            } catch {
                if (active) {
                    setModels([]);
                }
            }
        };

        loadModels();

        return () => {
            active = false;
        };
    }, [brand]);

    const handleBrandChange = (
        event
    ) => {
        const nextBrand =
            event.target.value;

        setBrand(nextBrand);
        setModel("");
        setModels([]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const params =
            new URLSearchParams();

        if (search.trim()) {
            params.set(
                "search",
                search.trim()
            );
        }

        if (brand) {
            params.set(
                "brand",
                brand
            );
        }

        if (model) {
            params.set(
                "model",
                model
            );
        }

        const query =
            params.toString();

        window.location.href = query
            ? `/inventory?${query}`
            : "/inventory";
    };

    return (
        <section
            className={styles.section}
        >
            <Container>
                <div
                    className={
                        styles.wrapper
                    }
                >
                    <div
                        className={
                            styles.heading
                        }
                    >
                        <div>
                            <span>
                                Find Your Car
                            </span>

                            <h2>
                                Search our inventory
                            </h2>
                        </div>

                        <FiSliders />
                    </div>

                    <form
                        className={
                            styles.form
                        }
                        onSubmit={
                            handleSubmit
                        }
                    >
                        <div
                            className={
                                styles.searchField
                            }
                        >
                            <FiSearch />

                            <input
                                type="text"
                                value={search}
                                onChange={(
                                    event
                                ) =>
                                    setSearch(
                                        event
                                            .target
                                            .value
                                    )
                                }
                                placeholder="Search by car name, model or keyword"
                            />
                        </div>

                        <select
                            value={brand}
                            onChange={
                                handleBrandChange
                            }
                            aria-label="Select brand"
                        >
                            <option value="">
                                All Brands
                            </option>

                            {brands.map(
                                (item) => (
                                    <option
                                        key={item}
                                        value={item}
                                    >
                                        {item}
                                    </option>
                                )
                            )}
                        </select>

                        <select
                            value={model}
                            onChange={(
                                event
                            ) =>
                                setModel(
                                    event
                                        .target
                                        .value
                                )
                            }
                            disabled={!brand}
                            aria-label="Select model"
                        >
                            <option value="">
                                All Models
                            </option>

                            {models.map(
                                (item) => (
                                    <option
                                        key={item}
                                        value={item}
                                    >
                                        {item}
                                    </option>
                                )
                            )}
                        </select>

                        <Button
                            type="submit"
                            size="large"
                        >
                            Search
                            <FiArrowRight />
                        </Button>
                    </form>
                </div>
            </Container>
        </section>
    );
};

export default SearchInventory;
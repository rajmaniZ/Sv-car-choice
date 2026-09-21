import { useEffect, useState } from "react";
import {
    FiArrowRight
} from "react-icons/fi";
import { Link } from "react-router-dom";

import Container from "../../common/Container/Container";
import SectionHeader from "../../common/SectionHeader/SectionHeader";
import Loading from "../../common/Loading/Loading";
import ErrorState from "../../common/ErrorState/ErrorState";
import EmptyState from "../../common/EmptyState/EmptyState";

import VehicleCard from "../../vehicles/VehicleCard/VehicleCard";

import {
    getFeaturedVehicles
} from "../../../services/vehicle.service";

import styles from "./FeaturedVehicles.module.css";

const FeaturedVehicles = () => {
    const [vehicles, setVehicles] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const loadVehicles = async () => {
        await Promise.resolve();

        try {
            setLoading(true);
            setError("");

            const data =
                await getFeaturedVehicles({
                    limit: 8
                });

            setVehicles(
                Array.isArray(data)
                    ? data
                    : []
            );
        } catch (requestError) {
            setError(
                requestError.message ||
                    "Unable to load featured vehicles."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let active = true;

        const loadInitialVehicles =
            async () => {
                try {
                    const data =
                        await getFeaturedVehicles({
                            limit: 8
                        });

                    if (!active) {
                        return;
                    }

                    setVehicles(
                        Array.isArray(data)
                            ? data
                            : []
                    );
                    setError("");
                } catch (requestError) {
                    if (!active) {
                        return;
                    }

                    setError(
                        requestError.message ||
                            "Unable to load featured vehicles."
                    );
                } finally {
                    if (active) {
                        setLoading(false);
                    }
                }
            };

        loadInitialVehicles();

        return () => {
            active = false;
        };
    }, []);

    return (
        <section className={styles.section}>
            <Container>
                <div className={styles.header}>
                    <SectionHeader
                        eyebrow="Featured Inventory"
                        title="Cars worth a closer look"
                        description="Explore selected vehicles currently available from SV Old Car Choice."
                    />

                    <Link
                        to="/inventory"
                        className={styles.viewAll}
                    >
                        View All Cars
                        <FiArrowRight />
                    </Link>
                </div>

                {loading && (
                    <Loading
                        size="large"
                        text="Loading vehicles..."
                    />
                )}

                {!loading && error && (
                    <ErrorState
                        message={error}
                        actionLabel="Try Again"
                        onAction={loadVehicles}
                    />
                )}

                {!loading &&
                    !error &&
                    vehicles.length === 0 && (
                        <EmptyState
                            title="No featured cars"
                            message="Featured vehicles will appear here when they are available."
                            actionLabel="Browse Inventory"
                            actionHref="/inventory"
                        />
                    )}

                {!loading &&
                    !error &&
                    vehicles.length > 0 && (
                        <div
                            className={
                                styles.grid
                            }
                        >
                            {vehicles.map(
                                (vehicle) => (
                                    <VehicleCard
                                        key={
                                            vehicle._id ||
                                            vehicle.id
                                        }
                                        vehicle={
                                            vehicle
                                        }
                                    />
                                )
                            )}
                        </div>
                    )}
            </Container>
        </section>
    );
};

export default FeaturedVehicles;
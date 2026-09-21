import VehicleCard from "../VehicleCard/VehicleCard";
import Loading from "../../common/Loading/Loading";
import EmptyState from "../../common/EmptyState/EmptyState";
import ErrorState from "../../common/ErrorState/ErrorState";

import styles from "./VehicleGrid.module.css";

const VehicleGrid = ({
    vehicles = [],
    loading = false,
    error = null,
    onRetry,
    columns = 3,
    emptyTitle = "No vehicles found",
    emptyMessage = "There are no vehicles matching your current search or filters."
}) => {
    if (loading) {
        return (
            <div className={[
                    styles["vehicle-grid"],
                    styles[`vehicle-grid--columns-${columns}`]
                ]
                    .filter(Boolean)
                    .join(" ")}>
                <Loading />
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles["vehicle-grid-state"]}>
                <ErrorState
                    title="Unable to load vehicles"
                    message={
                        error?.message ||
                        "Something went wrong while loading the vehicle inventory."
                    }
                    actionLabel="Try Again"
                    onAction={onRetry}
                />
            </div>
        );
    }

    if (!vehicles.length) {
        return (
            <div className={styles["vehicle-grid-state"]}>
                <EmptyState
                    title={emptyTitle}
                    message={emptyMessage}
                />
            </div>
        );
    }

    return (
        <div className={[
                    styles["vehicle-grid"],
                    styles[`vehicle-grid--columns-${columns}`]
                ]
                    .filter(Boolean)
                    .join(" ")}>
            {vehicles.map((vehicle) => (
                <VehicleCard
                    key={vehicle._id || vehicle.id || vehicle.slug}
                    vehicle={vehicle}
                />
            ))}
        </div>
    );
};

export default VehicleGrid;
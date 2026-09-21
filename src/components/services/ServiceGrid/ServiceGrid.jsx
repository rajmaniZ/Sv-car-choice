import ServiceCard from "../ServiceCard/ServiceCard";
import Loading from "../../common/Loading/Loading";
import EmptyState from "../../common/EmptyState/EmptyState";
import ErrorState from "../../common/ErrorState/ErrorState";

import styles from "./ServiceGrid.module.css";

const ServiceGrid = ({
    services = [],
    loading = false,
    error = null,
    onRetry,
    columns = 3
}) => {
    if (loading) {
        return (
            <Loading
                size="large"
                text="Loading services..."
            />
        );
    }

    if (error) {
        return (
            <ErrorState
                message={
                    error.message ||
                    "Unable to load services."
                }
                onAction={onRetry}
            />
        );
    }

    if (!Array.isArray(services) || services.length === 0) {
        return (
            <EmptyState
                title="No services available"
                message="Service information will be available here soon."
            />
        );
    }

    const gridClasses = [
        styles.grid,
        styles[`grid--${columns}`]
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={gridClasses}>
            {services.map((service, index) => (
                <ServiceCard
                    key={
                        service?._id ||
                        service?.id ||
                        service?.slug ||
                        index
                    }
                    service={service}
                />
            ))}
        </div>
    );
};

export default ServiceGrid;
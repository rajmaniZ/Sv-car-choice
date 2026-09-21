import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import VehicleGrid from "../VehicleGrid/VehicleGrid";
import SectionHeader from "../../common/SectionHeader/SectionHeader";
import styles from "./SimilarVehicles.module.css";

const SimilarVehicles = ({
    vehicles = [],
    loading = false,
    error = "",
    onRetry,
    title = "Similar Vehicles",
    description = "Explore other vehicles that may interest you.",
    className = ""
}) => {
    if (
        !loading &&
        !error &&
        !vehicles.length
    ) {
        return null;
    }

    return (
        <section
            className={[
                styles["similar-vehicles"],
                className
            ]
                .filter(Boolean)
                .join(" ")}
        >
            <div className={styles["similar-vehicles__header"]}>
                <SectionHeader
                    title={title}
                    description={description}
                />

                {!loading &&
                    vehicles.length > 0 && (
                        <Link
                            to="/inventory"
                            className={styles["similar-vehicles__link"]}
                        >
                            <span>
                                View All
                            </span>
                            <FiArrowRight
                                size={16}
                                aria-hidden="true"
                            />
                        </Link>
                    )}
            </div>

            <VehicleGrid
                vehicles={vehicles}
                loading={loading}
                error={error}
                onRetry={onRetry}
                columns={3}
            />
        </section>
    );
};

export default SimilarVehicles;
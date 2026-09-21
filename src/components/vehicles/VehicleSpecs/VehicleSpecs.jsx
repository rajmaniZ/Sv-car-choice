import {
    FiCalendar,
    FiDroplet,
    FiHash,
    FiSettings,
    FiTruck,
    FiUser
} from "react-icons/fi";
import styles from "./VehicleSpecs.module.css";

const formatLabel = (value) => {
    if (!value) {
        return "";
    }

    return String(value)
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (character) =>
            character.toUpperCase()
        );
};

const VehicleSpecs = ({
    vehicle,
    className = ""
}) => {
    if (!vehicle) {
        return null;
    }

    const mileage =
        vehicle.kmDriven ??
        vehicle.mileage ??
        vehicle.kilometers ??
        vehicle.kms;

    const ownership =
        vehicle.ownership ??
        vehicle.ownerCount ??
        vehicle.owners;

    const specs = [
        {
            label: "Brand",
            value: vehicle.brand,
            icon: FiTruck
        },
        {
            label: "Model",
            value: vehicle.model,
            icon: FiTruck
        },
        {
            label: "Variant",
            value: vehicle.variant,
            icon: FiSettings
        },
        {
            label: "Year",
            value: vehicle.year,
            icon: FiCalendar
        },
        {
            label: "Kilometres",
            value:
                mileage !== undefined &&
                mileage !== null
                    ? `${Number(
                          mileage
                      ).toLocaleString(
                          "en-IN"
                      )} km`
                    : "",
            icon: FiSettings
        },
        {
            label: "Fuel Type",
            value: formatLabel(
                vehicle.fuel
            ),
            icon: FiDroplet
        },
        {
            label: "Transmission",
            value: formatLabel(
                vehicle.transmission
            ),
            icon: FiSettings
        },
        {
            label: "Ownership",
            value:
                ownership !== undefined &&
                ownership !== null
                    ? formatLabel(
                          ownership
                      )
                    : "",
            icon: FiUser
        },
        {
            label: "Registration",
            value:
                vehicle.registrationNumber ||
                vehicle.registration ||
                "",
            icon: FiHash
        }
    ].filter(
        (spec) =>
            spec.value !== undefined &&
            spec.value !== null &&
            spec.value !== ""
    );

    if (!specs.length) {
        return null;
    }

    return (
        <section
            className={[
                styles["vehicle-specs"],
                className
            ]
                .filter(Boolean)
                .join(" ")}
        >
            <div className={styles["vehicle-specs__header"]}>
                <h2>Vehicle Specifications</h2>
            </div>

            <div className={styles["vehicle-specs__grid"]}>
                {specs.map(
                    ({
                        label,
                        value,
                        icon: Icon
                    }) => (
                        <div
                            className={styles["vehicle-specs__item"]}
                            key={label}
                        >
                            <div className={styles["vehicle-specs__icon"]}>
                                <Icon
                                    size={17}
                                    aria-hidden="true"
                                />
                            </div>

                            <div className={styles["vehicle-specs__content"]}>
                                <span className={styles["vehicle-specs__label"]}>
                                    {label}
                                </span>

                                <strong className={styles["vehicle-specs__value"]}>
                                    {value}
                                </strong>
                            </div>
                        </div>
                    )
                )}
            </div>
        </section>
    );
};

export default VehicleSpecs;
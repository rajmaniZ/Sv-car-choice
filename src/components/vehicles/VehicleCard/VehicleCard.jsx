import { Link } from "react-router-dom";
import {
    FiArrowRight,
    FiCalendar,
    FiCheckCircle,
    FiMapPin,
    FiSettings,
    FiUser
} from "react-icons/fi";
import { getImageUrl } from "../../../utils/getImageUrl";
import { formatCurrency } from "../../../utils/formatCurrency";
import StatusBadge from "../../common/StatusBadge/StatusBadge";
import styles from "./VehicleCard.module.css";
import WhatsAppButton from "../../common/WhatsAppButton/WhatsAppButton";


const getVehicleName = (vehicle) =>
    vehicle.name ||
    vehicle.title ||
    `${vehicle.brand || ""} ${vehicle.model || ""}`.trim() ||
    "Used Car";

const getVehicleImage = (vehicle) => {
    const images = vehicle.images || vehicle.gallery || [];

    if (Array.isArray(images) && images.length > 0) {
        return getImageUrl(images[0]);
    }

    if (typeof images === "string") {
        return getImageUrl(images);
    }

    return "";
};

const getMileage = (vehicle) =>
    vehicle.kmDriven ??
    vehicle.mileage ??
    vehicle.kilometers ??
    vehicle.kms ??
    null;

const getOwnership = (vehicle) =>
    vehicle.ownership ??
    vehicle.ownerCount ??
    vehicle.owners ??
    null;

const getLocation = (vehicle) =>
    vehicle.location ||
    vehicle.city ||
    vehicle.registrationCity ||
    null;

const VehicleCard = ({
    vehicle,
    showStatus = true,
    showLocation = true,
    className = ""
}) => {
    if (!vehicle) {
        return null;
    }

    const name = getVehicleName(vehicle);
    const image = getVehicleImage(vehicle);
    const mileage = getMileage(vehicle);
    const ownership = getOwnership(vehicle);
    const location = getLocation(vehicle);

    const vehicleSlug =
        vehicle.slug ||
        vehicle._id ||
        vehicle.id;

    const detailsPath = vehicleSlug
        ? `/inventory/${vehicleSlug}`
        : "/inventory";

    const isAvailable =
        vehicle.status === "available" ||
        !vehicle.status;

    return (
        <article
            className={[
                styles["vehicle-card"],
                className
            ]
                .filter(Boolean)
                .join(" ")}
        >
            <Link
                to={detailsPath}
                className={styles["vehicle-card__image-link"]}
                aria-label={`View ${name}`}
            >
                <div className={styles["vehicle-card__image-wrapper"]}>
                    {image ? (
                        <img
    src={image}
    alt={name}
    className={styles["vehicle-card__image"]}
    loading="lazy"
    decoding="async"
    referrerPolicy="no-referrer"
/>
                    ) : (
                        <div className={styles["vehicle-card__image-placeholder"]}>
                            <FiSettings
                                size={34}
                                aria-hidden="true"
                            />
                            <span>
                                Image unavailable
                            </span>
                        </div>
                    )}

                    {showStatus && vehicle.status && (
                        <div className={styles["vehicle-card__status"]}>
                            <StatusBadge
                                status={vehicle.status}
                            />
                        </div>
                    )}

                    {vehicle.featured && (
                        <div className={styles["vehicle-card__featured"]}>
                            <FiCheckCircle
                                size={14}
                                aria-hidden="true"
                            />
                            <span>Featured</span>
                        </div>
                    )}
                </div>
            </Link>

            <div className={styles["vehicle-card__content"]}>
                <div className={styles["vehicle-card__heading"]}>
                    <div>
                        <p className={styles["vehicle-card__brand"]}>
                            {vehicle.brand || "Used Car"}
                        </p>

                        <h3 className={styles["vehicle-card__title"]}>
                            <Link to={detailsPath}>
                                {name}
                            </Link>
                        </h3>

                        {vehicle.variant && (
                            <p className={styles["vehicle-card__variant"]}>
                                {vehicle.variant}
                            </p>
                        )}
                    </div>

                    {vehicle.price !== undefined &&
                        vehicle.price !== null && (
                            <strong className={styles["vehicle-card__price"]}>
                                {formatCurrency(
                                    vehicle.price
                                )}
                            </strong>
                        )}
                </div>

                <div className={styles["vehicle-card__specs"]}>
                    {vehicle.year && (
                        <span className={styles["vehicle-card__spec"]}>
                            <FiCalendar
                                size={15}
                                aria-hidden="true"
                            />
                            <span>
                                {vehicle.year}
                            </span>
                        </span>
                    )}

                    {mileage !== null && (
                        <span className={styles["vehicle-card__spec"]}>
                            <FiSettings
                                size={15}
                                aria-hidden="true"
                            />
                            <span>
                                {Number(mileage).toLocaleString(
                                    "en-IN"
                                )} km
                            </span>
                        </span>
                    )}

                    {vehicle.transmission && (
                        <span className={styles["vehicle-card__spec"]}>
                            <FiSettings
                                size={15}
                                aria-hidden="true"
                            />
                            <span>
                                {vehicle.transmission}
                            </span>
                        </span>
                    )}

                    {vehicle.fuel && (
                        <span className={styles["vehicle-card__spec"]}>
                            <span className={styles["vehicle-card__spec-dot"]} />
                            <span>
                                {vehicle.fuel}
                            </span>
                        </span>
                    )}

                    {ownership !== null && (
                        <span className={styles["vehicle-card__spec"]}>
                            <FiUser
                                size={15}
                                aria-hidden="true"
                            />
                            <span>
                                {ownership}
                            </span>
                        </span>
                    )}
                </div>

                {showLocation && location && (
                    <div className={styles["vehicle-card__location"]}>
                        <FiMapPin
                            size={15}
                            aria-hidden="true"
                        />
                        <span>{location}</span>
                    </div>
                )}

                <div className={styles["vehicle-card__footer"]}>
                    <span
                        className={[
                            styles["vehicle-card__availability"],
                            isAvailable
                                ? styles["vehicle-card__availability--available"]
                                : ""
                        ]
                            .filter(Boolean)
                            .join(" ")}
                    >
                        {isAvailable
                            ? "Available"
                            : vehicle.status}
                    </span>

                    <WhatsAppButton
    label="WhatsApp"
    variant="outline"
    type="Vehicle"
    title={`${vehicle.brand} ${vehicle.model}`}
    slug={vehicle.slug}
    details={{
        brand: vehicle.brand,
        model: vehicle.model,
        variant: vehicle.variant,
        modelYear: vehicle.modelYear,
        fuel: vehicle.fuel,
        transmission: vehicle.transmission,
        mileage: vehicle.mileage,
        ownership: vehicle.ownership,
        colour: vehicle.colour,
        price: vehicle.price,
        status: vehicle.status
    }}
/>

                    <Link
                        to={detailsPath}
                        className={styles["vehicle-card__link"]}
                    >
                        <span>View Details</span>
                        <FiArrowRight
                            size={16}
                            aria-hidden="true"
                        />
                    </Link>
                </div>
            </div>
        </article>
    );
};

export default VehicleCard;
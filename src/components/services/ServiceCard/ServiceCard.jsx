import {
    FiActivity,
    FiArrowRight,
    FiBriefcase,
    FiCheckCircle,
    FiClipboard,
    FiCreditCard,
    FiDollarSign,
    FiFileText,
    FiMapPin,
    FiRepeat,
    FiShield,
    FiShoppingCart,
    FiTool,
    FiTruck
} from "react-icons/fi";
import WhatsAppButton from "../../common/WhatsAppButton/WhatsAppButton";

import {
    Link
} from "react-router-dom";


import styles from "./ServiceCard.module.css";

const iconMap = {
    Car: FiTruck,
    CarFront: FiTruck,
    ShoppingCart: FiShoppingCart,

    BadgeDollarSign: FiDollarSign,
    CircleDollarSign: FiDollarSign,
    IndianRupee: FiDollarSign,
    Banknote: FiDollarSign,

    Repeat2: FiRepeat,
    RefreshCw: FiRepeat,

    ClipboardCheck: FiClipboard,

    SearchCheck: FiCheckCircle,

    FileCheck: FiFileText,
    FileCheck2: FiCheckCircle,
    FileText: FiFileText,

    ShieldCheck: FiShield,
    Shield: FiShield,

    WalletCards: FiCreditCard,
    Wallet: FiCreditCard,

    Gauge: FiActivity,
    MapPinHouse: FiMapPin
};

const getIcon = (iconName) => {
    return (
        iconMap[iconName] ||
        FiBriefcase
    );
};

const ServiceCard = ({
    service,
    title,
    description,
    image,
    icon,
    slug,
    link = true
}) => {
    const serviceTitle =
        title ||
        service?.name ||
        service?.title ||
        "Service";

    const serviceDescription =
        description ||
        service?.shortDescription ||
        service?.description ||
        "";

    const serviceImage =
        image ||
        service?.image?.url ||
        service?.image?.secureUrl ||
        service?.image?.secure_url ||
        "";

    const serviceSlug =
        slug ||
        service?.slug ||
        "";

    const serviceType =
        service?.type ||
        "service";

    const children =
        Array.isArray(service?.children)
            ? service.children
            : [];

    const Icon =
        getIcon(
            icon ||
            service?.icon
        );

    const typeLabel =
        serviceType === "category"
            ? "Category"
            : serviceType === "subcategory"
                ? "Service Group"
                : "Service";

    const content = (
        <>
            <div className={styles.media}>
                {serviceImage ? (
                    <img
                        src={serviceImage}
                        alt={serviceTitle}
                        className={styles.image}
                        loading="lazy"
                    />
                ) : (
                    <div
                        className={
                            styles.imagePlaceholder
                        }
                        aria-hidden="true"
                    >
                        <Icon />
                    </div>
                )}

                <span
                    className={styles.icon}
                    aria-hidden="true"
                >
                    <Icon />
                </span>

                <span
                    className={styles.typeBadge}
                >
                    {typeLabel}
                </span>
                <WhatsAppButton
    label="WhatsApp"
    variant="outline"
    type="Service"
    title={service.name}
    slug={service.slug}
    details={{
        serviceType:
            service.type,
        description:
            service.shortDescription
    }}
/>
            </div>

            <div className={styles.content}>
                <div className={styles.heading}>
                    <h3 className={styles.title}>
                        {serviceTitle}
                    </h3>

                    {children.length > 0 && (
                        <span
                            className={
                                styles.childCount
                            }
                        >
                            {children.length}
                        </span>
                    )}
                </div>

                {serviceDescription && (
                    <p
                        className={
                            styles.description
                        }
                    >
                        {serviceDescription}
                    </p>
                )}

                <div className={styles.footer}>
                    <span className={styles.link}>
                        {children.length > 0
                            ? "Explore Services"
                            : "View Service"}

                        <FiArrowRight
                            aria-hidden="true"
                        />
                    </span>
                </div>
            </div>
        </>
    );

    if (
        link &&
        serviceSlug
    ) {
        return (
            <Link
                to={`/services/${serviceSlug}`}
                className={styles.card}
                aria-label={`View ${serviceTitle}`}
            >
                {content}
            </Link>

        );
    }

    return (
        <article className={styles.card}>
            {content}
        </article>
    );
};

export default ServiceCard;
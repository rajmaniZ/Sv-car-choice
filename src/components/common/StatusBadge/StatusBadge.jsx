import styles from "./StatusBadge.module.css";

const STATUS_LABELS = {
    available: "Available",
    sold: "Sold",
    reserved: "Reserved",
    pending: "Pending",
    active: "Active",
    inactive: "Inactive",
    approved: "Approved",
    rejected: "Rejected",
    completed: "Completed",
    cancelled: "Cancelled",
    new: "New",
    featured: "Featured"
};

const STATUS_VARIANTS = {
    available: "success",
    sold: "danger",
    reserved: "warning",
    pending: "warning",
    active: "success",
    inactive: "neutral",
    approved: "success",
    rejected: "danger",
    completed: "success",
    cancelled: "danger",
    new: "info",
    featured: "dark"
};

const StatusBadge = ({
    status = "",
    label = "",
    variant = "",
    className = ""
}) => {
    const normalizedStatus = String(status)
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-");

    const displayLabel =
        label ||
        STATUS_LABELS[normalizedStatus] ||
        status ||
        "Unknown";

    const badgeVariant =
        variant ||
        STATUS_VARIANTS[normalizedStatus] ||
        "neutral";

    const classes = [
        styles.badge,
        styles[`badge--${badgeVariant}`],
        className
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <span className={classes}>
            {displayLabel}
        </span>
    );
};

export default StatusBadge;
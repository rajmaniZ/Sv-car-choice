import styles from "./SectionHeader.module.css";

const SectionHeader = ({
    eyebrow = "",
    title = "",
    description = "",
    align = "left",
    className = ""
}) => {
    const classes = [
        styles.sectionHeader,
        styles[`sectionHeader--${align}`],
        className
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={classes}>
            {eyebrow && (
                <span className={styles.eyebrow}>
                    {eyebrow}
                </span>
            )}

            {title && (
                <h2 className={styles.title}>
                    {title}
                </h2>
            )}

            {description && (
                <p className={styles.description}>
                    {description}
                </p>
            )}
        </div>
    );
};

export default SectionHeader;
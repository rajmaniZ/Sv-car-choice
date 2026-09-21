import styles from "./Loading.module.css";

const Loading = ({
    text = "Loading...",
    size = "medium",
    fullPage = false
}) => {
    const classes = [
        styles.loading,
        styles[`loading--${size}`],
        fullPage ? styles["loading--full-page"] : ""
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div
            className={classes}
            role="status"
            aria-live="polite"
        >
            <span
                className={styles.spinner}
                aria-hidden="true"
            />

            {text && (
                <span className={styles.text}>
                    {text}
                </span>
            )}
        </div>
    );
};

export default Loading;
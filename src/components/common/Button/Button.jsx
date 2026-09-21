import styles from "./Button.module.css";

const Button = ({
    children,
    type = "button",
    variant = "primary",
    size = "medium",
    href = "",
    className = "",
    disabled = false,
    loading = false,
    fullWidth = false,
    onClick,
    ...props
}) => {
    const classes = [
        styles.button,
        styles[`button--${variant}`],
        styles[`button--${size}`],
        fullWidth ? styles["button--full"] : "",
        className
    ]
        .filter(Boolean)
        .join(" ");

    const content = loading ? (
        <>
            <span
                className={styles.spinner}
                aria-hidden="true"
            />
            <span>Loading...</span>
        </>
    ) : (
        children
    );

    if (href && !disabled && !loading) {
        return (
            <a
                href={href}
                className={classes}
                {...props}
            >
                {content}
            </a>
        );
    }

    return (
        <button
            type={type}
            className={classes}
            disabled={disabled || loading}
            onClick={onClick}
            {...props}
        >
            {content}
        </button>
    );
};

export default Button;
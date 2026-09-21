import Button from "../Button/Button";
import styles from "./ErrorState.module.css";

const ErrorState = ({
    title = "Something went wrong",
    message = "We couldn't load the requested information. Please try again.",
    actionLabel = "Try Again",
    onAction,
    icon = "!"
}) => {
    return (
        <div
            className={styles.errorState}
            role="alert"
        >
            <div
                className={styles.icon}
                aria-hidden="true"
            >
                {icon}
            </div>

            <h3 className={styles.title}>
                {title}
            </h3>

            {message && (
                <p className={styles.message}>
                    {message}
                </p>
            )}

            {onAction && actionLabel && (
                <div className={styles.action}>
                    <Button
                        variant="secondary"
                        onClick={onAction}
                    >
                        {actionLabel}
                    </Button>
                </div>
            )}
        </div>
    );
};

export default ErrorState;
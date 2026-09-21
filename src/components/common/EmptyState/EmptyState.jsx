import Button from "../Button/Button";
import styles from "./EmptyState.module.css";

const EmptyState = ({
    title = "No results found",
    message = "There is nothing to display at the moment.",
    actionLabel = "",
    onAction,
    actionHref = "",
    icon = "⌕"
}) => {
    return (
        <div className={styles.emptyState}>
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

            {actionLabel && (
                <div className={styles.action}>
                    <Button
                        variant="secondary"
                        href={actionHref}
                        onClick={onAction}
                    >
                        {actionLabel}
                    </Button>
                </div>
            )}
        </div>
    );
};

export default EmptyState;
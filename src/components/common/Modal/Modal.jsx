import {
    useEffect,
    useRef
} from "react";

import styles from "./Modal.module.css";

const Modal = ({
    isOpen,
    onClose,
    title = "",
    children,
    size = "medium",
    closeOnOverlay = true,
    showCloseButton = true
}) => {
    const modalRef = useRef(null);

    useEffect(() => {
        if (!isOpen) {
            return undefined;
        }

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose?.();
            }
        };

        const previousOverflow =
            document.body.style.overflow;

        document.body.style.overflow = "hidden";

        document.addEventListener(
            "keydown",
            handleKeyDown
        );

        modalRef.current?.focus();

        return () => {
            document.body.style.overflow =
                previousOverflow;

            document.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };
    }, [isOpen, onClose]);

    if (!isOpen) {
        return null;
    }

    const handleOverlayClick = (event) => {
        if (
            closeOnOverlay &&
            event.target === event.currentTarget
        ) {
            onClose?.();
        }
    };

    const modalClasses = [
        styles.modal,
        styles[`modal--${size}`]
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div
            className={styles.overlay}
            onMouseDown={handleOverlayClick}
            role="presentation"
        >
            <div
                ref={modalRef}
                className={modalClasses}
                role="dialog"
                aria-modal="true"
                aria-labelledby={
                    title
                        ? "modal-title"
                        : undefined
                }
                tabIndex="-1"
            >
                {(title || showCloseButton) && (
                    <div
                        className={styles.header}
                    >
                        {title && (
                            <h2
                                id="modal-title"
                                className={
                                    styles.title
                                }
                            >
                                {title}
                            </h2>
                        )}

                        {showCloseButton && (
                            <button
                                type="button"
                                className={
                                    styles.closeButton
                                }
                                onClick={onClose}
                                aria-label="Close modal"
                            >
                                <span aria-hidden="true">
                                    ×
                                </span>
                            </button>
                        )}
                    </div>
                )}

                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
import {
    useEffect,
    useState
} from "react";

import {
    FiChevronLeft,
    FiChevronRight,
    FiMaximize2
} from "react-icons/fi";

import {
    getImageUrl
} from "../../../utils/getImageUrl";

import Modal from "../../common/Modal/Modal";

import styles from "./VehicleGallery.module.css";

const getImages = (vehicle) => {
    const source =
        vehicle?.images ||
        vehicle?.gallery ||
        [];

    if (Array.isArray(source)) {
        return source
            .map((image) =>
                getImageUrl(image)
            )
            .filter(Boolean);
    }

    if (typeof source === "string") {
        const image =
            getImageUrl(source);

        return image
            ? [image]
            : [];
    }

    return [];
};

const VehicleGallery = ({
    vehicle,
    className = ""
}) => {
    const images = getImages(vehicle);

    const vehicleKey =
        vehicle?._id ||
        vehicle?.id ||
        vehicle?.slug ||
        "vehicle";

    const [
        selection,
        setSelection
    ] = useState({
        key: vehicleKey,
        index: 0
    });

    const [
        isLightboxOpen,
        setIsLightboxOpen
    ] = useState(false);

    const activeIndex =
        selection.key === vehicleKey
            ? Math.min(
                  selection.index,
                  Math.max(
                      images.length - 1,
                      0
                  )
              )
            : 0;

    const setActiveIndex = (
        nextIndex
    ) => {
        setSelection({
            key: vehicleKey,
            index: Math.max(
                0,
                Math.min(
                    nextIndex,
                    Math.max(
                        images.length - 1,
                        0
                    )
                )
            )
        });
    };

    useEffect(() => {
        if (!isLightboxOpen) {
            return undefined;
        }

        const handleKeyDown = (
            event
        ) => {
            if (event.key === "Escape") {
                setIsLightboxOpen(false);
            }

            if (event.key === "ArrowLeft") {
                setSelection((current) => {
                    const currentIndex =
                        current.key ===
                        vehicleKey
                            ? current.index
                            : 0;

                    return {
                        key: vehicleKey,
                        index:
                            currentIndex === 0
                                ? Math.max(
                                      images.length -
                                          1,
                                      0
                                  )
                                : currentIndex -
                                  1
                    };
                });
            }

            if (event.key === "ArrowRight") {
                setSelection((current) => {
                    const currentIndex =
                        current.key ===
                        vehicleKey
                            ? current.index
                            : 0;

                    return {
                        key: vehicleKey,
                        index:
                            currentIndex >=
                            images.length - 1
                                ? 0
                                : currentIndex + 1
                    };
                });
            }
        };

        window.addEventListener(
            "keydown",
            handleKeyDown
        );

        return () => {
            window.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };
    }, [
        isLightboxOpen,
        images.length,
        vehicleKey
    ]);

    const previousImage = () => {
        setActiveIndex(
            activeIndex === 0
                ? images.length - 1
                : activeIndex - 1
        );
    };

    const nextImage = () => {
        setActiveIndex(
            activeIndex >= images.length - 1
                ? 0
                : activeIndex + 1
        );
    };

    if (!images.length) {
        return (
            <div
                className={[
                    styles["vehicle-gallery"],
                    styles["vehicle-gallery--empty"],
                    className
                ]
                    .filter(Boolean)
                    .join(" ")}
            >
                <div className={styles["vehicle-gallery__placeholder"]}>
                    <span>
                        No vehicle images available
                    </span>
                </div>
            </div>
        );
    }

    const activeImage =
        images[activeIndex] ||
        images[0];

    return (
        <>
            <div
                className={[
                    styles["vehicle-gallery"],
                    className
                ]
                    .filter(Boolean)
                    .join(" ")}
            >
                <div className={styles["vehicle-gallery__main"]}>
                    <img
                        src={activeImage}
                        alt={
                            vehicle?.name ||
                            vehicle?.title ||
                            "Vehicle"
                        }
                        className={styles["vehicle-gallery__main-image"]}
                    />

                    {images.length > 1 && (
                        <>
                            <button
                                type="button"
                                className="vehicle-gallery__arrow vehicle-gallery__arrow--left"
                                onClick={
                                    previousImage
                                }
                                aria-label="Previous vehicle image"
                            >
                                <FiChevronLeft
                                    size={22}
                                    aria-hidden="true"
                                />
                            </button>

                            <button
                                type="button"
                                className="vehicle-gallery__arrow vehicle-gallery__arrow--right"
                                onClick={
                                    nextImage
                                }
                                aria-label="Next vehicle image"
                            >
                                <FiChevronRight
                                    size={22}
                                    aria-hidden="true"
                                />
                            </button>
                        </>
                    )}

                    <button
                        type="button"
                        className={styles["vehicle-gallery__expand"]}
                        onClick={() =>
                            setIsLightboxOpen(
                                true
                            )
                        }
                        aria-label="Open vehicle image"
                    >
                        <FiMaximize2
                            size={18}
                            aria-hidden="true"
                        />
                    </button>

                    {images.length > 1 && (
                        <div className={styles["vehicle-gallery__counter"]}>
                            {activeIndex + 1} /{" "}
                            {images.length}
                        </div>
                    )}
                </div>

                {images.length > 1 && (
                    <div className={styles["vehicle-gallery__thumbnails"]}>
                        {images.map(
                            (
                                image,
                                index
                            ) => (
                                <button
                                    type="button"
                                    key={`${image}-${index}`}
                                    className={[
                                        styles["vehicle-gallery__thumbnail"],
                                        index === activeIndex
                                            ? styles["vehicle-gallery__thumbnail--active"]
                                            : ""
                                    ]
                                        .filter(Boolean)
                                        .join(" ")}
                                    onClick={() =>
                                        setActiveIndex(
                                            index
                                        )
                                    }
                                    aria-label={`View image ${
                                        index + 1
                                    }`}
                                >
                                    <img
                                        src={image}
                                        alt=""
                                    />
                                </button>
                            )
                        )}
                    </div>
                )}
            </div>

            <Modal
                isOpen={
                    isLightboxOpen
                }
                onClose={() =>
                    setIsLightboxOpen(
                        false
                    )
                }
                title=""
                size="large"
            >
                <div className={styles["vehicle-gallery__lightbox"]}>
                    <img
                        src={activeImage}
                        alt={
                            vehicle?.name ||
                            vehicle?.title ||
                            "Vehicle"
                        }
                        className={styles["vehicle-gallery__lightbox-image"]}
                    />

                    {images.length > 1 && (
                        <>
                            <button
                                type="button"
                                className="vehicle-gallery__lightbox-arrow vehicle-gallery__lightbox-arrow--left"
                                onClick={
                                    previousImage
                                }
                                aria-label="Previous image"
                            >
                                <FiChevronLeft
                                    size={28}
                                    aria-hidden="true"
                                />
                            </button>

                            <button
                                type="button"
                                className="vehicle-gallery__lightbox-arrow vehicle-gallery__lightbox-arrow--right"
                                onClick={
                                    nextImage
                                }
                                aria-label="Next image"
                            >
                                <FiChevronRight
                                    size={28}
                                    aria-hidden="true"
                                />
                            </button>
                        </>
                    )}
                </div>
            </Modal>
        </>
    );
};

export default VehicleGallery;
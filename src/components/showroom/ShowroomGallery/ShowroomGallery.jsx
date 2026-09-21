import { useState } from "react";

import Modal from "../../common/Modal/Modal";

import styles from "./ShowroomGallery.module.css";

const ShowroomGallery = ({
    images = [],
    title = "Showroom Gallery"
}) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const normalizedImages = images
        .map((image, index) => {
            if (typeof image === "string") {
                return {
                    url: image,
                    alt: `${title} ${index + 1}`
                };
            }

            return {
                url:
                    image?.url ||
                    image?.secure_url ||
                    image?.secureUrl ||
                    image?.image ||
                    "",
                alt:
                    image?.alt ||
                    image?.caption ||
                    `${title} ${index + 1}`
            };
        })
        .filter((image) => image.url);

    if (normalizedImages.length === 0) {
        return null;
    }

    return (
        <>
            <div className={styles.grid}>
                {normalizedImages.map((image, index) => (
                    <button
                        key={`${image.url}-${index}`}
                        type="button"
                        className={
                            index === 0
                                ? styles.itemLarge
                                : styles.item
                        }
                        onClick={() =>
                            setSelectedImage(image)
                        }
                        aria-label={`View ${image.alt}`}
                    >
                        <img
                            src={image.url}
                            alt={image.alt}
                            className={styles.image}
                            loading="lazy"
                        />
                    </button>
                ))}
            </div>

            <Modal
                isOpen={Boolean(selectedImage)}
                onClose={() => setSelectedImage(null)}
                title={selectedImage?.alt || title}
                size="large"
            >
                {selectedImage && (
                    <div className={styles.preview}>
                        <img
                            src={selectedImage.url}
                            alt={selectedImage.alt}
                            className={styles.previewImage}
                        />
                    </div>
                )}
            </Modal>
        </>
    );
};

export default ShowroomGallery;
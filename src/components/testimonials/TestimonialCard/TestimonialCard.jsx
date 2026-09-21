import {
    FiCheckCircle,
    FiStar,
    FiMoreHorizontal,
    FiMessageSquare,
    FiTruck
} from "react-icons/fi";

import styles from "./TestimonialCard.module.css";

const TestimonialCard = ({
    testimonial,
    name,
    message,
    rating,
    role,
    image
}) => {
    const data = testimonial || {};

    const testimonialName =
        name ||
        data.name ||
        data.customerName ||
        "Customer";

    const testimonialMessage =
        message ||
        data.message ||
        data.review ||
        data.content ||
        "";

    const testimonialRating =
        rating ??
        data.rating ??
        5;

    const testimonialRole =
        role ||
        data.role ||
        data.designation ||
        "";

    const testimonialImage =
        image ||
        data.image?.url ||
        data.image?.secure_url ||
        data.image ||
        "";

    const safeRating = Math.min(
        5,
        Math.max(
            0,
            Number(testimonialRating) || 0
        )
    );

    const vehicle = data.vehicle;

    const vehicleName = vehicle
        ? [
              vehicle.brand,
              vehicle.model,
              vehicle.variant
          ]
              .filter(Boolean)
              .join(" ")
        : "";

    const createdDate =
        data.createdAt ||
        data.date ||
        data.createdDate;

    const formattedDate = createdDate
        ? new Date(
              createdDate
          ).toLocaleDateString(
              "en-IN",
              {
                  day: "2-digit",
                  month: "short",
                  year: "numeric"
              }
          )
        : "";

    const initials =
        testimonialName
            .trim()
            .charAt(0)
            .toUpperCase();

    return (
        <article className={styles.card}>
            <div className={styles.topRow}>
                <div className={styles.ratingBlock}>
                    <div
                        className={styles.stars}
                        aria-label={`${safeRating} out of 5 stars`}
                    >
                        {Array.from({
                            length: 5
                        }).map(
                            (_, index) => (
                                <FiStar
                                    key={index}
                                    className={
                                        index <
                                        safeRating
                                            ? styles.starActive
                                            : styles.star
                                    }
                                    aria-hidden="true"
                                />
                            )
                        )}
                    </div>

                    <span
                        className={
                            styles.ratingValue
                        }
                    >
                        {safeRating}/5
                    </span>
                </div>

                {formattedDate && (
                    <span
                        className={
                            styles.date
                        }
                    >
                        {formattedDate}
                    </span>
                )}
            </div>

            <div
                className={styles.reviewIcon}
                aria-hidden="true"
            >
                <FiMessageSquare />
            </div>

            <div className={styles.review}>
                <p>{testimonialMessage}</p>
            </div>

            <div className={styles.reviewMeta}>
                <div
                    className={
                        styles.reviewMetaIcon
                    }
                >
                    <FiTruck
                        aria-hidden="true"
                    />
                </div>

                <div>
                    <span
                        className={
                            styles.metaLabel
                        }
                    >
                        Vehicle
                    </span>

                    <span
                        className={
                            styles.metaValue
                        }
                    >
                        {vehicleName ||
                            "No vehicle"}
                    </span>
                </div>
            </div>

            <div className={styles.divider} />

            <div className={styles.customer}>
                {testimonialImage ? (
                    <img
                        src={testimonialImage}
                        alt={testimonialName}
                        className={styles.avatar}
                        loading="lazy"
                    />
                ) : (
                    <div
                        className={
                            styles.avatarPlaceholder
                        }
                        aria-hidden="true"
                    >
                        {initials}
                    </div>
                )}

                <div
                    className={
                        styles.customerInfo
                    }
                >
                    <div
                        className={
                            styles.customerNameRow
                        }
                    >
                        <h3
                            className={
                                styles.name
                            }
                        >
                            {testimonialName}
                        </h3>

                        <FiCheckCircle
                            className={
                                styles.verifiedIcon
                            }
                            aria-label="Verified customer"
                        />
                    </div>

                    <div
                        className={
                            styles.customerStatus
                        }
                    >
                        <FiCheckCircle
                            aria-hidden="true"
                        />

                        <span>
                            Verified Customer
                        </span>
                    </div>

                    {testimonialRole && (
                        <p
                            className={
                                styles.role
                            }
                        >
                            {testimonialRole}
                        </p>
                    )}
                </div>

                <button
                    type="button"
                    className={
                        styles.moreButton
                    }
                    aria-label="More testimonial options"
                >
                    <FiMoreHorizontal
                        aria-hidden="true"
                    />
                </button>
            </div>
        </article>
    );
};

export default TestimonialCard;
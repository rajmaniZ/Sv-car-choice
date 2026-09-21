import { useState } from "react";
import {
    FiCheckCircle,
    FiMail,
    FiMessageSquare,
    FiPhone,
    FiSend,
    FiStar,
    FiUser
} from "react-icons/fi";

import Button from "../../common/Button/Button";

import {
    createTestimonial
} from "../../../services/testimonial.service";

import {
    getServerErrorMessage,
    getServerValidationErrors,
    validateEmail,
    validatePhone
} from "../../../utils/validation";

import styles from "./TestimonialForm.module.css";

const initialForm = {
    customerName: "",
    phone: "",
    email: "",
    rating: 0,
    message: ""
};

const TestimonialForm = ({
    vehicle = null,
    source = "website",
    onSuccess,
    title = "Share Your Experience",
    description = "Tell us about your experience with SV Old Car Choice."
}) => {
    const [form, setForm] =
        useState(initialForm);

    const [errors, setErrors] =
        useState({});

    const [submitError, setSubmitError] =
        useState("");

    const [success, setSuccess] =
        useState(false);

    const [submitting, setSubmitting] =
        useState(false);

    const handleChange = (event) => {
        const {
            name,
            value
        } = event.target;

        setForm((current) => ({
            ...current,
            [name]: value
        }));

        setErrors((current) => ({
            ...current,
            [name]: ""
        }));

        setSubmitError("");

        if (success) {
            setSuccess(false);
        }
    };

    const handleRating = (rating) => {
        setForm((current) => ({
            ...current,
            rating
        }));

        setErrors((current) => ({
            ...current,
            rating: ""
        }));

        setSubmitError("");

        if (success) {
            setSuccess(false);
        }
    };

    const validate = () => {
        const nextErrors = {};

        if (!form.customerName.trim()) {
            nextErrors.customerName =
                "Customer name is required.";
        }

        if (
            form.phone.trim() &&
            !validatePhone(form.phone)
        ) {
            nextErrors.phone =
                "Enter a valid phone number.";
        }

        if (
            form.email.trim() &&
            !validateEmail(form.email)
        ) {
            nextErrors.email =
                "Enter a valid email address.";
        }

        if (
            !Number.isInteger(
                Number(form.rating)
            ) ||
            Number(form.rating) < 1 ||
            Number(form.rating) > 5
        ) {
            nextErrors.rating =
                "Please select a rating from 1 to 5.";
        }

        if (!form.message.trim()) {
            nextErrors.message =
                "Please share your experience.";
        } else if (
            form.message.trim().length < 10
        ) {
            nextErrors.message =
                "Please enter at least 10 characters.";
        }

        setErrors(nextErrors);

        return (
            Object.keys(nextErrors).length === 0
        );
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setSubmitError("");
        setSuccess(false);

        if (!validate()) {
            return;
        }

        try {
            setSubmitting(true);

            const payload = {
                customerName:
                    form.customerName.trim(),

                phone:
                    form.phone.trim(),

                email:
                    form.email
                        .trim()
                        .toLowerCase(),

                rating:
                    Number(form.rating),

                message:
                    form.message.trim(),

                source
            };

            if (vehicle) {
                payload.vehicle =
                    vehicle?._id ||
                    vehicle?.id ||
                    vehicle;
            }

            await createTestimonial(
                payload
            );

            setForm(initialForm);
            setErrors({});
            setSubmitError("");
            setSuccess(true);

            if (onSuccess) {
                onSuccess();
            }
        } catch (error) {
            const serverErrors =
                getServerValidationErrors(
                    error
                );

            if (
                Object.keys(serverErrors)
                    .length > 0
            ) {
                setErrors(
                    (current) => ({
                        ...current,
                        ...serverErrors
                    })
                );
            }

            setSubmitError(
                getServerErrorMessage(
                    error,
                    "Unable to submit your testimonial. Please try again."
                )
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <span className={styles.eyebrow}>
                    Customer Review
                </span>

                <h2 className={styles.title}>
                    {title}
                </h2>

                <p className={styles.description}>
                    {description}
                </p>
            </div>

            {success && (
                <div
                    className={styles.success}
                    role="status"
                >
                    <FiCheckCircle
                        aria-hidden="true"
                    />

                    <div>
                        <strong>
                            Thank you for your review.
                        </strong>

                        <p>
                            Your testimonial has
                            been submitted for
                            review and will appear
                            after approval.
                        </p>
                    </div>
                </div>
            )}

            {submitError && (
                <div
                    className={styles.error}
                    role="alert"
                >
                    {submitError}
                </div>
            )}

            <form
                className={styles.form}
                onSubmit={handleSubmit}
                noValidate
            >
                <div className={styles.grid}>
                    <div
                        className={
                            styles.field
                        }
                    >
                        <label
                            htmlFor="testimonial-customer-name"
                        >
                            Customer Name
                            <span>*</span>
                        </label>

                        <div
                            className={
                                styles.inputWrapper
                            }
                        >
                            <FiUser
                                aria-hidden="true"
                            />

                            <input
                                id="testimonial-customer-name"
                                name="customerName"
                                type="text"
                                value={
                                    form.customerName
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Enter your name"
                                autoComplete="name"
                            />
                        </div>

                        {errors.customerName && (
                            <p
                                className={
                                    styles.fieldError
                                }
                            >
                                {
                                    errors.customerName
                                }
                            </p>
                        )}
                    </div>

                    <div
                        className={
                            styles.field
                        }
                    >
                        <label
                            htmlFor="testimonial-phone"
                        >
                            Phone
                        </label>

                        <div
                            className={
                                styles.inputWrapper
                            }
                        >
                            <FiPhone
                                aria-hidden="true"
                            />

                            <input
                                id="testimonial-phone"
                                name="phone"
                                type="tel"
                                value={
                                    form.phone
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Enter your phone number"
                                autoComplete="tel"
                            />
                        </div>

                        {errors.phone && (
                            <p
                                className={
                                    styles.fieldError
                                }
                            >
                                {errors.phone}
                            </p>
                        )}
                    </div>

                    <div
                        className={
                            styles.field
                        }
                    >
                        <label
                            htmlFor="testimonial-email"
                        >
                            Email
                        </label>

                        <div
                            className={
                                styles.inputWrapper
                            }
                        >
                            <FiMail
                                aria-hidden="true"
                            />

                            <input
                                id="testimonial-email"
                                name="email"
                                type="email"
                                value={
                                    form.email
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Enter your email"
                                autoComplete="email"
                            />
                        </div>

                        {errors.email && (
                            <p
                                className={
                                    styles.fieldError
                                }
                            >
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div
                        className={`${styles.field} ${styles.ratingField}`}
                    >
                        <label>
                            Your Rating
                            <span>*</span>
                        </label>

                        <div
                            className={
                                styles.rating
                            }
                            role="radiogroup"
                            aria-label="Select your rating"
                        >
                            {[1, 2, 3, 4, 5].map(
                                (value) => (
                                    <button
                                        key={value}
                                        type="button"
                                        className={
                                            value <=
                                            Number(
                                                form.rating
                                            )
                                                ? styles.starActive
                                                : styles.star
                                        }
                                        onClick={() =>
                                            handleRating(
                                                value
                                            )
                                        }
                                        aria-label={`${value} star${value > 1 ? "s" : ""}`}
                                        aria-checked={
                                            Number(
                                                form.rating
                                            ) ===
                                            value
                                        }
                                        role="radio"
                                    >
                                        <FiStar
                                            aria-hidden="true"
                                        />
                                    </button>
                                )
                            )}
                        </div>

                        {form.rating > 0 && (
                            <span
                                className={
                                    styles.ratingText
                                }
                            >
                                {form.rating} out of
                                5
                            </span>
                        )}

                        {errors.rating && (
                            <p
                                className={
                                    styles.fieldError
                                }
                            >
                                {errors.rating}
                            </p>
                        )}
                    </div>
                </div>

                <div
                    className={`${styles.field} ${styles.messageField}`}
                >
                    <label
                        htmlFor="testimonial-message"
                    >
                        Your Experience
                        <span>*</span>
                    </label>

                    <div
                        className={
                            styles.textareaWrapper
                        }
                    >
                        <FiMessageSquare
                            aria-hidden="true"
                        />

                        <textarea
                            id="testimonial-message"
                            name="message"
                            value={
                                form.message
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="Tell us about your experience with SV Old Car Choice..."
                            rows="6"
                            maxLength="1000"
                        />
                    </div>

                    <div
                        className={
                            styles.messageFooter
                        }
                    >
                        {errors.message ? (
                            <p
                                className={
                                    styles.fieldError
                                }
                            >
                                {errors.message}
                            </p>
                        ) : (
                            <span>
                                Share your honest
                                experience with us.
                            </span>
                        )}

                        <span>
                            {
                                form.message.length
                            }
                            /1000
                        </span>
                    </div>
                </div>

                <div
                    className={
                        styles.formFooter
                    }
                >
                    <p
                        className={
                            styles.reviewNote
                        }
                    >
                        Your review will be checked
                        by our team before being
                        published.
                    </p>

                    <Button
                        type="submit"
                        variant="primary"
                        size="large"
                        loading={submitting}
                        disabled={submitting}
                    >
                        <FiSend
                            aria-hidden="true"
                        />

                        Submit Review
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default TestimonialForm;
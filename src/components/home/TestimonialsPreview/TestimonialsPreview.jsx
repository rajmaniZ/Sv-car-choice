import { useEffect, useState } from "react";
import {
    FiArrowRight,
    FiEdit3,
    FiMessageSquare,
    FiX
} from "react-icons/fi";
import { Link } from "react-router-dom";

import Container from "../../common/Container/Container";
import SectionHeader from "../../common/SectionHeader/SectionHeader";
import Loading from "../../common/Loading/Loading";
import ErrorState from "../../common/ErrorState/ErrorState";

import TestimonialCard from "../../testimonials/TestimonialCard/TestimonialCard";
import TestimonialForm from "../../forms/TestimonialForm/TestimonialForm";

import {
    getPublicTestimonials
} from "../../../services/testimonial.service";

import styles from "./TestimonialsPreview.module.css";

const getTestimonialsFromResponse = (data) => {
    if (Array.isArray(data)) {
        return data;
    }

    if (
        data &&
        Array.isArray(data.testimonials)
    ) {
        return data.testimonials;
    }

    return [];
};

const TestimonialsPreview = () => {
    const [
        testimonials,
        setTestimonials
    ] = useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [showForm, setShowForm] =
        useState(false);

    const loadTestimonials = async () => {
        try {
            setLoading(true);
            setError("");

            const data =
                await getPublicTestimonials({
                    limit: 6
                });

            const testimonialList =
                getTestimonialsFromResponse(data);

            setTestimonials(
                testimonialList.slice(0, 3)
            );
        } catch (requestError) {
            setError(
                requestError.message ||
                    "Unable to load testimonials."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let active = true;

        const loadInitialTestimonials =
            async () => {
                try {
                    const data =
                        await getPublicTestimonials({
                            limit: 6
                        });

                    if (!active) {
                        return;
                    }

                    const testimonialList =
                        getTestimonialsFromResponse(
                            data
                        );

                    setTestimonials(
                        testimonialList.slice(0, 3)
                    );

                    setError("");
                } catch (requestError) {
                    if (!active) {
                        return;
                    }

                    setError(
                        requestError.message ||
                            "Unable to load testimonials."
                    );
                } finally {
                    if (active) {
                        setLoading(false);
                    }
                }
            };

        loadInitialTestimonials();

        return () => {
            active = false;
        };
    }, []);

    const handleTestimonialSuccess = () => {
        setShowForm(false);
        loadTestimonials();
    };

    return (
        <section className={styles.section}>
            <Container>
                <div className={styles.header}>
                    <SectionHeader
                        eyebrow="Customer Experiences"
                        title="What customers say"
                        description="Feedback from customers helps us continue improving the showroom experience."
                    />

                    <FiMessageSquare
                        className={styles.headerIcon}
                        aria-hidden="true"
                    />
                </div>

                {loading && (
                    <Loading
                        text="Loading customer feedback..."
                    />
                )}

                {!loading && error && (
                    <ErrorState
                        message={error}
                        onAction={loadTestimonials}
                    />
                )}

                {!loading &&
                    !error &&
                    testimonials.length > 0 && (
                        <div className={styles.grid}>
                            {testimonials.map(
                                (testimonial) => (
                                    <TestimonialCard
                                        key={
                                            testimonial._id ||
                                            testimonial.id
                                        }
                                        testimonial={
                                            testimonial
                                        }
                                    />
                                )
                            )}
                        </div>
                    )}

                {!loading &&
                    !error &&
                    testimonials.length === 0 && (
                        <div className={styles.empty}>
                            <FiMessageSquare
                                aria-hidden="true"
                            />

                            <h3>
                                Your experience matters
                            </h3>

                            <p>
                                Customer feedback will
                                appear here as reviews
                                are published.
                            </p>
                        </div>
                    )}

                <div className={styles.writeReview}>
                    <div
                        className={
                            styles.writeReviewContent
                        }
                    >
                        <div
                            className={
                                styles.writeReviewIcon
                            }
                        >
                            <FiEdit3
                                aria-hidden="true"
                            />
                        </div>

                        <div>
                            <h3>
                                Share your experience
                            </h3>

                            <p>
                                Have you visited
                                SV Old Car Choice?
                                Tell us about your
                                experience.
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        className={
                            styles.writeReviewButton
                        }
                        onClick={() =>
                            setShowForm(
                                (current) =>
                                    !current
                            )
                        }
                        aria-expanded={showForm}
                    >
                        {showForm ? (
                            <>
                                <FiX
                                    aria-hidden="true"
                                />
                                Close Form
                            </>
                        ) : (
                            <>
                                <FiEdit3
                                    aria-hidden="true"
                                />
                                Write a Review
                            </>
                        )}
                    </button>
                </div>

                {showForm && (
                    <div
                        className={
                            styles.formWrapper
                        }
                    >
                        <TestimonialForm
                            onSuccess={
                                handleTestimonialSuccess
                            }
                        />
                    </div>
                )}

                {!showForm && (
                    <div
                        className={
                            styles.viewContact
                        }
                    >
                        <Link to="/contact">
                            Contact Us
                            <FiArrowRight
                                aria-hidden="true"
                            />
                        </Link>
                    </div>
                )}
            </Container>
        </section>
    );
};

export default TestimonialsPreview;
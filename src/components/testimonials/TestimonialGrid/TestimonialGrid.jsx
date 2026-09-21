import TestimonialCard from "../TestimonialCard/TestimonialCard";
import Loading from "../../common/Loading/Loading";
import EmptyState from "../../common/EmptyState/EmptyState";
import ErrorState from "../../common/ErrorState/ErrorState";

import styles from "./TestimonialGrid.module.css";

const TestimonialGrid = ({
    testimonials = [],
    loading = false,
    error = null,
    onRetry,
    columns = 3
}) => {
    if (loading) {
        return (
            <Loading
                size="large"
                text="Loading testimonials..."
            />
        );
    }

    if (error) {
        return (
            <ErrorState
                message={
                    error.message ||
                    "Unable to load testimonials."
                }
                onAction={onRetry}
            />
        );
    }

    if (
        !Array.isArray(testimonials) ||
        testimonials.length === 0
    ) {
        return (
            <EmptyState
                title="No testimonials available"
                message="Customer reviews will be displayed here soon."
            />
        );
    }

    const gridClasses = [
        styles.grid,
        styles[`grid--${columns}`]
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={gridClasses}>
            {testimonials.map((testimonial, index) => (
                <TestimonialCard
                    key={
                        testimonial?._id ||
                        testimonial?.id ||
                        index
                    }
                    testimonial={testimonial}
                />
            ))}
        </div>
    );
};

export default TestimonialGrid;
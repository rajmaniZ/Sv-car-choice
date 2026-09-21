import { useEffect, useState } from "react";
import {
    FiArrowRight
} from "react-icons/fi";
import { Link } from "react-router-dom";

import Container from "../../common/Container/Container";
import SectionHeader from "../../common/SectionHeader/SectionHeader";
import Loading from "../../common/Loading/Loading";
import ErrorState from "../../common/ErrorState/ErrorState";

import ServiceCard from "../../services/ServiceCard/ServiceCard";

import {
    getPublicServices
} from "../../../services/service.service";

import styles from "./ServicesPreview.module.css";

const ServicesPreview = () => {
    const [services, setServices] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const loadServices = async () => {
        try {
            setLoading(true);
            setError("");

            const data =
                await getPublicServices();

            setServices(
                Array.isArray(data)
                    ? data.slice(0, 6)
                    : []
            );
        } catch (requestError) {
            setError(
                requestError.message ||
                    "Unable to load services."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            loadServices();
        }, 0);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <section className={styles.section}>
            <Container>
                <div className={styles.top}>
                    <SectionHeader
                        eyebrow="Our Services"
                        title="More than just buying a car"
                        description="From finding your next vehicle to selling or exchanging your current one, we make the process easier."
                    />

                    <Link
                        to="/services"
                        className={styles.link}
                    >
                        All Services
                        <FiArrowRight />
                    </Link>
                </div>

                {loading && (
                    <Loading
                        text="Loading services..."
                    />
                )}

                {!loading && error && (
                    <ErrorState
                        message={error}
                        onAction={loadServices}
                    />
                )}

                {!loading &&
                    !error &&
                    services.length > 0 && (
                        <div
                            className={
                                styles.grid
                            }
                        >
                            {services.map(
                                (service) => (
                                    <ServiceCard
                                        key={
                                            service._id ||
                                            service.id ||
                                            service.slug
                                        }
                                        service={
                                            service
                                        }
                                    />
                                )
                            )}
                        </div>
                    )}

                {!loading &&
                    !error &&
                    services.length === 0 && (
                        <div
                            className={
                                styles.fallback
                            }
                        >
                            <div>
                                <h3>
                                    Buying, selling
                                    and exchanging
                                    made simpler.
                                </h3>

                                <p>
                                    Contact SV Old Car
                                    Choice to discuss
                                    your vehicle
                                    requirements.
                                </p>
                            </div>

                            <Link
                                to="/contact"
                                className={
                                    styles.fallbackLink
                                }
                            >
                                Contact Us
                                <FiArrowRight />
                            </Link>
                        </div>
                    )}
            </Container>
        </section>
    );
};

export default ServicesPreview;
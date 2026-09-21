import {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    FiArrowRight,
    FiCheckCircle,
    FiLayers
} from "react-icons/fi";

import {
    Link
} from "react-router-dom";

import Container from "../../components/common/Container/Container";
import SectionHeader from "../../components/common/SectionHeader/SectionHeader";
import Loading from "../../components/common/Loading/Loading";
import ErrorState from "../../components/common/ErrorState/ErrorState";
import Button from "../../components/common/Button/Button";
import ServiceCard from "../../components/services/ServiceCard/ServiceCard";
import PageHero from "../../components/common/PageHero/PageHero";

import {
    getPublicServices
} from "../../services/service.service";

import styles from "./Services.module.css";

const Services = () => {
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

            const hierarchy =
                Array.isArray(data)
                    ? data
                    : data?.services || [];

            setServices(hierarchy);
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
        loadServices();
    }, []);

    const serviceCount = useMemo(() => {
        return services.reduce(
            (total, category) => {
                const subcategories =
                    Array.isArray(
                        category?.children
                    )
                        ? category.children
                        : [];

                return (
                    total +
                    subcategories.reduce(
                        (
                            subtotal,
                            subcategory
                        ) => {
                            const children =
                                Array.isArray(
                                    subcategory?.children
                                )
                                    ? subcategory.children
                                    : [];

                            return (
                                subtotal +
                                children.length
                            );
                        },
                        0
                    )
                );
            },
            0
        );
    }, [services]);

    return (
        <main className={styles.page}>
            <PageHero
                eyebrow="Our Services"
                title="Everything you need around your vehicle."
                description="Explore our vehicle services by category. Select a service group to see its available options, then open any service for complete details and enquiry actions."
                actions={
                    <>
                        <Button
                            href="/inventory"
                            size="large"
                        >
                            Browse Cars
                            <FiArrowRight />
                        </Button>

                        <Button
                            href="/contact"
                            variant="outline"
                            size="large"
                        >
                            Contact Us
                        </Button>
                    </>
                }
            />

            <section
                className={
                    styles.overview
                }
            >
                <Container>
                    <div
                        className={
                            styles.overviewGrid
                        }
                    >
                        <div
                            className={
                                styles.overviewIntro
                            }
                        >
                            <span
                                className={
                                    styles.eyebrow
                                }
                            >
                                Service Directory
                            </span>

                            <h2>
                                Find the right
                                service quickly.
                            </h2>

                            <p>
                                Start with a main
                                category, choose a
                                service group and
                                open the service
                                that matches your
                                requirement.
                            </p>
                        </div>

                        <div
                            className={
                                styles.stat
                            }
                        >
                            <FiLayers />

                            <strong>
                                {services.length}
                            </strong>

                            <span>
                                Service categories
                            </span>
                        </div>

                        <div
                            className={
                                styles.stat
                            }
                        >
                            <FiCheckCircle />

                            <strong>
                                {serviceCount}
                            </strong>

                            <span>
                                Available services
                            </span>
                        </div>
                    </div>
                </Container>
            </section>

            <section
                className={
                    styles.services
                }
            >
                <Container>
                    <SectionHeader
                        eyebrow="Available Services"
                        title="Choose where you want to start"
                        description="Every option below is managed by the service system and can be opened for more information."
                    />

                    {loading ? (
                        <div
                            className={
                                styles.state
                            }
                        >
                            <Loading
                                size="large"
                                text="Loading services..."
                            />
                        </div>
                    ) : error ? (
                        <div
                            className={
                                styles.state
                            }
                        >
                            <ErrorState
                                message={error}
                                onAction={
                                    loadServices
                                }
                            />
                        </div>
                    ) : services.length === 0 ? (
                        <div
                            className={
                                styles.empty
                            }
                        >
                            <h3>
                                No services
                                available
                            </h3>

                            <p>
                                Service information
                                will be available
                                here soon.
                            </p>
                        </div>
                    ) : (
                        <div
                            className={
                                styles.categoryList
                            }
                        >
                            {services.map(
                                (
                                    category
                                ) => (
                                    <section
                                        className={
                                            styles.category
                                        }
                                        key={
                                            category._id ||
                                            category.slug
                                        }
                                    >
                                        <div
                                            className={
                                                styles.categoryHeader
                                            }
                                        >
                                            <div>
                                                <span
                                                    className={
                                                        styles.categoryLabel
                                                    }
                                                >
                                                    Category
                                                </span>

                                                <h3>
                                                    {
                                                        category.name
                                                    }
                                                </h3>

                                                {category.shortDescription && (
                                                    <p>
                                                        {
                                                            category.shortDescription
                                                        }
                                                    </p>
                                                )}
                                            </div>

                                            <Link
                                                to={`/services/${category.slug}`}
                                                className={
                                                    styles.categoryLink
                                                }
                                            >
                                                View Category
                                                <FiArrowRight />
                                            </Link>
                                        </div>

                                        {Array.isArray(
                                            category.children
                                        ) &&
                                            category
                                                .children
                                                .length >
                                                0 && (
                                                <div
                                                    className={
                                                        styles.subcategoryList
                                                    }
                                                >
                                                    {category.children.map(
                                                        (
                                                            subcategory
                                                        ) => (
                                                            <div
                                                                className={
                                                                    styles.subcategory
                                                                }
                                                                key={
                                                                    subcategory._id ||
                                                                    subcategory.slug
                                                                }
                                                            >
                                                                <div
                                                                    className={
                                                                        styles.subcategoryHeader
                                                                    }
                                                                >
                                                                    <div>
                                                                        <span
                                                                            className={
                                                                                styles.subcategoryLabel
                                                                            }
                                                                        >
                                                                            Service Group
                                                                        </span>

                                                                        <h4>
                                                                            {
                                                                                subcategory.name
                                                                            }
                                                                        </h4>

                                                                        {subcategory.shortDescription && (
                                                                            <p>
                                                                                {
                                                                                    subcategory.shortDescription
                                                                                }
                                                                            </p>
                                                                        )}
                                                                    </div>

                                                                    <Link
                                                                        to={`/services/${subcategory.slug}`}
                                                                        className={
                                                                            styles.subcategoryLink
                                                                        }
                                                                    >
                                                                        Explore
                                                                        <FiArrowRight />
                                                                    </Link>
                                                                </div>

                                                                {Array.isArray(
                                                                    subcategory.children
                                                                ) &&
                                                                    subcategory
                                                                        .children
                                                                        .length >
                                                                        0 && (
                                                                        <div
                                                                            className={
                                                                                styles.serviceGrid
                                                                            }
                                                                        >
                                                                            {subcategory.children.map(
                                                                                (
                                                                                    service
                                                                                ) => (
                                                                                    <ServiceCard
                                                                                        key={
                                                                                            service._id ||
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
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            )}
                                    </section>
                                )
                            )}
                        </div>
                    )}
                </Container>
            </section>

            <section
                className={
                    styles.process
                }
            >
                <Container>
                    <SectionHeader
                        eyebrow="Simple Process"
                        title="Start online, connect with the showroom"
                        description="Choose a service, review its requirements and use the available action to continue your enquiry."
                    />

                    <div
                        className={
                            styles.processGrid
                        }
                    >
                        <article>
                            <span>01</span>

                            <div>
                                <FiCheckCircle />
                            </div>

                            <h3>
                                Choose a service
                            </h3>

                            <p>
                                Browse the service
                                categories and
                                select the option
                                relevant to your
                                requirement.
                            </p>
                        </article>

                        <article>
                            <span>02</span>

                            <div>
                                <FiCheckCircle />
                            </div>

                            <h3>
                                Review details
                            </h3>

                            <p>
                                Check the service
                                features,
                                requirements and
                                process before
                                continuing.
                            </p>
                        </article>

                        <article>
                            <span>03</span>

                            <div>
                                <FiCheckCircle />
                            </div>

                            <h3>
                                Send your enquiry
                            </h3>

                            <p>
                                Use the available
                                call, WhatsApp or
                                enquiry action to
                                continue with the
                                showroom.
                            </p>
                        </article>
                    </div>
                </Container>
            </section>

            <section
                className={styles.cta}
            >
                <Container>
                    <div
                        className={
                            styles.ctaInner
                        }
                    >
                        <div>
                            <span>
                                Looking for a vehicle?
                            </span>

                            <h2>
                                Explore available
                                cars.
                            </h2>
                        </div>

                        <Button
                            href="/inventory"
                            variant="secondary"
                            size="large"
                        >
                            View Inventory
                            <FiArrowRight />
                        </Button>
                    </div>
                </Container>
            </section>
        </main>
    );
};

export default Services;
import {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    FiArrowLeft,
    FiArrowRight,
    FiCheck,
    FiCheckCircle,
    FiClock,
    FiFileText,
    FiHelpCircle,
    FiMessageCircle,
    FiPhone,
    FiSend,
    FiTool
} from "react-icons/fi";

import {
    Link,
    useNavigate,
    useParams
} from "react-router-dom";

import Container from "../../components/common/Container/Container";
import Loading from "../../components/common/Loading/Loading";
import ErrorState from "../../components/common/ErrorState/ErrorState";
import Button from "../../components/common/Button/Button";
import ServiceCard from "../../components/services/ServiceCard/ServiceCard";

import {
    getServiceBySlug
} from "../../services/service.service";

import styles from "./ServiceDetail.module.css";

const ServiceDetail = () => {
    const {
        slug
    } = useParams();

    const navigate =
        useNavigate();

    const [service, setService] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const loadService = async () => {
        try {
            setLoading(true);
            setError("");

            const data =
                await getServiceBySlug(
                    slug
                );

            setService(data);
        } catch (requestError) {
            setError(
                requestError.message ||
                    "Unable to load this service."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadService();
    }, [slug]);

    const children =
        useMemo(() => {
            return Array.isArray(
                service?.children
            )
                ? service.children
                : [];
        }, [service]);

    const isLeaf =
        service?.type === "service";

    const parent =
        service?.parent;

    const breadcrumb =
        service?.type === "category"
            ? []
            : parent
                ? [
                    {
                        name:
                            parent.name,
                        slug:
                            parent.slug
                    }
                ]
                : [];

    if (loading) {
        return (
            <main className={styles.page}>
                <Container>
                    <div
                        className={
                            styles.loading
                        }
                    >
                        <Loading
                            size="large"
                            text="Loading service..."
                        />
                    </div>
                </Container>
            </main>
        );
    }

    if (error || !service) {
        return (
            <main className={styles.page}>
                <Container>
                    <div
                        className={
                            styles.error
                        }
                    >
                        <ErrorState
                            message={
                                error ||
                                "Service not found."
                            }
                            onAction={
                                loadService
                            }
                        />

                        <Link
                            to="/services"
                            className={
                                styles.backLink
                            }
                        >
                            <FiArrowLeft />
                            Back to Services
                        </Link>
                    </div>
                </Container>
            </main>
        );
    }

    const actionForm =
        service?.actions
            ?.relatedForm;

    const actionHref =
        actionForm === "sell"
            ? "/sell-your-car"
            : actionForm === "exchange"
                ? "/exchange"
                : actionForm === "finance"
                    ? "/finance"
                    : actionForm === "test-drive"
                        ? "/test-drive"
                        : "/contact";

    return (
        <main className={styles.page}>
            <section
                className={
                    styles.hero
                }
            >
                <Container>
                    <div
                        className={
                            styles.breadcrumbs
                        }
                    >
                        <Link
                            to="/services"
                        >
                            Services
                        </Link>

                        {breadcrumb.map(
                            (item) => (
                                <span
                                    key={
                                        item.slug
                                    }
                                >
                                    <FiArrowRight />

                                    <Link
                                        to={`/services/${item.slug}`}
                                    >
                                        {
                                            item.name
                                        }
                                    </Link>
                                </span>
                            )
                        )}

                        <span>
                            <FiArrowRight />
                            <strong>
                                {
                                    service.name
                                }
                            </strong>
                        </span>
                    </div>

                    <div
                        className={
                            styles.heroGrid
                        }
                    >
                        <div
                            className={
                                styles.heroContent
                            }
                        >
                            <span
                                className={
                                    styles.type
                                }
                            >
                                {service.type ===
                                "category"
                                    ? "Service Category"
                                    : service.type ===
                                        "subcategory"
                                        ? "Service Group"
                                        : "Vehicle Service"}
                            </span>

                            <h1>
                                {
                                    service.name
                                }
                            </h1>

                            <p>
                                {
                                    service.description ||
                                    service.shortDescription
                                }
                            </p>

                            <div
                                className={
                                    styles.heroActions
                                }
                            >
                                {isLeaf &&
                                    service
                                        ?.actions
                                        ?.call && (
                                        <a
                                            href="tel:+919161333380"
                                            className={
                                                styles.actionPrimary
                                            }
                                        >
                                            <FiPhone />
                                            Call Us
                                        </a>
                                    )}

                                {isLeaf &&
                                    service
                                        ?.actions
                                        ?.whatsapp && (
                                        <a
                                            href="https://wa.me/919161333380"
                                            target="_blank"
                                            rel="noreferrer"
                                            className={
                                                styles.actionWhatsapp
                                            }
                                        >
                                            <FiMessageCircle />
                                            WhatsApp
                                        </a>
                                    )}

                                {isLeaf &&
                                    service
                                        ?.actions
                                        ?.enquiry && (
                                        <Link
                                            to={
                                                actionHref
                                            }
                                            className={
                                                styles.actionSecondary
                                            }
                                        >
                                            <FiSend />
                                            Start Enquiry
                                        </Link>
                                    )}
                            </div>
                        </div>

                        <div
                            className={
                                styles.heroPanel
                            }
                        >
                            <div
                                className={
                                    styles.heroIcon
                                }
                            >
                                <FiTool />
                            </div>

                            <span>
                                {children.length >
                                0
                                    ? `${children.length} options available`
                                    : "Service information"}
                            </span>

                            <strong>
                                SV Old Car Choice
                            </strong>

                            <p>
                                Review the available
                                information and choose
                                the next step.
                            </p>
                        </div>
                    </div>
                </Container>
            </section>

            {children.length > 0 && (
                <section
                    className={
                        styles.childrenSection
                    }
                >
                    <Container>
                        <div
                            className={
                                styles.sectionHeading
                            }
                        >
                            <span>
                                Explore
                            </span>

                            <h2>
                                Services under{" "}
                                {
                                    service.name
                                }
                            </h2>

                            <p>
                                Select an option
                                below to continue
                                deeper into the
                                service hierarchy.
                            </p>
                        </div>

                        <div
                            className={
                                styles.childrenGrid
                            }
                        >
                            {children.map(
                                (child) => (
                                    <ServiceCard
                                        key={
                                            child._id ||
                                            child.slug
                                        }
                                        service={
                                            child
                                        }
                                    />
                                )
                            )}
                        </div>
                    </Container>
                </section>
            )}

            {isLeaf && (
                <>
                    {Array.isArray(
                        service.features
                    ) &&
                        service.features.length >
                            0 && (
                            <section
                                className={
                                    styles.section
                                }
                            >
                                <Container>
                                    <div
                                        className={
                                            styles.sectionHeading
                                        }
                                    >
                                        <span>
                                            What you get
                                        </span>

                                        <h2>
                                            Service
                                            features
                                        </h2>
                                    </div>

                                    <div
                                        className={
                                            styles.featureGrid
                                        }
                                    >
                                        {service.features.map(
                                            (
                                                feature,
                                                index
                                            ) => (
                                                <div
                                                    className={
                                                        styles.feature
                                                    }
                                                    key={
                                                        `${feature}-${index}`
                                                    }
                                                >
                                                    <FiCheckCircle />

                                                    <span>
                                                        {
                                                            feature
                                                        }
                                                    </span>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </Container>
                            </section>
                        )}

                    {Array.isArray(
                        service.process
                    ) &&
                        service.process.length >
                            0 && (
                            <section
                                className={
                                    styles.process
                                }
                            >
                                <Container>
                                    <div
                                        className={
                                            styles.sectionHeading
                                        }
                                    >
                                        <span>
                                            How it works
                                        </span>

                                        <h2>
                                            Simple process
                                        </h2>

                                        <p>
                                            Follow the
                                            steps below
                                            to continue
                                            your
                                            enquiry.
                                        </p>
                                    </div>

                                    <div
                                        className={
                                            styles.processGrid
                                        }
                                    >
                                        {service.process.map(
                                            (
                                                item,
                                                index
                                            ) => (
                                                <article
                                                    key={
                                                        `${item.title}-${index}`
                                                    }
                                                >
                                                    <span>
                                                        {String(
                                                            item.step ||
                                                                index +
                                                                    1
                                                        ).padStart(
                                                            2,
                                                            "0"
                                                        )}
                                                    </span>

                                                    <div>
                                                        <FiCheck />
                                                    </div>

                                                    <h3>
                                                        {
                                                            item.title
                                                        }
                                                    </h3>

                                                    <p>
                                                        {
                                                            item.description
                                                        }
                                                    </p>
                                                </article>
                                            )
                                        )}
                                    </div>
                                </Container>
                            </section>
                        )}

                    {Array.isArray(
                        service.requirements
                    ) &&
                        service.requirements.length >
                            0 && (
                            <section
                                className={
                                    styles.section
                                }
                            >
                                <Container>
                                    <div
                                        className={
                                            styles.requirements
                                        }
                                    >
                                        <div
                                            className={
                                                styles.requirementHeading
                                            }
                                        >
                                            <FiFileText />

                                            <div>
                                                <span>
                                                    Before you
                                                    start
                                                </span>

                                                <h2>
                                                    Requirements
                                                </h2>
                                            </div>
                                        </div>

                                        <ul>
                                            {service.requirements.map(
                                                (
                                                    requirement,
                                                    index
                                                ) => (
                                                    <li
                                                        key={
                                                            `${requirement}-${index}`
                                                        }
                                                    >
                                                        <FiCheck />

                                                        <span>
                                                            {
                                                                requirement
                                                            }
                                                        </span>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                </Container>
                            </section>
                        )}

                    {Array.isArray(
                        service.faqs
                    ) &&
                        service.faqs.length >
                            0 && (
                            <section
                                className={
                                    styles.section
                                }
                            >
                                <Container>
                                    <div
                                        className={
                                            styles.sectionHeading
                                        }
                                    >
                                        <span>
                                            Questions
                                        </span>

                                        <h2>
                                            Frequently
                                            asked questions
                                        </h2>
                                    </div>

                                    <div
                                        className={
                                            styles.faqList
                                        }
                                    >
                                        {service.faqs.map(
                                            (
                                                faq,
                                                index
                                            ) => (
                                                <details
                                                    key={
                                                        `${faq.question}-${index}`
                                                    }
                                                >
                                                    <summary>
                                                        <FiHelpCircle />

                                                        <span>
                                                            {
                                                                faq.question
                                                            }
                                                        </span>
                                                    </summary>

                                                    <p>
                                                        {
                                                            faq.answer
                                                        }
                                                    </p>
                                                </details>
                                            )
                                        )}
                                    </div>
                                </Container>
                            </section>
                        )}

                    <section
                        className={
                            styles.cta
                        }
                    >
                        <Container>
                            <div
                                className={
                                    styles.ctaInner
                                }
                            >
                                <div>
                                    <span>
                                        Ready to continue?
                                    </span>

                                    <h2>
                                        Get in touch
                                        with SV Old
                                        Car Choice.
                                    </h2>

                                    <p>
                                        Use the available
                                        enquiry option
                                        or contact the
                                        showroom directly.
                                    </p>
                                </div>

                                <div
                                    className={
                                        styles.ctaActions
                                    }
                                >
                                    <Link
                                        to={
                                            actionHref
                                        }
                                        className={
                                            styles.ctaButton
                                        }
                                    >
                                        Start Enquiry
                                        <FiArrowRight />
                                    </Link>

                                    <Link
                                        to="/services"
                                        className={
                                            styles.ctaBack
                                        }
                                    >
                                        <FiArrowLeft />
                                        All Services
                                    </Link>
                                </div>
                            </div>
                        </Container>
                    </section>
                </>
            )}

            {!isLeaf &&
                children.length === 0 && (
                    <section
                        className={
                            styles.empty
                        }
                    >
                        <Container>
                            <FiClock />

                            <h2>
                                More information
                                coming soon
                            </h2>

                            <p>
                                This service section
                                does not currently
                                contain any active
                                child services.
                            </p>

                            <Button
                                href="/services"
                            >
                                Back to Services
                            </Button>
                        </Container>
                    </section>
                )}
        </main>
    );
};

export default ServiceDetail;
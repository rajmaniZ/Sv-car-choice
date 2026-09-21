import {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    FiArrowRight,
    FiCalendar,
    FiCheckCircle,
    FiClock,
    FiCreditCard,
    FiFileText,
    FiHome,
    FiInstagram,
    FiMapPin,
    FiMessageCircle,
    FiPhone,
    FiShield,
    FiTruck
} from "react-icons/fi";

import {
    Link
} from "react-router-dom";

import Container from "../../components/common/Container/Container";
import SectionHeader from "../../components/common/SectionHeader/SectionHeader";
import PageHero from "../../components/common/PageHero/PageHero";
import Button from "../../components/common/Button/Button";
import Loading from "../../components/common/Loading/Loading";
import ErrorState from "../../components/common/ErrorState/ErrorState";

import ShowroomGallery from "../../components/showroom/ShowroomGallery/ShowroomGallery";
import ServiceCard from "../../components/services/ServiceCard/ServiceCard";
import VehicleCard from "../../components/vehicles/VehicleCard/VehicleCard";

import {
    getShowroom
} from "../../services/showroom.service";

import {
    getPublicServices
} from "../../services/service.service";

import {
    getVehicles
} from "../../services/vehicle.service";

import styles from "./Showroom.module.css";

const Showroom = () => {
    const [showroom, setShowroom] = useState(null);
    const [services, setServices] = useState([]);
    const [vehicles, setVehicles] = useState([]);

    const [loading, setLoading] = useState(true);
    const [servicesLoading, setServicesLoading] = useState(true);
    const [vehiclesLoading, setVehiclesLoading] = useState(true);

    const [error, setError] = useState("");
    const [servicesError, setServicesError] = useState("");
    const [vehiclesError, setVehiclesError] = useState("");

    useEffect(() => {
        let active = true;

        const loadShowroom = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getShowroom();

                if (active) {
                    setShowroom(data);
                }
            } catch (requestError) {
                if (active) {
                    setError(
                        requestError.message ||
                            "Unable to load showroom information."
                    );
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        };

        loadShowroom();

        return () => {
            active = false;
        };
    }, []);

    useEffect(() => {
        let active = true;

        const loadServices = async () => {
            try {
                setServicesLoading(true);
                setServicesError("");

                const data =
                    await getPublicServices();

                if (!active) {
                    return;
                }

                const hierarchy =
                    Array.isArray(data)
                        ? data
                        : data?.services || [];

                setServices(hierarchy);
            } catch (requestError) {
                if (active) {
                    setServicesError(
                        requestError.message ||
                            "Unable to load services."
                    );
                }
            } finally {
                if (active) {
                    setServicesLoading(false);
                }
            }
        };

        loadServices();

        return () => {
            active = false;
        };
    }, []);

    useEffect(() => {
        let active = true;

        const loadVehicles = async () => {
            try {
                setVehiclesLoading(true);
                setVehiclesError("");

                const data = await getVehicles({
                    page: 1,
                    limit: 6,
                    published: true,
                    status: "available",
                    sort: "newest"
                });

                if (!active) {
                    return;
                }

                const list =
                    Array.isArray(data)
                        ? data
                        : data?.vehicles || [];

                setVehicles(list);
            } catch (requestError) {
                if (active) {
                    setVehiclesError(
                        requestError.message ||
                            "Unable to load current vehicles."
                    );
                }
            } finally {
                if (active) {
                    setVehiclesLoading(false);
                }
            }
        };

        loadVehicles();

        return () => {
            active = false;
        };
    }, []);

    const showroomImages = useMemo(() => {
        if (
            !Array.isArray(
                showroom?.showroomImages
            )
        ) {
            return [];
        }

        return [
            ...showroom.showroomImages
        ].sort(
            (a, b) =>
                Number(a?.order || 0) -
                Number(b?.order || 0)
        );
    }, [showroom]);

    const heroImage =
        showroomImages.find(
            (image) =>
                image?.type === "exterior"
        )?.url ||
        showroomImages.find(
            (image) =>
                image?.type === "front"
        )?.url ||
        showroomImages[0]?.url ||
        "";

    const galleryImages =
        showroomImages.filter(
            (image) =>
                image?.type !== "logo" &&
                image?.type !== "map"
        );

    const leafServices = useMemo(() => {
        const result = [];

        services.forEach(
            (category) => {
                const subcategories =
                    Array.isArray(
                        category?.children
                    )
                        ? category.children
                        : [];

                subcategories.forEach(
                    (subcategory) => {
                        const children =
                            Array.isArray(
                                subcategory?.children
                            )
                                ? subcategory.children
                                : [];

                        children.forEach(
                            (service) => {
                                result.push({
                                    ...service,
                                    categoryName:
                                        category?.name || "",
                                    subcategoryName:
                                        subcategory?.name || ""
                                });
                            }
                        );
                    }
                );
            }
        );

        return result;
    }, [services]);

    const facilities = useMemo(() => {
        const items = [];

        if (
            Array.isArray(
                showroom?.showroomFacilities
            )
        ) {
            showroom.showroomFacilities.forEach(
                (facility) => {
                    if (
                        facility &&
                        !items.some(
                            (item) =>
                                item.label ===
                                facility
                        )
                    ) {
                        items.push({
                            label: facility,
                            icon: FiCheckCircle
                        });
                    }
                }
            );
        }

        const booleanFacilities = [
            {
                key: "financeFacility",
                label: "Finance assistance",
                icon: FiCreditCard
            },
            {
                key: "insuranceAssistance",
                label: "Insurance assistance",
                icon: FiShield
            },
            {
                key: "rcTransferAssistance",
                label: "RC transfer assistance",
                icon: FiFileText
            },
            {
                key: "carExchangeFacility",
                label: "Car exchange facility",
                icon: FiTruck
            },
            {
                key: "testDriveFacility",
                label: "Test drive facility",
                icon: FiTruck
            },
            {
                key: "homeInspectionFacility",
                label: "Home inspection facility",
                icon: FiHome
            }
        ];

        booleanFacilities.forEach(
            ({
                key,
                label,
                icon
            }) => {
                if (
                    showroom?.[key] === true &&
                    !items.some(
                        (item) =>
                            item.label ===
                            label
                    )
                ) {
                    items.push({
                        label,
                        icon
                    });
                }
            }
        );

        if (
            showroom?.homeDeliveryFacility ===
            "available"
        ) {
            items.push({
                label: "Home delivery",
                icon: FiHome
            });
        }

        if (
            showroom?.homeDeliveryFacility ===
            "on-request"
        ) {
            items.push({
                label: "Home delivery on request",
                icon: FiHome
            });
        }

        return items;
    }, [showroom]);

    const businessName =
        showroom?.businessName ||
        "SV Old Car Choice";

    const ownerName =
        showroom?.ownerName || "";

    const address =
        showroom?.address || "";

    const phone =
        showroom?.phone || "";

    const whatsapp =
        showroom?.whatsapp || "";

    const email =
        showroom?.email || "";

    const businessTiming =
        showroom?.businessTiming || "";

    const establishmentYear =
        showroom?.establishmentYear;

    const companyIntro =
        showroom?.companyIntro || "";

    const mapUrl =
        showroom?.mapUrl || "";

    const logo =
        showroom?.logo ||
        showroomImages.find(
            (image) =>
                image?.type === "logo"
        )?.url ||
        "";

    const whatsappNumber =
        whatsapp || phone;

    const whatsappUrl =
        whatsappNumber
            ? `https://wa.me/${String(
                  whatsappNumber
              ).replace(/\D/g, "")}`
            : "";

    const heroDescription =
        companyIntro ||
        "Visit our showroom, explore available vehicles and connect with us for vehicle-related services.";

    const retryShowroom = async () => {
        try {
            setLoading(true);
            setError("");

            const data =
                await getShowroom();

            setShowroom(data);
        } catch (requestError) {
            setError(
                requestError.message ||
                    "Unable to load showroom information."
            );
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <main className={styles.page}>
                <div className={styles.loadingState}>
                    <Loading
                        size="large"
                        text="Loading showroom..."
                    />
                </div>
            </main>
        );
    }

    if (error && !showroom) {
        return (
            <main className={styles.page}>
                <div className={styles.stateSection}>
                    <Container>
                        <ErrorState
                            message={error}
                            onAction={
                                retryShowroom
                            }
                        />
                    </Container>
                </div>
            </main>
        );
    }

    return (
        <main className={styles.page}>
            <PageHero
                eyebrow="Visit Our Showroom"
                title={businessName}
                description={heroDescription}
                image={
                    heroImage ||
                    undefined
                }
                actions={
                    <>
                        {phone && (
                            <Button
                                href={`tel:${phone}`}
                                size="large"
                            >
                                <FiPhone />
                                Call Showroom
                            </Button>
                        )}

                        {whatsappUrl && (
                            <Button
                                href={whatsappUrl}
                                variant="outline"
                                size="large"
                            >
                                <FiMessageCircle />
                                WhatsApp
                            </Button>
                        )}
                    </>
                }
            />

            <section
                className={styles.introduction}
            >
                <Container>
                    <div
                        className={
                            styles.introGrid
                        }
                    >
                        <div
                            className={
                                styles.introContent
                            }
                        >
                            <span
                                className={
                                    styles.eyebrow
                                }
                            >
                                About The Showroom
                            </span>

                            <h2>
                                A place to explore
                                vehicles and connect
                                with our team.
                            </h2>

                            {companyIntro ? (
                                <p>
                                    {companyIntro}
                                </p>
                            ) : (
                                <p>
                                    Showroom
                                    information will
                                    appear here as it
                                    is configured by
                                    the administrator.
                                </p>
                            )}
                        </div>

                        <div
                            className={
                                styles.infoPanel
                            }
                        >
                            {ownerName && (
                                <div
                                    className={
                                        styles.infoItem
                                    }
                                >
                                    <span>
                                        Owner
                                    </span>

                                    <strong>
                                        {ownerName}
                                    </strong>
                                </div>
                            )}

                            {establishmentYear && (
                                <div
                                    className={
                                        styles.infoItem
                                    }
                                >
                                    <span>
                                        Established
                                    </span>

                                    <strong>
                                        {
                                            establishmentYear
                                        }
                                    </strong>
                                </div>
                            )}

                            {address && (
                                <div
                                    className={
                                        styles.infoItem
                                    }
                                >
                                    <span>
                                        Location
                                    </span>

                                    <strong>
                                        {address}
                                    </strong>
                                </div>
                            )}
                        </div>
                    </div>
                </Container>
            </section>

            {(address ||
                phone ||
                email ||
                businessTiming ||
                mapUrl) && (
                <section
                    className={
                        styles.detailsSection
                    }
                >
                    <Container>
                        <SectionHeader
                            eyebrow="Showroom Details"
                            title="Everything you need before visiting"
                            description="Check the available showroom information and use the available contact or location actions."
                        />

                        <div
                            className={
                                styles.detailsGrid
                            }
                        >
                            {address && (
                                <article
                                    className={
                                        styles.detailCard
                                    }
                                >
                                    <div
                                        className={
                                            styles.detailIcon
                                        }
                                    >
                                        <FiMapPin />
                                    </div>

                                    <span>
                                        Address
                                    </span>

                                    <strong>
                                        {address}
                                    </strong>

                                    {mapUrl && (
                                        <a
                                            href={
                                                mapUrl
                                            }
                                            target="_blank"
                                            rel="noreferrer"
                                            className={
                                                styles.textLink
                                            }
                                        >
                                            Open in Maps
                                            <FiArrowRight />
                                        </a>
                                    )}
                                </article>
                            )}

                            {businessTiming && (
                                <article
                                    className={
                                        styles.detailCard
                                    }
                                >
                                    <div
                                        className={
                                            styles.detailIcon
                                        }
                                    >
                                        <FiClock />
                                    </div>

                                    <span>
                                        Business Timing
                                    </span>

                                    <strong>
                                        {
                                            businessTiming
                                        }
                                    </strong>
                                </article>
                            )}

                            {phone && (
                                <article
                                    className={
                                        styles.detailCard
                                    }
                                >
                                    <div
                                        className={
                                            styles.detailIcon
                                        }
                                    >
                                        <FiPhone />
                                    </div>

                                    <span>
                                        Phone
                                    </span>

                                    <a
                                        href={`tel:${phone}`}
                                        className={
                                            styles.contactLink
                                        }
                                    >
                                        {phone}
                                    </a>
                                </article>
                            )}

                            {email && (
                                <article
                                    className={
                                        styles.detailCard
                                    }
                                >
                                    <div
                                        className={
                                            styles.detailIcon
                                        }
                                    >
                                        <FiFileText />
                                    </div>

                                    <span>
                                        Email
                                    </span>

                                    <a
                                        href={`mailto:${email}`}
                                        className={
                                            styles.contactLink
                                        }
                                    >
                                        {email}
                                    </a>
                                </article>
                            )}
                        </div>
                    </Container>
                </section>
            )}

            {galleryImages.length > 0 && (
                <section
                    className={
                        styles.gallerySection
                    }
                >
                    <Container>
                        <SectionHeader
                            eyebrow="Showroom Gallery"
                            title="Take a look around"
                            description="Explore the showroom images currently published by the administrator."
                        />

                        <ShowroomGallery
                            images={
                                galleryImages
                            }
                            title={
                                businessName
                            }
                        />
                    </Container>
                </section>
            )}

            {facilities.length > 0 && (
                <section
                    className={
                        styles.facilitiesSection
                    }
                >
                    <Container>
                        <SectionHeader
                            eyebrow="Showroom Facilities"
                            title="Convenience for your visit"
                            description="Facilities shown here are taken directly from the showroom settings."
                        />

                        <div
                            className={
                                styles.facilityGrid
                            }
                        >
                            {facilities.map(
                                (
                                    facility,
                                    index
                                ) => {
                                    const Icon =
                                        facility.icon ||
                                        FiCheckCircle;

                                    return (
                                        <article
                                            key={`${facility.label}-${index}`}
                                            className={
                                                styles.facilityCard
                                            }
                                        >
                                            <div
                                                className={
                                                    styles.facilityIcon
                                                }
                                            >
                                                <Icon />
                                            </div>

                                            <h3>
                                                {
                                                    facility.label
                                                }
                                            </h3>
                                        </article>
                                    );
                                }
                            )}
                        </div>
                    </Container>
                </section>
            )}

            <section
                className={
                    styles.servicesSection
                }
            >
                <Container>
                    <div
                        className={
                            styles.sectionHeadingRow
                        }
                    >
                        <SectionHeader
                            eyebrow="Our Services"
                            title="Services available through the showroom"
                            description="These services are loaded from the same service system used across the website."
                        />

                        <Link
                            to="/services"
                            className={
                                styles.viewAll
                            }
                        >
                            View all services
                            <FiArrowRight />
                        </Link>
                    </div>

                    {servicesLoading ? (
                        <div
                            className={
                                styles.inlineState
                            }
                        >
                            <Loading
                                text="Loading services..."
                            />
                        </div>
                    ) : servicesError ? (
                        <div
                            className={
                                styles.inlineState
                            }
                        >
                            <ErrorState
                                message={
                                    servicesError
                                }
                            />
                        </div>
                    ) : leafServices.length > 0 ? (
                        <div
                            className={
                                styles.serviceGrid
                            }
                        >
                            {leafServices
                                .slice(0, 6)
                                .map(
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
                    ) : (
                        <div
                            className={
                                styles.emptyState
                            }
                        >
                            <p>
                                No services are
                                currently
                                available.
                            </p>
                        </div>
                    )}
                </Container>
            </section>

            {vehiclesLoading ? (
                <section
                    className={
                        styles.inventorySection
                    }
                >
                    <Container>
                        <Loading
                            text="Loading current vehicles..."
                        />
                    </Container>
                </section>
            ) : vehiclesError ? (
                <section
                    className={
                        styles.inventorySection
                    }
                >
                    <Container>
                        <ErrorState
                            message={
                                vehiclesError
                            }
                        />
                    </Container>
                </section>
            ) : vehicles.length > 0 ? (
                <section
                    className={
                        styles.inventorySection
                    }
                >
                    <Container>
                        <div
                            className={
                                styles.sectionHeadingRow
                            }
                        >
                            <SectionHeader
                                eyebrow="Current Inventory"
                                title="Vehicles currently available"
                                description="Browse vehicles currently published in the showroom inventory."
                            />

                            <Link
                                to="/inventory"
                                className={
                                    styles.viewAll
                                }
                            >
                                View all cars
                                <FiArrowRight />
                            </Link>
                        </div>

                        <div
                            className={
                                styles.vehicleGrid
                            }
                        >
                            {vehicles.map(
                                (vehicle) => (
                                    <VehicleCard
                                        key={
                                            vehicle._id ||
                                            vehicle.id ||
                                            vehicle.slug
                                        }
                                        vehicle={
                                            vehicle
                                        }
                                    />
                                )
                            )}
                        </div>
                    </Container>
                </section>
            ) : null}

            {(phone ||
                whatsappUrl ||
                email) && (
                <section
                    className={
                        styles.contactSection
                    }
                >
                    <Container>
                        <div
                            className={
                                styles.contactInner
                            }
                        >
                            <div>
                                <span>
                                    Get in touch
                                </span>

                                <h2>
                                    Ready to visit
                                    the showroom?
                                </h2>

                                <p>
                                    Contact us
                                    through the
                                    available
                                    channel or
                                    browse our
                                    current
                                    inventory.
                                </p>
                            </div>

                            <div
                                className={
                                    styles.contactActions
                                }
                            >
                                {phone && (
                                    <Button
                                        href={`tel:${phone}`}
                                        variant="secondary"
                                        size="large"
                                    >
                                        <FiPhone />
                                        Call
                                    </Button>
                                )}

                                {whatsappUrl && (
                                    <Button
                                        href={
                                            whatsappUrl
                                        }
                                        variant="secondary"
                                        size="large"
                                    >
                                        <FiMessageCircle />
                                        WhatsApp
                                    </Button>
                                )}

                                {email && (
                                    <Button
                                        href={`mailto:${email}`}
                                        variant="outline"
                                        size="large"
                                    >
                                        Email Us
                                    </Button>
                                )}
                            </div>
                        </div>
                    </Container>
                </section>
            )}
        </main>
    );
};

export default Showroom;
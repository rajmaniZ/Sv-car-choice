import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
    FiArrowLeft,
    FiCalendar,
    FiCheckCircle,
    FiClock,
    FiEdit3,
    FiMapPin,
    FiPhone,
    FiRefreshCw,
    FiShare2,
    FiShield,
    FiTag
} from "react-icons/fi";
import WhatsAppButton from "../../components/common/WhatsAppButton/WhatsAppButton";

import Container from "../../components/common/Container/Container";
import Button from "../../components/common/Button/Button";
import Loading from "../../components/common/Loading/Loading";
import ErrorState from "../../components/common/ErrorState/ErrorState";
import Modal from "../../components/common/Modal/Modal";

import VehicleGallery from "../../components/vehicles/VehicleGallery/VehicleGallery";
import VehicleSpecs from "../../components/vehicles/VehicleSpecs/VehicleSpecs";
import VehicleActions from "../../components/vehicles/VehicleActions/VehicleActions";
import SimilarVehicles from "../../components/vehicles/SimilarVehicles/SimilarVehicles";

import TestDriveForm from "../../components/forms/TestDriveForm/TestDriveForm";

import { getVehicleBySlug } from "../../services/vehicle.service";

import { useSite } from "../../context/SiteContext";

import formatCurrency from "../../utils/formatCurrency";



import styles from "./VehicleDetails.module.css";

const VehicleDetails = () => {
    const { slug } = useParams();
    const { site } = useSite();

    const [vehicle, setVehicle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [testDriveOpen, setTestDriveOpen] =
        useState(false);

    useEffect(() => {
        let active = true;

        const loadVehicle = async () => {
            try {
                setLoading(true);
                setError("");

                const data =
                    await getVehicleBySlug(slug);

                if (active) {
                    setVehicle(data);
                }
            } catch (requestError) {
                if (active) {
                    setError(
                        requestError.message ||
                            "Unable to load vehicle details."
                    );
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        };

        if (slug) {
            loadVehicle();
        }

        return () => {
            active = false;
        };
    }, [slug]);

    const handleShare = async () => {
        const shareData = {
            title:
                vehicle?.title ||
                vehicle?.name ||
                "Used Car",
            text:
                vehicle?.title ||
                vehicle?.name ||
                "Check this vehicle",
            url: window.location.href
        };

        try {
            if (
                navigator.share &&
                typeof navigator.share === "function"
            ) {
                await navigator.share(shareData);
                return;
            }

            await navigator.clipboard.writeText(
                window.location.href
            );
        } catch {
            // User cancelled sharing or clipboard is unavailable.
        }
    };

    const handleTestDriveSuccess = () => {
        setTestDriveOpen(false);
    };

    if (loading) {
        return (
            <main className={styles.page}>
                <Container>
                    <div className={styles.loading}>
                        <Loading />
                    </div>
                </Container>
            </main>
        );
    }

    if (error || !vehicle) {
        return (
            <main className={styles.page}>
                <Container>
                    <div className={styles.error}>
                        <ErrorState
                            message={
                                error ||
                                "Vehicle not found."
                            }
                        />

                        <Button
                            href="/inventory"
                            variant="outline"
                        >
                            <FiArrowLeft />
                            Back to Inventory
                        </Button>
                    </div>
                </Container>
            </main>
        );
    }

    const name =
        vehicle.title ||
        vehicle.name ||
        [
            vehicle.brand,
            vehicle.model,
            vehicle.variant
        ]
            .filter(Boolean)
            .join(" ");

    const price =
        vehicle.price !== undefined &&
        vehicle.price !== null
            ? formatCurrency(vehicle.price)
            : "Price on request";

    const location =
        vehicle.location ||
        site?.address?.line ||
        "SV Old Car Choice";

    return (
        <main className={styles.page}>
            <section className={styles.topBar}>
                <Container>
                    <Link
                        to="/inventory"
                        className={styles.backLink}
                    >
                        <FiArrowLeft />
                        Back to Inventory
                    </Link>
                    <WhatsAppButton
    label="Enquire on WhatsApp"
    type="Vehicle"
    title={`${vehicle.brand} ${vehicle.model}`}
    slug={vehicle.slug}
    details={{
        brand: vehicle.brand,
        model: vehicle.model,
        variant: vehicle.variant,
        modelYear: vehicle.modelYear,
        registrationYear:
            vehicle.registrationYear,
        fuel: vehicle.fuel,
        transmission:
            vehicle.transmission,
        mileage: vehicle.mileage,
        ownership:
            vehicle.ownership,
        colour: vehicle.colour,
        price: vehicle.price,
        status: vehicle.status,
        location:
            vehicle.location
    }}
/>
                </Container>
            </section>

            <section className={styles.details}>
                <Container>
                    <div className={styles.mainGrid}>
                        <div className={styles.gallery}>
                            <VehicleGallery
                                vehicle={vehicle}
                            />
                        </div>

                        <div className={styles.info}>
                            <div
                                className={
                                    styles.infoHeader
                                }
                            >
                                <div>
                                    <span
                                        className={
                                            styles.available
                                        }
                                    >
                                        <FiCheckCircle />
                                        Available
                                    </span>

                                    <h1>{name}</h1>

                                    {vehicle.variant && (
                                        <p
                                            className={
                                                styles.variant
                                            }
                                        >
                                            {
                                                vehicle.variant
                                            }
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="button"
                                    className={
                                        styles.shareButton
                                    }
                                    onClick={
                                        handleShare
                                    }
                                    aria-label="Share vehicle"
                                >
                                    <FiShare2 />
                                </button>
                            </div>

                            <div
                                className={
                                    styles.price
                                }
                            >
                                {price}
                            </div>

                            <div
                                className={
                                    styles.summary
                                }
                            >
                                {vehicle.year && (
                                    <div>
                                        <FiCalendar />
                                        <span>
                                            <small>
                                                Year
                                            </small>

                                            <strong>
                                                {
                                                    vehicle.year
                                                }
                                            </strong>
                                        </span>
                                    </div>
                                )}

                                {vehicle.km !==
                                    undefined && (
                                    <div>
                                        <FiRefreshCw />
                                        <span>
                                            <small>
                                                KM Driven
                                            </small>

                                            <strong>
                                                {
                                                    vehicle.km
                                                }
                                            </strong>
                                        </span>
                                    </div>
                                )}

                                {vehicle.fuel && (
                                    <div>
                                        <FiTag />
                                        <span>
                                            <small>
                                                Fuel
                                            </small>

                                            <strong>
                                                {
                                                    vehicle.fuel
                                                }
                                            </strong>
                                        </span>
                                    </div>
                                )}

                                {vehicle.transmission && (
                                    <div>
                                        <FiEdit3 />
                                        <span>
                                            <small>
                                                Transmission
                                            </small>

                                            <strong>
                                                {
                                                    vehicle.transmission
                                                }
                                            </strong>
                                        </span>
                                    </div>
                                )}
                            </div>

                            <VehicleActions
                                vehicle={vehicle}
                            />

                            <div
                                className={
                                    styles.quickInfo
                                }
                            >
                                <div>
                                    <FiShield />
                                    <span>
                                        Vehicle enquiry
                                        support
                                    </span>
                                </div>

                                <div>
                                    <FiClock />
                                    <span>
                                        Test drive
                                        available
                                    </span>
                                </div>

                                <div>
                                    <FiMapPin />
                                    <span>
                                        {location}
                                    </span>
                                </div>
                            </div>

                            {site?.contact?.phone && (
                                <a
                                    href={`tel:${site.contact.phone}`}
                                    className={
                                        styles.phoneLink
                                    }
                                >
                                    <FiPhone />
                                    Call showroom
                                </a>
                            )}
                        </div>
                    </div>
                </Container>
            </section>

            <section className={styles.specSection}>
                <Container>
                    <div className={styles.specLayout}>
                        <div>
                            <div
                                className={
                                    styles.sectionHeading
                                }
                            >
                                <span>
                                    Vehicle Information
                                </span>

                                <h2>
                                    Specifications
                                </h2>
                            </div>

                            <VehicleSpecs
                                vehicle={vehicle}
                            />
                        </div>

                        <div
                            className={
                                styles.enquiryCard
                            }
                        >
                            <FiPhone />

                            <h3>
                                Interested in this car?
                            </h3>

                            <p>
                                Send an enquiry or contact
                                the showroom to know more
                                about this vehicle.
                            </p>

                            <Button
                                href={`/contact?vehicle=${encodeURIComponent(
                                    name
                                )}`}
                                fullWidth
                            >
                                Enquire Now
                            </Button>

                            <Button
                                type="button"
                                variant="outline"
                                fullWidth
                                onClick={() =>
                                    setTestDriveOpen(
                                        true
                                    )
                                }
                            >
                                Book Test Drive
                            </Button>
                        </div>
                    </div>
                </Container>
            </section>

            <section className={styles.similar}>
                <Container>
                    <div
                        className={
                            styles.sectionHeading
                        }
                    >
                        <span>
                            More Options
                        </span>

                        <h2>
                            Similar Vehicles
                        </h2>
                    </div>

                    <SimilarVehicles
                        vehicle={vehicle}
                    />
                </Container>
            </section>

            <Modal
                isOpen={testDriveOpen}
                onClose={() =>
                    setTestDriveOpen(false)
                }
                title="Book a Test Drive"
            >
                <TestDriveForm
                    vehicle={vehicle}
                    onSuccess={
                        handleTestDriveSuccess
                    }
                />
            </Modal>
        </main>
    );
};

export default VehicleDetails;
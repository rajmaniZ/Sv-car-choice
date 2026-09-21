import { useEffect, useState } from "react";
import {
    FiClock,
    FiMail,
    FiMapPin,
    FiMessageCircle,
    FiPhone,
    FiSend
} from "react-icons/fi";

import Container from "../../components/common/Container/Container";
import SectionHeader from "../../components/common/SectionHeader/SectionHeader";
import Button from "../../components/common/Button/Button";
import Loading from "../../components/common/Loading/Loading";
import ErrorState from "../../components/common/ErrorState/ErrorState";
import LeadForm from "../../components/forms/LeadForm/LeadForm";

import { getShowroom } from "../../services/showroom.service";
import { useSite } from "../../context/SiteContext";

import PageHero from "../../components/common/PageHero/PageHero";
import styles from "./Contact.module.css";

const Contact = () => {
    const { site } = useSite();

    const [showroom, setShowroom] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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

    const contact =
        showroom?.contact ||
        site?.contact ||
        {};

    const address =
        showroom?.address ||
        site?.address ||
        {};

    const hours =
        showroom?.hours ||
        site?.hours ||
        {};

    const phone = contact.phone || "";
    const whatsapp = contact.whatsapp || "";
    const email = contact.email || "";

    const addressText =
        address.line ||
        "Infront of Krishna Hyundai";

    const getWhatsAppUrl = () => {
        const number = whatsapp || phone;

        if (!number) {
            return "";
        }

        const cleaned =
            number.replace(/\D/g, "");

        return `https://wa.me/${cleaned}`;
    };

    return (
        <main className={styles.page}>
            <PageHero
                eyebrow="Contact Us"
                title="Let&apos;s talk about your next vehicle."
                description="Have a question about a car, test drive, selling, exchange or another service? Send an enquiry or use the available contact channels."
                actions={
                    <>
                        <Button href="#contact-form" size="large">
                            Send An Enquiry
                        </Button>

                        <Button href="/inventory" variant="outline" size="large">
                            Browse Cars
                        </Button>
                        <Button href="/showroom" size="large">
                            Tour Our Showroom 
                        </Button>
                    </>
                }
            />

            <section id="contact-form" className={styles.content}>
                <Container>
                    <div className={styles.grid}>
                        <div className={styles.formColumn}>
                            <SectionHeader
                                eyebrow="Send An Enquiry"
                                title="How can we help?"
                                description="Fill in your details and message. The showroom can use your enquiry to follow up with you."
                            />

                            <LeadForm />
                        </div>

                        <aside className={styles.infoColumn}>
                            <div
                                className={
                                    styles.infoCard
                                }
                            >
                                <div
                                    className={
                                        styles.cardIcon
                                    }
                                >
                                    <FiMapPin />
                                </div>

                                <h3>
                                    Showroom
                                </h3>

                                <p>
                                    {addressText}
                                </p>
                            </div>

                            {phone && (
                                <div
                                    className={
                                        styles.infoCard
                                    }
                                >
                                    <div
                                        className={
                                            styles.cardIcon
                                        }
                                    >
                                        <FiPhone />
                                    </div>

                                    <h3>
                                        Phone
                                    </h3>

                                    <a
                                        href={`tel:${phone}`}
                                    >
                                        {phone}
                                    </a>
                                </div>
                            )}

                            {email && (
                                <div
                                    className={
                                        styles.infoCard
                                    }
                                >
                                    <div
                                        className={
                                            styles.cardIcon
                                        }
                                    >
                                        <FiMail />
                                    </div>

                                    <h3>
                                        Email
                                    </h3>

                                    <a
                                        href={`mailto:${email}`}
                                    >
                                        {email}
                                    </a>
                                </div>
                            )}

                            {getWhatsAppUrl() && (
                                <div
                                    className={
                                        styles.infoCard
                                    }
                                >
                                    <div
                                        className={
                                            styles.cardIcon
                                        }
                                    >
                                        <FiMessageCircle />
                                    </div>

                                    <h3>
                                        WhatsApp
                                    </h3>

                                    <a
                                        href={getWhatsAppUrl()}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Start a conversation
                                    </a>
                                </div>
                            )}

                            <div
                                className={
                                    styles.hoursCard
                                }
                            >
                                <div
                                    className={
                                        styles.hoursTitle
                                    }
                                >
                                    <FiClock />

                                    <h3>
                                        Business Hours
                                    </h3>
                                </div>

                                {loading ? (
                                    <Loading />
                                ) : error ? (
                                    <ErrorState
                                        message={error}
                                    />
                                ) : (
                                    <div
                                        className={
                                            styles.hoursList
                                        }
                                    >
                                        {Object.entries(
                                            hours
                                        ).map(
                                            ([
                                                day,
                                                value
                                            ]) =>
                                                value ? (
                                                    <div
                                                        key={
                                                            day
                                                        }
                                                    >
                                                        <span>
                                                            {day}
                                                        </span>

                                                        <strong>
                                                            {
                                                                value
                                                            }
                                                        </strong>
                                                    </div>
                                                ) : null
                                        )}
                                    </div>
                                )}
                            </div>
                        </aside>
                    </div>
                </Container>
            </section>

            <section className={styles.mapSection}>
                <Container>
                    <div className={styles.mapCard}>
                        <div>
                            <FiMapPin />

                            <h2>
                                Visit the showroom
                            </h2>

                            <p>
                                {addressText}
                            </p>
                        </div>

                        <Button
                            href="/inventory"
                            variant="secondary"
                        >
                            Browse Cars
                            <FiSend />
                        </Button>
                    </div>
                </Container>
            </section>
        </main>
    );
};

export default Contact;


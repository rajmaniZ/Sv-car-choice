import {
    FiAward,
    FiCheckCircle,
    FiShield,
    FiUsers
} from "react-icons/fi";

import Container from "../../components/common/Container/Container";
import SectionHeader from "../../components/common/SectionHeader/SectionHeader";
import Button from "../../components/common/Button/Button";

import { useSite } from "../../context/SiteContext";

import PageHero from "../../components/common/PageHero/PageHero";
import styles from "./About.module.css";

const About = () => {
    const { site } = useSite();

    const businessName =
        site?.name || "SV Old Car Choice";

    const owner =
        site?.owner || "Sunil Kumar Gupta";

    const establishment =
        site?.business?.establishment ||
        "14 years";

    return (
        <main className={styles.page}>
            <PageHero
                eyebrow={`About ${businessName}`}
                title="A local showroom focused on making used-car transactions straightforward."
                description={`${businessName} provides customers with a convenient way to explore, enquire about, sell and exchange vehicles.`}
                actions={
                    <>
                        <Button href="/inventory" size="large">
                            Browse Cars
                        </Button>

                        <Button href="/contact" variant="outline" size="large">
                            Contact Us
                        </Button>
                    </>
                }
            />

            <section className={styles.intro}>
                <Container>
                    <div className={styles.introGrid}>
                        <div>
                            <SectionHeader
                                eyebrow="Our Story"
                                title="Built around used-car customers"
                                description={`With ${establishment} of business experience, ${businessName} serves customers looking for vehicles from multiple brands.`}
                            />

                            <p
                                className={
                                    styles.longText
                                }
                            >
                                The showroom is owned by{" "}
                                <strong>
                                    {owner}
                                </strong>{" "}
                                and is located at{" "}
                                <strong>
                                    {site?.address?.line ||
                                        "Infront of Krishna Hyundai"}
                                </strong>
                                .
                            </p>

                            <p
                                className={
                                    styles.longText
                                }
                            >
                                Customers can use the
                                platform to browse available
                                vehicles, submit enquiries,
                                request test drives, sell
                                their cars and explore
                                exchange options.
                            </p>

                            <div
                                className={
                                    styles.actions
                                }
                            >
                                <Button href="/inventory">
                                    Browse Cars
                                </Button>

                                <Button
                                    href="/contact"
                                    variant="outline"
                                >
                                    Contact Us
                                </Button>
                            </div>
                        </div>

                        <div
                            className={
                                styles.statsPanel
                            }
                        >
                            <div>
                                <FiAward />
                                <strong>
                                    {establishment}
                                </strong>
                                <span>
                                    Business experience
                                </span>
                            </div>

                            <div>
                                <FiShield />
                                <strong>
                                    Multi-brand
                                </strong>
                                <span>
                                    Vehicle options
                                </span>
                            </div>

                            <div>
                                <FiUsers />
                                <strong>
                                    Customer
                                </strong>
                                <span>
                                    Focused service
                                </span>
                            </div>

                            <div>
                                <FiCheckCircle />
                                <strong>
                                    Online
                                </strong>
                                <span>
                                    Enquiry support
                                </span>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            <section className={styles.values}>
                <Container>
                    <SectionHeader
                        eyebrow="What Matters To Us"
                        title="Our approach"
                        description="The platform is designed around practical services that help customers through different stages of a vehicle transaction."
                    />

                    <div className={styles.valueGrid}>
                        <article>
                            <div>
                                <FiShield />
                            </div>

                            <h3>
                                Clear Information
                            </h3>

                            <p>
                                Vehicle information is
                                presented so customers can
                                review available options
                                before making an enquiry.
                            </p>
                        </article>

                        <article>
                            <div>
                                <FiUsers />
                            </div>

                            <h3>
                                Customer Convenience
                            </h3>

                            <p>
                                Enquiries, test drives,
                                selling and exchange
                                requests can be started
                                online.
                            </p>
                        </article>

                        <article>
                            <div>
                                <FiCheckCircle />
                            </div>

                            <h3>
                                Simple Communication
                            </h3>

                            <p>
                                Customers can connect with
                                the showroom through the
                                available contact channels.
                            </p>
                        </article>

                        <article>
                            <div>
                                <FiAward />
                            </div>

                            <h3>
                                Multi-brand Choice
                            </h3>

                            <p>
                                The showroom deals in cars
                                from different brands,
                                giving customers more
                                vehicle options.
                            </p>
                        </article>
                    </div>
                </Container>
            </section>

            <section className={styles.cta}>
                <Container>
                    <div className={styles.ctaInner}>
                        <div>
                            <span>
                                Looking for a used car?
                            </span>

                            <h2>
                                Explore the current
                                inventory.
                            </h2>
                        </div>

                        <Button
                            href="/inventory"
                            variant="secondary"
                            size="large"
                        >
                            View Inventory
                        </Button>
                    </div>
                </Container>
            </section>
        </main>
    );
};

export default About;

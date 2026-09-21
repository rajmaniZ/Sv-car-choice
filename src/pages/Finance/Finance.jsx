import {
    FiCheckCircle,
    FiFileText,
    FiHelpCircle,
    FiPhone,
    FiShield
} from "react-icons/fi";

import Container from "../../components/common/Container/Container";
import SectionHeader from "../../components/common/SectionHeader/SectionHeader";
import Button from "../../components/common/Button/Button";

import PageHero from "../../components/common/PageHero/PageHero";
import styles from "./Finance.module.css";

const Finance = () => {
    return (
        <main className={styles.page}>
            <PageHero
                eyebrow="Vehicle Finance"
                title="Understand your finance options before buying."
                description="If you are planning to finance your used-car purchase, contact SV Old Car Choice to discuss the available options and process."
                actions={
                    <>
                        <Button href="/inventory" size="large">
                            Browse Cars
                        </Button>

                        <Button href="/contact" variant="outline" size="large">
                            Contact Showroom
                        </Button>
                    </>
                }
            />

            <section className={styles.overview}>
                <Container>
                    <SectionHeader
                        eyebrow="Finance Support"
                        title="Start with the vehicle, then discuss financing"
                        description="Finance availability, eligibility, documentation and terms depend on the applicable financing provider and customer circumstances."
                    />

                    <div className={styles.cardGrid}>
                        <article>
                            <div>
                                <FiHelpCircle />
                            </div>

                            <h3>
                                Ask About Options
                            </h3>

                            <p>
                                Contact the showroom to
                                understand what finance
                                options may be available
                                for the vehicle you select.
                            </p>
                        </article>

                        <article>
                            <div>
                                <FiFileText />
                            </div>

                            <h3>
                                Documentation
                            </h3>

                            <p>
                                Ask about the documents and
                                information required for the
                                applicable finance process.
                            </p>
                        </article>

                        <article>
                            <div>
                                <FiShield />
                            </div>

                            <h3>
                                Review Terms
                            </h3>

                            <p>
                                Review applicable interest,
                                tenure, fees and other terms
                                before accepting a finance
                                arrangement.
                            </p>
                        </article>
                    </div>
                </Container>
            </section>

            <section className={styles.process}>
                <Container>
                    <SectionHeader
                        eyebrow="Typical Steps"
                        title="How to get started"
                        description="The exact process may vary depending on the financing provider."
                    />

                    <div className={styles.steps}>
                        <article>
                            <span>01</span>
                            <FiCheckCircle />

                            <h3>
                                Select a vehicle
                            </h3>

                            <p>
                                Browse the inventory and
                                identify the vehicle you are
                                interested in.
                            </p>
                        </article>

                        <article>
                            <span>02</span>
                            <FiPhone />

                            <h3>
                                Contact the showroom
                            </h3>

                            <p>
                                Ask about the applicable
                                finance process for the
                                selected vehicle.
                            </p>
                        </article>

                        <article>
                            <span>03</span>
                            <FiFileText />

                            <h3>
                                Complete requirements
                            </h3>

                            <p>
                                Provide the required
                                information and documents to
                                the relevant provider.
                            </p>
                        </article>

                        <article>
                            <span>04</span>
                            <FiShield />

                            <h3>
                                Review before accepting
                            </h3>

                            <p>
                                Carefully review the final
                                finance terms before
                                proceeding.
                            </p>
                        </article>
                    </div>
                </Container>
            </section>

            <section className={styles.notice}>
                <Container>
                    <div className={styles.noticeInner}>
                        <FiHelpCircle />

                        <div>
                            <h2>
                                Need help choosing a car?
                            </h2>

                            <p>
                                Browse available vehicles
                                first, then contact the
                                showroom about your preferred
                                option.
                            </p>
                        </div>

                        <Button
                            href="/inventory"
                            variant="secondary"
                        >
                            View Cars
                        </Button>
                    </div>
                </Container>
            </section>
        </main>
    );
};

export default Finance;

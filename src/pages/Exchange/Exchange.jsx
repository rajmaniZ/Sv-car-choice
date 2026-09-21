import {
    FiArrowRight,
    FiCheckCircle,
    FiRefreshCw,
    FiShield,
    FiTruck
} from "react-icons/fi";

import Container from "../../components/common/Container/Container";
import SectionHeader from "../../components/common/SectionHeader/SectionHeader";
import ExchangeCarForm from "../../components/forms/ExchangeCarForm/ExchangeCarForm";

import PageHero from "../../components/common/PageHero/PageHero";
import styles from "./Exchange.module.css";

const Exchange = () => {
    return (
        <main className={styles.page}>
            <PageHero
                eyebrow="Car Exchange"
                title="Exchange your current car for another vehicle."
                description="Share details about your existing vehicle and the car you are interested in. SV Old Car Choice can review your exchange request."
            >
                <div className={styles.points}>
                    <div>
                        <FiRefreshCw />
                        <span>Existing car evaluation request</span>
                    </div>

                    <div>
                        <FiTruck />
                        <span>Choose another vehicle</span>
                    </div>

                    <div>
                        <FiShield />
                        <span>Simple enquiry process</span>
                    </div>
                </div>
            </PageHero>

            <section className={styles.formSection}>
                <Container>
                    <div className={styles.formLayout}>
                        <div>
                            <SectionHeader
                                eyebrow="Exchange Request"
                                title="Tell us about both cars"
                                description="Provide your current vehicle details and information about the vehicle you want to exchange it for."
                            />

                            <ExchangeCarForm />
                        </div>

                        <aside
                            className={
                                styles.sidePanel
                            }
                        >
                            <h3>
                                Exchange checklist
                            </h3>

                            <ul>
                                <li>
                                    <FiCheckCircle />
                                    <span>
                                        Enter accurate
                                        details of your
                                        current car.
                                    </span>
                                </li>

                                <li>
                                    <FiCheckCircle />
                                    <span>
                                        Add photographs
                                        where requested.
                                    </span>
                                </li>

                                <li>
                                    <FiCheckCircle />
                                    <span>
                                        Mention the vehicle
                                        you are interested
                                        in.
                                    </span>
                                </li>

                                <li>
                                    <FiCheckCircle />
                                    <span>
                                        Keep your contact
                                        details available
                                        for follow-up.
                                    </span>
                                </li>
                            </ul>
                        </aside>
                    </div>
                </Container>
            </section>

            <section className={styles.bottomCta}>
                <Container>
                    <div>
                        <span>
                            Want to sell instead?
                        </span>

                        <h2>
                            Submit your car for sale.
                        </h2>
                    </div>

                    <a href="/sell-your-car">
                        Sell Your Car
                        <FiArrowRight />
                    </a>
                </Container>
            </section>
        </main>
    );
};

export default Exchange;


import {
    FiArrowRight,
    FiCamera,
    FiCheckCircle,
    FiDollarSign,
    FiRefreshCw
} from "react-icons/fi";

import Container from "../../components/common/Container/Container";
import SectionHeader from "../../components/common/SectionHeader/SectionHeader";
import SellCarForm from "../../components/forms/SellCarForm/SellCarForm";

import PageHero from "../../components/common/PageHero/PageHero";
import styles from "./SellYourCar.module.css";

const SellYourCar = () => {
    return (
        <main className={styles.page}>
            <PageHero
                eyebrow="Sell Your Car"
                title="Looking to sell your used car?"
                description="Submit your vehicle information and let SV Old Car Choice know that you want to sell your car."
            >
                <div className={styles.heroPoints}>
                    <div>
                        <FiCheckCircle />
                        <span>Share basic vehicle details</span>
                    </div>

                    <div>
                        <FiCamera />
                        <span>Add vehicle images</span>
                    </div>

                    <div>
                        <FiDollarSign />
                        <span>Submit your selling request</span>
                    </div>
                </div>
            </PageHero>

            <section className={styles.formSection}>
                <Container>
                    <div className={styles.formLayout}>
                        <div>
                            <SectionHeader
                                eyebrow="Vehicle Details"
                                title="Tell us about your car"
                                description="Provide accurate information so the showroom can review your selling request."
                            />

                            <SellCarForm />
                        </div>

                        <aside
                            className={
                                styles.sidePanel
                            }
                        >
                            <h3>
                                Before you submit
                            </h3>

                            <ul>
                                <li>
                                    <FiCheckCircle />
                                    <span>
                                        Keep your vehicle
                                        information
                                        accurate.
                                    </span>
                                </li>

                                <li>
                                    <FiCheckCircle />
                                    <span>
                                        Upload clear
                                        photographs of
                                        the car.
                                    </span>
                                </li>

                                <li>
                                    <FiCheckCircle />
                                    <span>
                                        Add your current
                                        contact details.
                                    </span>
                                </li>

                                <li>
                                    <FiCheckCircle />
                                    <span>
                                        The showroom can
                                        contact you after
                                        reviewing the
                                        request.
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
                            Looking for another option?
                        </span>

                        <h2>
                            Exchange your car instead.
                        </h2>
                    </div>

                    <a href="/exchange">
                        Explore Exchange
                        <FiArrowRight />
                    </a>
                </Container>
            </section>
        </main>
    );
};

export default SellYourCar;


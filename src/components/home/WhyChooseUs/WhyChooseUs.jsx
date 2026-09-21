import {
    FiAward,
    FiCheckCircle,
    FiHeart,
    FiShield,
    FiUsers
} from "react-icons/fi";

import Container from "../../common/Container/Container";
import SectionHeader from "../../common/SectionHeader/SectionHeader";

import { useSite } from "../../../context/SiteContext";

import styles from "./WhyChooseUs.module.css";

const WhyChooseUs = () => {
    const { site } = useSite();

    const establishment =
        site?.business?.establishment ||
        "14 years";

    const features = [
        {
            icon: FiShield,
            title: "Straightforward Process",
            text: "Clear communication from enquiry to vehicle selection and follow-up."
        },
        {
            icon: FiAward,
            title: "Used Car Experience",
            text: `Serving customers with ${establishment} of business experience.`
        },
        {
            icon: FiUsers,
            title: "All Brand Cars",
            text: "Explore vehicles across different manufacturers and price ranges."
        },
        {
            icon: FiHeart,
            title: "Customer Focused",
            text: "We focus on understanding your requirements before suggesting options."
        }
    ];

    return (
        <section className={styles.section}>
            <Container>
                <div className={styles.layout}>
                    <div className={styles.intro}>
                        <SectionHeader
                            eyebrow="Why SV Old Car Choice"
                            title="A simpler way to deal with used cars"
                            description="Whether you are buying, selling or exchanging, our goal is to make every interaction clear and convenient."
                        />

                        <div
                            className={
                                styles.experience
                            }
                        >
                            <strong>
                                {establishment}
                            </strong>

                            <span>
                                of business experience
                            </span>
                        </div>
                    </div>

                    <div className={styles.features}>
                        {features.map(
                            ({
                                icon: Icon,
                                title,
                                text
                            }) => (
                                <article
                                    key={title}
                                    className={
                                        styles.feature
                                    }
                                >
                                    <div
                                        className={
                                            styles.icon
                                        }
                                    >
                                        <Icon />
                                    </div>

                                    <div>
                                        <h3>
                                            {title}
                                        </h3>

                                        <p>
                                            {text}
                                        </p>
                                    </div>
                                </article>
                            )
                        )}
                    </div>
                </div>

                <div className={styles.bottom}>
                    <div>
                        <FiCheckCircle />

                        <span>
                            Buy with confidence
                        </span>
                    </div>

                    <div>
                        <FiCheckCircle />

                        <span>
                            Sell with convenience
                        </span>
                    </div>

                    <div>
                        <FiCheckCircle />

                        <span>
                            Exchange with flexibility
                        </span>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default WhyChooseUs;
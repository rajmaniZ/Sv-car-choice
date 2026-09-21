import { FiArrowRight, FiCheckCircle, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

import PageHero from "../../common/PageHero/PageHero";
import { useSite } from "../../../context/SiteContext";
import styles from "./Hero.module.css";

const Hero = () => {
    const { site } = useSite();

    const businessName =
        site?.name || "SV Old Car Choice";

    const establishment =
        site?.business?.establishment || "14 years";

    return (
        <PageHero
            eyebrow="Pre-Owned Cars | Trusted Deals | A Better Tomorrow"
            title={
                <>
                    Drive Your
                    <span className={styles.accent}>Next Chapter</span>
                </>
            }
            description="Quality pre-owned cars, transparent deals and a team that puts you first."
            actions={
                <>
                    <Link to="/inventory" className={styles.primaryAction}>
                        <FiSearch />
                        <span>Browse Our Cars</span>
                        <FiArrowRight />
                    </Link>

                    <Link to="/test-drive" className={styles.secondaryAction}>
                        <span>Book a Test Drive</span>
                    </Link>
                </>
            }
        >
            <div className={styles.trustStrip}>
                <div>
                    <FiCheckCircle />
                    <span>
                        <strong>{establishment}</strong>
                        <small>Business experience</small>
                    </span>
                </div>

                <div>
                    <FiCheckCircle />
                    <span>
                        <strong>All brand cars</strong>
                        <small>More vehicle options</small>
                    </span>
                </div>

                <div>
                    <FiCheckCircle />
                    <span>
                        <strong>{businessName}</strong>
                        <small>Driven by trust</small>
                    </span>
                </div>
            </div>
        </PageHero>
    );
};

export default Hero;

import { FiFileText } from "react-icons/fi";

import Container from "../../components/common/Container/Container";

import { useSite } from "../../context/SiteContext";

import styles from "./Terms.module.css";

const Terms = () => {
    const { site } = useSite();

    const businessName =
        site?.name || "SV Old Car Choice";

    return (
        <main className={styles.page}>
            <section className={styles.hero}>
                <Container>
                    <FiFileText />

                    <span>
                        Legal
                    </span>

                    <h1>
                        Terms & Conditions
                    </h1>

                    <p>
                        General terms for using the
                        {` ${businessName}`} website and
                        submitting requests through it.
                    </p>
                </Container>
            </section>

            <section className={styles.content}>
                <Container>
                    <div className={styles.document}>
                        <p className={styles.updated}>
                            Last updated: September 2026
                        </p>

                        <section>
                            <h2>
                                1. Website Use
                            </h2>

                            <p>
                                By using this website, you
                                agree to use it for lawful
                                purposes and to provide
                                accurate information when
                                submitting forms or requests.
                            </p>
                        </section>

                        <section>
                            <h2>
                                2. Vehicle Information
                            </h2>

                            <p>
                                Vehicle information displayed
                                on the website may include
                                specifications, pricing,
                                availability, images and other
                                details provided by the
                                showroom. Availability and
                                other vehicle information may
                                change.
                            </p>
                        </section>

                        <section>
                            <h2>
                                3. Enquiries
                            </h2>

                            <p>
                                Submitting an enquiry does not
                                by itself create a purchase
                                contract, reservation or
                                binding transaction. Any
                                transaction is subject to
                                separate discussion and
                                applicable terms.
                            </p>
                        </section>

                        <section>
                            <h2>
                                4. Test Drive Requests
                            </h2>

                            <p>
                                A test-drive request submitted
                                through the website is a
                                request for contact or
                                scheduling. A test drive is
                                subject to showroom
                                confirmation, vehicle
                                availability and applicable
                                requirements.
                            </p>
                        </section>

                        <section>
                            <h2>
                                5. Selling and Exchange Requests
                            </h2>

                            <p>
                                Submitting a selling or
                                exchange request does not
                                guarantee a particular price,
                                valuation or transaction.
                                Vehicle assessment and any
                                final offer are subject to
                                separate review.
                            </p>
                        </section>

                        <section>
                            <h2>
                                6. Finance
                            </h2>

                            <p>
                                Any finance information
                                provided through the website
                                is for general guidance.
                                Approval, interest rates,
                                tenure, fees, eligibility and
                                other finance terms are
                                determined by the applicable
                                financing provider and
                                circumstances of the
                                transaction.
                            </p>
                        </section>

                        <section>
                            <h2>
                                7. User Submitted Content
                            </h2>

                            <p>
                                You are responsible for
                                information and images that you
                                submit through the website.
                                Do not upload material that you
                                do not have the right to
                                provide.
                            </p>
                        </section>

                        <section>
                            <h2>
                                8. Website Availability
                            </h2>

                            <p>
                                Website features may
                                occasionally be unavailable
                                because of maintenance,
                                technical problems,
                                connectivity issues or changes
                                to the service.
                            </p>
                        </section>

                        <section>
                            <h2>
                                9. Changes
                            </h2>

                            <p>
                                These terms may be updated as
                                the website and its services
                                develop. Continued use of the
                                website after an update means
                                that you are using the current
                                published version.
                            </p>
                        </section>

                        <section>
                            <h2>
                                10. Contact
                            </h2>

                            <p>
                                For questions regarding these
                                terms, contact {businessName}
                                using the contact details
                                published on the website.
                            </p>
                        </section>
                    </div>
                </Container>
            </section>
        </main>
    );
};

export default Terms;
import { FiShield } from "react-icons/fi";

import Container from "../../components/common/Container/Container";

import { useSite } from "../../context/SiteContext";

import styles from "./PrivacyPolicy.module.css";

const PrivacyPolicy = () => {
    const { site } = useSite();

    const businessName =
        site?.name || "SV Old Car Choice";

    return (
        <main className={styles.page}>
            <section className={styles.hero}>
                <Container>
                    <FiShield />

                    <span>
                        Legal
                    </span>

                    <h1>
                        Privacy Policy
                    </h1>

                    <p>
                        Information about how
                        {` ${businessName}`} may handle
                        information submitted through this
                        website.
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
                                1. Introduction
                            </h2>

                            <p>
                                This Privacy Policy
                                describes the general
                                approach to information
                                submitted through the
                                {` ${businessName}`} website.
                                It applies to information
                                provided through enquiries,
                                vehicle requests, test-drive
                                requests, selling requests,
                                exchange requests and other
                                website forms.
                            </p>
                        </section>

                        <section>
                            <h2>
                                2. Information You Provide
                            </h2>

                            <p>
                                Depending on the service you
                                use, the website may collect
                                information such as your name,
                                phone number, email address,
                                vehicle information, preferred
                                vehicle, message and images
                                that you choose to upload.
                            </p>
                        </section>

                        <section>
                            <h2>
                                3. How Information May Be Used
                            </h2>

                            <p>
                                Submitted information may be
                                used to respond to enquiries,
                                process service requests,
                                arrange communication,
                                discuss vehicles and provide
                                the requested showroom service.
                            </p>
                        </section>

                        <section>
                            <h2>
                                4. Vehicle Images and Documents
                            </h2>

                            <p>
                                If you upload photographs or
                                other information relating to
                                a vehicle, you should only
                                submit material that you are
                                authorized to provide.
                            </p>
                        </section>

                        <section>
                            <h2>
                                5. Third-Party Services
                            </h2>

                            <p>
                                The website may use third-party
                                infrastructure or service
                                providers for functions such
                                as hosting, image storage,
                                communication or analytics.
                                Their handling of information
                                is subject to their applicable
                                policies and terms.
                            </p>
                        </section>

                        <section>
                            <h2>
                                6. Security
                            </h2>

                            <p>
                                Reasonable technical and
                                organizational measures may be
                                used to protect information
                                submitted through the website.
                                However, no internet-based
                                transmission or storage system
                                can be guaranteed to be
                                completely secure.
                            </p>
                        </section>

                        <section>
                            <h2>
                                7. Your Choices
                            </h2>

                            <p>
                                Avoid submitting information
                                that is not necessary for the
                                service you are requesting.
                                If you have a question about
                                information you have submitted,
                                contact the showroom through
                                the available contact
                                channels.
                            </p>
                        </section>

                        <section>
                            <h2>
                                8. Changes to This Policy
                            </h2>

                            <p>
                                This Privacy Policy may be
                                updated when the website,
                                services or information-handling
                                practices change. The updated
                                version will be published on
                                this page.
                            </p>
                        </section>

                        <section>
                            <h2>
                                9. Contact
                            </h2>

                            <p>
                                For privacy-related questions,
                                contact {businessName} using
                                the contact information
                                published on the website.
                            </p>
                        </section>
                    </div>
                </Container>
            </section>
        </main>
    );
};

export default PrivacyPolicy;
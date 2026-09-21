import { FiCheckCircle, FiClock, FiCalendar } from "react-icons/fi";

import Container from "../../components/common/Container/Container";
import PageHero from "../../components/common/PageHero/PageHero";
import TestDriveForm from "../../components/forms/TestDriveForm/TestDriveForm";

import styles from "./TestDrive.module.css";

const TestDrive = () => {
    return (
        <main className={styles.page}>
            <PageHero
                eyebrow="Test Drive"
                title="Take the car for a drive before you decide."
                description="Choose a preferred date and time, share your details and our team will contact you to confirm the test drive."
            >
                <div className={styles.points}>
                    <div>
                        <FiCalendar />
                        <span>Choose your preferred date</span>
                    </div>

                    <div>
                        <FiClock />
                        <span>Select a convenient time</span>
                    </div>

                    <div>
                        <FiCheckCircle />
                        <span>Receive confirmation from the showroom</span>
                    </div>
                </div>
            </PageHero>

            <section className={styles.formSection}>
                <Container>
                    <div className={styles.formLayout}>
                        <div>
                            <span className={styles.eyebrow}>Book Your Slot</span>
                            <h2>Request a test drive</h2>
                            <p>
                                Fill in your contact details and preferred appointment time.
                            </p>
                        </div>

                        <div className={styles.formCard}>
                            <TestDriveForm />
                        </div>
                    </div>
                </Container>
            </section>
        </main>
    );
};

export default TestDrive;

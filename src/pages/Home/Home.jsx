import Hero from "../../components/home/Hero/Hero";
import SearchInventory from "../../components/home/SearchInventory/SearchInventory";
import FeaturedVehicles from "../../components/home/FeaturedVehicles/FeaturedVehicles";
import ServicesPreview from "../../components/home/ServicesPreview/ServicesPreview";
import WhyChooseUs from "../../components/home/WhyChooseUs/WhyChooseUs";
import TestimonialsPreview from "../../components/home/TestimonialsPreview/TestimonialsPreview";
import ContactCTA from "../../components/home/ContactCTA/ContactCTA";

import styles from "./Home.module.css";

const Home = () => {
    return (
        <main className={styles.page}>
            <section className={styles.heroSection}>
                <Hero />
            </section>

            <section className={styles.searchSection}>
                <SearchInventory />
            </section>

            <section className={styles.featuredSection}>
                <FeaturedVehicles />
            </section>

            <section className={styles.servicesSection}>
                <ServicesPreview />
            </section>

            <section className={styles.whySection}>
                <WhyChooseUs />
            </section>

            <section className={styles.testimonialsSection}>
                <TestimonialsPreview />
            </section>

            <section className={styles.contactSection}>
                <ContactCTA />
            </section>
        </main>
    );
};

export default Home;
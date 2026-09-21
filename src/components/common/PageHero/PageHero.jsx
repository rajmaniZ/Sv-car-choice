import Container from "../Container/Container";
import heroImage from "../../../assets/images/hero.png";
import styles from "./PageHero.module.css";

const PageHero = ({
    eyebrow = "",
    title,
    description = "",
    actions = null,
    children = null,
    image = heroImage,
    contentClassName = "",
    className = ""
}) => {
    const contentClasses = [
        styles.content,
        contentClassName
    ]
        .filter(Boolean)
        .join(" ");

    const heroClasses = [
        styles.hero,
        className
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <section className={heroClasses}>
            <div className={styles.imageLayer} aria-hidden="true">
                <img src={image} alt="" />
            </div>

            <div className={styles.overlay} aria-hidden="true" />

            <Container>
                <div className={contentClasses}>
                    {eyebrow && (
                        <span className={styles.eyebrow}>
                            {eyebrow}
                        </span>
                    )}

                    <h1>{title}</h1>

                    {description && (
                        <p>{description}</p>
                    )}

                    {actions && (
                        <div className={styles.actions}>
                            {actions}
                        </div>
                    )}

                    {children && (
                        <div className={styles.extra}>
                            {children}
                        </div>
                    )}
                </div>
            </Container>
        </section>
    );
};

export default PageHero;

import styles from "./ShowroomInfo.module.css";

const ShowroomInfo = ({
    showroom = {},
    title = "SV Old Car Choice"
}) => {
    const name =
        showroom.name ||
        showroom.businessName ||
        title;

    const owner =
        showroom.ownerName ||
        showroom.owner ||
        "";

    const address =
        showroom.address ||
        "";

    const description =
        showroom.description ||
        showroom.about ||
        showroom.introduction ||
        "";

    const established =
        showroom.establishmentYear ||
        showroom.establishedYear ||
        showroom.establishment ||
        "";

    const services = Array.isArray(showroom.services)
        ? showroom.services
        : [];

    return (
        <section className={styles.section}>
            <div className={styles.content}>
                <span className={styles.eyebrow}>
                    About Our Showroom
                </span>

                <h2 className={styles.title}>
                    {name}
                </h2>

                {description && (
                    <p className={styles.description}>
                        {description}
                    </p>
                )}

                <div className={styles.details}>
                    {owner && (
                        <div className={styles.detail}>
                            <span className={styles.label}>
                                Owner
                            </span>
                            <span className={styles.value}>
                                {owner}
                            </span>
                        </div>
                    )}

                    {address && (
                        <div className={styles.detail}>
                            <span className={styles.label}>
                                Location
                            </span>
                            <span className={styles.value}>
                                {address}
                            </span>
                        </div>
                    )}

                    {established && (
                        <div className={styles.detail}>
                            <span className={styles.label}>
                                Established
                            </span>
                            <span className={styles.value}>
                                {established}
                            </span>
                        </div>
                    )}
                </div>

                {services.length > 0 && (
                    <div className={styles.services}>
                        <h3 className={styles.servicesTitle}>
                            Our Services
                        </h3>

                        <ul className={styles.serviceList}>
                            {services.map((service, index) => {
                                const serviceName =
                                    typeof service === "string"
                                        ? service
                                        : service?.name ||
                                          service?.title;

                                if (!serviceName) {
                                    return null;
                                }

                                return (
                                    <li
                                        key={
                                            service?._id ||
                                            service?.id ||
                                            index
                                        }
                                        className={styles.serviceItem}
                                    >
                                        <span
                                            className={styles.check}
                                            aria-hidden="true"
                                        >
                                            ✓
                                        </span>

                                        {serviceName}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ShowroomInfo;
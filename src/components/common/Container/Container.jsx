import styles from "./Container.module.css";

const Container = ({
    children,
    className = "",
    as: Component = "div"
}) => {
    const classes = [
        styles.container,
        className
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <Component className={classes}>
            {children}
        </Component>
    );
};

export default Container;
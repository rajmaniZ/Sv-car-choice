import { useState } from "react";
import {
    FiCamera,
    FiCheckCircle,
    FiImage,
    FiSend,
    FiTrash2
} from "react-icons/fi";
import WhatsAppButton from "../../common/WhatsAppButton/WhatsAppButton";

import Button from "../../common/Button/Button";
import { createSellRequest } from "../../../services/sellRequest.service";
import {
    getServerErrorMessage,
    getServerValidationErrors,
    validateEmail,
    validatePhone
} from "../../../utils/validation";

import styles from "./SellCarForm.module.css";

const initialForm = {
    name: "",
    phone: "",
    email: "",
    brand: "",
    model: "",
    variant: "",
    year: "",
    kmDriven: "",
    fuel: "",
    transmission: "",
    expectedPrice: "",
    description: ""
};

const SellCarForm = ({
    title = "Sell Your Car",
    submitLabel = "Submit Car Details",
    onSuccess
}) => {
    const [form, setForm] = useState(initialForm);
    const [images, setImages] = useState([]);
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [submitError, setSubmitError] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((current) => ({
            ...current,
            [name]: value
        }));

        if (errors[name]) {
            setErrors((current) => ({
                ...current,
                [name]: ""
            }));
        }

        if (submitError) {
            setSubmitError("");
        }
    };

    const handleImageChange = (event) => {
        const selectedFiles = Array.from(
            event.target.files || []
        );

        if (selectedFiles.length === 0) {
            return;
        }

        const imageFiles = selectedFiles.filter((file) =>
            file.type.startsWith("image/")
        );

        setImages((current) => [
            ...current,
            ...imageFiles
        ]);

        event.target.value = "";
    };

    const removeImage = (indexToRemove) => {
        setImages((current) =>
            current.filter(
                (_, index) => index !== indexToRemove
            )
        );
    };

    const validateForm = () => {
        const nextErrors = {};

        if (!form.name.trim()) {
            nextErrors.name = "Please enter your name.";
        }

        if (!form.phone.trim()) {
            nextErrors.phone =
                "Please enter your phone number.";
        } else if (!validatePhone(form.phone)) {
            nextErrors.phone =
                "Please enter a valid phone number.";
        }

        if (
            form.email.trim() &&
            !validateEmail(form.email)
        ) {
            nextErrors.email =
                "Please enter a valid email address.";
        }

        if (!form.brand.trim()) {
            nextErrors.brand =
                "Please enter the car brand.";
        }

        if (!form.model.trim()) {
            nextErrors.model =
                "Please enter the car model.";
        }

        if (!form.year) {
            nextErrors.year =
                "Please enter the manufacturing year.";
        }

        if (!form.kmDriven) {
            nextErrors.kmDriven =
                "Please enter the kilometres driven.";
        }

        if (!form.fuel) {
            nextErrors.fuel =
                "Please select the fuel type.";
        }

        if (!form.expectedPrice) {
            nextErrors.expectedPrice =
                "Please enter your expected price.";
        }

        return nextErrors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setSuccess(false);
        setSubmitError("");

        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setSubmitting(true);

        try {
            const formData = new FormData();

            formData.append("name", form.name.trim());
            formData.append("phone", form.phone.trim());
            formData.append("brand", form.brand.trim());
            formData.append("model", form.model.trim());
            formData.append("year", form.year);
            formData.append("kmDriven", form.kmDriven);
            formData.append("fuel", form.fuel);
            formData.append(
                "expectedPrice",
                form.expectedPrice
            );

            formData.append(
                "vehicle",
                JSON.stringify({
                    brand:
                        form.brand.trim(),
                    model:
                        form.model.trim(),
                    variant:
                        form.variant.trim(),
                    modelYear:
                        Number(form.year),
                    kmDriven:
                        Number(form.kmDriven),
                    fuel:
                        form.fuel,
                    transmission:
                        form.transmission ||
                        "other"
                })
            );

            if (form.email.trim()) {
                formData.append(
                    "email",
                    form.email.trim()
                );
            }

            if (form.variant.trim()) {
                formData.append(
                    "variant",
                    form.variant.trim()
                );
            }

            if (form.transmission) {
                formData.append(
                    "transmission",
                    form.transmission
                );
            }

            if (form.description.trim()) {
                formData.append(
                    "message",
                    form.description.trim()
                );
            }

            formData.append(
                "source",
                "website"
            );



            images.forEach((image) => {
                formData.append("images", image);
            });

            await createSellRequest(formData);

            setForm(initialForm);
            setImages([]);
            setErrors({});
            setSuccess(true);

            onSuccess?.();
        } catch (error) {
            const serverErrors =
                getServerValidationErrors(
                    error,
                    {
                        "vehicle.brand":
                            "brand",
                        "vehicle.model":
                            "model",
                        "vehicle.variant":
                            "variant",
                        "vehicle.modelYear":
                            "year",
                        "vehicle.kmDriven":
                            "kmDriven",
                        "vehicle.fuel":
                            "fuel",
                        "vehicle.transmission":
                            "transmission"
                    }
                );

            if (
                Object.keys(serverErrors)
                    .length > 0
            ) {
                setErrors(
                    (current) => ({
                        ...current,
                        ...serverErrors
                    })
                );
            }

            setSubmitError(
                getServerErrorMessage(
                    error,
                    "Unable to submit your car details. Please try again."
                )
            );
        } finally {
            setSubmitting(false);
        }
    };

    if (success) {
        return (
            <div className={styles.successState}>
                <div className={styles.successIcon}>
                    <FiCheckCircle />
                </div>

                <h3 className={styles.successTitle}>
                    Request Submitted Successfully
                </h3>

                <p className={styles.successMessage}>
                    Thank you for sharing your car details.
                    Our team will review the information and
                    contact you shortly.
                </p>

                <Button
                    variant="secondary"
                    onClick={() => setSuccess(false)}
                >
                    Submit Another Car
                </Button>
            </div>
        );
    }

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit}
            noValidate
        >
            {title && (
                <div className={styles.header}>
                    <h2 className={styles.title}>
                        {title}
                    </h2>

                    <p className={styles.description}>
                        Share your car details and our team
                        will get in touch with you.
                    </p>
                </div>
            )}

            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>
                    Your Details
                </h3>

                <div className={styles.fields}>
                    <div className={styles.field}>
                        <label
                            htmlFor="sell-name"
                            className={styles.label}
                        >
                            Name
                        </label>

                        <input
                            id="sell-name"
                            name="name"
                            type="text"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            className={`${styles.input} ${
                                errors.name
                                    ? styles.inputError
                                    : ""
                            }`}
                            autoComplete="name"
                        />

                        {errors.name && (
                            <span className={styles.error}>
                                {errors.name}
                            </span>
                        )}
                    </div>

                    <div className={styles.field}>
                        <label
                            htmlFor="sell-phone"
                            className={styles.label}
                        >
                            Phone Number
                        </label>

                        <input
                            id="sell-phone"
                            name="phone"
                            type="tel"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                            className={`${styles.input} ${
                                errors.phone
                                    ? styles.inputError
                                    : ""
                            }`}
                            autoComplete="tel"
                        />

                        {errors.phone && (
                            <span className={styles.error}>
                                {errors.phone}
                            </span>
                        )}
                    </div>

                    <div className={styles.field}>
                        <label
                            htmlFor="sell-email"
                            className={styles.label}
                        >
                            Email
                            <span className={styles.optional}>
                                Optional
                            </span>
                        </label>

                        <input
                            id="sell-email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className={`${styles.input} ${
                                errors.email
                                    ? styles.inputError
                                    : ""
                            }`}
                            autoComplete="email"
                        />

                        {errors.email && (
                            <span className={styles.error}>
                                {errors.email}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>
                    Car Details
                </h3>

                <div className={styles.fields}>
                    <div className={styles.field}>
                        <label
                            htmlFor="sell-brand"
                            className={styles.label}
                        >
                            Brand
                        </label>

                        <input
                            id="sell-brand"
                            name="brand"
                            type="text"
                            value={form.brand}
                            onChange={handleChange}
                            placeholder="e.g. Hyundai"
                            className={`${styles.input} ${
                                errors.brand
                                    ? styles.inputError
                                    : ""
                            }`}
                        />

                        {errors.brand && (
                            <span className={styles.error}>
                                {errors.brand}
                            </span>
                        )}
                    </div>

                    <div className={styles.field}>
                        <label
                            htmlFor="sell-model"
                            className={styles.label}
                        >
                            Model
                        </label>

                        <input
                            id="sell-model"
                            name="model"
                            type="text"
                            value={form.model}
                            onChange={handleChange}
                            placeholder="e.g. Creta"
                            className={`${styles.input} ${
                                errors.model
                                    ? styles.inputError
                                    : ""
                            }`}
                        />

                        {errors.model && (
                            <span className={styles.error}>
                                {errors.model}
                            </span>
                        )}
                    </div>

                    <div className={styles.field}>
                        <label
                            htmlFor="sell-variant"
                            className={styles.label}
                        >
                            Variant
                            <span className={styles.optional}>
                                Optional
                            </span>
                        </label>

                        <input
                            id="sell-variant"
                            name="variant"
                            type="text"
                            value={form.variant}
                            onChange={handleChange}
                            placeholder="e.g. SX"
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.field}>
                        <label
                            htmlFor="sell-year"
                            className={styles.label}
                        >
                            Manufacturing Year
                        </label>

                        <input
                            id="sell-year"
                            name="year"
                            type="number"
                            min="1900"
                            max={new Date().getFullYear()}
                            value={form.year}
                            onChange={handleChange}
                            placeholder="e.g. 2022"
                            className={`${styles.input} ${
                                errors.year
                                    ? styles.inputError
                                    : ""
                            }`}
                        />

                        {errors.year && (
                            <span className={styles.error}>
                                {errors.year}
                            </span>
                        )}
                    </div>

                    <div className={styles.field}>
                        <label
                            htmlFor="sell-km"
                            className={styles.label}
                        >
                            Kilometres Driven
                        </label>

                        <input
                            id="sell-km"
                            name="kmDriven"
                            type="number"
                            min="0"
                            value={form.kmDriven}
                            onChange={handleChange}
                            placeholder="e.g. 45000"
                            className={`${styles.input} ${
                                errors.kmDriven
                                    ? styles.inputError
                                    : ""
                            }`}
                        />

                        {errors.kmDriven && (
                            <span className={styles.error}>
                                {errors.kmDriven}
                            </span>
                        )}
                    </div>

                    <div className={styles.field}>
                        <label
                            htmlFor="sell-fuel"
                            className={styles.label}
                        >
                            Fuel Type
                        </label>

                        <select
                            id="sell-fuel"
                            name="fuel"
                            value={form.fuel}
                            onChange={handleChange}
                            className={`${styles.select} ${
                                errors.fuel
                                    ? styles.inputError
                                    : ""
                            }`}
                        >
                            <option value="">
                                Select fuel type
                            </option>
                            <option value="petrol">
                                Petrol
                            </option>
                            <option value="diesel">
                                Diesel
                            </option>
                            <option value="cng">
                                CNG
                            </option>
                            <option value="electric">
                                Electric
                            </option>
                            <option value="hybrid">
                                Hybrid
                            </option>
                        </select>

                        {errors.fuel && (
                            <span className={styles.error}>
                                {errors.fuel}
                            </span>
                        )}
                    </div>

                    <div className={styles.field}>
                        <label
                            htmlFor="sell-transmission"
                            className={styles.label}
                        >
                            Transmission
                            <span className={styles.optional}>
                                Optional
                            </span>
                        </label>

                        <select
                            id="sell-transmission"
                            name="transmission"
                            value={form.transmission}
                            onChange={handleChange}
                            className={styles.select}
                        >
                            <option value="">
                                Select transmission
                            </option>
                            <option value="manual">
                                Manual
                            </option>
                            <option value="automatic">
                                Automatic
                            </option>
                            <option value="amt">
                                AMT
                            </option>
                            <option value="cvt">
                                CVT
                            </option>
                            <option value="dct">
                                DCT
                            </option>
                        </select>
                    </div>

                    <div className={styles.field}>
                        <label
                            htmlFor="sell-price"
                            className={styles.label}
                        >
                            Expected Price
                        </label>

                        <input
                            id="sell-price"
                            name="expectedPrice"
                            type="number"
                            min="0"
                            value={form.expectedPrice}
                            onChange={handleChange}
                            placeholder="Enter expected price"
                            className={`${styles.input} ${
                                errors.expectedPrice
                                    ? styles.inputError
                                    : ""
                            }`}
                        />

                        {errors.expectedPrice && (
                            <span className={styles.error}>
                                {errors.expectedPrice}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>
                    Car Photos
                </h3>

                <div className={styles.uploadBox}>
                    <input
                        id="sell-images"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className={styles.fileInput}
                    />

                    <label
                        htmlFor="sell-images"
                        className={styles.uploadLabel}
                    >
                        <FiCamera className={styles.uploadIcon} />

                        <span className={styles.uploadTitle}>
                            Add Car Photos
                        </span>

                        <span className={styles.uploadText}>
                            Upload clear photos of your car
                        </span>
                    </label>
                </div>

                {images.length > 0 && (
                    <div className={styles.imageList}>
                        {images.map((image, index) => (
                            <div
                                key={`${image.name}-${index}`}
                                className={styles.imageItem}
                            >
                                <img
                                    src={URL.createObjectURL(
                                        image
                                    )}
                                    alt={`Car ${index + 1}`}
                                    className={styles.imagePreview}
                                />

                                <button
                                    type="button"
                                    className={styles.removeImage}
                                    onClick={() =>
                                        removeImage(index)
                                    }
                                    aria-label={`Remove image ${
                                        index + 1
                                    }`}
                                >
                                    <FiTrash2 />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {images.length === 0 && (
                    <p className={styles.imageHint}>
                        <FiImage />
                        Photos are optional but can help us
                        evaluate your car.
                    </p>
                )}
            </div>

            <div className={styles.section}>
                <div className={styles.field}>
                    <label
                        htmlFor="sell-description"
                        className={styles.label}
                    >
                        Additional Details
                        <span className={styles.optional}>
                            Optional
                        </span>
                    </label>

                    <textarea
                        id="sell-description"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Tell us about the condition, service history or any other details about your car."
                        rows={5}
                        className={styles.textarea}
                    />
                </div>
            </div>

            {submitError && (
                <div className={styles.submitError}>
                    {submitError}
                </div>
            )}

            <Button
                type="submit"
                variant="primary"
                size="large"
                fullWidth
                loading={submitting}
            >
                {!submitting && <FiSend />}
                {submitLabel}
            </Button>
        

                    <div
                        data-whatsapp-form-action
                        className="whatsapp-form-action"
                    >
                        <WhatsAppButton
                            label="Send Details on WhatsApp"
                            variant="outline"
                            fullWidth
                            type="Sell Car Request"
                            title="SellCarForm"
                            details={{
                        name:
                            form.name,
                        phone:
                            form.phone,
                        email:
                            form.email,
                        brand:
                            form.brand,
                        model:
                            form.model,
                        variant:
                            form.variant,
                        modelYear:
                            form.year,
                        mileage:
                            form.kmDriven,
                        fuel:
                            form.fuel,
                        transmission:
                            form.transmission,
                        expectedPrice:
                            form.expectedPrice,
                        message:
                            form.description
                            }}
                        />
                    </div>

</form>
    );
};

export default SellCarForm;
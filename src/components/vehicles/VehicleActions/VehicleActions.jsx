import {
    FiCalendar,
    FiPhone,
    FiRefreshCw,
    FiShare2
} from "react-icons/fi";
import { useState } from "react";
import Button from "../../common/Button/Button";
import LeadForm from "../../forms/LeadForm/LeadForm";
import TestDriveForm from "../../forms/TestDriveForm/TestDriveForm";
import Modal from "../../common/Modal/Modal";
import { useSite } from "../../../context/SiteContext";
import styles from "./VehicleActions.module.css";
import WhatsAppButton from "../../common/WhatsAppButton/WhatsAppButton";

const VehicleActions = ({
    vehicle,
    className = ""
}) => {
    const { site } = useSite();

    const [activeModal, setActiveModal] =
        useState(null);

    const phone =
        site?.contact?.phone ||
        site?.phone ||
        "";

    const vehicleName =
        vehicle?.name ||
        vehicle?.title ||
        `${vehicle?.brand || ""} ${
            vehicle?.model || ""
        }`.trim() ||
        "this vehicle";

    const handleShare = async () => {
        const shareData = {
            title: vehicleName,
            text: `Check out ${vehicleName} at SV Old Car Choice.`,
            url: window.location.href
        };

        if (
            navigator.share &&
            typeof navigator.share === "function"
        ) {
            try {
                await navigator.share(
                    shareData
                );
            } catch (error) {
                if (
                    error?.name !==
                    "AbortError"
                ) {
                    console.error(
                        "Unable to share vehicle:",
                        error
                    );
                }
            }

            return;
        }

        try {
            await navigator.clipboard.writeText(
                window.location.href
            );
            window.alert(
                "Vehicle link copied to clipboard."
            );
        } catch {
            window.prompt(
                "Copy this vehicle link:",
                window.location.href
            );
        }
    };

    const handleClose = () => {
        setActiveModal(null);
    };

    return (
        <>
            <div
                className={[
                    styles["vehicle-actions"],
                    className
                ]
                    .filter(Boolean)
                    .join(" ")}
            >
                <Button
                    variant="primary"
                    fullWidth
                    onClick={() =>
                        setActiveModal(
                            "test-drive"
                        )
                    }
                >
                    <FiCalendar
                        size={17}
                        aria-hidden="true"
                    />
                    Book Test Drive
                </Button>

                <Button
                    variant="outline"
                    fullWidth
                    onClick={() =>
                        setActiveModal("enquiry")
                    }
                >
                    <FiPhone
                        size={17}
                        aria-hidden="true"
                    />
                    Make an Enquiry
                </Button>

                <Button
                    variant="secondary"
                    fullWidth
                    onClick={() =>
                        setActiveModal("exchange")
                    }
                >
                    <FiRefreshCw
                        size={17}
                        aria-hidden="true"
                    />
                    Exchange Your Car
                </Button>

                <button
                    type="button"
                    className={styles["vehicle-actions__share"]}
                    onClick={handleShare}
                >
                    <FiShare2
                        size={17}
                        aria-hidden="true"
                    />
                    <span>Share Vehicle</span>
                </button>

                {phone && (
                    <a
                        href={`tel:${phone}`}
                        className={styles["vehicle-actions__phone"]}
                    >
                        <FiPhone
                            size={17}
                            aria-hidden="true"
                        />
                        <span>
                            Call {phone}
                        </span>
                    </a>
                )}
            </div>

            <Modal
                isOpen={
                    activeModal ===
                    "enquiry"
                }
                onClose={handleClose}
                title="Vehicle Enquiry"
            >
                <LeadForm
                    vehicle={vehicle}
                    onSuccess={handleClose}
                />
            </Modal>

            <Modal
                isOpen={
                    activeModal ===
                    "test-drive"
                }
                onClose={handleClose}
                title="Book a Test Drive"
            >
                <TestDriveForm
                    vehicle={vehicle}
                    onSuccess={handleClose}
                />
            </Modal>

            <Modal
                isOpen={
                    activeModal ===
                    "exchange"
                }
                onClose={handleClose}
                title="Exchange Your Car"
            >
                <div className={styles["vehicle-actions__exchange-message"]}>
                    <p>
                        Want to exchange your
                        current car for this
                        vehicle?
                    </p>

                    <Button
                        variant="primary"
                        href="/exchange"
                        fullWidth
                        onClick={handleClose}
                    >
                        Start Exchange Request
                    </Button>
                
                <span
                    whatsappVehicleAction
                    aria-hidden="true"
                ></span>

                <WhatsAppButton
                    label="WhatsApp"
                    variant="outline"
                    type="Vehicle"
                    title={vehicleName}
                    slug={vehicle?.slug || ""}
                    details={{
                        brand:
                            vehicle?.brand || "",
                        model:
                            vehicle?.model || "",
                        variant:
                            vehicle?.variant || "",
                        modelYear:
                            vehicle?.modelYear || "",
                        fuel:
                            vehicle?.fuel || "",
                        transmission:
                            vehicle?.transmission || "",
                        mileage:
                            vehicle?.kmDriven ||
                            vehicle?.mileage ||
                            "",
                        ownership:
                            vehicle?.ownership || "",
                        colour:
                            vehicle?.colour || "",
                        price:
                            vehicle?.price || "",
                        status:
                            vehicle?.status || ""
                    }}
                />

</div>
            </Modal>
        </>
    );
};

export default VehicleActions;
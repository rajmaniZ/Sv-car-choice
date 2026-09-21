
import {
    useState
} from "react";

import {
    FiMessageCircle,
    FiSend
} from "react-icons/fi";

import {
    openWhatsApp
} from "../../../utils/whatsapp";

import styles from "./WhatsAppRequestActions.module.css";

const WhatsAppRequestActions = ({
    request,
    type = "Request"
}) => {
    const [
        showCustom,
        setShowCustom
    ] = useState(false);

    const [
        customMessage,
        setCustomMessage
    ] = useState("");

    const vehicle =
        request?.vehicle ||
        request?.targetVehicle ||
        null;

    const details = {
        requestType:
            type,

        requestId:
            request?._id || "",

        name:
            request?.name || "",

        phone:
            request?.phone || "",

        email:
            request?.email || "",

        subject:
            request?.subject || "",

        message:
            request?.message || "",

        status:
            request?.status || "",

        source:
            request?.source || "",

        vehicle:
            vehicle
                ? [
                    vehicle.brand,
                    vehicle.model,
                    vehicle.variant
                ]
                    .filter(Boolean)
                    .join(" ")
                : "",

        vehicleSlug:
            vehicle?.slug || "",

        vehiclePrice:
            vehicle?.price || "",

        preferredDate:
            request?.preferredDate ||
            "",

        preferredTime:
            request?.preferredTime ||
            "",

        notes:
            request?.notes || "",

        expectedPrice:
            request?.expectedPrice ||
            ""
    };

    const handleSend = () => {
        openWhatsApp({
            message:
                customMessage ||
                `Hello, I am contacting you regarding your ${type.toLowerCase()}.`,
            type,
            title:
                `${type} ${request?._id || ""}`,
            slug:
                request?._id || "",
            url:
                typeof window !==
                "undefined"
                    ? window.location.href
                    : "",
            details
        });
    };

    return (
        <div
            className={styles.actions}
        >
            <button
                type="button"
                className={
                    styles.whatsapp
                }
                onClick={() => {
                    setCustomMessage(
                        ""
                    );

                    setShowCustom(
                        false
                    );

                    handleSend();
                }}
            >
                <FiMessageCircle />

                <span>
                    WhatsApp
                </span>
            </button>

            <button
                type="button"
                className={
                    styles.custom
                }
                onClick={() =>
                    setShowCustom(
                        (value) =>
                            !value
                    )
                }
            >
                <FiSend />

                <span>
                    Custom
                </span>
            </button>

            {showCustom && (
                <div
                    className={
                        styles.customBox
                    }
                >
                    <textarea
                        value={
                            customMessage
                        }
                        onChange={(
                            event
                        ) =>
                            setCustomMessage(
                                event
                                    .target
                                    .value
                            )
                        }
                        placeholder="Write your custom WhatsApp message..."
                        rows={4}
                    />

                    <button
                        type="button"
                        className={
                            styles.send
                        }
                        onClick={
                            handleSend
                        }
                    >
                        <FiMessageCircle />

                        Send on WhatsApp
                    </button>
                </div>
            )}
        </div>
    );
};

export default WhatsAppRequestActions;

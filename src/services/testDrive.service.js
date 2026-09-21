import api from "./api";
import { API_ENDPOINTS } from "../config/api";

const createTestDrive = async (
    testDriveData
) => {
    if (
        !testDriveData ||
        typeof testDriveData !== "object"
    ) {
        throw new Error(
            "Test drive data is required"
        );
    }

    return api.post(
        API_ENDPOINTS.testDrives.create,
        testDriveData
    );
};

export {
    createTestDrive
};

export default {
    createTestDrive
};
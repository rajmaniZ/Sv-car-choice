import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Inventory from "../pages/Inventory/Inventory";
import VehicleDetails from "../pages/VehicleDetails/VehicleDetails";
import About from "../pages/About/About";
import Services from "../pages/Services/Services";
import SellYourCar from "../pages/SellYourCar/SellYourCar";
import Exchange from "../pages/Exchange/Exchange";
import Finance from "../pages/Finance/Finance";
import Contact from "../pages/Contact/Contact";
import TestDrive from "../pages/TestDrive/TestDrive";
import PrivacyPolicy from "../pages/PrivacyPolicy/PrivacyPolicy";
import Terms from "../pages/Terms/Terms";
// import TestimonialForm from "../../components/forms/TestimonialForm/TestimonialForm";
import ServiceDetail from "../pages/ServiceDetail/ServiceDetail";

import Showroom from "../pages/Showroom/Showroom";


const NotFound = () => {
    return (
        <main
            style={{
                minHeight: "60vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "80px 20px",
                textAlign: "center"
            }}
        >
            <div>
                <h1
                    style={{
                        marginBottom: "12px",
                        fontSize: "3rem"
                    }}
                >
                    404
                </h1>

                <h2
                    style={{
                        marginBottom: "10px"
                    }}
                >
                    Page Not Found
                </h2>

                <p>
                    The page you are looking for does not
                    exist.
                </p>
            </div>
        </main>
    );
};

const AppRoutes = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={<Home />}
            />

            <Route
                path="/inventory"
                element={<Inventory />}
            />

            <Route
                path="/inventory/:slug"
                element={<VehicleDetails />}
            />

            <Route
                path="/vehicle/:slug"
                element={<VehicleDetails />}
            />

            <Route
                path="/about"
                element={<About />}
            />
            <Route
    path="/showroom"
    element={<Showroom />}
/>

            <Route
                path="/services"
                element={<Services />}
            />

<Route
    path="/services/:slug"
    element={<ServiceDetail />}
/>

            <Route
                path="/sell-your-car"
                element={<SellYourCar />}
            />

            <Route
                path="/exchange"
                element={<Exchange />}
            />

            <Route
                path="/finance"
                element={<Finance />}
            />

            <Route
                path="/contact"
                element={<Contact />}
            />

            <Route
                path="/test-drive"
                element={<TestDrive />}
            />

            <Route
                path="/privacy-policy"
                element={<PrivacyPolicy />}
            />

            <Route
                path="/terms"
                element={<Terms />}
            />

            <Route
                path="*"
                element={<NotFound />}
            />
        </Routes>
    );
};

export default AppRoutes;


import { BrowserRouter } from "react-router-dom";
import WhatsAppFloat from "./components/common/WhatsAppFloat/WhatsAppFloat";

import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import ScrollToTop from "./components/layout/ScrollToTop/ScrollToTop";

import AppRoutes from "./routes/AppRoutes";

import { SiteProvider } from "./context/SiteContext";

const App = () => {
    return (
        <BrowserRouter>
            <SiteProvider>
                <ScrollToTop />

                <div className="app">
                    <Header />

                    <main className="app-main">
                        <AppRoutes />
                    </main>

                    <Footer />

                    <WhatsAppFloat />
</div>
            </SiteProvider>
        </BrowserRouter>
    );
};

export default App;
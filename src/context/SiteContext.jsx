/* eslint-disable react-refresh/only-export-components */

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState
} from "react";

import api from "../services/api";
import {
    API_ENDPOINTS
} from "../config/api";
import siteConfig from "../config/site";

const SiteContext = createContext(null);

const SiteProvider = ({ children }) => {
    const [site, setSite] =
        useState(siteConfig);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState(null);

    const fetchSiteSettings = useCallback(
        async () => {
            try {
                setLoading(true);
                setError(null);

                const data =
                    await api.get(
                        API_ENDPOINTS.showroom.details
                    );

                if (data) {
                    setSite((currentSite) => ({
                        ...currentSite,
                        ...data,

                        contact: {
                            ...currentSite.contact,
                            ...(data.contact || {})
                        },

                        address: {
                            ...currentSite.address,
                            ...(data.address || {})
                        },

                        business: {
                            ...currentSite.business,
                            ...(data.business || {})
                        },

                        hours: {
                            ...currentSite.hours,
                            ...(data.hours || {})
                        },

                        social: {
                            ...currentSite.social,
                            ...(data.social || {})
                        }
                    }));
                }
            } catch (requestError) {
                setError(requestError);

                console.error(
                    "Failed to load showroom settings:",
                    requestError
                );
            } finally {
                setLoading(false);
            }
        },
        []
    );

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchSiteSettings();
        }, 0);

        return () => {
            clearTimeout(timer);
        };
    }, [fetchSiteSettings]);

    const value = useMemo(
        () => ({
            site,
            loading,
            error,
            refreshSite:
                fetchSiteSettings
        }),
        [
            site,
            loading,
            error,
            fetchSiteSettings
        ]
    );

    return (
        <SiteContext.Provider
            value={value}
        >
            {children}
        </SiteContext.Provider>
    );
};

const useSite = () => {
    const context =
        useContext(SiteContext);

    if (!context) {
        throw new Error(
            "useSite must be used inside SiteProvider"
        );
    }

    return context;
};

export {
    SiteProvider,
    useSite
};

export default SiteContext;
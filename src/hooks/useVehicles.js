import {
    useCallback,
    useEffect,
    useRef,
    useState
} from "react";

import {
    getVehicles,
    getFeaturedVehicles,
    getVehicleBrands,
    getVehicleModels
} from "../services/vehicle.service";

const areParamsEqual = (
    first = {},
    second = {}
) => {
    const firstKeys = Object.keys(first).sort();
    const secondKeys = Object.keys(second).sort();

    if (
        firstKeys.length !==
        secondKeys.length
    ) {
        return false;
    }

    return firstKeys.every(
        (key, index) => {
            if (
                key !== secondKeys[index]
            ) {
                return false;
            }

            return (
                String(first[key] ?? "") ===
                String(second[key] ?? "")
            );
        }
    );
};

const useVehicles = (
    initialParams = {},
    options = {}
) => {
    const {
        autoFetch = true,
        featured = false
    } = options;

    const [vehicles, setVehicles] =
        useState([]);

    const [pagination, setPagination] =
        useState(null);

    const [loading, setLoading] =
        useState(autoFetch);

    const [error, setError] =
        useState(null);

    const [params, setParams] =
        useState(initialParams);

    const requestIdRef =
        useRef(0);

    const controllerRef =
        useRef(null);

    /*
     * Keep the hook parameters synchronized
     * with the parameters supplied by the page.
     *
     * Inventory owns the real filter/search state.
     */
    useEffect(() => {
        setParams((currentParams) => {
            if (
                areParamsEqual(
                    currentParams,
                    initialParams
                )
            ) {
                return currentParams;
            }

            return {
                ...initialParams
            };
        });
    }, [initialParams]);

    const fetchVehicles = useCallback(
        async (
            requestParams = {}
        ) => {
            const requestId =
                ++requestIdRef.current;

            if (
                controllerRef.current
            ) {
                controllerRef.current.abort();
            }

            const controller =
                new AbortController();

            controllerRef.current =
                controller;

            setLoading(true);
            setError(null);

            try {
                const data = featured
                    ? await getFeaturedVehicles(
                          requestParams,
                          {
                              signal:
                                  controller
                                      .signal
                          }
                      )
                    : await getVehicles(
                          requestParams,
                          {
                              signal:
                                  controller
                                      .signal
                          }
                      );

                if (
                    requestId !==
                    requestIdRef.current
                ) {
                    return null;
                }

                if (featured) {
                    const nextVehicles =
                        Array.isArray(data)
                            ? data
                            : [];

                    setVehicles(
                        nextVehicles
                    );

                    setPagination(null);

                    return data;
                }

                const nextVehicles =
                    Array.isArray(
                        data?.vehicles
                    )
                        ? data.vehicles
                        : [];

                setVehicles(
                    nextVehicles
                );

                setPagination(
                    data?.pagination ||
                        null
                );

                return data;
            } catch (requestError) {
                if (
                    requestId !==
                    requestIdRef.current
                ) {
                    return null;
                }

                if (
                    requestError?.name ===
                    "AbortError"
                ) {
                    return null;
                }

                if (
                    requestError?.code ===
                    "REQUEST_ABORTED"
                ) {
                    return null;
                }

                setError(
                    requestError
                );

                setVehicles([]);

                setPagination(null);

                return null;
            } finally {
                if (
                    requestId ===
                    requestIdRef.current
                ) {
                    setLoading(false);
                }
            }
        },
        [featured]
    );

    /*
     * Fetch only when the synchronized
     * parameters actually change.
     */
    useEffect(() => {
        if (!autoFetch) {
            return undefined;
        }

        fetchVehicles(params);

        return undefined;
    }, [
        autoFetch,
        fetchVehicles,
        params
    ]);

    const updateParams = useCallback(
        (nextParams) => {
            setParams(
                (currentParams) => {
                    if (
                        typeof nextParams ===
                        "function"
                    ) {
                        return nextParams(
                            currentParams
                        );
                    }

                    return {
                        ...currentParams,
                        ...nextParams
                    };
                }
            );
        },
        []
    );

    const resetParams = useCallback(
        (
            nextParams = {}
        ) => {
            setParams({
                ...nextParams
            });
        },
        []
    );

    const refetch = useCallback(
        () => fetchVehicles(params),
        [
            fetchVehicles,
            params
        ]
    );

    useEffect(() => {
        return () => {
            requestIdRef.current += 1;

            if (
                controllerRef.current
            ) {
                controllerRef.current.abort();
            }
        };
    }, []);

    return {
        vehicles,
        pagination,
        loading,
        error,
        params,
        setParams: updateParams,
        updateParams,
        resetParams,
        fetchVehicles,
        refetch
    };
};

const useFeaturedVehicles = (
    initialParams = {}
) => {
    return useVehicles(
        initialParams,
        {
            autoFetch: true,
            featured: true
        }
    );
};

const useVehicleFilters = () => {
    const [brands, setBrands] =
        useState([]);

    const [models, setModels] =
        useState([]);

    const [loadingBrands, setLoadingBrands] =
        useState(false);

    const [loadingModels, setLoadingModels] =
        useState(false);

    const [error, setError] =
        useState(null);

    const modelRequestIdRef =
        useRef(0);

    const fetchBrands = useCallback(
        async () => {
            try {
                setLoadingBrands(true);
                setError(null);

                const data =
                    await getVehicleBrands();

                const nextBrands =
                    Array.isArray(data)
                        ? data
                        : [];

                setBrands(
                    nextBrands
                );

                return nextBrands;
            } catch (requestError) {
                setError(
                    requestError
                );

                setBrands([]);

                return [];
            } finally {
                setLoadingBrands(false);
            }
        },
        []
    );

    const fetchModels = useCallback(
        async (
            brand = ""
        ) => {
            const requestId =
                ++modelRequestIdRef.current;

            if (!brand) {
                setModels([]);
                setLoadingModels(false);

                return [];
            }

            try {
                setLoadingModels(true);
                setError(null);

                const data =
                    await getVehicleModels(
                        brand
                    );

                if (
                    requestId !==
                    modelRequestIdRef.current
                ) {
                    return [];
                }

                const nextModels =
                    Array.isArray(data)
                        ? data
                        : [];

                setModels(
                    nextModels
                );

                return nextModels;
            } catch (requestError) {
                if (
                    requestId !==
                    modelRequestIdRef.current
                ) {
                    return [];
                }

                setError(
                    requestError
                );

                setModels([]);

                return [];
            } finally {
                if (
                    requestId ===
                    modelRequestIdRef.current
                ) {
                    setLoadingModels(
                        false
                    );
                }
            }
        },
        []
    );

    useEffect(() => {
        fetchBrands();
    }, [fetchBrands]);

    return {
        brands,
        models,
        loadingBrands,
        loadingModels,
        error,
        fetchBrands,
        fetchModels,
        setModels
    };
};

export {
    useVehicles,
    useFeaturedVehicles,
    useVehicleFilters
};

export default useVehicles;
const removeEmptyValues = (
    params = {}
) => {
    return Object.fromEntries(
        Object.entries(params).filter(
            ([, value]) =>
                value !== undefined &&
                value !== null &&
                value !== ""
        )
    );
};

const objectToQueryString = (
    params = {}
) => {
    const cleanParams =
        removeEmptyValues(params);

    const searchParams =
        new URLSearchParams();

    Object.entries(cleanParams).forEach(
        ([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach((item) => {
                    if (
                        item !== undefined &&
                        item !== null &&
                        item !== ""
                    ) {
                        searchParams.append(
                            key,
                            item
                        );
                    }
                });

                return;
            }

            searchParams.set(
                key,
                String(value)
            );
        }
    );

    return searchParams.toString();
};

const queryStringToObject = (
    queryString = ""
) => {
    const searchParams =
        new URLSearchParams(
            queryString.startsWith("?")
                ? queryString.slice(1)
                : queryString
        );

    const result = {};

    searchParams.forEach(
        (value, key) => {
            if (
                Object.prototype.hasOwnProperty.call(
                    result,
                    key
                )
            ) {
                if (
                    Array.isArray(result[key])
                ) {
                    result[key].push(value);
                } else {
                    result[key] = [
                        result[key],
                        value
                    ];
                }
            } else {
                result[key] = value;
            }
        }
    );

    return result;
};

const updateQueryParams = (
    params,
    updates
) => {
    return {
        ...params,
        ...removeEmptyValues(updates)
    };
};

const removeQueryParams = (
    params,
    keys = []
) => {
    const result = {
        ...params
    };

    keys.forEach((key) => {
        delete result[key];
    });

    return result;
};

export {
    removeEmptyValues,
    objectToQueryString,
    queryStringToObject,
    updateQueryParams,
    removeQueryParams
};

export default objectToQueryString;
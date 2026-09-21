const formatDate = (
    value,
    options = {}
) => {
    if (!value) {
        return "";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "";
    }

    const {
        locale = "en-IN",
        dateStyle = "medium",
        timeZone,
        includeTime = false
    } = options;

    const formatOptions = {
        dateStyle
    };

    if (timeZone) {
        formatOptions.timeZone = timeZone;
    }

    if (includeTime) {
        formatOptions.timeStyle = "short";
    }

    return new Intl.DateTimeFormat(
        locale,
        formatOptions
    ).format(date);
};

const formatDateTime = (
    value,
    options = {}
) => {
    return formatDate(value, {
        ...options,
        includeTime: true
    });
};

const formatRelativeDate = (value) => {
    if (!value) {
        return "";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "";
    }

    const now = new Date();
    const difference =
        date.getTime() - now.getTime();

    const seconds = Math.round(
        difference / 1000
    );

    const minutes = Math.round(
        seconds / 60
    );

    const hours = Math.round(
        minutes / 60
    );

    const days = Math.round(
        hours / 24
    );

    const formatter =
        new Intl.RelativeTimeFormat(
            "en-IN",
            {
                numeric: "auto"
            }
        );

    if (Math.abs(seconds) < 60) {
        return formatter.format(
            seconds,
            "second"
        );
    }

    if (Math.abs(minutes) < 60) {
        return formatter.format(
            minutes,
            "minute"
        );
    }

    if (Math.abs(hours) < 24) {
        return formatter.format(
            hours,
            "hour"
        );
    }

    return formatter.format(
        days,
        "day"
    );
};

export {
    formatDate,
    formatDateTime,
    formatRelativeDate
};

export default formatDate;
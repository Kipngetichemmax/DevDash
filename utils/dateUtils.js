function formatDate(date) {
    return new Date(date).toISOString().split('T')[0];
}

function today() {
    return formatDate(new Date());
}

function yesterday() {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return formatDate(d);
}

function calculateStreak(dates) {
    if (!dates || dates.length === 0) return 0;

    const sorted = dates
        .map(d => formatDate(d))
        .sort()
        .reverse();

    let streak = 0;
    let currentDate = new Date();

    for (let i = 0; i < sorted.length; i++) {
        const compareDate = new Date(sorted[i]);

        if (formatDate(compareDate) === formatDate(currentDate)) {
            streak++;
            currentDate.setDate(currentDate.getDate() - 1);
        } else {
            break;
        }
    }

    return streak;
}

module.exports = {
    formatDate,
    today,
    yesterday,
    calculateStreak
};

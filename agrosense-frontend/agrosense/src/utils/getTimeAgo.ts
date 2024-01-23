import moment from 'moment';

export const getTimeAgo = (timestamp: Date) => {
    const now = moment();
    const targetTime = moment(timestamp);

    const duration = moment.duration(now.diff(targetTime));

    if (duration.asSeconds() < 60) {
        return `${Math.floor(duration.asSeconds())} detik lalu`;
    } else if (duration.asMinutes() < 60) {
        return `${Math.floor(duration.asMinutes())} menit lalu`;
    } else if (duration.asHours() < 24) {
        return `${Math.floor(duration.asHours())} jam lalu`;
    } else if (duration.asDays() < 7) {
        return `${Math.floor(duration.asDays())} hari lalu`;
    } else {
        return targetTime.format('DD MMM YYYY, HH:mm');
    }
};

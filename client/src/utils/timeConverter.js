const convertTimestamp = (timestamp) => {
    const date = timestamp.toDate();

    const hour = date.getHours();
    const minute = date.getMinutes();

    if (hour > 12) {
        return hour - 12 + ':' + minute + 'PM';
    }

    return hour + ':' + minute + 'AM';
}

export default convertTimestamp;
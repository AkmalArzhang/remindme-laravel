const getDateTime = (unixTime = null) => {
    let dateTime = new Date();

    if (unixTime) {
        dateTime = new Date(unixTime * 1000);
    }

    const year = dateTime.getFullYear();
    const month = (dateTime.getMonth() + 1).toString().padStart(2, "0");
    const day = dateTime.getDate().toString().padStart(2, "0");
    const hours = dateTime.getHours().toString().padStart(2, "0");
    const minutes = dateTime.getMinutes().toString().padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export default getDateTime;

const hoursOfOp = (data) => {
  let isOpen;

  if (data.hoursOfOperation) {
    const date = new Date();
    const userTimezone = date.getTimezoneOffset() / 60;

    let attractionTimezone = data.hoursOfOperation.split(" ");
    attractionTimezone = attractionTimezone[attractionTimezone.length - 1];

    let offset;
    if (attractionTimezone === "EST") {
      offset = 5;
    } else if (attractionTimezone === "CST") {
      offset = 6;
    } else if (attractionTimezone === "MST") {
      offset = 7;
    } else if (attractionTimezone === "PST") {
      offset = 8;
    }

    const timezoneOffset = userTimezone - offset;
    const userHours = date.getHours() + timezoneOffset;
    let userMinutes = String(date.getMinutes());
    userMinutes = userMinutes.padStart(2, "0");
    const userTime = String(userHours) + userMinutes;

    const opHours = data.hoursOfOperation.split(" - ");
    const morningHours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const eveningHours = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    let open = opHours[0].split(" ");
    let close = opHours[1].split(" ");
    let openingHour = +open[0].split(":")[0];
    let openingMinute = String(open[0].split(":")[1]);
    let closingHour = +close[0].split(":")[0];
    let closingMinute = String(close[0].split(":")[1]);

    if (open.includes("AM")) {
      openingHour = morningHours[openingHour];
    } else {
      openingHour = eveningHours[openingHour];
    }

    if (close.includes("PM")) {
      closingHour = eveningHours[closingHour];
    } else {
      closingHour = morningHours[closingHour];
    }

    openingMinute = openingMinute.padStart(2, "0");
    closingMinute = closingMinute.padStart(2, "0");
    const openingTime = String(openingHour) + String(openingMinute);
    const closingTime = String(closingHour) + String(closingMinute);

    isOpen = +userTime >= +openingTime && +userTime < +closingTime;
    return isOpen;
  }
};

export default hoursOfOp;

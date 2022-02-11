const hoursOfOp = (data) => {
  let isOpen;

  if (data.hoursOfOperation) {
    const date = new Date();

    const opHours = data.hoursOfOperation.split(" - ");
    const morningHours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const eveningHours = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    let open = opHours[0].split(" ");
    let close = opHours[1].split(" ");
    let openingHour = +open[0].split(":")[0];
    let closingHour = +close[0].split(":")[0];

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

    isOpen = date.getHours() >= openingHour && date.getHours() < closingHour;
    return isOpen;
  }
};

export default hoursOfOp;

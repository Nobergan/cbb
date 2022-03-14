export default ({ id, hoursLeft = 12 }) => {
  const date = new Date();
  const hours = date.getHours();
  // date.setDate(todayDate + 2);
  date.setHours(hours + hoursLeft);
  const deadline = date.getTime();
  const timer = document.getElementById(id);
  const secondsSpan = timer.querySelector(".seconds");
  const minutesSpan = timer.querySelector(".minutes");
  const hoursSpan = timer.querySelector(".hours");
  // const daysSpan = timer.querySelector(".days");

  const getRemainingTime = () => {
    const total = deadline - new Date().getTime();
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    // const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    const hours = Math.floor(total / 1000 / 60 / 60);

    // const days = Math.floor(total / 1000 / 60 / 60 / 24);

    return {
      total,
      seconds,
      minutes,
      hours,
      // days,
    };
  };

  const updateTimer = () => {
    const remainingTime = getRemainingTime();
    if (remainingTime.total <= 0) {
      clearInterval(timerID);
      return;
    }

    hoursSpan.innerText = ("0" + remainingTime.hours).slice(-2) + ":";
    minutesSpan.innerText = ("0" + remainingTime.minutes).slice(-2) + ":";
    secondsSpan.innerText = ("0" + remainingTime.seconds).slice(-2);

    // hoursSpan
    //   ? (hoursSpan.innerText = ('0' + remainingTime.hours).slice(-2)) + ':'
    //   : null;
    // minutesSpan
    //   ? (minutesSpan.innerText = ('0' + remainingTime.minutes).slice(-2)) + ':'
    //   : null;
    // secondsSpan.innerText = ('0' + remainingTime.seconds).slice(-2);
    // daysSpan ? (daysSpan.innerText = remainingTime.days) : null;
  };

  updateTimer();

  const timerID = setInterval(() => {
    updateTimer();
  }, 1000);
};

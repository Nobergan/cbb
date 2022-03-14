export const initPlacesLeft = (id, timeout) => {
  const counter = document.getElementById(id);

  const updateCounter = () => {
    const oldNum = +counter.innerText;

    if (oldNum === 0) {
      return;
    }

    const newNum = oldNum - 1;
    counter.innerText = newNum;

    setTimeout(() => {
      updateCounter();
    }, timeout);
  };

  setTimeout(() => {
    updateCounter();
  }, timeout);
};

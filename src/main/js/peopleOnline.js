import { randomMinMax } from "./randomMinMax";

export const initPeopleOnline = (counterId, peopleId) => {
  const counter = document.getElementById(counterId);
  const peopleSpan = document.getElementById(peopleId);

  const numsSmall = [0, 1, 5, 6, 7, 8, 9];
  const numsBig = [11, 12, 13, 14, 15, 16, 17, 18, 19];

  const updateCounter = () => {
    const oldNum = +counter.innerText;
    const randomNum = randomMinMax(5, 20);
    const newNum = oldNum + randomNum;
    const numChunkSmall = Number(String(newNum).slice(-1));
    const numChunkBig = Number(String(newNum).slice(-2));
    const isSingular = numsSmall.includes(numChunkSmall) || numsBig.includes(numChunkBig);
    counter.innerText = newNum;
    peopleSpan.innerText = isSingular ? "человек" : "человека";

    setTimeout(() => {
      updateCounter();
    }, randomMinMax(5000, 15000));
  };

  setTimeout(() => {
    updateCounter();
  }, randomMinMax(5000, 15000));
};

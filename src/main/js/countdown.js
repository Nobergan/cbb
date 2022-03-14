const headerCountRef = document.querySelector(".header__count-num");
let i = 123;

function start() {
  setInterval(increase, 3000);
}
function increase() {
  if (i < 5999) {
    i = i + Math.floor(Math.random() * 10 + 1);
    headerCountRef.innerText = i;
  }
}

setTimeout(start, 3000);
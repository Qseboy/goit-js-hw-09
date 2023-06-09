const startBtnEl = document.querySelector('button[data-start]');
const stopBtnEl = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');

let setId = null;

const setRandomBgColor = () => {
  setId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);

  startBtnEl.setAttribute('disabled', true);
  stopBtnEl.removeAttribute('disabled');
};

const removeHandler = () => {
  if (setId) {
    clearInterval(setId);
    stopBtnEl.setAttribute('disabled', true);
    startBtnEl.removeAttribute('disabled');
  }
};

startBtnEl.addEventListener('click', setRandomBgColor);
stopBtnEl.addEventListener('click', removeHandler);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const buttonStartEl = document.querySelector('button[data-start]');
const buttonStopEl = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');
let timerId = null;

buttonStartEl.addEventListener('click', onBtnStartClick);
buttonStopEl.addEventListener('click', onBtnStopClick);

function onBtnStartClick() {
    timerId = setInterval(changeBodyColor, 1000);
    buttonStartEl.disabled = true;
    buttonStopEl.disabled = false;
    };

function changeBodyColor() {
    bodyEl.style.backgroundColor = getRandomHexColor();
}

function onBtnStopClick() {
    clearInterval(timerId);
    buttonStartEl.disabled = false;
    buttonStopEl.disabled = true;
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
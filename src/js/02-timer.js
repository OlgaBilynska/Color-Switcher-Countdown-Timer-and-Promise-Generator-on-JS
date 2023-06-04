import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';


const datePickerEl = document.querySelector('#datetime-picker');

const dataInputEls = document.querySelector('.data-input');
dataInputEls.style.paddingLeft = '100px';

const daysCounterEl = document.querySelector('[data-days]');
const hoursCounterEl = document.querySelector('[data-hours');
const minutesCounterEl = document.querySelector('[data-minutes]');
const secondsCounterEl = document.querySelector('[data-seconds]');

const btnEl = document.querySelector('[data-start]');
btnEl.style.backgroundColor = 'lightgreen';
btnEl.disabled = true;

const btnText = document.querySelector('.btn-text');
btnText.style.color = 'darkgreen';

const timerEl = document.querySelector('.timer');
timerEl.style.display = "flex";
timerEl.style.gap = "30px";
timerEl.style.padding = "50px";

const timerItemEls = document.querySelectorAll('.field');
timerItemEls.forEach((item) => {
    item.style.display = "flex";
    item.style.flexDirection = "column";
    item.style.alignItems = "center";
    item.style.borderRadius = '5px';
    item.style.border = '3px solid lightgreen'
});

const valueEls = document.querySelectorAll('.value');
valueEls.forEach((item) => {
    item.style.fontWeight = "bold";
    item.style.color = 'darkgreen';
});

const labelEls = document.querySelectorAll('.label');
labelEls.forEach((item) => {
    item.style.padding = '0px 5px';
})


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < Date.now()) {
           Notiflix.Notify.failure('Please choose a date in the future',{
               width: '50%',
               svgSize: '50%',
               timeout: 3000
           });
            return;
        }

        btnEl.disabled = false;
        datePickerEl.disabled = false;
        let timeLeft = selectedDates[0].getTime() - Date.now();
        
        btnEl.addEventListener('click', () => {
            btnEl.disabled = true;
            datePickerEl.disabled = true;
            let intervalId =  setInterval(() => {

              timeLeft -= 1000;
              const timeObject = convertMs(timeLeft);
              const timeFormatted = addLeadingZero(timeObject);
              timerInterfaceChange(timeFormatted);

               if (timeLeft <= 1000) {
                   clearInterval(intervalId);
                   datePickerEl.disabled = false;
                }
            }, 1000);           
        });        
    }
}

flatpickr(datePickerEl, options);


function timerInterfaceChange(timeObject) {
      daysCounterEl.textContent = timeObject.days;
      hoursCounterEl.textContent = timeObject.hours;
      minutesCounterEl.textContent = timeObject.minutes;
      secondsCounterEl.textContent = timeObject.seconds;
    }

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    let days = value.days.toString().padStart(2, '0');
    let hours = value.hours.toString().padStart(2, '0');
    let minutes = value.minutes.toString().padStart(2, '0');
    let seconds =  value.seconds.toString().padStart(2, '0');
    return { days, hours, minutes, seconds };
}
// class Timer {
//     #element;
//     #options;

//     constructor(elementSelector, options) {
//         this.#element = document.querySelector(elementSelector);
//         this.#options = options;

//         this.start();
//     }

//     start() {
//         setInterval(() => {
//             let now = Date.now();
//             let target = 
//         }, 1000);
//     }

//     stop() {
        
//     }
// }

// let timer = new Timer('.timer', {
//     label: 'До обраної дати:',
//     target: datePickerEl.value,
// });


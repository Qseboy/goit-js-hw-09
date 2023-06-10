import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputEl = document.querySelector('#datetime-picker');
const btnEl = document.querySelector('button[data-start]');

const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');

btnEl.setAttribute('disabled', true);
let intervalID = null;

// flatpickr init and options
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const dateNow = new Date();
    if (selectedDates[0].getTime() > dateNow.getTime()) {
      btnEl.removeAttribute('disabled');
      setTimerValues(selectedDates[0].getTime());
      return;
    }

    // alert('Please choose a date in the future');
    Notiflix.Notify.failure('Please choose a date in the future');
    btnEl.setAttribute('disabled', true);
  },
};

flatpickr(inputEl, options);

const setTimerValues = selectedDate => {
  intervalID = setInterval(() => {
    let currentDate = new Date();
    const { days, hours, minutes, seconds } = convertMs(
      selectedDate - currentDate
    );
    addLeadingZero({ days, hours, minutes, seconds });

    // addLeadingZero(convertMs(selectedDate - currentDate));

    //   stop timer when time is over
    if (days == 0 && hours == 0 && minutes == 0 && seconds == 0) {
      clearInterval(intervalID);
      btnEl.setAttribute('disabled', true);
      return;
    }
  }, 1000);
};

// Formating and rendering date
const addLeadingZero = value => {
  const { days, hours, minutes, seconds } = value;
  // seconds
  seconds >= 10
    ? (secondsEl.textContent = seconds)
    : (secondsEl.textContent = `0${seconds}`);

  // minutes
  minutes >= 10
    ? (minutesEl.textContent = minutes)
    : (minutesEl.textContent = `0${minutes}`);

  // hours
  hours >= 10
    ? (hoursEl.textContent = hours)
    : (hoursEl.textContent = `0${hours}`);

  // days
  days < 10 ? (daysEl.textContent = `0${days}`) : (daysEl.textContent = days);
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

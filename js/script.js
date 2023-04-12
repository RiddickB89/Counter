const videoEl = document.querySelector(".video-background");
const formEl = document.querySelector(".event");
const inputTextEl = document.querySelector(".event__input--text");
const inputDateEl = document.querySelector("#event-date");
const timerContainerEl = document.querySelector(".timer-container");
const timerEl = document.querySelector(".timer");
const timerTitleEl = document.querySelector(".timer-title");
const timerNumbersEl = document.querySelectorAll(".timer__nb");
const submitBtnEl = document.querySelector("#submitBtn");
const resetBtnEl = document.querySelector("#resetBtn");

const day = 24 * 60 * 60;
const hour = 60 * 60;
const minute = 60;
let savedCountdown;
let countdown;
let eventDate = Date;
let eventName = "";

(function () {
  const date = new Date();
  const dateISO = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);
  inputDateEl.setAttribute("min", dateISO);
})();

const showCountdownEvent = function () {
  formEl.style.cssText = `display:none`;
  timerEl.style.cssText = `display:flex`;
  timerContainerEl.style.cssText = `display:flex`;
  videoEl.hidden = false;
};

const showCountdownForm = function () {
  formEl.style.cssText = `display:flex`;
  videoEl.hidden = true;
  timerContainerEl.style.cssText = `display:none`;
};

const eventHasBegun = function () {
  clearInterval(countdown);
  timerEl.style.cssText = `display:none`;
  timerTitleEl.textContent = `${eventName.toUpperCase()} HAS STARTED ! `;
  timerTitleEl.style.cssText = `margin-bottom: 2rem`;
};

const setCountdownTimer = function () {
  const currentDate = Date.now();
  const timeLeft = (eventDate - currentDate) / 1000;
  const daysLeft = Math.floor(timeLeft / day);
  const hoursLeft = Math.floor((timeLeft % day) / hour);
  const minutesLeft = Math.floor((timeLeft % hour) / minute);
  const secondsLeft = Math.floor(timeLeft % minute);
  const timeLeftArr = [daysLeft, hoursLeft, minutesLeft, secondsLeft];
  timerNumbersEl.forEach((timerEl, index) => {
    timerEl.textContent = `${timeLeftArr[index]}`;
  });
  if (timeLeft < 1) {
    localStorage.removeItem("time");
    eventHasBegun();
  }
};

const showCountdownTimer = function () {
  countdown = setInterval(function () {
    setCountdownTimer();
  }, 1000);
};

const showCountdownTitle = function () {
  timerTitleEl.textContent = `The ${eventName.toLowerCase()} will begin in`;
};

formEl.addEventListener("submit", function (e) {
  e.preventDefault();
  eventName = e.target[0].value;
  eventDate = new Date(e.target[1].value).getTime();
  savedCountdown = {
    savedEventName: eventName,
    savedEventDate: eventDate,
  };
  localStorage.setItem("time", JSON.stringify(savedCountdown));
  showCountdownTimer();
  showCountdownTitle();
  showCountdownEvent();
});

resetBtnEl.addEventListener("click", function () {
  clearInterval(countdown);
  localStorage.removeItem("time");
  showCountdownForm();
});

(function () {
  if (!localStorage.getItem("time")) return;
  showCountdownEvent();
  savedCountdown = JSON.parse(localStorage.getItem("time"));
  eventName = savedCountdown.savedEventName;
  eventDate = new Date(savedCountdown.savedEventDate).getTime();
  showCountdownTitle();
  showCountdownTimer();
})();

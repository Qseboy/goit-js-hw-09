import Notiflix from 'notiflix';
const formEl = document.querySelector('.form');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const callCreatePromise = event => {
  event.preventDefault();
  const { amount, delay, step } = event.target;
  let delayWithStep = +delay.value;

  for (let i = 0; i < +amount.value; i++) {
    if (i > 0) delayWithStep += +step.value;
    createPromise(i, delayWithStep)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
        // console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
        // console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
};

formEl.addEventListener('submit', callCreatePromise);

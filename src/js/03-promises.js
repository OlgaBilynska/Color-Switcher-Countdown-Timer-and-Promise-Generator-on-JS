import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');
const btnSubmitEl = document.querySelector('button');

formEl.addEventListener('submit', createPromises);

function createPromises(event){
  event.preventDefault();

  let delay = Number(formEl.delay.value);
  let step = Number(formEl.step.value);
  let amount = Number(formEl.amount.value);
  let position = 1;

  for (let i = 0; i < formEl.amount.value; i++) {
    newPromise(position, delay)
      .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {
    clickToClose: true,
    timeout: 4000,
  });
  })
  .catch(({ position, delay }) => {
   Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
    clickToClose: true,
    timeout: 4000,
  });
  });;
    position += 1;
    delay += step;
  }
  
}

function newPromise( position, delay ) {
return new Promise((resolve, reject) => {
  const shouldResolve = Math.random() > 0.3;

  setTimeout(() => {
        if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
    }, delay);
});
}


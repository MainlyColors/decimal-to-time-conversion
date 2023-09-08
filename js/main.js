//Example fetch using pokemonapi.co
// document.querySelector('button').addEventListener('click', getFetch);

function init() {
  const hours = localStorage.getItem('hours');

  if (!hours) {
    localStorage.setItem('hours', [8, 6, 4]);
  }
}

function updateLocalStorage(num) {
  const hours = localStorage.getItem('hours').split(',');
  localStorage.setItem('hours', [...hours, num]);
}

init();

function createResultElement(output) {
  const h2 = document.createElement('h2');
  h2.textContent = output;
  h2.classList.add('result');

  return h2;
}

const decimalOutputEl = document.querySelector('#decimal-output');

function convertDecimalToTime(num) {
  const hr = Math.trunc(num);
  let min = Math.trunc((num - hr) * 60);
  let sec = Math.floor(Math.round(((num - hr) * 60 - min) * 60));

  // to handle rounding
  if (sec === 60) {
    min += 1;
    sec = 0;
  }

  return `${hr}hrs ${min}mins ${sec}secs`;
}

document.querySelector('#decimal-convert--js').addEventListener('click', displayConversion);

function displayConversion() {
  const input = document.querySelector('input').value;

  if (input.match(/[^0-9-.]+/g)?.length >= 1) return;

  const resultEl = createResultElement(convertDecimalToTime(Number(input)));
  decimalOutputEl.innerHTML = '';
  decimalOutputEl.appendChild(resultEl);
}

document.querySelector('form').addEventListener('submit', e => {
  e.preventDefault();
  displayConversion();
});

//nav tabs

const header = document.querySelector('#header--js');

header.addEventListener('click', e => {
  const elClasses = Array.from(e.target.classList);
  const gate = elClasses.some(cl => cl.includes('tab'));
  if (!gate) return;

  header.classList.toggle('decimal-active');
  header.classList.toggle('hour-active');
});

// hour counter code

const startTimeEl = document.querySelector('#start-time');
const endTimeEl = document.querySelector('#end-time');
const hourOutputEl = document.querySelector('#hour-output');

// need error handling for when the time isn't completely filled out
// both ints
function updateHoursOutput(valueInMS) {
  const hrMinMS = 1000 * 60 * 60;
  const minMS = 1000 * 60;
  const hr = Math.floor(valueInMS / hrMinMS);
  // 6
  const min = Math.floor((valueInMS - hr * hrMinMS) / minMS);
  const sec = (valueInMS - hr * hrMinMS - min * minMS) / 1000;

  hourOutputEl.innerHTML = '';
  hourOutputEl.appendChild(createResultElement(`${hr}hrs ${min}mins ${sec}secs`));

  // return `${hr}hrs ${min}mins ${sec}secs`;
}

function convertIntToMS(int) {
  return int * 1000 * 60 * 60;
}

function addTime(startTime, numInMS) {
  return startTime + numInMS;
}

function addEndTime(num) {
  const newTime = addTime(startTimeEl.valueAsNumber, convertIntToMS(num));
  endTimeEl.valueAsNumber = newTime;
}

// add hours

const addHoursContainer = document.querySelector('#add-hours--js');

addHoursContainer.addEventListener('click', e => {
  if (e.target.nodeName !== 'BUTTON') return;

  const num = Number.parseFloat(e.target.textContent);

  addEndTime(num);
  // output
  updateHoursOutput(endTimeEl.valueAsNumber - startTimeEl.valueAsNumber);
});

// add hour form
function AddNewButton(value) {
  const button = document.createElement('button');
  button.type = 'button';
  button.classList.add('btn');

  button.textContent = `+${value}`;

  addHoursContainer.insertAdjacentElement('beforeend', button);
}

// load buttons from local storage
function addExistingButtonsFromStorage() {
  const hours = localStorage.getItem('hours').split(',').map(Number);
  const existingButtons = [];
  // grab existing buttons

  const allButtons = Array.from(addHoursContainer.children);
  allButtons.forEach(el => {
    if (el.nodeName === 'BUTTON') {
      existingButtons.push(Number.parseFloat(el.textContent));
    }
  });

  hours.forEach(value => {
    // check if it already exists
    if (!existingButtons.includes(value)) {
      AddNewButton(value);
    }
  });
}

const addHoursForm = document.querySelector('#add-hours-form--js');

const customTimeInput = document.querySelector('#custom-time--js');

addHoursForm.addEventListener('submit', e => {
  e.preventDefault();

  // check value for empty decimal place
  let value = customTimeInput.value;
  if (value.includes('.')) {
    const numArr = value.split('.');
    const decimal = Number(numArr[1]);
    if (decimal === 0) {
      value = numArr[0];
    }
  }

  AddNewButton(value);
  addEndTime(value);
  updateHoursOutput(endTimeEl.valueAsNumber - startTimeEl.valueAsNumber);
  updateLocalStorage(value);
  //update local storage
  // update end
});

// sun to moon https://codepen.io/claudiosc8/pen/QqpoOm

// check for change in timer

[startTimeEl, endTimeEl].forEach(el => {
  el.addEventListener('change', e => {
    updateHoursOutput(endTimeEl.valueAsNumber - startTimeEl.valueAsNumber);
  });
});

addExistingButtonsFromStorage();

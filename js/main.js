//Example fetch using pokemonapi.co
// document.querySelector('button').addEventListener('click', getFetch);

function createResultElement(output) {
  const h2 = document.createElement('h2');
  h2.textContent = output;
  h2.classList.add('result');

  return h2;
}

const outputEl = document.querySelector('#output');

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

document.querySelector('button').addEventListener('click', displayConversion);

function displayConversion() {
  const input = document.querySelector('input').value;

  if (input.match(/[^0-9-.]+/g)?.length >= 1) return;

  const resultEl = createResultElement(convertDecimalToTime(Number(input)));
  outputEl.innerHTML = '';
  outputEl.appendChild(resultEl);
}

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  displayConversion();
});

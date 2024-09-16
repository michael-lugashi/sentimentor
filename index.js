'use strict';
checkSentiment.onclick = positiveOrNegative;
// const elem = document.documentElement
// if (elem.requestFullscreen) {
//   elem.requestFullscreen();
// } else if (elem.webkitRequestFullscreen) {
//   /* Safari */
//   elem.webkitRequestFullscreen();
// } else if (elem.msRequestFullscreen) {
//   /* IE11 */
//   elem.msRequestFullscreen();
// }
// can't switch to full screen without user gesture
async function positiveOrNegative() {
  // clear classes from previous click
  sentimentResult.className = '';

  // added loading animation
  sentimentResult.textContent = '';
  sentimentResult.classList.add('result-loading');

  // collects text
  const text = document.getElementsByName('text')[0].value;

  // API fetching data from the server.
  const response = await fetch(`https://sentim-api.herokuapp.com/api/v1/`, {
    method: 'POST',

    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text,
    }),
  });

  // remove loading animation
  sentimentResult.classList.remove('result-loading');

  // if the request is valid the sentiment result will be displayed
  // else an error will appear
  catImage.setAttribute('src', `https://http.cat/${response.status}`);
  if (response.ok) {
    const data = await response.json();
    const {
      result: { polarity, type },
    } = data;
    sentimentResult.classList.add('result-display');
    sentimentResult.classList.add(type);
    sentimentResult.textContent = `${polarity} ${type}`;
  } else {
    sentimentResult.classList.add('negative');
    sentimentResult.textContent = 'YOUR INPUT IS INVALID';
    throw new Error('Your input is invalid');
  }
}

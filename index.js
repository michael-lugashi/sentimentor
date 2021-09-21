'use strict'
checkSentiment.onclick = positiveOrNegative;

async function positiveOrNegative(event) {
    sentimentResult.className = ''
    sentimentResult.textContent = ''
    sentimentResult.classList.add('result-loading')
    let text = document.getElementsByName('text')[0].value;
    let response = await fetch(`https://sentim-api.herokuapp.com/api/v1/`, {
        method: "POST",

        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            text
        })
    })
    let data = await response.json()
    console.log(data);
    let { result: { polarity, type } } = data
    console.log(polarity)
    console.log(type)
    sentimentResult.classList.remove('result-loading')
    sentimentResult.classList.add('result-display')
    sentimentResult.classList.add(type)
    sentimentResult.textContent = `${polarity} ${type}`
}
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
    sentimentResult.classList.remove('result-loading')
    if(response.ok) {
        let data = await response.json()
        let { result: { polarity, type } } = data
        sentimentResult.classList.add('result-display')
        sentimentResult.classList.add(type)
        sentimentResult.textContent = `${polarity} ${type}`
    } else {
        sentimentResult.classList.add('negative')
        sentimentResult.textContent = 'YOUR INPUT IS INVALID'
        throw new Error('Your input is invalid')
    }
}
'use strict'
async function positiveOrNegative(event) {
    result.textContent = ''
    result.classList.add('loading')
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
    result.classList.remove('loading')
    result.textContent = `${polarity} ${type}`

}
sendToAPI.onclick = positiveOrNegative;
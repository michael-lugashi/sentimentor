'use strict'
async function positiveOrNegative(event) {
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
}
sendToAPI.onclick = positiveOrNegative;
import json from "./map.json" with {type: "json"}

// TODO: SISTEMARE
console.log("Hello world")
let bigDiv = document.getElementsByClassName("content")[0]

function delay(seconds) {
    return new Promise(res => setTimeout(res, 1000*seconds))
}

function refreshPage() {
    // bigDiv.innerHTML += "<p>" + json[0] + "</p>"
    // console.log(json[0])
    let innerH = ""
    for (let f of json) {
        if (f.endsWith(".jpg") || f.endsWith(".png")) {
            innerH += `<img src="Media/${f}">`  // TODO: APPLY CSS AS WELL
        }
        else if (f.endsWith(".mp4") || f.endsWith(".mkv")) {
            innerH += `<video controls> <source src="Media/${f}"> </video>`
        }
    }
    bigDiv.innerHTML = innerH
}

refreshPage()
while (true) {
    await delay(60).then(refreshPage)
}

import json from "./map.json" with {type: "json"}

let bigDiv = document.getElementsByClassName("content")[0]

function delay(seconds) {
    return new Promise(res => setTimeout(res, 1000*seconds))
}

function refreshPage() {
    let innerH = bigDiv.innerHTML
    for (let f of json) {
        let toadd = ""
        if (f.endsWith(".jpg") || f.endsWith(".png")) {
            toadd = `<img src="Media/${f}">`  // TODO: APPLY CSS AS WELL
        }
        else if (f.endsWith(".mp4") || f.endsWith(".mkv")) {
            toadd = `<video controls> <source src="Media/${f}"> </video>`
        }
        if (!(innerH.includes(`Media/${f}`))) {
            innerH += toadd
        }
    }
    bigDiv.innerHTML = innerH
}

refreshPage()
// while (true) {   // THIS CAUSES SITE TO RELOAD AND THUS IS DEPRECATED; TODO: ADD A REFRESH BUTTON
//     await delay(60).then(refreshPage)
// }

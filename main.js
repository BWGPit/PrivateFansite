import json from "./map.json" with {type: "json"}

let imageDiv = document.getElementsByClassName("pics")[0]
let vidsDiv = document.getElementsByClassName("vids")[0]

function delay(seconds) {
    return new Promise(res => setTimeout(res, 1000*seconds))
}

function refreshPage() {
    for (let f of json) {
        if (f.endsWith(".jpg") || f.endsWith(".png") || f.endsWith(".JPG")) {
            imageDiv.innerHTML += `<img src="Media/${f}">`  // TODO: APPLY CSS AS WELL
        }
        else if (f.endsWith(".mp4") || f.endsWith(".mkv")) {
            vidsDiv.innerHTML += `<video controls> <source src="Media/${f}"> </video>`
        }
    }
}

refreshPage()
// while (true) {   // THIS CAUSES SITE TO RELOAD AND THUS IS DEPRECATED; TODO: ADD A REFRESH BUTTON
//     await delay(60).then(refreshPage)
// }

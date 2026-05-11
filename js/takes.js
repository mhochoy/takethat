import {get_takes} from "../netlify/functions/crud.js";

const http = new XMLHttpRequest();

http.open("GET", "http://localhost:8000/takes", false);
http.send();

document.addEventListener("DOMContentLoaded", () => {
    const takesTarget = document.getElementById("takes");

    if (takesTarget) {
        var map = get_takes();
        map[0].forEach((take) => {
            takesTarget.innerHTML += 
           `<div class="take">
                <div id="message">
                    <p><em>${take["id"]}</em></p>
                </div>
                <div id="author">
                    <p><small>by ${take["author"]}</small></p>
                </div>
                <div id="date">
                    <p><small>submitted on ${take["date"]}</small></p>
                </div>
            </div>`
        })
    }
})
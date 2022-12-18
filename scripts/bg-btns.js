"use strict"

let getRnd = function( max ) { return Math.floor( max * Math.random()); }

let dw = +window.innerWidth;
let dh = +document.body.scrollHeight;

function createButtons(amount) {
    let buttons = []
    let srcLen = 4;
    let parent = document.querySelector(".flying-buttons");
    parent.style.height = dh + "px";
    // parent.style.width = dw + "px";

    for (let i = 0; i < amount; i++) {
        let btn = document.createElement("img");
        btn.src = "../img/buttons/Button" + getRnd(4) + ".png";
        btn.className = "bg-btn";
        btn.style.top = getRnd(dh).toString() + "px";
        btn.style.left = getRnd(dw).toString() + "px";
        btn.id = "bg-button" + i; 

        buttons[i] = btn;
        parent.append(buttons[i]);
    }
    return buttons;
}



let buttons = createButtons(50);

let anim = gsap.to(".bg-btn", {
                ease: "none",
                x:"random(-1000, 1000, 5)",
                y: "random(-1000, 1000, 5)", 
                rotation: "random(-1000, 1000, 5)",
                duration: 50,
                repeat: -1,
                repeatRefresh: true
            });
let play = anim.play();
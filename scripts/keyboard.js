document.addEventListener("keydown", highlightButton)
document.addEventListener("keyup", resetButton)

function highlightButton(event) {
    event.preventDefault();
    console.log(`pressed: ${event.key}`);
    let k = event.key;
    let el = document.querySelector(`[data-key="${k}"]`)
    el.style.fill = 'red';
}

function resetButton(event) {
    event.preventDefault();
    console.log(`released: ${event.key}`);
    let k = event.key;
    let el = document.querySelector(`[data-key="${k}"]`)
    el.style.fill = '#fff';
}
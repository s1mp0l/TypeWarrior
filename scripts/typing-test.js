import { Line } from "./Line.js";
import { TaskTimer } from "./Timer.js";

// LANG SET
function changeLang() {
    let langs = ["eng", "ru"];
    lang = langs[ (langs.indexOf(lang) + 1) % langs.length ]; 
    console.log( (langs.indexOf(lang) + 1) % langs.length ) ;
    localStorage.setItem('testLang', lang)
    panelLang.innerHTML = lang

    line1 = new Line(lang, 6);
    line2 = new Line(lang, 6);
    setLine(line1, line2);
    playing = false;
    wordCount = 0;
    mistakes = 0;
    typedSymbolsCount = 0;
}

// CONSTS
localStorage.setItem('testLang', "ru")
let lang = localStorage.getItem('testLang')

let textArea = document.querySelector('.panel__show-area')
let inputElement = document.querySelector('.panel__input')

// TIMER CONSTS
let timerText = document.querySelector('.panel__timer-text')
let startBtn = document.querySelector('.panel__start-btn')

let panelLang = document.querySelector('.panel__lang')
let panelLangButton = document.querySelector('.panel__lang-btn')

// CHECK LINE
function setLine(line1, line2) {
    textArea.innerHTML = line1.getString() + line2.getString();
}

// CHECKING WORDS FUNCTION
function checkLine(line1, line2) {
    typedSymbolsCount++;

    // CHECK FOR INCORRECT
    if (!line1.getFirst().startsWith(inputText.value.trim()) ) {
        line1.incorrect();
        setLine(line1, line2);
        mistakes++;
    }
    else {
        line1.correct();
        setLine(line1, line2);
    }

    // CHECK FOR CORRECT WORD
    if (inputText.value.trim() == line1.getFirst()) {
        line1.completeWord();
        wordCount++;

        // CHECK IF LINE COMPLETES
        if (line1.checkComplete()) {
            line1 = line2;
            line2 = new Line(lang, 6);
        }

        setLine(line1, line2);
        inputText.value = ""
    }

    return [line1, line2]
}

// START INIT
let line1 = new Line(lang, 6);
let line2 = new Line(lang, 6);
setLine(line1, line2);
let playing = false;
let wordCount = 0;
let mistakes = 0;
let typedSymbolsCount = 0;

// TIMER INIT
let timer = new TaskTimer("task1", 60, function() {
    timerText.innerHTML = this.toTimeString();
    endPlay();
},
function() {
    timerText.innerHTML = this.toTimeString();
});

// START
function startPlay (restart) {
    playing = true;
    wordCount = 0;
    timer.start();
    if (restart) {
        line1 = new Line(lang, 6);
        line2 = new Line(lang, 6);
        setLine(line1, line2);
    }
    console.log(line1.getString() + "\n" + line2.getString());   
    inputElement.addEventListener('input', () => [line1, line2] = checkLine(line1, line2));
}

// GAME OVER
function endPlay () {
    playing = false;
    localStorage.setItem('lastTestResult', wordCount);
    localStorage.setItem('lastTestAccuracy', Math.round( (typedSymbolsCount - mistakes)/typedSymbolsCount*100) ?? 100 );
    window.location.href="result.html";
    console.log(`Ваш WPM: ${wordCount}`);
}

// SETTING EVENT LISTENERS FOR START AND RESET
console.log(startBtn)
if(startBtn) startBtn.addEventListener('click', () => { startPlay(true); });
if(panelLangButton) panelLangButton.addEventListener('click', () => { changeLang(); });
if (inputElement) inputElement.addEventListener('input', () => { if(!playing) startPlay(false); });

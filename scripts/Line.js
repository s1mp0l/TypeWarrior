import { generateWordsEnglish, generateWordsRussian } from "./generate-words.js";

// LINE OBJ
export function Line(lang, size) {
    if (lang == "eng") this.words = generateWordsEnglish(size);
    if (lang == "ru") this.words = generateWordsRussian(size);
    this.right = [];
    this.wrong = "";
    this.unTyped = [...this.words];
}

Line.prototype.checkComplete = function () {
    if (this.right.length == this.words.length) return true
    else return false
};

Line.prototype.getString = function () {
    return `<p><span style="color: green;">${this.right.join(" ")}</span> <span style="color: red;">${this.wrong}</span> <span>${this.unTyped.join(" ")}</span></p>`
};

Line.prototype.getFirst = function () {
    console.log(this.wrong || this.unTyped[0])
    return this.wrong || this.unTyped[0];
}

Line.prototype.completeWord = function () {
    let tmp;
    if (this.wrong) {
        tmp = this.wrong
        this.wrong = "";
    }
    else {
        tmp = this.unTyped.shift();
    }
    this.right.push(tmp);
}

Line.prototype.incorrect = function () {
    if (!this.wrong) { 
        let tmp = this.unTyped.shift();
        this.wrong = tmp;
    }
}

Line.prototype.correct = function () {
    if (this.wrong) {
        this.unTyped.unshift(this.wrong)
        this.wrong = "";
    }
}


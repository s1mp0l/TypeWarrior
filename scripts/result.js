// RESULT
let resultWPM = document.querySelector('.result__title')
let resultAccuracy = document.querySelector('.result__text')

resultWPM.innerHTML = `Твоя скорость печати ${localStorage.getItem('lastTestResult')} WPM!`
resultAccuracy.innerHTML = `Точность ${localStorage.getItem('lastTestAccuracy')}%`
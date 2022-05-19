'use strict'
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
    't', 'u', 'v', 'w', 'x', 'y', 'z'];

const categories = [
    ['google', 'youtube', 'facebook', 'instagram'],
    ['media', 'teamwork', 'deadline', 'creativity'],
    ['manchester', 'milan', 'madrid', 'amsterdam'],
];

const hints = [
    ['It knows everything', 'If your teacher is bad at teaching there is always an indian guy on ...', 'It know everything about you and it is not Santa Claus', 'The place where you pretend everthing is glam'],
    ['Mobiles, laptops, TV, newspapers, facebook, instragram, tiktok, etc', 'Working together cooperatively', 'Due date', 'Rich imagination'],
    ['Northen city in the UK', 'Home of AC and Inter', 'Spanish capital', 'Netherlands capital'],
];
//------------------------------------------------------------HERE ARE THE GAMES FUNCTIONS!-----------------------------------------------------------------------------------------------------------------------------------------------------
const wordSelector = function () {
    let category = Math.trunc(Math.random() * 2) + 1;                                           // Choosing the category
    let selectedWord = Math.trunc(Math.random() * 3) + 1;                                       // Choosing the word

    hintBtn.addEventListener('click', function () {                                             // Hint for narrowing down the hidden word
        document.getElementById('help').innerHTML = hints[category][selectedWord];
    })

    return categories[category][selectedWord];                                                  // Returning the selected word
}

const startScreen = function () {
    tittle.textContent = 'Hangman';                                                             // Sets game tittle  
    for (let i = 0; i < wordToGuess.length; ++i) { wordPlaceHolder.push('_'); }                 // Creates game placeholder
    word.textContent = wordPlaceHolder.join(' ');                                               // Sets game placeholder
    lives.textContent = `Lives left: ${score}`;                                                 // Setting up the game starting lives
}

const findLetter = function (btnIndex) {
    for (let j = 0; j < wordToGuess.length; ++j) {                                              // Searching for a match
        if (letters[btnIndex] === wordToGuess[j]) wordPlaceHolder[j] = letters[btnIndex];       // If match found replace in '_' with letter in placeholder
    }
}

const disableBtn = function (btnIndex) {
    buttons[btnIndex].disabled = true;                                                          // If button was selected, disable
    buttons[btnIndex].style.backgroundColor = "#333";                                           // After disabling the button change color
}

const decreaseScore = function () {
    --score;                                                                                    // Decrement life point
    lives.textContent = `Lives left: ${score}`;                                                 // Update status
}

const endGame = function () {

    if (score === 0) {                                                                          // If your score hit 0 then you lost the game
        document.querySelector('.main').classList.add('hidden');
        document.body.classList.remove('game-on');
        document.body.classList.add('game-off');
        document.querySelector('.game-end').classList.remove('hidden');
        document.getElementById('status').textContent = `You have lost!`
        document.getElementById('answer').textContent = `The word was: " ${wordToGuess} "`;
    }

    if (!wordPlaceHolder.includes('_')) {                                                       //If there are no more '_' then you've won the game
        document.querySelector('.main').classList.add('hidden');
        document.querySelector('.game-end').classList.remove('hidden');
        document.getElementById('status').textContent = `You have won!`
        document.getElementById('answer').textContent = `The word was: " ${wordToGuess} "`;

    }
}
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const tittle = document.getElementById('tittle');                           // Setting 'tittle' object
const word = document.getElementById('word');                               // Setting word 'placeholder' object
const lives = document.getElementById('lives');                             // Setting life score counter;
const hintBtn = document.querySelector('.hint');                            // Setting hint button
const btnLetters = document.getElementById('letters');                      // Setting letter buttons container
const wordPlaceHolder = [];                                                 // Placeholder array
let score = 7;                                                              // Life score
let wordToGuess = wordSelector();                                           // Storing the selected word into a variable

startScreen();                                                              // Loading game

for (let i = 0; i < letters.length; ++i) {                                  // Generatign the games letter selection
    btnLetters.innerHTML += `<button class="btn">${letters[i]}</button>`
}

const buttons = document.querySelectorAll('.btn');

for (let i = 0; i < letters.length; ++i) {
    buttons[i].addEventListener('click', function () {

        if (wordToGuess.includes(letters[i])) findLetter(i);                // Searching for letter
        else decreaseScore();                                               // If letter does not exist 

        word.textContent = wordPlaceHolder.join(' ');                       // Updating the placeholder text

        if (score <= 3) hintBtn.style.backgroundColor = '#740d0d';          // If the hint button wasn't used it will lit up when you have 3 more tries

        endGame();                                                          // Acording to your score the screen will be changed 
        disableBtn(i);                                                      // After a button was 'used' it wil be disabled and it's color will also change
    })
}
// Restarts the game
document.querySelector('.reset-btn').addEventListener('click', function () { location.reload() }); 

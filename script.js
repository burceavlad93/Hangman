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
    ['Mobiles, laptops, TV, newspapers, facebook, instragram, tiktok, etc', 'Working together cooperatively', 'Limited timeframe', 'Rich imagination'],
    ['Northen city in the UK', 'Home of AC and Inter', 'Spanish capital', 'Netherlands capital'],
];
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const tittle = document.getElementById('tittle');           // Setting 'tittle' object
const word = document.getElementById('word');               // Setting word 'placeholder' object
const lives = document.getElementById('lives');             // Setting life score counter;
const hintBtn = document.querySelector('.hint');            // Setting hint button
const btnLetters = document.getElementById('letters');      // Setting letter buttons container
const wordPlaceHolder = [];                                 // Placeholder array
let score = 7;                                              // Life score

// Selecting the word
let category = Math.trunc(Math.random() * 2) + 1;           // Choosing the category
let selectedWord = Math.trunc(Math.random() * 3) + 1;       // Choosing the word
let gameWord = categories[category][selectedWord];          // Storing the word into a new variable

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Setting up the game tittle
tittle.textContent = 'Hangman';                             // Game tittle                          

// Storing the word into a array as '_' and not a char
for (let i = 0; i < gameWord.length; ++i) {
    wordPlaceHolder.push('_');                              // Game Placeholder
}

// Setting up the game placeholder
word.textContent = wordPlaceHolder.join(' ');

// Setting up the game starting lives
lives.textContent = `Lives left: ${score}`;

// Hint for narrowing down the hidden word
hintBtn.addEventListener('click', function () {
    document.getElementById('help').innerHTML = hints[category][selectedWord];
})

// Generatign the games letter selection
for (let i = 0; i < letters.length; ++i) {
    btnLetters.innerHTML += `<button class="btn">${letters[i]}</button>`
}

// Selectin all the buttons for event listener
const buttons = document.querySelectorAll('.btn');

for (let i = 0; i < letters.length; ++i) {
    buttons[i].addEventListener('click', function () {

        //Each button has an index and that index represents a letter for the 'letters array' and if the word contains that letter then it will return true
        if (gameWord.includes(letters[i])) {

            //Will loop through the selected word and the index of the selected letter will replace the '_' char in the placeholder object
            for (let j = 0; j < gameWord.length; ++j) {
                if (letters[i] === gameWord[j]) {
                    wordPlaceHolder[j] = letters[i];
                }
            }

            //If the statement returns false, the life points will drop by 1 and the status will be updated
        } else {
            --score;
            lives.textContent = `Lives left: ${score}`;
        }

        //Updating the placeholder text
        word.textContent = wordPlaceHolder.join(' ');

        //If the hint button wasn't used it will lit up when you have 3 more tries
        if (score <= 3) {
            hintBtn.style.backgroundColor = '#740d0d'
        }

        // If your score hits 0, your screen will update informing you that you lost revealing the word and the 'Try again button'
        if (score === 0) {
            document.querySelector('.main').classList.add('hidden');
            document.body.classList.remove('game-on');
            document.body.classList.add('game-off');
            document.querySelector('.game-end').classList.remove('hidden');
            document.getElementById('status').textContent = `You have lost!`
            document.getElementById('answer').textContent = `The word was: " ${gameWord} "`;
        }

        // If you won, your screen will update informing you that you won reavealing the word and the 'Try again button'
        if (!wordPlaceHolder.includes('_')) {
            document.querySelector('.main').classList.add('hidden');
            document.querySelector('.game-end').classList.remove('hidden');
            document.getElementById('status').textContent = `You have won!`
            document.getElementById('answer').textContent = `The word was: " ${gameWord} "`;

        }

        //After a button was 'used' it wil be disabled and it's color will also change
        buttons[i].disabled = true;
        buttons[i].style.backgroundColor = "#333";

    })
}

// Resets the game
document.querySelector('.reset-btn').addEventListener('click', function () { location.reload() });

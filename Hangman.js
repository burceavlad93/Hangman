const words = ['Six', 'Alphabet', 'Depression', 'Shopping', 'Facebook', 'School', 'Maintanance', 'Project', 'Framework', 'Temperature', 'Constructor' ];
const numberWords = words.length;
let randomWord = Math.trunc(Math.random() * numberWords);

const hangWord = words[randomWord];
const guessWord= Array.from(hangWord);
const hiddenWord = Array.from(hangWord)
let lives = 7;

for(let i = 1; i < guessWord.length-1; ++i) {
	guessWord[i] = '_';
}

document.getElementById("guess").innerHTML = guessWord.join(" ");

function check() {
    let letter = document.getElementById("get").value;
    document.getElementById("get").value = "";
    
    if(hiddenWord.includes(letter)) {
    	for (let i = 1; i < guessWord.length - 1; ++i) {
      	if (hiddenWord[i] == letter) {
        	guessWord[i] = letter;
        } 
      }
    } else if (letter == "" ) {
   		++cheat;
    	alert("Please enter a letter in the input")
    } else {
    	--lives;
    	document.getElementById("lives").innerHTML = `Tries left: ${lives}`;
    }
    
    if (lives == 0) {
    	alert (`The word was "${words[randomWord]}". Try Again!`)
      location.reload();
    }
    
    
   document.getElementById("guess").innerHTML = guessWord.join(" ");
}

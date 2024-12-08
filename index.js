/*
You are going to build an app that challenges players to identify a Christmas Movie from some emoji 🍿 🎅 🎬. The players will have 3 guesses per movie.

For example, the emoji 🌇 💣 👮 ✈️ ️🔫  represent the film “Die Hard”, which everyone knows is the best Christmas movie of all time.

In data.js you have an array of Christmas movies with emoji and text for aria labels.

Your task is to build an app that meets these criteria:

- The app should present the player with a set of emoji selected at random from the array in data.js. 

- The player will input their guess.

- If the player guesses correctly, the app should display a message saying "Correct!". Then, after a pause of 3 seconds, it should randomly select the next set of emoji clues and display them to the player.

- If the player’s guess is incorrect, the app should display a message saying “Incorrect! You have 2 more guesses remaining.”

- If the player fails to guess correctly on the next two attempts, the app should display a message saying, `The film was <Film Name Here>!`. After a pause of 3 seconds, it should randomly select a new set of emoji clues and display them to the player.

- When all films in the array have been used, the player should see a message saying "That's all folks!".

- Each film should only be used once. There should be no repetition. 


Stretch Goals

- Use AI to decide if an answer is correct or incorrect. For example if the correct answer is "The Polar Express" but the player inputs "Polar Express" a straight comparison of the two strings will find that the player's answer was incorrect. AI could assess if there is sufficient similarity between the strings to judge it as correct. 

- Improve the UX by disabling the form/button when the game is over and during the pause between questions.
*/

import { films } from '/data.js'

// Some useful elements
const inputForm = document.querySelector("#guess-input");
const inputField = document.querySelector("#guess-input input");
const messageContainer = document.getElementsByClassName('message-container')[0]
const emojiCluesContainer = document.getElementsByClassName('emoji-clues-container')[0]

let currentFilm = []
let guessesLeft = 3

function startGame() {
    if (films.length === 0) {
        gameOver();
        return;
    }

    // Reset guesses and select a random film
    guessesLeft = 3;
    const randomIndex = Math.floor(Math.random() * films.length);
    currentFilm = films.splice(randomIndex, 1)[0];

    // Update UI
    emojiCluesContainer.innerHTML = currentFilm.emoji;
    emojiCluesContainer.setAttribute("aria-label", currentFilm.ariaLabel);
    messageContainer.innerHTML = `You have ${guessesLeft} guesses remaining.`;
}

function checkAnswer(event) {
    event.preventDefault();
    const inputValue = inputField.value.trim();

    if (inputValue.toLowerCase() === currentFilm.title.toLowerCase()) {
        messageContainer.innerHTML = "Correct!";
        setTimeout(nextQuestion, 3000);
    } else {
        guessesLeft--;
        if (guessesLeft > 0) {
            messageContainer.innerHTML = `Incorrect! You have ${guessesLeft} guesses remaining.`;
        } else {
            messageContainer.innerHTML = `The film was: ${currentFilm.title}`;
            setTimeout(nextQuestion, 3000);
        }
    }

    // Clear input field
    inputField.value = '';
}

function nextQuestion() {
    startGame();
}

function gameOver() {
    messageContainer.innerHTML = "That's all folks!";
    emojiCluesContainer.innerHTML = '';
    inputForm.removeEventListener('submit', checkAnswer);
}

// Initialize game
inputForm.addEventListener('submit', checkAnswer);
startGame();

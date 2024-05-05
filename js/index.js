'use strict';

const pictureBtn = document.getElementById('key');
const cowDialog = document.getElementById('cowDialog');
const closeCowBtn = document.getElementById('closeCowBtn');
pictureBtn.addEventListener('click', async () => {
  const response = await fetch('cow.html');
  const content = await response.text();
  document.getElementById('cowContent').innerHTML = content;
  cowDialog.showModal();
});
closeCowBtn.addEventListener('click', () => cowDialog.close());

const aboutBtn = document.getElementById('aboutBtn');
const aboutDialog = document.getElementById('aboutDialog');
const closeAboutBtn = document.getElementById('closeAboutBtn');
aboutBtn.addEventListener('click', async () => {
    const response = await fetch('about.html');
    const content = await response.text();
    document.getElementById('aboutContent').innerHTML = content;
    aboutDialog.showModal();
});
closeAboutBtn.addEventListener('click', () => aboutDialog.close());

const helpBtn = document.getElementById('helpBtn');
const helpDialog = document.getElementById('helpDialog');
const closeHelpBtn = document.getElementById('closeHelpBtn');
helpBtn.addEventListener('click', async () => {
    const response = await fetch('help.html');
    const content = await response.text();
    document.getElementById('helpContent').innerHTML = content;
    helpDialog.showModal();
});
closeHelpBtn.addEventListener('click', () => helpDialog.close());


// prkl kuvake muuttuu kun ainesosa haettu
let ingredient = 0; // Ainesosa ei hallussa
const achievement = document.getElementById("achievement");

function getIngredient() {
    ingredient = 1; // Ainesosa hallussa
    achievement.innerText = "🧪"; // Merkki muuttuu ainesosan saamisen myötä
}
getIngredient();

document.addEventListener('DOMContentLoaded', function() {
    // Avaa player-model ikkunan sivun latautuessa
    const playerModelDiv = document.getElementById('player-model');
    playerModelDiv.style.display = 'block'; // Näytä modaali
});
    // pelaaja antaa nimensä ja aloittaa pelin
    //document.querySelector('#player-form').addEventListener('submit', function(evt) {
       // evt.preventDefault();
       // const playerName = document.querySelector('#player-input').value;
       // gameSetup(`http://127.0.0.1:5000/newgame?player=${playerName}`);

        // Piilota player-model div
       // playerModelDiv.style.display = 'none';

        // pelaajan nimi pelissä
       // document.getElementById('player-name').textContent = playerName;
    //});


// Funktio, joka käynnistää pelin
//function playGame() {
        // lisää JavaScript-koodi pelin käynnistämiseksi
        // kutsutaan pelin aloitusfunktiota

    // Etsi painike DOM:sta
//const playButton = document.getElementById('playButton');
    // Liitä tapahtumankäsittelijä painikkeelle
//playButton.addEventListener('click', playGame);


// prkl kuvake muuttuu kun ainesosa haettu
// let ingredient = 0; // Ainesosa ei hallussa
// const achievement = document.getElementById("achievement");

// function getIngredient() {
//   ingredient = 1; // Ainesosa hallussa
//    achievement.innerText = "🧪"; // Merkki muuttuu ainesosan saamisen myötä
//}
//  getIngredient();


//const gameBtn = document.getElementById('gameBtn');
//const playerModel = document.getElementById('player-model');

//gameBtn.addEventListener('click', function() {
//  playerModel.style.display = 'block';
//});


//  const playerForm = document.getElementById('player-form');

//  playerForm.addEventListener('submit', function(event) {
//    event.preventDefault();
//    const playerName = playerForm.querySelector('input[type="text"]').value;
//    playerModel.style.display = 'none';
//});
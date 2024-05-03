'use strict';

// Leaflet map initialization
const map = L.map('map', { tap: false });
L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
}).addTo(map);
map.setView([60, 24], 7);

// Show Cow dialog
const cowBtn = document.getElementById('cowBtn');
const cowDialog = document.getElementById('cowDialog');
const closeCowBtn = document.getElementById('closeCowBtn');

cowBtn.addEventListener('click', async () => {
    const response = await fetch('cow.html');
    const content = await response.text();
    document.getElementById('cowContent').innerHTML = content;
    cowDialog.showModal();
});

closeCowBtn.addEventListener('click', () => cowDialog.close());

// About dialog
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

// Help dialog
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


// Funktio, joka käynnistää pelin
//function playGame() {
        // lisää JavaScript-koodi pelin käynnistämiseksi
        // kutsutaan pelin aloitusfunktiota
}
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
'use strict';

// Navigation of about- and help-button

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

// Open player-form first to enter player-name
document.addEventListener('DOMContentLoaded', function() {
    const playerModelDiv = document.getElementById('player-model');
    playerModelDiv.style.display = 'block'; // Näytä modaali
});




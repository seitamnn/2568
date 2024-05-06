'use strict';
/* 1. show map using Leaflet library. (L comes from the Leaflet library) */

const map = L.map('map', {tap: false});
L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
  maxZoom: 50,
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
}).addTo(map);
map.setView([60, 24], 7);

// global variables
const airportMarkers = L.featureGroup().addTo(map);

// icons
const redIcon = L.divIcon({className: 'red-icon'});
const greenIcon = L.divIcon({className: 'green-icon'});


// form for player name
document.querySelector('#player-form').addEventListener('submit', function(evt) {
  evt.preventDefault();
  const playerModelDiv = document.querySelector('#player-model')
  const playerName = document.querySelector('#player-input').value;
  gameSetup(`http://127.0.0.1:5000/newgame?player=${playerName}`);
  playerModelDiv.style.display = 'none';
})


// function to fetch data from API
async function getData(url){
  const response = await fetch(url);
  if (!response.ok) throw new Error('Invalid input');
  const data = await response.json();
  return data
}

// function to update game status
function updatePlayerInfo(data){
  const player_name = document.querySelector('#player-name');
  const currency = document.querySelector('#currency');
  const distance = document.querySelector('#distance');
  player_name.innerHTML = data.playerInfo.screen_name;
  currency.innerHTML = data.playerInfo.currency;
  distance.innerHTML = data.playerInfo.alien_distance;
}

// function to check if the player has the ingredient
async function checkIngredient (data) {
  if (data.playerInfo.location === "ENGM") {
    achievement.innerText = "🧪";
    const response = await fetch(`http://127.0.0.1:5000/ingredient?playerName=${data.playerInfo.screen_name}`);
    if (!response.ok) throw new Error('Invalid input');
    document.querySelector('.goal').classList.remove('hide');
  }
}

// function to check if game is over
function checkGameOver (currency, distance){
  if (currency <= 0 || distance <= 0){
    const jsConfetti = new JSConfetti()
    jsConfetti.addConfetti({
      emojis: ['👽'],
      confettiRadius: 6,
      confettiNumber: 500,
    })
    alert(`Game over!`);
    return false;
  }
  return true;
}

// function to check if game is won
function checkWin (data){
  if (data.playerInfo.location === "MUHA" && data.playerInfo.in_possession === 1){
    const jsConfetti = new JSConfetti()
    jsConfetti.addConfetti({
      emojis: ['🌈', '⚡️', '🦄', '✨', '💫', '🌸'],
      confettiRadius: 6,
      confettiNumber: 500,
    })
    alert(`You WON!`);
    return false;
  }
  return true;
}

// function to set up game
// this is the main function that creates the game and calls the other functions
async function gameSetup(url) {
  try {
    airportMarkers.clearLayers();
    const playerInfo = await getData(url);
    console.log(playerInfo);
    updatePlayerInfo(playerInfo); // päivitetään pelaaja tiedot näytölle
    if(!checkGameOver(playerInfo.playerInfo.currency, playerInfo.playerInfo.alien_distance)) return;
    if(!checkWin(playerInfo)) return;
    await checkIngredient(playerInfo)

    const pmarker = L.marker([playerInfo.currentLocation.airport_latitude, playerInfo.currentLocation.airport_longitude]).addTo(map); // pelaajan sijainti kartalle
    airportMarkers.addLayer(pmarker)
    pmarker.bindPopup(`<b>You are here!</b></b><br>Airport: ${playerInfo.currentLocation.airport_name}<br>Country: ${playerInfo.currentLocation.country_name}`); // popup ikkuna missä näkyy sijainnin tiedot
    pmarker.openPopup(); // you are here ikkuna aukee automaattisesti
    pmarker.setIcon(greenIcon);
    for(let location of playerInfo.airport){
      const marker = L.marker([location.latitude, location.longitude]).addTo(map);// uudet kohteet kartalle
      airportMarkers.addLayer(marker);
      marker.setIcon(redIcon)
      const popupContent = document.createElement('div');
      const h4 = document.createElement('h4');
      h4.innerHTML = `Airport: ${location.airport_name}<br>Country: ${location.country_name}`;
      popupContent.append(h4);
      const goButton = document.createElement('button');
      goButton.innerHTML = 'Fly here';
      popupContent.append(goButton);
      const p = document.createElement('p');
      const price = Math.floor(Math.random()*100+1);
      p.innerHTML = `Price is ${price}$`;
      popupContent.append(p);
      marker.bindPopup(popupContent);
      goButton.addEventListener('click', function(){
        gameSetup(`http://127.0.0.1:5000/fly_to?playerName=${playerInfo.playerInfo.screen_name}&dest=${location.airport_name}&price=${price}`)
      })
    }


  } catch (error){
    console.log(error);
  }
}

// event listener to hide goal splash
document.querySelector('.goal').addEventListener('click', function (evt) {
  evt.currentTarget.classList.add('hide');
})

//blablaa
//saakeli että menee hermot nyt kyllä kuulkaa

//http://127.0.0.1:5000/newgame?player=Vesa&loc=EFHK
//'http://127.0.0.1:5000/player_info/Pumba/'
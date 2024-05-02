'use strict';
/* 1. show map using Leaflet library. (L comes from the Leaflet library) */

const map = L.map('map', {tap: false});
L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
  maxZoom: 20,
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
}).addTo(map);
map.setView([60, 24], 7);


// global variables

// icons
const redIcon = L.divIcon({className: 'red-icon'});
const greenIcon = L.divIcon({className: 'green-icon'});


// form for player name

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

// function to show weather at selected airport

// function to check if any goals have been reached

// function to update airports in UI
function updateAirports(airports){
  const airport1 = document.querySelector('label[for=airport1]');
  const airport2 = document.querySelector('label[for=airport2]');
  const airport3 = document.querySelector('label[for=airport3]');
  console.log(airports.airport[0].airport_name);
  airport1.innerHTML = `Airport: ${airports.airport[0].airport_name}<br>Country: ${airports.airport[0].country_name}`;
  airport2.innerHTML = `Airport: ${airports.airport[1].airport_name}<br>Country: ${airports.airport[1].country_name}`;
  airport3.innerHTML = `Airport: ${airports.airport[2].airport_name}<br>Country: ${airports.airport[2].country_name}`;
}
// function to check if game is over

// function to set up game
// this is the main function that creates the game and calls the other functions
async function gameSetup() {
  try {
    const playerInfo = await getData('http://127.0.0.1:5000/player_info/Pumba/');
    console.log(playerInfo);
    updatePlayerInfo(playerInfo); // päivitetään pelaaja tiedot näytölle

    const pmarker = L.marker([playerInfo.currentLocation.airport_latitude, playerInfo.currentLocation.airport_longitude]).addTo(map); // pelaajan sijainti kartalle
    pmarker.bindPopup(`<b>You are here!</b></b><br>Airport: ${playerInfo.currentLocation.airport_name}<br>Country: ${playerInfo.currentLocation.country_name}`); // popup ikkuna missä näkyy sijainnin tiedot
    pmarker.openPopup();
    pmarker.setIcon(greenIcon);
    for(let location of playerInfo.airport){
      const marker = L.marker([location.latitude, location.longitude]).addTo(map); // uudet kohteet kartalle
      marker.bindPopup(`Airport: ${location.airport_name}<br>Country: ${location.country_name}`); // popup missä näkyy kohteiden tiedot
      marker.setIcon(redIcon)
    }
    updateAirports(playerInfo);

  } catch (error){
    console.log(error)
  }
}
gameSetup();
// event listener to hide goal splash

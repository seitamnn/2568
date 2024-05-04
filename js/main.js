'use strict';
/* 1. show map using Leaflet library. (L comes from the Leaflet library) */

const map = L.map('map', {tap: false});
L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
  maxZoom: 20,
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
}).addTo(map);
map.setView([60, 24], 7);

// global variables
const airportMarkers = L.featureGroup().addTo(map);

// icons
const redIcon = L.divIcon({className: 'red-icon'});
const greenIcon = L.divIcon({className: 'green-icon'});


// form for player name  todo: tässä tarkoktuksena saada kiinni pelaajan syöttämästä nimestä ja tän jälkeen kutsutaan funktiota gameSetup kerran täällä kun nimi syötetty newgame päätepisteellä -> http://127.0.0.1:5000/newgame?player=kakkapylly
document.querySelector('#gameBtn').addEventListener('click', function(evt){
  evt.preventDefault()
  gameSetup(`http://127.0.0.1:5000/newgame?player=Miianhermot`)
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

// function to update airports in UI
function updateAirports(airports){
  const airport1 = document.querySelector('label[for=airport1]');
  const airport2 = document.querySelector('label[for=airport2]');
  const airport3 = document.querySelector('label[for=airport3]');
  airport1.innerHTML = `Airport: ${airports.airport[0].airport_name}<br>Country: ${airports.airport[0].country_name}  `;
  airport2.innerHTML = `Airport: ${airports.airport[1].airport_name}<br>Country: ${airports.airport[1].country_name}  `;
  airport3.innerHTML = `Airport: ${airports.airport[2].airport_name}<br>Country: ${airports.airport[2].country_name}  `;
}
// function to check if game is over
function checkGameOver (currency, distance){ // todo: pitää tarkistaa toimiiko tällä. Epäilen. XD
  if (currency < 0 || distance < 0){
    alert(`Game over!`);
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
      h4.innerHTML = location.airport_name;
      popupContent.append(h4);
      const goButton = document.createElement('button');
      goButton.innerHTML = 'Fly here';
      popupContent.append(goButton);
      const p = document.createElement('p');
      p.innerHTML = 'Price is 10$';
      popupContent.append(p);
      marker.bindPopup(popupContent);
      goButton.addEventListener('click', function(){
        gameSetup(`http://127.0.0.1:5000/fly_to?playerName=${playerInfo.playerInfo.screen_name}&dest=${location.airport_name}&price=10`)
      })
    }
    updateAirports(playerInfo); // random lentokentät location boxiin

  } catch (error){
    console.log(error);
  }
}
 //kutsutaan pääfunktiota - toimii vaan index.html sivulla ja nipsun tilalle pitää laittaa joku pelaajanimi mikä löytyy omasta tietokannasta.


// event listener to hide goal splash
//blablaa
//saakeli että menee hermot nyt kyllä kuulkaa

//http://127.0.0.1:5000/newgame?player=Vesa&loc=EFHK
//'http://127.0.0.1:5000/player_info/Pumba/'
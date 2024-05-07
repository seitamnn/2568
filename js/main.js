'use strict';

// CHALLENGET TÄSTÄ ETEENPÄI
// Challenges
const quizzes = [
  {
      title: "At the airport security check, the metal part of the ingredient container causes problems. Container arouses the interest of employees and they start asking you questions about it.You panic, and decide to lie and explain that you're a chemist and that's why you have the container with you. The employees don't fully believe you and they decide to test you.",
      trueText: "Well done! Now they believe you and you can continue your journey. Although that was close call!",
      falseText: "Your credibility vanished like ashes in the wind.",
      questions: [
          {
          question: "What is the chemical symbol of iron?",
          answers: [
              { text: "I", correct: false},
              { text: "Ir", correct: false},
              { text: "Fe", correct: true},
              { text: "F", correct: false},
          ]
          },
      ]
  },
  {
      title: "You are in your own thoughts when accidentally bump into strange looking world traveler at the airport. He asks for your help with the currency conversion and you decide to help him. Let's see what kind of problem he has.",
      trueText: "That's right! The traveler is very grateful and gives you some currency for the effort.",
      falseText: "Oh no, the traveler fooled you. He was thief who took some currency from your pocket.",
      questions: [
      {
          question: "How much is 10 euros in yens?",
          answers: [
              { text: "1630", correct: true},
              { text: "1000", correct: false},
              { text: "1440", correct: false},
              { text: "982", correct: false},
          ]
      }
      ]
  },
  {
      title: "You want to reward yourself with a lemonade. You're at the bar when suddenly a child runs in front of you crying and asks for help. She tells you that she has lost her family and can't find them anywhere. You don't have the heart to refuse and you decide to help her. You notice an announcement device near by and it would make it easier to find the child's family. But to use the device you must answer following question correctly.",
      trueText: "Yes, that's right! Child's family is rather quickly found through the announcement. They are grateful to you and recognize you as a resistance member. The family wants to help you with some ppocket money.",
      falseText: "Wrong, your geography seems to be rusty! You get back to the bar and notice someone took your sunglasses and cash you left at the table. Now you both are sad.",
      questions: [
      {
          question: "What is the capital of Argentina?",
          answers: [
              { text: "Buenos Aires", correct: true},
              { text: "Santa Fe", correct: false},
              { text: "Santa Cruz", correct: false},
              { text: "Santiago", correct: false},
          ]
      }
      ]
  },
  {
      title: "You bump into another resistance member. He is skeptical if you are truly part of the resistance and wants to make sure before helping you further. By answering his question correctly, he promise to help you distract the aliens. Hurry up!",
      trueText: "That is correct! You have proved that you're true resistance member.",
      falseText: "That's not it! I guess you didn't read the lore properly... Well, no help for you this time.",
      questions: [
      {
          question: "What is the name of the lead scientist of the resistance?",
          answers: [
              { text: "Dr. Lazarus Darkmore", correct: false},
              { text: "Dr. Julian Mercer", correct: false},
              { text: "Dr. Emilia Horne", correct: false},
              { text: "Dr. Alex Zen", correct: true},
          ]
      }
      ]
  },
  {
      title: "While walking to the next departure gate, one of the airport employee thinks you're a cleaner and asks you to take out pile of trash. You now have to decide whether to play along or tell her that you're not a cleaner. Remember that helping may benefit you, while refusing may cause problems. Or it could be the other way around, who knows... Choose wisely.",
      trueText: "You take out the trash and the employee thanks you for your help and gives you a tip.",
      falseText: "Employee apologizes for her mistake but becomes suspicious of you and wants to talk to you for a very long time, before letting you continue your journey. Ughhhh now you need to buy a new ticket...",
      questions: [
          {
          question: "So are you going to take the trash out?",
          answers: [
              { text: "Tell them you don't work here", correct: false},
              { text: "Freeze and try to stutter something", correct: false},
              { text: "Take the trash out", correct: true},
              { text: "Just stare at them", correct: false},
          ]
          },
      ]
  },
  {
      title: "At the airport check-in one of the employees recognizes you. He looks at you disapprovingly. You notice a pin on his chest. where it says 'END TO PLANET EARTH' He probably recognizes you from the news... Because of the mission you've been on tv a lot lately. What should you do about it?",
      trueText: "You tried to ignore the situation completely. You keep your eyes on the floor and notice a dollar bill someone dropped. Nice!",
      falseText: "The bribes was useful and helps you keep a low profile. But now your wallet is a little bit lighter.",
      questions: [
          {
          question: "You can either try to bribe him or Ignore the situation as if nothing had happened.",
          answers: [
              { text: "Bribe them", correct: true},
              { text: "Play it cool and act normal", correct: false},
          ]
          },
      ]
  },
  {
      title: "Your previous flight landed late due to weather conditions and there's only 15 minutes before your next flight leaves. You are rushing to the next departure gate when you suddenly see alien raid in front of you! There is very little you can do about in this situation, you can try to hide in the nearby trash can.",
      trueText: "You freeze and seems like you can't move. Suddenly someone pulls you behind a corner. It's one of the resistance members. They give you a lesson about being more careful and gives you some cash. OK MOM i guess...",
      falseText: "Hurry up, jump in the trash can now! Try to make yourself comfortable and wait for the raid to end.",
      questions: [
          {
          question: "So are you going to hide?",
          answers: [
              { text: "Freeze", correct: true},
              { text: "Hide", correct: false},
          ]
          },
      ]
  },
];

document.addEventListener("DOMContentLoaded", function() {
  const appDiv= document.querySelector('.app');
  const openChallengeBtn = document.getElementById("open-challenge-btn");
  const questionElement = document.getElementById("question");
  const answerButtons = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("slay-btn");

  let currentQuizIndex = 0;
  let currentQuestionIndex = 0;
  let score = 0;

  openChallengeBtn.addEventListener("click", function() {
    appDiv.style.display = appDiv.style.display === 'block' ? 'none' : 'block';
    if (appDiv.style.display === 'block') {
      startQuiz();
    }
  });

  async function updateDistance(url){
    const response = await fetch(url);
    //if (!response.ok) throw new Error('Invalid');
    const data = await response.json();
    console.log('HALOJATA SAAATANA')
    return data;
  }

  function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    document.querySelector('.app h3').textContent = quizzes[currentQuizIndex].title;
    showQuestion();
    //const screen_name= document.querySelector('#player-name').textContent;
    //console.log(screen_name);
  }

  function showQuestion(){
    resetState();
    let currentQuestion = quizzes[currentQuizIndex].questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
      const button = document.createElement(("button"));
      button.innerHTML = answer.text;
      button.classList.add("btn");
      answerButtons.appendChild(button);
      if(answer.correct){
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
    });
  }

  function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
      answerButtons.removeChild(answerButtons.firstChild);
    }
  }

  function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
      selectedBtn.classList.add("correct");
      score++;
      const screen_name= document.querySelector('#player-name').textContent;
      console.log(screen_name);
      getData(`http://127.0.0.1:5000/wrong_answer?playerName=${screen_name}`);
      const paska =  getData(`http://127.0.0.1:5000/player_info/${screen_name}/`);
      console.log(paska);
      console.log(screen_name);
      updatePlayerInfo(paska);
    }else {
      selectedBtn.classList.add("incorrect");
      const screen_name= document.querySelector('#player-name').textContent;
      console.log(getData(`http://127.0.0.1:5000/wrong_answer?playerName=${screen_name}`));
      console.log(screen_name);
    }
    Array.from(answerButtons.children).forEach(button => {
      if (button.dataset.correct === "true"){
        button.classList.add("correct");
      }
      button.disabled = true;
    });
    nextButton.style.display = "block";
  }

  function showScore(){
    resetState();
    questionElement.innerHTML = `haista paska`;
    nextButton.innerHTML = "again bitch";
    //nextButton.style.display = "block";
    nextButton.style.display = "none"; // Hide the "Next" button
    const screen_name= document.querySelector('#player-name').textContent;
  }

  function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < quizzes[currentQuizIndex].questions.length){
      showQuestion();
    } else {
      currentQuizIndex = currentQuizIndex + 1;
      showScore();
    }
  }

  nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < quizzes[currentQuizIndex].questions.length){
      handleNextButton();
    }else {
      startQuiz();
    }
  });

  startQuiz();
});
// CHALLENGET LOPPUU TÄHÄN


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
    alert('Game over!')
    return false;
  }
  return true;
}

// function to check if game is won
function checkWin (data){
  if (data.playerInfo.location === "MUHA" && data.playerInfo.in_possession === 1){
    const jsConfetti = new JSConfetti()
    jsConfetti.addConfetti({
      emojis: ['🌈', '⚡️', '🦄', '✨', '🌸'],
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
    await checkIngredient(playerInfo);

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



//http://127.0.0.1:5000/newgame?player=Vesa&loc=EFHK
//'http://127.0.0.1:5000/player_info/Pumba/'
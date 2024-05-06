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
          {
          question: "What is the chemical symbol of gold?",
          answers: [
              { text: "Ar", correct: false},
              { text: "Au", correct: true},
              { text: "Gd", correct: false},
              { text: "G", correct: false},
          ]
          },
          {
          question: "What is the chemical symbol of nitrogen?",
          answers: [
              { text: "N", correct: true},
              { text: "Ni", correct: false},
              { text: "Na", correct: false},
              { text: "Ne", correct: false},
          ]
          }
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
  const appDiv = document.querySelector('.app');
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

  function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    document.querySelector('.app h3').textContent = quizzes[currentQuizIndex].title;
    showQuestion();
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
    }else {
      selectedBtn.classList.add("incorrect");
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
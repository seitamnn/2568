const questions = [
  {
    question: "What do cats say?",
    answers: [
      { text: "Moo", correct: false},
      { text: "Bark", correct: false},
      { text: "Meow", correct: true},
      { text: "Yeehaw", correct: false},
    ]
  },
  {
    question: "What do dogs say?",
    answers: [
      { text: "Moo", correct: false},
      { text: "Woof", correct: true},
      { text: "Meow", correct: false},
      { text: "Yeehaw", correct: false},
    ]
  },
  {
    question: "What do cows say?",
    answers: [
      { text: "Moo", correct: true},
      { text: "Bark", correct: false},
      { text: "Meow", correct: false},
      { text: "Yeehaw", correct: false},
    ]
  },
  {
    question: "What do cowboys say?",
    answers: [
      { text: "Moo", correct: false},
      { text: "Bark", correct: false},
      { text: "Meow", correct: false},
      { text: "Yeehaw", correct: true},
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("slay-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion(){
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  questionElement.innerHTML = currentQuestion.question;

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
  nextButton.style.display = "block";
}

function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion()
  }else {
    showScore();
  }
}
nextButton.addEventListener("click", ()=>{
  if(currentQuestionIndex < questions.length){
    handleNextButton();
  }else {
    startQuiz();
  }
});

startQuiz();
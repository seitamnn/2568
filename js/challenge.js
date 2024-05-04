const questions = [
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
let currentQuestion = 0;
let questions = [];
let userAnswers = [];
let timer;
let timeLeft = 10;
let isDark = false;

// 📥 Load Questions
async function loadQuestions() {
  const res = await fetch("https://opentdb.com/api.php?amount=5&type=multiple");
  const data = await res.json();

  questions = data.results.map(q => {
    const options = [...q.incorrect_answers];

    const correctIndex = Math.floor(Math.random() * 4);
    options.splice(correctIndex, 0, q.correct_answer);

    return {
      question: decodeHTML(q.question),
      options: options.map(o => decodeHTML(o)),
      answer: decodeHTML(q.correct_answer)
    };
  });

  currentQuestion = 0;
  userAnswers = new Array(questions.length).fill(null);

  showQuestion();
}

// 🧠 Decode HTML
function decodeHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

// ⏱️ Timer
function startTimer() {
  clearInterval(timer);
  timeLeft = 10;

  document.getElementById("timer").innerText = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = timeLeft;

    if (timeLeft === 0) nextQuestion();
  }, 1000);
}

// 📊 Progress
function updateProgress() {
  document.getElementById("progress").innerText =
    `Question ${currentQuestion + 1}/${questions.length}`;

  document.getElementById("progress-fill").style.width =
    `${((currentQuestion + 1) / questions.length) * 100}%`;
}

// ❓ Show Question
function showQuestion() {
  const q = questions[currentQuestion];

  document.getElementById("question").innerText = q.question;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach(option => {
    const div = document.createElement("div");
    div.classList.add("option");
    div.innerText = option;

    if (userAnswers[currentQuestion] === option) {
      div.classList.add("selected");
    }

    div.onclick = () => {
      userAnswers[currentQuestion] = option;
      showQuestion();
    };

    optionsDiv.appendChild(div);
  });

  updateProgress();
  startTimer();
}

// ⏭️ Next
function nextQuestion() {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    showQuestion();
  }
}

// ⏮️ Previous
function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion();
  }
}

// 🏁 Submit
function submitQuiz() {
  clearInterval(timer);

  let score = 0;

  questions.forEach((q, i) => {
    if (userAnswers[i] === q.answer) score++;
  });

  document.querySelector(".quiz-container").innerHTML = `
    <h2>Quiz Completed 🎉</h2>
    <p>Your Score: ${score} / ${questions.length}</p>
    <button onclick="restartQuiz()">Start Again 🔄</button>
  `;
}

// 🔄 Restart FIXED
function restartQuiz() {
  clearInterval(timer);

  document.querySelector(".quiz-container").innerHTML = `
    <div class="top-bar">
      <span id="progress">Question 1/5</span>

      <div>
        <span id="timer">10</span>
        <button id="toggleMode" onclick="toggleDarkMode()">🌙</button>
      </div>
    </div>

    <div class="progress-bar">
      <div id="progress-fill"></div>
    </div>

    <h2 id="question"></h2>
    <div id="options"></div>

    <div class="buttons">
      <button onclick="prevQuestion()">Previous</button>
      <button onclick="nextQuestion()">Next</button>
      <button onclick="submitQuiz()">Submit</button>
    </div>
  `;

  loadQuestions();
}

// 🌙 Dark Mode
function toggleDarkMode() {
  isDark = !isDark;
  document.body.classList.toggle("dark");

  const btn = document.getElementById("toggleMode");
  btn.innerText = isDark ? "☀️" : "🌙";

  localStorage.setItem("theme", isDark ? "dark" : "light");
}

// Load theme
(function () {
  const saved = localStorage.getItem("theme");

  if (saved === "dark") {
    document.body.classList.add("dark");
    isDark = true;

    setTimeout(() => {
      const btn = document.getElementById("toggleMode");
      if (btn) btn.innerText = "☀️";
    }, 0);
  }
})();

// Start app
loadQuestions();
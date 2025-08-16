// Quiz Questions
    const quizData = [
      {
        question: "Which company developed JavaScript?",
        options: ["Microsoft", "Netscape", "Google", "Sun Microsystems"],
        answer: "Netscape"
      },
      {
        question: "What is the correct way to declare a variable in JavaScript?",
        options: ["var name;", "let name;", "const name;", "All of the above"],
        answer: "All of the above"
      },
      {
        question: "Which of the following is NOT a JavaScript data type?",
        options: ["String", "Number", "Boolean", "Character"],
        answer: "Character"
      },
      {
        question: "Which method is used to remove the last element from an array?",
        options: ["pop()", "push()", "shift()", "unshift()"],
        answer: "pop()"
      },
      {
        question: "What is the result of typeof null in JavaScript?",
        options: ["null", "object", "undefined", "number"],
        answer: "object"
      },
      {
        question: "Which operator is used to compare both value and type in JavaScript?",
        options: ["=", "==", "===", "!="],
        answer: "==="
      },
      {
        question: "Which of the following is used to convert a string to an integer in JavaScript?",
        options: ["parseInt()", "parseFloat()", "Number()", "Both parseInt() and Number()"],
        answer: "Both parseInt() and Number()"
      }
    ];

    let currentQuestion = 0;
    let score = 0;
    let shuffledQuiz = [];

    const questionEl = document.getElementById("question");
    const optionsEl = document.getElementById("options");
    const feedbackEl = document.getElementById("feedback");
    const scoreEl = document.getElementById("score");
    const progressEl = document.getElementById("progress");
    const nextBtn = document.getElementById("nextBtn");

    // Fisher-Yates shuffle questions
    function shuffleArray(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }

    function loadQuestion() {
      if (currentQuestion < shuffledQuiz.length) {
        const q = shuffledQuiz[currentQuestion];
        questionEl.textContent = q.question;
        optionsEl.innerHTML = "";
        feedbackEl.textContent = "";
        nextBtn.classList.add("hidden");

        // Shuffle options
        const shuffledOptions = shuffleArray([...q.options]);
        shuffledOptions.forEach(option => {
          const btn = document.createElement("button");
          btn.textContent = option;
          btn.className = "w-full px-4 py-2 rounded-lg glow-btn text-white font-semibold";
          btn.onclick = () => checkAnswer(option);
          optionsEl.appendChild(btn);
        });

        // Update progress bar
        const progressPercent = ((currentQuestion) / shuffledQuiz.length) * 100;
        progressEl.style.width = progressPercent + "%";
      } else {
        showFinalScore();
      }
    }

    function checkAnswer(selected) {
      const correct = shuffledQuiz[currentQuestion].answer;
      if (selected === correct) {
        feedbackEl.textContent = "✅ Correct!";
        feedbackEl.className = "text-green-400 font-semibold mt-4";
        score++;
        scoreEl.textContent = score;
      } else {
        feedbackEl.textContent = `❌ Wrong! Correct answer: ${correct}`;
        feedbackEl.className = "text-red-400 font-semibold mt-4";
      }

      // Disable options after answer
      Array.from(optionsEl.children).forEach(btn => btn.disabled = true);

      // Show Next button
      nextBtn.classList.remove("hidden");
    }

    nextBtn.addEventListener("click", () => {
      currentQuestion++;
      loadQuestion();
    });

    // Show the final score
    function showFinalScore() {
      questionEl.textContent = "✨ Quiz Completed!";
      optionsEl.innerHTML = "";
      nextBtn.classList.add("hidden");
      feedbackEl.textContent = `Your final score is ${score} / ${shuffledQuiz.length}`;
      feedbackEl.className = "text-cyan-300 font-bold text-lg mt-4";

      progressEl.style.width = "100%";

      // Restart Button
      const restartBtn = document.createElement("button");
      restartBtn.textContent = "🔄 Start Again";
      restartBtn.className = "mt-6 w-full px-4 py-2 rounded-lg glow-btn text-white font-semibold";
      restartBtn.onclick = restartQuiz;
      optionsEl.appendChild(restartBtn);
    }

    function restartQuiz() {
      currentQuestion = 0;
      score = 0;
      scoreEl.textContent = score;
      feedbackEl.textContent = "";
      shuffledQuiz = shuffleArray([...quizData]); // reshuffle on restart
      loadQuestion();
    }

    // Start Quiz
    restartQuiz();

/*
 THE BREEDING BARN
 Animal Science 1B | Module 10
 Interactive Ranch Manager Practice Simulation
*/

const app = document.getElementById("app");

let station = -1;
let answers = {};
let checked = {};
let earned = {};
let completed = false;

const stations = [
  {
    title: "Station 1: Meet Your Herd",
    icon: "🐄",
    intro: `
      <p>Welcome to Cedar Creek Ranch!</p>
      <p>You manage 40 breeding-age cows. Your goal is
      to build a healthy, productive herd while making
      responsible breeding decisions.</p>
      <div class="card">
        <h3>📋 Ranch Records</h3>
        <p><strong>Group A:</strong> 25 healthy cows,
        body condition score 5–6 (9-point scale).</p>
        <p><strong>Group B:</strong> 10 thin cows,
        body condition score 3.</p>
        <p><strong>Group C:</strong> 5 cows with
        unresolved reproductive-health concerns.</p>
      </div>
    `,
    question:
      "What should you do before beginning the breeding season?",
    options: [
      "Breed all 40 cows immediately.",
      "Evaluate nutrition and health, then develop an appropriate breeding plan.",
      "Remove every thin cow from the herd permanently.",
      "Ignore body condition because genetics determine pregnancy success."
    ],
    correct: 1,
    explanation:
      "Excellent ranch management starts with animal welfare. " +
      "Nutrition, body condition, and reproductive health " +
      "must be evaluated before breeding decisions are made."
  },
  {
    title: "Station 2: Choose Your Breeding Method",
    icon: "🧬",
    intro: `
      <p>Your ranch wants to improve calf genetics while
      maintaining responsible breeding costs.</p>
      <div class="card">
        <h3>💰 Breeding Options</h3>
        <p><strong>Natural Breeding:</strong>
        Requires suitable bulls, fencing, facilities,
        and ongoing animal care.</p>
        <p><strong>Artificial Insemination:</strong>
        Provides access to selected genetics but
        requires skilled labor and careful timing.</p>
      </div>
    `,
    question:
      "Which statement best compares these breeding methods?",
    options: [
      "Artificial insemination always produces more pregnancies.",
      "Natural breeding requires no management.",
      "AI can expand genetic options, but requires training and careful timing.",
      "Natural breeding guarantees healthier calves."
    ],
    correct: 2,
    explanation:
      "Artificial insemination can give producers access " +
      "to desirable genetics without owning a particular " +
      "breeding bull. However, success depends on " +
      "appropriate training, timing, and management."
  },
  {
    title: "Station 3: Build Your Breeding System",
    icon: "🐂",
    intro: `
      <p>Cedar Creek Ranch raises Angus cows.</p>
      <p>The owner wants to explore using Hereford
      genetics to combine desirable breed traits.</p>
      <div class="card">
        <h3>🔍 Genetics Challenge</h3>
        <p>Angus × Hereford offspring may benefit
        from crossbreeding.</p>
        <p>Remember: hybrid vigor and breed
        complementarity are related concepts,
        but they are not the same thing.</p>
      </div>
    `,
    question:
      "Which statement correctly explains hybrid vigor?",
    options: [
      "Crossbred offspring may outperform the average of their parent breeds for certain traits.",
      "Every crossbred calf is guaranteed to be superior.",
      "Hybrid vigor means offspring have identical genetics.",
      "Hybrid vigor occurs only in purebred animals."
    ],
    correct: 0,
    explanation:
      "Hybrid vigor, or heterosis, occurs when crossbred " +
      "offspring perform better than the average of " +
      "their parent breeds for certain traits. " +
      "Breed complementarity means combining useful " +
      "strengths from different breeds."
  },
  {
    title: "Station 4: Watch the Breeding Calendar",
    icon: "📅",
    intro: `
      <p>It's time to monitor the reproductive cycle!</p>
      <div class="card">
        <h3>🐄 Cow #18: Observation Log</h3>
        <p><strong>Morning:</strong> Increased activity
        and mounting other cows.</p>
        <p><strong>Afternoon:</strong> Cow #18 stands
        still while another cow mounts her.</p>
        <p><strong>Record:</strong> Cow #18 is not
        known to be pregnant.</p>
      </div>
      <p>The four broad stages of the estrous cycle
      are proestrus, estrus, metestrus, and diestrus.</p>
    `,
    question:
      "What is the best interpretation of Cow #18's behavior?",
    options: [
      "She is definitely pregnant.",
      "She is showing a strong sign of standing estrus.",
      "She is experiencing a guaranteed health emergency.",
      "Her behavior proves that ovulation has already occurred."
    ],
    correct: 1,
    explanation:
      "Standing to be mounted is an important sign " +
      "of estrus in cattle. Producers use heat-detection " +
      "observations, records, and species-appropriate " +
      "breeding protocols to make timing decisions."
  },
  {
    title: "Station 5: Pregnancy Check",
    icon: "📊",
    intro: `
      <p>The breeding season is complete!</p>
      <div class="card">
        <h3>📋 Final Ranch Records</h3>
        <p><strong>Cows exposed to breeding:</strong> 40</p>
        <p><strong>Confirmed pregnant:</strong> 34</p>
        <p><strong>Not confirmed pregnant:</strong> 6</p>
        <p><strong>Formula:</strong><br>
        Pregnancy Rate =
        (Pregnant ÷ Exposed) × 100</p>
      </div>
    `,
    question:
      "What is the pregnancy rate for Cedar Creek Ranch?",
    options: [
      "34%",
      "75%",
      "85%",
      "94%"
    ],
    correct: 2,
    explanation:
      "34 ÷ 40 × 100 = 85%. This describes the " +
      "pregnancy rate for the breeding group. " +
      "It does not explain why six cows were " +
      "not confirmed pregnant. Additional records " +
      "and evaluation are needed."
  }
];

function render() {
  if (station === -1) {
    showWelcome();
  } else if (station >= stations.length) {
    showReport();
  } else {
    showStation();
  }
}

function showWelcome() {
  app.innerHTML = `
    <div class="card">
      <h2>🤠 Welcome, Ranch Manager!</h2>

      <p>You've been hired to manage breeding
      decisions at Cedar Creek Ranch.</p>

      <p>You'll work through five interactive
      ranch-management stations:</p>

      <ol>
        <li>🐄 Meet Your Herd</li>
        <li>🧬 Choose Your Breeding Method</li>
        <li>🐂 Build Your Breeding System</li>
        <li>📅 Watch the Breeding Calendar</li>
        <li>📊 Pregnancy Check</li>
      </ol>

      <p><strong>Your mission:</strong>
      Make thoughtful decisions, review feedback,
      and build your animal science skills.</p>

      <p>This is PRACTICE! Mistakes are part of
      learning, and you can retry questions.</p>
    </div>

    <div class="card">
      <h3>🎯 Your Ranch Goals</h3>
      <p>Protect animal welfare.</p>
      <p>Use genetics responsibly.</p>
      <p>Recognize reproductive changes.</p>
      <p>Interpret breeding records.</p>
    </div>

    <button onclick="startSimulation()">
      🐄 Enter the Breeding Barn
    </button>
  `;
}

function startSimulation() {
  station = 0;
  render();
}

function showStation() {
  const s = stations[station];
  const progress = (station / stations.length) * 100;
  const selected = answers[station];
  const isChecked = checked[station] === true;

  app.innerHTML = `
    <p><strong>Station ${station + 1}
    of ${stations.length}</strong></p>

    <div class="progress">
      <div class="progress-bar"
      style="width:${progress}%"></div>
    </div>

    <div class="card">
      <h2>${s.icon} ${s.title}</h2>
      ${s.intro}
    </div>

    <div class="card">
      <h3>🤠 Ranch Manager Decision</h3>
      <p><strong>${s.question}</strong></p>

      ${s.options.map((option, i) => `
        <button
          class="option ${selected === i ? "selected" : ""}"
          onclick="selectAnswer(${i})">
          ${String.fromCharCode(65 + i)}. ${option}
        </button>
      `).join("")}
    </div>

    ${isChecked ? `
      <div class="feedback">
        <h3>
          ${selected === s.correct
            ? "✅ Great Decision!"
            : "🔎 Keep Investigating!"}
        </h3>

        <p>${s.explanation}</p>

        ${selected !== s.correct ? `
          <p>Review the feedback and choose
          another answer to try again.</p>
        ` : ""}
      </div>
    ` : ""}

    <div>
      <button
        onclick="checkAnswer()"
        ${selected === undefined ? "disabled" : ""}>
        🔍 Check My Decision
      </button>

      ${isChecked && selected === s.correct ? `
        <button onclick="nextStation()">
          ${station === stations.length - 1
            ? "🏆 View Ranch Manager Report"
            : "Next Station →"}
        </button>
      ` : ""}
    </div>
  `;
}

function selectAnswer(index) {
  answers[station] = index;
  checked[station] = false;
  render();
}

function checkAnswer() {
  if (answers[station] === undefined) return;

  checked[station] = true;

  if (answers[station] === stations[station].correct) {
    earned[station] = true;
  }

  render();
}

function nextStation() {
  if (
    checked[station] !== true ||
    answers[station] !== stations[station].correct
  ) {
    return;
  }

  station++;

  if (station >= stations.length) {
    completed = true;
  }

  render();
}

function showReport() {
  const score = Object.keys(earned).length;
  const percentage = Math.round(
    (score / stations.length) * 100
  );

  app.innerHTML = `
    <div class="card">
      <h2>🏆 Ranch Manager Report</h2>

      <p><strong>Ranch:</strong> Cedar Creek Ranch</p>
      <p><strong>Module:</strong> Animal Science 1B,
      Module 10</p>

      <div class="stat">
        🐄 Stations Completed:
        <strong>${score} / ${stations.length}</strong>
      </div>

      <div class="stat">
        🎯 Practice Mastery:
        <strong>${percentage}%</strong>
      </div>

      <h3>🤠 Congratulations, Ranch Manager!</h3>

      <p>You have completed the Breeding Barn
      Practice Challenge!</p>

      <p>You've practiced:</p>

      <ul>
        <li>Evaluating breeding readiness</li>
        <li>Comparing natural breeding and AI</li>
        <li>Understanding hybrid vigor</li>
        <li>Recognizing signs of estrus</li>
        <li>Calculating pregnancy rates</li>
      </ul>

      <p><strong>Ranch Rule:</strong>
      If you don't know an answer,
      don't guess—go find it!</p>
    </div>

    <div class="card">
      <h3>📚 What's Next?</h3>

      <p>Return to Canvas and complete your
      Practice assignment instructions.</p>

      <p>Then complete
      <strong>DEMONSTRATE 10:
      Ranch Manager Certification Challenge</strong>
      to show what you've learned.</p>
    </div>

    <button onclick="window.print()">
      🖨️ Print My Ranch Manager Report
    </button>

    <button onclick="restartSimulation()">
      🔄 Play Again
    </button>
  `;
}

function restartSimulation() {
  station = -1;
  answers = {};
  checked = {};
  earned = {};
  completed = false;
  render();
}

render();

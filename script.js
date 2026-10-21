
/*
=====================================================
 THE BREEDING BARN
 Animal Science 1B | Module 10
 Ranch Manager Practice Simulation

 EXPANDED VERSION: 10 STATIONS

 Original 5 stations preserved.
 Added 5 new ranch-management challenges.
=====================================================
*/

const app = document.getElementById("app");

let station = -1;
let answers = {};
let checked = {};
let earned = {};
let completed = false;

/*
=====================================================
 STATION DATA
=====================================================
*/

const stations = [

  // =================================================
  // STATION 1: MEET YOUR HERD
  // =================================================

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

  // =================================================
  // STATION 2: CHOOSE YOUR BREEDING METHOD
  // =================================================

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

  // =================================================
  // STATION 3: BUILD YOUR BREEDING SYSTEM
  // =================================================

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

  // =================================================
  // STATION 4: WATCH THE BREEDING CALENDAR
  // =================================================

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

  // =================================================
  // STATION 5: PREGNANCY CHECK
  // =================================================

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
  },

  // =================================================
  // STATION 6: THE BREEDING BUDGET
  // =================================================

  {
    title: "Station 6: The Breeding Budget",
    icon: "💰",

    intro: `
      <p>🤠 Ranch Manager, it's time to make
      some financial decisions!</p>

      <p>Cedar Creek Ranch has a fictional
      <strong>$5,000 improvement budget</strong>
      available before the next breeding season.</p>

      <div class="card">
        <h3>💵 Ranch Budget Report</h3>

        <p><strong>Available funds:</strong> $5,000</p>

        <p><strong>Current concerns:</strong></p>

        <ul>
          <li>Several cows have low body condition.</li>
          <li>Some reproductive-health evaluations
          are overdue.</li>
          <li>The ranch wants to improve genetics.</li>
          <li>Breeding records need improvement.</li>
        </ul>

        <p><em>All costs are fictional and used
        for this learning activity.</em></p>
      </div>

      <p>Your goal is to prioritize animal welfare
      and long-term reproductive success.</p>
    `,

    question:
      "Which budget strategy is the most responsible?",

    options: [
      "Spend the entire budget on premium semen and ignore herd health.",

      "Invest in nutrition and reproductive-health evaluations first, then use remaining funds for an appropriate breeding strategy.",

      "Purchase expensive equipment without evaluating herd needs.",

      "Avoid spending any money even though some animals have unresolved health concerns."
    ],

    correct: 1,

    explanation:
      "Strong reproductive management starts with " +
      "healthy breeding animals. Nutrition, body " +
      "condition, and reproductive-health evaluations " +
      "should be prioritized before investing heavily " +
      "in genetic improvements. A breeding budget " +
      "should support both animal welfare and " +
      "long-term ranch goals."
  },

  // =================================================
  // STATION 7: THE MYSTERY COW
  // =================================================

  {
    title: "Station 7: The Mystery Cow",
    icon: "🔎",

    intro: `
      <p>Something unusual is happening
      at Cedar Creek Ranch!</p>

      <p>Cow #27 has not shown any observed
      signs of estrus during the current
      monitoring period.</p>

      <div class="card">
        <h3>🐄 Cow #27: Ranch Records</h3>

        <p><strong>Age:</strong> 4 years</p>

        <p><strong>Body Condition Score:</strong>
        3 out of 9</p>

        <p><strong>Nutrition:</strong>
        Limited forage availability</p>

        <p><strong>Heat Detection:</strong>
        No standing heat recorded</p>

        <p><strong>Pregnancy Status:</strong>
        Not yet confirmed</p>
      </div>

      <p>Remember that the absence of observed
      heat does not automatically prove that
      an animal has a reproductive disorder.</p>
    `,

    question:
      "What should the ranch manager do next?",

    options: [
      "Assume Cow #27 is permanently infertile.",

      "Breed Cow #27 immediately without further evaluation.",

      "Review nutrition, body condition, pregnancy status, and heat-detection records, and arrange appropriate veterinary evaluation.",

      "Ignore the situation because reproductive cycles never change."
    ],

    correct: 2,

    explanation:
      "A lack of observed estrus can have several " +
      "possible explanations, including missed heat, " +
      "pregnancy, inadequate nutrition, postpartum " +
      "status, or reproductive-health concerns. " +
      "A responsible ranch manager investigates " +
      "the evidence rather than making assumptions. " +
      "Cow #27's low body condition also makes " +
      "nutritional evaluation especially important."
  },

  // =================================================
  // STATION 8: THE BULL EVALUATION
  // =================================================

  {
    title: "Station 8: The Bull Evaluation",
    icon: "🐂",

    intro: `
      <p>Cedar Creek Ranch is considering
      purchasing a breeding bull.</p>

      <p>Two bulls are available.</p>

      <div class="card">
        <h3>🐂 Bull A</h3>

        <p><strong>Appearance:</strong>
        Excellent muscling and desirable traits</p>

        <p><strong>Breeding Soundness Evaluation:</strong>
        Not completed</p>

        <p><strong>Reproductive Records:</strong>
        Limited</p>
      </div>

      <div class="card">
        <h3>🐂 Bull B</h3>

        <p><strong>Appearance:</strong>
        Healthy with desirable traits</p>

        <p><strong>Breeding Soundness Evaluation:</strong>
        Satisfactory result from a qualified veterinarian</p>

        <p><strong>Reproductive Records:</strong>
        Available for review</p>
      </div>

      <p>A breeding bull must be evaluated
      for more than appearance alone.</p>
    `,

    question:
      "Which decision is best supported by the available records?",

    options: [
      "Choose Bull A because appearance guarantees fertility.",

      "Choose Bull B because its breeding soundness and reproductive records provide stronger evidence, while continuing to evaluate its suitability for the herd.",

      "Choose whichever bull is the largest.",

      "Skip reproductive evaluations because bulls do not affect pregnancy rates."
    ],

    correct: 1,

    explanation:
      "A breeding soundness evaluation provides " +
      "important information about a bull's " +
      "reproductive suitability. Producers also " +
      "consider structural soundness, health, " +
      "genetics, temperament, and herd goals. " +
      "A satisfactory evaluation supports the " +
      "decision but does not guarantee pregnancies."
  },

  // =================================================
  // STATION 9: THE CALVING FORECAST
  // =================================================

  {
    title: "Station 9: The Calving Forecast",
    icon: "🗓️",

    intro: `
      <p>It's time to plan ahead for calving season!</p>

      <p>Cedar Creek Ranch has recorded a
      breeding date for one of its cows.</p>

      <div class="card">
        <h3>📅 Breeding Record</h3>

        <p><strong>Cow:</strong> #12</p>

        <p><strong>Recorded breeding date:</strong>
        January 1</p>

        <p><strong>Approximate cattle gestation:</strong>
        283 days</p>

        <p><strong>Pregnancy:</strong>
        Confirmed by an appropriate examination</p>
      </div>

      <p>Gestation length can vary, so ranchers
      use estimated calving dates as planning
      tools rather than exact guarantees.</p>
    `,

    question:
      "When should the ranch manager generally prepare for Cow #12 to calve?",

    options: [
      "Within a few days of breeding.",

      "Approximately three months after breeding.",

      "Approximately nine months after breeding, around October.",

      "Exactly one year after breeding."
    ],

    correct: 2,

    explanation:
      "Cattle gestation averages approximately " +
      "283 days, or about nine months. A cow " +
      "bred on January 1 would have an estimated " +
      "calving date around October, depending " +
      "on the year and individual variation. " +
      "Ranchers use these estimates to prepare " +
      "facilities, supplies, and monitoring plans."
  },

  // =================================================
  // STATION 10: THE FINAL RANCH DECISION
  // =================================================

  {
    title: "Station 10: The Final Ranch Decision",
    icon: "🏆",

    intro: `
      <p>Congratulations! You've reached the
      final station of the Breeding Barn!</p>

      <p>The ranch owner wants your professional
      recommendation for the next breeding season.</p>

      <div class="card">
        <h3>📊 Cedar Creek Ranch: Season Review</h3>

        <p><strong>Cows exposed:</strong> 40</p>

        <p><strong>Cows confirmed pregnant:</strong> 34</p>

        <p><strong>Pregnancy rate:</strong> 85%</p>

        <p><strong>Areas needing attention:</strong></p>

        <ul>
          <li>Some cows have low body condition.</li>
          <li>Heat-detection records are incomplete.</li>
          <li>Reproductive-health concerns
          require follow-up.</li>
          <li>The ranch wants to improve genetics.</li>
        </ul>
      </div>

      <p>Your final recommendation should balance
      reproductive efficiency, animal welfare,
      genetics, and responsible management.</p>
    `,

    question:
      "Which plan gives Cedar Creek Ranch the strongest foundation for the next breeding season?",

    options: [
      "Focus only on purchasing expensive genetics because pregnancy rate depends entirely on breed.",

      "Breed every animal regardless of health or body condition to increase the number exposed.",

      "Ignore the pregnancy records because an 85% rate provides no useful information.",

      "Improve nutrition and health management, strengthen heat-detection and breeding records, evaluate breeding animals, and select breeding methods that match ranch goals."
    ],

    correct: 3,

    explanation:
      "Excellent ranch management combines " +
      "animal health, nutrition, genetics, " +
      "reproductive timing, and accurate records. " +
      "The 85% pregnancy rate provides a useful " +
      "starting point, but additional information " +
      "is needed to identify opportunities " +
      "for improvement. Responsible breeding " +
      "decisions balance productivity with " +
      "animal welfare and long-term herd goals."
  }

];

/*
=====================================================
 SIMULATION CONTROLS
=====================================================
*/

function render() {

  if (station === -1) {
    showWelcome();
  }

  else if (station >= stations.length) {
    showReport();
  }

  else {
    showStation();
  }

}

/*
=====================================================
 WELCOME SCREEN
=====================================================
*/

function showWelcome() {

  app.innerHTML = `
    <div class="card">

      <h2>🤠 Welcome, Ranch Manager!</h2>

      <p>You've been hired to manage breeding
      decisions at Cedar Creek Ranch.</p>

      <p>Your mission is to guide a herd
      through a complete breeding season.</p>

      <h3>🐄 Your 10 Ranch Stations</h3>

      <ol>
        ${stations.map(s => `
          <li>${s.icon} ${s.title}</li>
        `).join("")}
      </ol>

      <p><strong>Your goal:</strong>
      Make thoughtful decisions, review feedback,
      and improve your animal science knowledge.</p>

      <p>This is PRACTICE! You can retry
      questions and learn from your mistakes.</p>

    </div>

    <div class="card">

      <h3>🎯 Your Ranch Management Goals</h3>

      <ul>
        <li>Protect animal welfare.</li>
        <li>Use genetics responsibly.</li>
        <li>Recognize reproductive changes.</li>
        <li>Manage breeding resources.</li>
        <li>Interpret reproductive records.</li>
        <li>Plan for future calving seasons.</li>
      </ul>

    </div>

    <button onclick="startSimulation()">
      🐄 Enter the Breeding Barn
    </button>
  `;

}

/*
=====================================================
 START SIMULATION
=====================================================
*/

function startSimulation() {

  station = 0;

  render();

}

/*
=====================================================
 DISPLAY A STATION
=====================================================
*/

function showStation() {

  const s = stations[station];

  const progress =
    (station / stations.length) * 100;

  const selected = answers[station];

  const isChecked =
    checked[station] === true;

  app.innerHTML = `

    <p>
      <strong>
        Station ${station + 1}
        of ${stations.length}
      </strong>
    </p>

    <div class="progress">

      <div
        class="progress-bar"
        style="width:${progress}%">
      </div>

    </div>

    <div class="card">

      <h2>${s.icon} ${s.title}</h2>

      ${s.intro}

    </div>

    <div class="card">

      <h3>🤠 Ranch Manager Decision</h3>

      <p>
        <strong>${s.question}</strong>
      </p>

      ${s.options.map((option, i) => `

        <button
          class="option
          ${selected === i ? "selected" : ""}"
          onclick="selectAnswer(${i})">

          ${String.fromCharCode(65 + i)}.
          ${option}

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

          <p>
            Review the feedback and choose
            another answer to try again.
          </p>

        ` : ""}

      </div>

    ` : ""}

    <div>

      <button
        onclick="checkAnswer()"
        ${selected === undefined
          ? "disabled" : ""}>

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

/*
=====================================================
 SELECT ANSWER
=====================================================
*/

function selectAnswer(index) {

  answers[station] = index;

  checked[station] = false;

  render();

}

/*
=====================================================
 CHECK ANSWER
=====================================================
*/

function checkAnswer() {

  if (answers[station] === undefined) {
    return;
  }

  checked[station] = true;

  if (
    answers[station] ===
    stations[station].correct
  ) {
    earned[station] = true;
  }

  render();

}

/*
=====================================================
 MOVE TO NEXT STATION
=====================================================
*/

function nextStation() {

  if (
    checked[station] !== true ||
    answers[station] !==
    stations[station].correct
  ) {
    return;
  }

  station++;

  if (station >= stations.length) {
    completed = true;
  }

  render();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}

/*
=====================================================
 FINAL RANCH MANAGER REPORT
=====================================================
*/

function showReport() {

  const score =
    Object.keys(earned).length;

  const percentage = Math.round(
    (score / stations.length) * 100
  );

  app.innerHTML = `

    <div class="card">

      <h2>🏆 Ranch Manager Report</h2>

      <p>
        <strong>Ranch:</strong>
        Cedar Creek Ranch
      </p>

      <p>
        <strong>Course:</strong>
        Animal Science 1B
      </p>

      <p>
        <strong>Module:</strong>
        Module 10
      </p>

      <div class="stat">

        🐄 Stations Completed:

        <strong>
          ${score} / ${stations.length}
        </strong>

      </div>

      <div class="stat">

        🎯 Practice Mastery:

        <strong>${percentage}%</strong>

      </div>

      <h3>
        🤠 Congratulations, Ranch Manager!
      </h3>

      <p>
        You've completed all
        ${stations.length} stations
        of the Breeding Barn Challenge!
      </p>

      <h3>🐄 Skills You've Practiced</h3>

      <ul>
        <li>Evaluating breeding readiness</li>
        <li>Comparing natural breeding and AI</li>
        <li>Understanding hybrid vigor</li>
        <li>Recognizing signs of estrus</li>
        <li>Calculating pregnancy rates</li>
        <li>Prioritizing breeding budgets</li>
        <li>Investigating reproductive concerns</li>
        <li>Evaluating breeding bulls</li>
        <li>Estimating calving windows</li>
        <li>Making responsible herd decisions</li>
      </ul>

    </div>

    <div class="card">

      <h3>📚 What's Next?</h3>

      <p>
        Return to Canvas and complete
        your Practice assignment instructions.
      </p>

      <p>
        Then complete
        <strong>
          DEMONSTRATE 10:
          Ranch Manager Certification Challenge
        </strong>
        to show what you've learned.
      </p>

      <p>
        <strong>Ranch Rule:</strong>
        If you don't know an answer,
        don't guess—go find it!
      </p>

    </div>

    <button onclick="window.print()">
      🖨️ Print My Ranch Manager Report
    </button>

    <button onclick="restartSimulation()">
      🔄 Play Again
    </button>
  `;

}

/*
=====================================================
 RESTART SIMULATION
=====================================================
*/

function restartSimulation() {

  station = -1;

  answers = {};

  checked = {};

  earned = {};

  completed = false;

  render();

}

/*
=====================================================
 INITIALIZE
=====================================================
*/

render();

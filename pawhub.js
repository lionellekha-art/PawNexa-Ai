/* =========================
   PAWNEXA AI
   JAVASCRIPT
========================= */


/* =========================
   SCROLL FUNCTIONS
========================= */

function scrollToReport() {

  const report = document.getElementById("report");

  if (report) {
    report.scrollIntoView({
      behavior: "smooth"
    });
  }

}


function scrollToDashboard() {

  const dashboard =
    document.getElementById("dashboard");

  if (dashboard) {
    dashboard.scrollIntoView({
      behavior: "smooth"
    });
  }

}


/* =========================
   TOAST
========================= */

function showToast(message) {

  const toast =
    document.getElementById("toast");

  toast.textContent = message;

  toast.classList.add("show");

  setTimeout(() => {

    toast.classList.remove("show");

  }, 3000);

}


/* =========================
   LOCATION DETECTION
========================= */

function detectLocation() {

  const input =
    document.getElementById("location");

  if (!navigator.geolocation) {

    input.value =
      "Location detection unavailable";

    showToast(
      "Location detection is not supported."
    );

    return;
  }


  input.value =
    "Detecting location...";


  navigator.geolocation.getCurrentPosition(

    function(position) {

      const latitude =
        position.coords.latitude.toFixed(4);

      const longitude =
        position.coords.longitude.toFixed(4);


      input.value =
        `Detected location (${latitude}, ${longitude})`;


      showToast(
        "📍 Location detected successfully!"
      );

    },


    function() {

      input.value = "";

      showToast(
        "Please allow location access or enter it manually."
      );

    }

  );

}


/* =========================
   VOICE REPORT
========================= */

function voiceReport() {

  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;


  if (!SpeechRecognition) {

    showToast(
      "Voice recognition is not supported on this browser."
    );

    return;
  }


  const recognition =
    new SpeechRecognition();


  recognition.lang = "en-IN";

  recognition.interimResults = false;

  recognition.continuous = false;


  showToast(
    "🎙️ Listening... Describe the situation."
  );


  recognition.start();


  recognition.onresult =
    function(event) {

      const text =
        event.results[0][0].transcript;


      document.getElementById(
        "description"
      ).value = text;


      showToast(
        "Voice report added successfully!"
      );

    };


  recognition.onerror =
    function() {

      showToast(
        "Voice recording could not be completed."
      );

    };

}


/* =========================
   IMAGE PREVIEW
========================= */

function previewImage(event) {

  const file =
    event.target.files[0];

  const preview =
    document.getElementById(
      "imagePreview"
    );


  if (!file) {

    preview.innerHTML =
      "📷 Photo preview will appear here";

    return;
  }


  const reader =
    new FileReader();


  reader.onload =
    function(e) {

      preview.innerHTML = `
        <img
          src="${e.target.result}"
          alt="Animal preview"
        >
      `;

    };


  reader.readAsDataURL(file);

}


/* =========================
   AI ANALYSIS
========================= */

function analyzeReport() {

  const animal =
    document.getElementById(
      "animal"
    ).value;


  const condition =
    document.getElementById(
      "condition"
    ).value;


  const description =
    document.getElementById(
      "description"
    ).value.trim();


  const location =
    document.getElementById(
      "location"
    ).value.trim();


  const result =
    document.getElementById(
      "result"
    );


  let priority = "MEDIUM";

  let confidence = "55%";

  let responseTime =
    "Assessment required";

  let action =
    "Rescue assessment";

  let risk =
    "Moderate";

  let guidance =
    "Keep the animal safe and avoid unnecessary movement until a rescue team arrives.";


  /* =========================
     CONDITION ANALYSIS
  ========================= */


  if (
    condition ===
    "Severely Injured"
  ) {

    priority = "CRITICAL";

    confidence = "96%";

    responseTime =
      "Immediate";

    action =
      "Emergency Rescue";

    risk =
      "Very High";

    guidance =
      "Keep the animal away from traffic. Do not move the animal unless it is in immediate danger. Contact the matched rescue team immediately.";

  }


  else if (
    condition ===
    "Injured"
  ) {

    priority = "HIGH";

    confidence = "86%";

    responseTime =
      "Within 30 minutes";

    action =
      "Priority Rescue";

    risk =
      "High";

    guidance =
      "Keep the animal calm and away from people or traffic. Avoid giving food or medication unless advised by a professional.";

  }


  else if (
    condition ===
    "Sick"
  ) {

    priority = "HIGH";

    confidence = "78%";

    responseTime =
      "Priority response";

    action =
      "Medical Assessment";

    risk =
      "High";

    guidance =
      "Maintain a safe distance, provide shade if possible, and wait for veterinary or rescue assistance.";

  }


  else if (
    condition ===
    "Trapped"
  ) {

    priority = "HIGH";

    confidence = "83%";

    responseTime =
      "Priority response";

    action =
      "Safe Extraction";

    risk =
      "High";

    guidance =
      "Do not attempt a dangerous extraction yourself. Keep the area clear and wait for a trained rescue team.";

  }


  else if (
    condition ===
    "Abandoned"
  ) {

    priority = "MEDIUM";

    confidence = "64%";

    responseTime =
      "Within 2 hours";

    action =
      "Rescue Assessment";

    risk =
      "Moderate";

    guidance =
      "Observe from a safe distance and check whether the animal appears injured or distressed while waiting for assistance.";

  }


  else if (
    condition ===
    "Healthy"
  ) {

    priority = "LOW";

    confidence = "28%";

    responseTime =
      "Standard response";

    action =
      "Community Support";

    risk =
      "Low";

    guidance =
      "The animal does not appear to require emergency intervention. Consider community support, food, water or shelter if appropriate.";

  }


  /* =========================
     UPDATE RESULT
  ========================= */


  const priorityElement =
    document.getElementById(
      "priorityText"
    );


  priorityElement.textContent =
    priority;


  priorityElement.style.color =
    getPriorityColor(priority);


  document.getElementById(
    "confidence"
  ).textContent = confidence;


  document.getElementById(
    "responseTime"
  ).textContent = responseTime;


  document.getElementById(
    "action"
  ).textContent = action;


  document.getElementById(
    "risk"
  ).textContent = risk;


  document.getElementById(
    "guidance"
  ).textContent = guidance;


  result.classList.add("active");


  /* =========================
     SMART MATCH
  ========================= */


  updateRescueMatch(
    priority,
    animal
  );


  /* =========================
     ADD CASE
  ========================= */


  addCase(
    animal,
    priority,
    location
  );


  showToast(
    `🧠 AI analyzed ${animal}: ${priority} priority`
  );


  setTimeout(() => {

    result.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

  }, 150);

}


/* =========================
   PRIORITY COLOR
========================= */

function getPriorityColor(priority) {

  if (priority === "CRITICAL") {
    return "#fb7185";
  }

  if (priority === "HIGH") {
    return "#fb923c";
  }

  if (priority === "MEDIUM") {
    return "#facc15";
  }

  return "#4ade80";

}


/* =========================
   RESCUE MATCH
========================= */

function updateRescueMatch(
  priority,
  animal
) {

  const scoreElement =
    document.querySelector(
      ".match-score"
    );


  const progress =
    document.querySelector(
      ".match-progress div"
    );


  let score = 92;


  if (priority === "CRITICAL") {
    score = 97;
  }

  else if (priority === "HIGH") {
    score = 94;
  }

  else if (priority === "MEDIUM") {
    score = 88;
  }

  else {
    score = 76;
  }


  scoreElement.textContent =
    `${score}%`;


  progress.style.width =
    `${score}%`;


  const teamName =
    document.querySelector(
      ".matched-team strong"
    );


  if (
    animal === "Bird"
  ) {

    teamName.textContent =
      "Wildlife Rescue Unit";

  }

  else if (
    animal === "Cow"
  ) {

    teamName.textContent =
      "Large Animal Rescue Team";

  }

  else {

    teamName.textContent =
      "PawCare Emergency Unit";

  }

}


/* =========================
   ADD CASE
========================= */

function addCase(
  animal,
  priority,
  location
) {

  const cases =
    document.getElementById(
      "cases"
    );


  const icons = {

    Dog: "🐕",

    Cat: "🐈",

    Cow: "🐄",

    Bird: "🦜",

    Puppy: "🐶",

    Other: "🐾"

  };


  const newCase =
    document.createElement(
      "div"
    );


  newCase.className =
    "case-card";


  let priorityClass =
    priority.toLowerCase();


  const locationText =
    location ||
    "Location pending";


  newCase.innerHTML = `

    <div class="case-info">

      <div class="case-icon">
        ${icons[animal] || "🐾"}
      </div>

      <div>

        <strong>
          ${animal} Rescue Case
        </strong>

        <small>
          ${locationText} • Just now
        </small>

      </div>

    </div>

    <span class="priority ${priorityClass}">
      ${priority}
    </span>

  `;


  cases.prepend(
    newCase
  );


  /* =========================
     UPDATE COUNTER
  ========================= */


  const counter =
    document.getElementById(
      "animalsHelped"
    );


  let value =
    parseInt(
      counter.textContent
        .replace(",", "")
    );


  value += 1;


  counter.textContent =
    value.toLocaleString();


  /* =========================
     LIMIT CASES
  ========================= */

  const allCases =
    cases.querySelectorAll(
      ".case-card"
    );


  if (allCases.length > 7) {

    cases.removeChild(
      allCases[allCases.length - 1]
    );

  }

}


/* =========================
   EMERGENCY SOS
========================= */

function emergencySOS() {

  showToast(
    "🚨 SOS ACTIVATED — Priority rescue teams alerted!"
  );


  const button =
    document.querySelector(
      ".sos-button"
    );


  const originalText =
    button.textContent;


  button.textContent =
    "SOS ACTIVATED ✓";


  button.style.background =
    "#16a34a";


  setTimeout(() => {

    button.textContent =
      originalText;

    button.style.background =
      "#ef4444";

  }, 5000);

}


/* =========================
   NAVIGATION ACTIVE STATE
========================= */

window.addEventListener(
  "scroll",
  function() {

    const sections =
      document.querySelectorAll(
        "section[id]"
      );


    const scrollPosition =
      window.scrollY + 150;


    sections.forEach(
      function(section) {

        if (
          scrollPosition >=
            section.offsetTop &&

          scrollPosition <
            section.offsetTop +
            section.offsetHeight
        ) {

          document
            .querySelectorAll(
              ".nav-links a"
            )
            .forEach(
              function(link) {

                link.style.color =
                  "";

              }
            );


          const active =
            document.querySelector(
              `.nav-links a[href="#${section.id}"]`
            );


          if (active) {

            active.style.color =
              "#c084fc";

          }

        }

      }
    );

  }
);


/* =========================
   PAGE LOAD
========================= */

document.addEventListener(
  "DOMContentLoaded",
  function() {

    console.log(
      "🐾 PawNexa AI initialized."
    );

    console.log(
      "AI Rescue Intelligence: ONLINE"
    );

  }
);
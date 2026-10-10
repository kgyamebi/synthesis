/*
  Akwaaba Ghana - script.js
  Kofi-Asante Gyamebi (02522028)
  Uses: variables, arrays, functions, operators, if/else, switch, loops and the DOM
*/

console.log("Akwaaba Ghana is loading...");


// ---------- Data (arrays) ----------
// The same position in each array is the same place, e.g. index 5 is Cape Coast Castle

const places = [
  "Labadi Beach",
  "Busua Beach",
  "Kakum National Park",
  "Wli Waterfalls",
  "Mole National Park",
  "Cape Coast Castle",
  "Kwame Nkrumah Memorial Park",
  "Manhyia Palace Museum"
];
const dailyCost = [250, 300, 280, 220, 400, 260, 200, 240];
const emojis = ["🏖️", "🌊", "🌳", "💧", "🐘", "🏰", "⭐", "👑"];

const GUIDE_PER_DAY = 150;
const GROUP_DISCOUNT = 0.1;


// ---------- Greeting based on the time of day ----------

const hour = new Date().getHours();
let greeting;

if (hour < 12) {
  greeting = "Good morning! Akwaaba 👋";
} else if (hour < 17) {
  greeting = "Good afternoon! Akwaaba 👋";
} else {
  greeting = "Good evening! Akwaaba 👋";
}

document.getElementById("greeting").textContent = greeting;
document.getElementById("place-count").textContent = places.length;
document.getElementById("year").textContent = new Date().getFullYear();


// ---------- 1. Explore: filter the cards ----------

const filterButtons = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".card");

function showCategory(category) {
  let shown = 0;

  // show or hide each card
  for (let i = 0; i < cards.length; i++) {
    if (category === "all" || cards[i].classList.contains(category)) {
      cards[i].style.display = "block";
      shown = shown + 1;
    } else {
      cards[i].style.display = "none";
    }
  }

  // highlight the button that was clicked
  for (let i = 0; i < filterButtons.length; i++) {
    if (filterButtons[i].value === category) {
      filterButtons[i].classList.add("active");
    } else {
      filterButtons[i].classList.remove("active");
    }
  }

  document.getElementById("filter-result").textContent =
    "Showing " + shown + " of " + cards.length + " places";
}

for (let i = 0; i < filterButtons.length; i++) {
  filterButtons[i].addEventListener("click", function () {
    showCategory(filterButtons[i].value);
  });
}


// ---------- 2. Quiz: count the answers and pick a trip ----------

const quizForm = document.getElementById("quiz-form");
const quizError = document.getElementById("quiz-error");
let quizPlace = 5;

quizForm.addEventListener("submit", function (event) {
  event.preventDefault();   // stay on the page

  let beach = 0;
  let nature = 0;
  let history = 0;
  const questions = ["q1", "q2", "q3"];

  for (let i = 0; i < questions.length; i++) {
    const answer = quizForm.elements[questions[i]].value;

    if (answer === "") {
      quizError.textContent = "Please answer question " + (i + 1) + ".";
      return;   // stop here until every question is answered
    }

    if (answer === "beach") {
      beach++;
    } else if (answer === "nature") {
      nature++;
    } else {
      history++;
    }
  }

  quizError.textContent = "";

  // the type with the most answers wins
  let winner;
  if (beach >= nature && beach >= history) {
    winner = "beach";
  } else if (nature >= history) {
    winner = "nature";
  } else {
    winner = "history";
  }

  showQuizResult(winner);
});

function showQuizResult(type) {
  let message;

  switch (type) {
    case "beach":
      quizPlace = 1;
      message = "You are a beach lover! Relax on the golden sand and calm waves of Busua.";
      break;
    case "nature":
      quizPlace = 2;
      message = "You are an adventurer! Walk the canopy bridges high above the Kakum rainforest.";
      break;
    default:
      quizPlace = 5;
      message = "You are a history explorer! Discover the powerful story of Cape Coast Castle.";
  }

  document.getElementById("result-emoji").textContent = emojis[quizPlace];
  document.getElementById("result-place").textContent = places[quizPlace];
  document.getElementById("result-text").textContent = message;
  document.getElementById("plan-this").hidden = false;
}

// "Plan this trip" puts the quiz result into the planner
document.getElementById("plan-this").addEventListener("click", function () {
  document.getElementById("place").value = quizPlace;
  calculateBudget();
});


// ---------- 3. Planner: work out the budget ----------

const plannerForm = document.getElementById("planner-form");

function money(amount) {
  return "GH₵ " + amount.toFixed(2);
}

function transportCost(type) {
  switch (type) {
    case "bus":
      return 120;
    case "car":
      return 300;
    default:
      return 60;   // trotro
  }
}

function calculateBudget() {
  const placeIndex = Number(document.getElementById("place").value);
  const days = Number(document.getElementById("days").value);
  const travellers = Number(document.getElementById("travellers").value);
  const wantsGuide = document.getElementById("guide").checked;
  const errorText = document.getElementById("planner-error");

  // check the numbers before calculating
  if (days < 1 || days > 14 || travellers < 1 || travellers > 10) {
    errorText.textContent = "Please choose 1 to 14 days and 1 to 10 travellers.";
    return;
  }
  errorText.textContent = "";

  const stay = dailyCost[placeIndex] * days * travellers;
  const transport = transportCost(plannerForm.elements.transport.value) * travellers;
  const guide = wantsGuide ? GUIDE_PER_DAY * days : 0;
  const subtotal = stay + transport + guide;

  // groups of 4+ staying 3+ days get 10% off
  const getsDiscount = travellers >= 4 && days >= 3;
  const discount = getsDiscount ? subtotal * GROUP_DISCOUNT : 0;

  const total = subtotal - discount;
  const perPerson = total / travellers;

  let level;
  if (perPerson < 1000) {
    level = "💚 Budget friendly";
  } else if (perPerson < 2500) {
    level = "💛 Comfortable";
  } else {
    level = "❤️ Treat yourself";
  }

  document.getElementById("summary-place").textContent = places[placeIndex];
  document.getElementById("total").textContent = money(total);
  document.getElementById("per-person").textContent = money(perPerson) + " per person";
  document.getElementById("budget-level").textContent = level;
  document.getElementById("stay-cost").textContent = money(stay);
  document.getElementById("transport-cost").textContent = money(transport);
  document.getElementById("guide-cost").textContent = money(guide);
  document.getElementById("discount").textContent = "- " + money(discount);

  buildDayPlan(places[placeIndex], days);
}

function buildDayPlan(place, days) {
  const list = document.getElementById("day-plan");
  const activities = ["Explore", "Take a guided tour of", "Try the local food near", "Take photos around"];
  list.textContent = "";   // clear the old plan

  for (let day = 1; day <= days; day++) {
    let activity;

    if (days === 1) {
      activity = "Day trip to " + place;
    } else if (day === 1) {
      activity = "Travel to " + place + " and settle in";
    } else if (day === days) {
      activity = "Last morning at " + place + ", then head home";
    } else {
      // % (remainder) cycles through the activities: 0, 1, 2, 3, 0, 1...
      activity = activities[(day - 2) % activities.length] + " " + place;
    }

    const item = document.createElement("li");
    item.textContent = "Day " + day + ": " + activity;
    list.appendChild(item);
  }
}

// recalculate every time something in the planner changes
plannerForm.addEventListener("input", calculateBudget);

calculateBudget();
console.log("Akwaaba Ghana is ready!");

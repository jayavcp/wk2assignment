console.log("Hello World");

const cookieBtn = document.getElementById("cookieBtn");
const imgBtn = document.querySelector("img");
const upgradeBtn = document.getElementById("upgradeBtn");
const upgradeCost = document.getElementById("upgradeCost");
const cookiesSpan = document.getElementById("cookiesSpan");
const cpsSpan = document.getElementById("cpsSpan");
const resetBtn = document.getElementById("resetBtn");
const errorMessage = document.getElementById("errorMessage");

// default starting value for stats
const stats = {
  cookieCount: 0,
  cps: 0, //cookies automatically received per second
};

//if local storage exists, update stats with it
const storageStats = JSON.parse(localStorage.getItem("stats"));

if (storageStats !== null) {
  stats.cookieCount = storageStats.cookieCount;
  stats.cps = storageStats.cps;
  updatePage();
}

function buyCookie() {
  stats.cookieCount++;
  updatePage();
  updateStorage();
}

function buyUpgrade() {
  if (stats.cookieCount >= stats.cps * 5) {
    stats.cookieCount = stats.cookieCount - stats.cps * 5;
    stats.cps++;
    updatePage();
    updateStorage();
  } else {
    (errorMessage.style.display = "block"),
      setTimeout(() => {
        errorMessage.style.display = "none";
      }, 3000);
  }
}

function updatePage() {
  cookiesSpan.textContent = stats.cookieCount;
  cpsSpan.textContent = stats.cps;
  upgradeCost.textContent = stats.cps * 5;
}

function updateStorage() {
  localStorage.setItem("stats", JSON.stringify(stats));
}

function reset() {
  stats.cookieCount = 0;
  stats.cps = 0;
  updatePage();
  updateStorage();
}

cookieBtn.addEventListener("click", buyCookie);
imgBtn.addEventListener("click", buyCookie);
upgradeBtn.addEventListener("click", buyUpgrade);
resetBtn.addEventListener("click", reset); //adding in reset button click event

// start the timer that runs every second forever
setInterval(function () {
  stats.cookieCount += stats.cps;
  console.log("🍪", stats.cookieCount);
  updatePage();
  updateStorage();
}, 1000);

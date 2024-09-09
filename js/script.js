const dataResponse = await fetch("../data.json");
const data = await dataResponse.json();
let currentTab = document.querySelector(".current-tab");
const mobileTabs = document.getElementById("mobile-tabs");
const source = document.querySelector("#source>a");
const paraInfo = document.getElementById("overview-para");
const planets = {};
let currentPlanet = "Mercury";
for (const planet of data) {
  //   console.log(planet);
  planets[planet.name] = planet;
}

console.log(planets[currentPlanet]);

mobileTabs.addEventListener("click", (e) => {
  //   e.preventDefault();
  //   console.log(e.target.tagName);
  if (e.target.tagName == "BUTTON") {
    currentTab.classList.toggle("current-tab", false);
    e.target.classList.toggle("current-tab", true);
    currentTab = e.target;

    const tempPlanet = planets[currentPlanet];
    // currentPlanet = tempPlanet.name;
    paraInfo.textContent = tempPlanet[currentTab.dataset.name].content;
    console.log(tempPlanet[currentTab.dataset.name].source);
    source.setAttribute("href", tempPlanet[currentTab.dataset.name].source);
  }
});

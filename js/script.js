const dataResponse = await fetch("../data.json");
const data = await dataResponse.json();
let currentTab = document.querySelector(".current-tab");
const mobileTabs = document.getElementById("mobile-tabs");
const source = document.querySelector("#source>a");
const paraInfo = document.getElementById("overview-para");
const mobileMenu = document.getElementById("mobile-menu");
const stats = document.querySelectorAll(
  "#rot-con, #rev-con, #rad-con, #temp-con"
);
const menuBtn = document.getElementById("hamburger-btn");
const content = document.getElementById("content");
const planets = {};
let currentPlanetName = "Mercury";
for (const planet of data) {
  //   console.log(planet);
  planets[planet.name] = planet;
}

console.log(planets[currentPlanetName]);

mobileTabs.addEventListener("click", (e) => {
  //   e.preventDefault();
  //   console.log(e.target.tagName);
  if (e.target.tagName == "BUTTON") {
    currentTab.classList.toggle("current-tab", false);
    e.target.classList.toggle("current-tab", true);
    currentTab = e.target;

    const tempPlanet = planets[currentPlanetName];
    // currentPlanet = tempPlanet.name;
    paraInfo.textContent = tempPlanet[currentTab.dataset.name].content;
    // console.log(tempPlanet[currentTab.dataset.name].source);
    source.setAttribute("href", tempPlanet[currentTab.dataset.name].source);
  }
});

// console.log(mobileMenu);
mobileMenu.addEventListener("click", (e) => {
  e.preventDefault();
  const planetNameEle = e.target.closest("li");
  if (planetNameEle) {
    // console.log(planetNameEle.dataset.name);

    currentPlanetName = planetNameEle.dataset.name;
    const planetHeader = document.querySelector(".content-info>h1");
    planetHeader.textContent = planets[currentPlanetName].name;
    console.log(planets[currentPlanetName]);
    paraInfo.textContent =
      planets[currentPlanetName][currentTab.dataset.name].content;
    source.setAttribute(
      "href",
      planets[currentPlanetName][currentTab.dataset.name].source
    );

    document.documentElement.setAttribute(
      "style",
      `--planet-color: var(--${currentPlanetName.toLowerCase()}); --planet-size: var(--${currentPlanetName.toLowerCase()}-size)`
    );

    const img = content.querySelector("#planet");
    if (currentTab.dataset.name === "geology") {
      img.setAttribute("src", planets[currentPlanetName].images["geology"]);
    } else if (currentTab.dataset.name === "structure") {
      img.setAttribute("src", planets[currentPlanetName].images["internal"]);
    } else if (currentTab.dataset.name === "overview") {
      img.setAttribute("src", planets[currentPlanetName].images["planet"]);
    }
    for (const stat of stats) {
      stat.children[1].textContent = `${
        planets[currentPlanetName][stat.dataset.name]
      }`;
    }
  }
});

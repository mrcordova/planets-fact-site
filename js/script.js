const dataResponse = await fetch("data.json");
const data = await dataResponse.json();
let currentTab = document.querySelector(".current-tab").dataset.name;
const mobileTabs = document.getElementById("mobile-tabs");
const desktopTabs = document.getElementById("desktop-tabs");
const source = document.querySelector("#source>a");
const paraInfo = document.getElementById("overview-para");
const mobileMenu = document.getElementById("mobile-menu");
const desktopMenu = document.getElementById("desktop-menu");
const stats = document.querySelectorAll(
  "#rot-con, #rev-con, #rad-con, #temp-con"
);
const menuBtn = document.getElementById("hamburger-btn");
const content = document.getElementById("content");
const planets = {};
let currentPlanetName = "Mercury";
for (const planet of data) {
  planets[planet.name] = planet;
}

function updateTabs(e) {
  if (e.target.tagName == "BUTTON") {
    let currentTabs = document.querySelectorAll(`[data-name='${currentTab}']`);
    for (const currentTab of currentTabs) {
      currentTab.classList.toggle("current-tab", false);
    }
    currentTab = e.target.dataset.name;
    let newTabs = document.querySelectorAll(`[data-name='${currentTab}']`);
    for (const newTab of newTabs) {
      newTab.classList.toggle("current-tab", true);
    }
    const img = content.querySelector("#planet");
    const geoImg = content.querySelector("#geology");
    if (currentTab === "geology") {
      img.setAttribute("src", planets[currentPlanetName].images["planet"]);
      geoImg.setAttribute("src", planets[currentPlanetName].images["geology"]);
      geoImg.classList.toggle("show", true);
    } else if (currentTab === "structure") {
      img.setAttribute("src", planets[currentPlanetName].images["internal"]);
      geoImg.classList.toggle("show", false);
    } else if (currentTab === "overview") {
      img.setAttribute("src", planets[currentPlanetName].images["planet"]);
      geoImg.classList.toggle("show", false);
    } else {
      img.setAttribute("src", planets[currentPlanetName].images["planet"]);
      geoImg.classList.toggle("show", false);
    }

    const tempPlanet = planets[currentPlanetName];
    paraInfo.textContent = tempPlanet[currentTab].content;
    source.setAttribute("href", tempPlanet[currentTab].source);
  }
}

function updateParaInfo(e) {
  e.preventDefault();
  const planetNameEle = e.target.closest("li");
  if (planetNameEle) {
    currentPlanetName = planetNameEle.dataset.name;
    const planetHeader = document.querySelector(".content-info>h1");
    planetHeader.textContent = planets[currentPlanetName].name;
    paraInfo.textContent = planets[currentPlanetName][currentTab].content;
    source.setAttribute("href", planets[currentPlanetName][currentTab].source);

    document.documentElement.setAttribute(
      "style",
      `--planet-color: var(--${currentPlanetName.toLowerCase()}); --planet-size: var(--${currentPlanetName.toLowerCase()}-size)`
    );

    const img = content.querySelector("#planet");
    const geoImg = content.querySelector("#geology");
    if (currentTab === "geology") {
      img.setAttribute("src", planets[currentPlanetName].images["planet"]);
      geoImg.setAttribute("src", planets[currentPlanetName].images["geology"]);
      geoImg.classList.toggle("show", true);
    } else if (currentTab === "structure") {
      img.setAttribute("src", planets[currentPlanetName].images["internal"]);
      geoImg.classList.toggle("show", false);
    } else if (currentTab === "overview") {
      img.setAttribute("src", planets[currentPlanetName].images["planet"]);
      geoImg.classList.toggle("show", false);
    } else {
      geoImg.classList.toggle("show", false);
      img.setAttribute("src", planets[currentPlanetName].images["planet"]);
    }
    for (const stat of stats) {
      stat.children[1].textContent = `${
        planets[currentPlanetName][stat.dataset.name]
      }`;
    }

    if (planetNameEle.parentElement.id == "mobile-menu") {
      planetNameEle.parentElement.hidePopover();
    }
  }
}

mobileTabs.addEventListener("click", updateTabs);
desktopTabs.addEventListener("click", updateTabs);

mobileMenu.addEventListener("click", updateParaInfo);
desktopMenu.addEventListener("click", updateParaInfo);

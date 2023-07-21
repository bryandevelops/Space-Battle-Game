/////////////
// CLASSES //
/////////////

// The Ship objects only have three properties to start
class Ship {
    constructor(hull, firepower, accuracy) {
        this.hull = hull
        this.firepower = firepower
        this.accuracy = accuracy
    }
}

// The PlayerShip will have the same properties of Ship, but different methods from AlienShip
class PlayerShip extends Ship {
    attack(alienShip) {
        if (this.accuracy > Math.random()) {
            alienShip.hull -= this.firepower;
            alienHullEle.textContent = `Hull Integrity: ${alienShip.hull < 0 ? 0 : alienShip.hull}`
            handleActionMessage(this, "✅ Hit")
            handleActionMessage(alienShip, "💥 Damage Taken")
        } else {
            handleActionMessage(this, "❌ Miss")
            handleActionMessage(alienShip, "🪽 Hit Evaded")
        }

        attackBtn.textContent = "End Turn";

        return;
    }

    // The user retreats if he chooses to retreat when prompted for input
    retreat() {
        playerActionMsgEle.textContent = "🚀 You live to fight another day..."
        const aliens = [];
            for (let i = 0; i < alienShips.length; i++) {
                aliens.push("👿");
            }
        alienActionMsgEle.textContent = aliens.join("");
        attackBtn.classList.remove("slide-btn-in");
        attackBtn.classList.add("slide-btn-out");
        retreatBtn.classList.remove("slide-btn-in");
        retreatBtn.classList.add("slide-btn-out");
        startGameBtn.classList.remove("slide-btn-out");
        startGameBtn.classList.add("slide-btn-in");
        startGameBtn.textContent = "New Game"
    }

    // The user wins if the number of alienShips is reduced to 0
    youWin() {
        playerActionMsgEle.textContent = "🥳 Aliens Eliminated. You Win!";
        alienHeadingEle.textContent = "Alien Ship (Remaining: 0)"
        alienHullEle.textContent = "Hull Integrity: 0"
        alienFirepowerEle.textContent = "Ship Firepower: 0"
        alienAccuracyEle.textContent = "Targeting System: 0%"
        alienActionMsgEle.textContent = "💀💀💀💀💀💀";
        attackBtn.classList.remove("slide-btn-in");
        attackBtn.classList.add("slide-btn-out");
        retreatBtn.classList.remove("slide-btn-in");
        retreatBtn.classList.add("slide-btn-out");
        startGameBtn.classList.remove("slide-btn-out");
        startGameBtn.classList.add("slide-btn-in");
        startGameBtn.textContent = "New Game"
    }

    // The user loses if the hull property of the playerShip is less than or equal to 0
    youLose() {
        playerHullEle.textContent = "Hull Integrity: 0"
        playerFirepowerEle.textContent = "Ship Firepower: 0"
        playerAccuracyEle.textContent = "Targeting System: 0%"
        playerActionMsgEle.textContent = "😵 Hull Breached. You Lose!"
        const aliens = [];
            for (let i = 0; i < alienShips.length; i++) {
                aliens.push("😈");
            }
        alienActionMsgEle.textContent = aliens.join("");
        attackBtn.classList.remove("slide-btn-in");
        attackBtn.classList.add("slide-btn-out");
        retreatBtn.classList.remove("slide-btn-in");
        retreatBtn.classList.add("slide-btn-out");
        startGameBtn.classList.remove("slide-btn-out");
        startGameBtn.classList.add("slide-btn-in");
        startGameBtn.textContent = "New Game"
    }
}

// The AlienShip will have the same properties of Ship, but different methods from PlayerShip
class AlienShip extends Ship {
    attack(playerShip) {
        if (this.accuracy > Math.random()) {
            playerShip.hull -= this.firepower;
            playerHullEle.textContent = `Hull Integrity: ${playerShip.hull < 0 ? 0 : playerShip.hull}`
            handleActionMessage(this, "✅ Hit")
            handleActionMessage(playerShip, "💥 Damage Taken")
        } else {
            handleActionMessage(this, "❌ Miss")
            handleActionMessage(playerShip, "🪽 Hit Evaded")
        }

        retreatBtn.textContent = "End Turn";

        return;  
    }
}


///////////////
// VARIABLES //
///////////////

// Initialize the playerShip variable with a newly instantiated PlayerShip object. The property values for the player are the same each time
const playerShip = new PlayerShip(20, 5, 0.7);

// The number of alien ships the player will be battling
const numOfAliens = 6; // prompt the user for a number later

// An array where all alien ships will be stored
let alienShips = [];

// Background audio
const mySound = new Audio("assets/backgroundAudio.mp3")


//////////////////
// DOM ELEMENTS //
//////////////////

const startGameBtn = document.querySelector(".start-button");
const attackBtn = document.querySelector(".attack-button");
const retreatBtn = document.querySelector(".retreat-button");
const shipContainerEle = document.querySelector(".ship-container");

const playerHullEle = document.getElementById("player-hull");
const playerFirepowerEle = document.getElementById("player-firepower");
const playerAccuracyEle = document.getElementById("player-accuracy");
const playerActionMsgEle = document.getElementById("player-action-message");
const playerHeadingEle = document.getElementById("player-heading");

const alienHullEle = document.getElementById("alien-hull");
const alienFirepowerEle = document.getElementById("alien-firepower");
const alienAccuracyEle = document.getElementById("alien-accuracy");
const alienActionMsgEle = document.getElementById("alien-action-message");
const alienHeadingEle = document.getElementById("alien-heading");


///////////////
// FUNCTIONS //
///////////////

function init() {
    playerShip.hull = 20;
    playerShip.firepower = 5;
    playerShip.accuracy = 0.7

    // Depending on the number of aliens the player will be battling, instantiate a new AlienShip for each alien
    alienShips = [];
    for (let i = 0; i < numOfAliens; i++) {
        const alienHull = Math.trunc(Math.random() * ((6 - 3) + 1) + 3);
        const alienFirepower = Math.trunc(Math.random() * ((4 - 2) + 1) + 2);
        const alienAccuracy = Math.trunc(Math.random() * ((8 - 6) + 1) + 6) / 10;
        alienShips.push(new AlienShip(alienHull, alienFirepower, alienAccuracy));
    }

    playerHeadingEle.textContent = "Normandy SR-1";
    playerHullEle.textContent = `Hull Integrity: ${playerShip.hull}`;
    playerFirepowerEle.textContent = `Ship Firepower: ${playerShip.firepower}`;
    playerAccuracyEle.textContent = `Targeting Systems: ${playerShip.accuracy * 100}%`;
    playerActionMsgEle.textContent = "🧑‍🚀 🚀";
    alienHeadingEle.textContent = `Alien Ship (Remaining: ${numOfAliens})`;
    alienHullEle.textContent = `Hull Integrity: ${alienShips[0].hull}`;
    alienFirepowerEle.textContent = `Ship Firepower: ${alienShips[0].firepower}`;
    alienAccuracyEle.textContent = `Targeting Systems: ${alienShips[0].accuracy * 100}%`;
    alienActionMsgEle.textContent = "👽 🛸";
    attackBtn.textContent = "Attack"
    retreatBtn.textContent = "Retreat"
}

function handleContainerDisplay() {
    if (shipContainerEle.classList.contains("ship-container-hidden")) {
        shipContainerEle.style.removeProperty("display");
        setTimeout(() => shipContainerEle.classList.remove("ship-container-hidden"), 0);
    } else {
        shipContainerEle.classList.add("ship-container-hidden");
    }
    
    startGameBtn.removeEventListener("click", handleContainerDisplay)
}

function handleActionMessage(ship, message) {
    ship instanceof PlayerShip ?
        playerActionMsgEle.textContent = message :
        alienActionMsgEle.textContent = message ;
}


/////////////////////
// EVENT LISTENERS //
/////////////////////

startGameBtn.addEventListener("click", function() {
    mySound.play()
    if (startGameBtn.textContent === "Start Game") {
        init();
        startGameBtn.classList.add("slide-btn-out");
        attackBtn.classList.add("slide-btn-in");
        handleContainerDisplay();
    } else {
        init();
        startGameBtn.classList.remove("slide-btn-in");
        startGameBtn.classList.add("slide-btn-out");
        attackBtn.classList.remove("slide-btn-out");
        attackBtn.classList.add("slide-btn-in");
    }
})

attackBtn.addEventListener("click", function() {
    if (attackBtn.textContent === "Attack") {
        playerShip.attack(alienShips[0]);
        retreatBtn.classList.remove("slide-btn-in");
        retreatBtn.classList.add("slide-btn-out");
    } else if (attackBtn.textContent === "End Turn") {
        if (alienShips[0].hull > 0) {
            retreatBtn.textContent = "Defend";
            retreatBtn.classList.add("slide-btn-in");
            retreatBtn.classList.remove("slide-btn-out");
            attackBtn.classList.remove("slide-btn-in");
            attackBtn.classList.add("slide-btn-out");
            handleActionMessage(playerShip, "🫨 Brace For Impact!")
            handleActionMessage(alienShips[0], "☄️ Fire!")
        } else {
            alienShips.shift(alienShips[0])
            
            if (alienShips.length) {
                alienHeadingEle.textContent = `Alien Ship (Remaining: ${alienShips.length})`
                alienHullEle.textContent = `Hull Integrity: ${alienShips[0].hull}`
                alienFirepowerEle.textContent = `Ship Firepower: ${alienShips[0].firepower}`
                alienAccuracyEle.textContent = `Targeting System: ${alienShips[0].accuracy * 100}%`
                attackBtn.textContent = "Attack"
                retreatBtn.textContent = "Retreat"
                retreatBtn.classList.add("slide-btn-in");
                retreatBtn.classList.remove("slide-btn-out");
                playerActionMsgEle.textContent = "🤔 Would you like to continue the Attack, or Retreat?"
                const aliens = [];
                for (let i = 0; i < alienShips.length; i++) {
                    aliens.push("👾");
                }
                alienActionMsgEle.textContent = aliens.join("");
            } else {
                playerShip.youWin()
            }
        }
    }
})

retreatBtn.addEventListener("click", function() {
    if (retreatBtn.textContent === "Retreat") {
        playerShip.retreat();
        return;
    } else if (retreatBtn.textContent === "Defend") {
        alienShips[0].attack(playerShip)
    } else {
        if (playerShip.hull > 0) {
            attackBtn.textContent = "Attack";
            attackBtn.classList.add("slide-btn-in");
            attackBtn.classList.remove("slide-btn-out");
            retreatBtn.classList.remove("slide-btn-in");
            retreatBtn.classList.add("slide-btn-out");
            handleActionMessage(playerShip, "☄️ Fire!")
            handleActionMessage(alienShips[0], "🫨 Brace For Impact!")
        } else {
            playerShip.youLose();
        }
    }
})
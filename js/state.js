/* ==========================================================================
Project Aether Run - Game State & Save Persistence Engine
========================================================================== */

export const GameState = {
// Account Meta State (Persisted across runs)
meta: {
soulShards: 0,
unlockedClasses: ["warrior", "cleric", "mage", "rogue", "tank"],
accountUpgrades: {
startingRestCharges: 2,
goldMultiplierRank: 1,
startingStatPoints: 0,
soulEmberEfficiency: 1.0
},
classSkillTrees: {
warrior: {}, cleric: {}, mage: {}, rogue: {}, tank: {}
},
almanac: {
enemiesDiscovered: [],
itemsDiscovered: [],
eventsDiscovered: [],
classesDiscovered: ["warrior", "cleric", "mage", "rogue", "tank"]
}
},

// Active Run State (Resets on new run)
run: {
active: false,
wave: 1,
gold: 0,
bossesSlain: 0,
restCharges: 2,
ultimateGauge: 0, // Soul Ember (0 - 100)
party: [], // Holds 3 created player characters
activeEnemies: [],
runLogs: []
},

// Load save data from browser localStorage
loadSave() {
const saved = localStorage.getItem("aether_run_save");
if (saved) {
try {
const parsed = JSON.parse(saved);
this.meta = { ...this.meta, ...parsed };
} catch (e) {
console.error("Failed to parse save data:", e);
}
}
},

// Commit current meta progress to localStorage
saveGame() {
localStorage.setItem("aether_run_save", JSON.stringify(this.meta));
},

// Initialize fresh run session
startNewRun(createdParty) {
this.run.active = true;
this.run.wave = 1;
this.run.gold = 0;
this.run.bossesSlain = 0;
this.run.restCharges = this.meta.accountUpgrades.startingRestCharges;
this.run.ultimateGauge = 0;
this.run.party = createdParty;
this.run.activeEnemies = [];
this.run.runLogs = ["Gauntlet run initiated. Good luck, heroes!"];
},

// Add message to run combat log
addLog(message) {
this.run.runLogs.push(`[Wave ${this.run.wave}] ${message}`);
if (this.run.runLogs.length > 50) {
this.run.runLogs.shift(); // Keep log size manageable
}
}
};

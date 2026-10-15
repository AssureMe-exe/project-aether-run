/* ==========================================================================
Project Aether Run - Hub Base Camp & Meta-Progression Engine
Contains: Guild Hall, Class Unlocks, Skill Trees, & Account Upgrades
========================================================================== */

import { GameState } from './state.js';
import { CLASS_ROSTER } from './classes.js';
import { Almanac } from './almanac.js';

export const HubEngine = {
// --- GUILD HALL: CLASS UNLOCKS ---
unlockClass(classId) {
const classData = CLASS_ROSTER[classId];
if (!classData) return false;

if (GameState.meta.unlockedClasses.includes(classId)) {
return true; // Already unlocked
}

const cost = classData.costToUnlock || 500;
if (GameState.meta.soulShards >= cost) {
GameState.meta.soulShards -= cost;
GameState.meta.unlockedClasses.push(classId);

// Record discovery in Almanac
Almanac.recordDiscovery("classesDiscovered", classId);
GameState.saveGame();
return true;
}

return false; // Not enough Soul Shards
},

// --- GUILD HALL: PER-CLASS SKILL TREES ---
upgradeClassSkill(classId, skillNodeKey, cost) {
if (!GameState.meta.skillTrees[classId]) {
GameState.meta.skillTrees[classId] = {};
}

const currentRank = GameState.meta.skillTrees[classId][skillNodeKey] || 0;
if (currentRank >= 3) return false; // Max rank reached

if (GameState.meta.soulShards >= cost) {
GameState.meta.soulShards -= cost;
GameState.meta.skillTrees[classId][skillNodeKey] = currentRank + 1;
GameState.saveGame();
return true;
}

return false;
},

// --- TRAINING GROUNDS: ACCOUNT-WIDE PERMANENT UPGRADES ---
upgradeAccountStat(upgradeType, cost) {
if (GameState.meta.soulShards >= cost) {
GameState.meta.soulShards -= cost;

switch (upgradeType) {
case "startingRest":
GameState.meta.accountUpgrades.startingRestCharges =
(GameState.meta.accountUpgrades.startingRestCharges || 2) + 1;
break;
case "goldMultiplier":
GameState.meta.accountUpgrades.goldMultiplierRank =
(GameState.meta.accountUpgrades.goldMultiplierRank || 1) + 1;
break;
case "startingStats":
GameState.meta.accountUpgrades.startingStatPoints =
(GameState.meta.accountUpgrades.startingStatPoints || 0) + 1;
break;
case "soulEmberEff":
GameState.meta.accountUpgrades.soulEmberEfficiency =
(GameState.meta.accountUpgrades.soulEmberEfficiency || 1.0) + 0.10;
break;
}

GameState.saveGame();
return true;
}

return false;
},

// --- RENDER DATA HELPERS FOR HUB UI ---
getHubOverviewData() {
return {
soulShards: GameState.meta.soulShards,
unlockedClassesCount: GameState.meta.unlockedClasses.length,
totalClassesCount: Object.keys(CLASS_ROSTER).length,
startingRest: GameState.meta.accountUpgrades.startingRestCharges,
goldRank: GameState.meta.accountUpgrades.goldMultiplierRank,
bonusStatPoints: GameState.meta.accountUpgrades.startingStatPoints
};
}
};


/* ==========================================================================
Project Aether Run - Configuration & Progression Formulas
========================================================================== */

export const CONFIG = {
// Gauntlet Limits & Intervals
MAX_WAVES: 200,
MINIBOSS_INTERVAL: 20,
MAJOR_BOSS_INTERVAL: 30,
CHOICE_NODE_INTERVAL: 5,

// XP Scaling
BASE_XP_PER_ENEMY: 25,

// Calculate XP granted by an enemy based on current wave & rank
calculateEnemyXP(wave, isBoss = false, isMiniboss = false) {
let rankMultiplier = 1.0;
if (isBoss) rankMultiplier = 3.5;
else if (isMiniboss) rankMultiplier = 2.0;

return Math.floor(
this.BASE_XP_PER_ENEMY * (1 + wave / 10) * rankMultiplier
);
},

// Calculate total XP required to advance to next level: Math.floor(50 * L^1.65 + 100 * L)
calculateRequiredXP(level) {
return Math.floor(50 * Math.pow(level, 1.65) + 100 * level);
},

// Level-Up Stat Allocation Wheel Roll (+1 = 60%, +2 = 30%, +3 = 10%)
rollStatPoint() {
const roll = Math.random();
if (roll < 0.60) return 1;
if (roll < 0.90) return 2;
return 3;
},

// Base Stat Increment Values per Point Awarded
STAT_SCALING: {
HP_PER_POINT: 15, // Adds +15 Max HP
STR_PER_POINT: 2, // Adds +2 Base Physical/Magic Power
DEF_PERCENT_PER_POINT: 1.5, // Adds +1.5% Damage Mitigation (Capped at 75%)
LCK_CRIT_PER_POINT: 1.5, // Adds +1.5% Crit Chance & Status Trigger
DEX_DODGE_PER_POINT: 1.0 // Adds +1.0% Evasion / Turn Speed Priority
},

// Currency Conversion (Run End Gold -> Permanent Meta Soul Shards)
calculateSoulShards(goldCollected, waveReached, bossesSlain) {
return Math.floor((goldCollected * 0.5) + (waveReached * 10) + (bossesSlain * 50));
}
};

/* ==========================================================================
Project Aether Run - Almanac & Compendium Registry
Contains: Encyclopedia Lookups, Discovery Tracking, & Witty Lore Readers
========================================================================== */

import { GameState } from './state.js';
import { CLASS_ROSTER } from './classes.js';
import { MASTER_BESTIARY } from './enemies.js';
import { ITEM_DATABASE, META_EVENTS_DATABASE } from './database.js';

export const Almanac = {
// Record new discovery into persistent save file
recordDiscovery(category, id) {
if (!GameState.meta.almanac[category]) {
GameState.meta.almanac[category] = [];
}
if (!GameState.meta.almanac[category].includes(id)) {
GameState.meta.almanac[category].push(id);
GameState.saveGame();
}
},

// ==========================================
// --- ALMANAC DATA LOOKUP RETRIEVERS ---
// ==========================================

// Fetch Class Compendium Entry
getClassEntry(classId) {
const classData = CLASS_ROSTER[classId];
if (!classData) return null;

const isDiscovered = GameState.meta.almanac.classesDiscovered.includes(classId);

return {
name: isDiscovered ? classData.name : "??? (Locked Class)",
desc: isDiscovered ? classData.desc : "Unlock this class in the Guild Hall or encounter it in runs to reveal details.",
unlocked: isDiscovered,
mainAttack: isDiscovered ? classData.mainAttack : null,
allySkill: isDiscovered ? classData.allySkill : null,
selfSkill: isDiscovered ? classData.selfSkill : null,
ultimate: isDiscovered ? classData.ultimate : null
};
},

// Fetch Enemy Compendium Entry
getEnemyEntry(enemyId) {
const enemy = MASTER_BESTIARY.find(e => e.id === enemyId);
if (!enemy) return null;

const isDiscovered = GameState.meta.almanac.enemiesDiscovered.includes(enemyId);

return {
name: isDiscovered ? enemy.name : "??? (Unknown Fiend)",
hp: isDiscovered ? enemy.hp : "???",
str: isDiscovered ? enemy.str : "???",
def: isDiscovered ? enemy.def : "???",
tags: isDiscovered ? enemy.tags : ["UNKNOWN"],
lore: isDiscovered ? enemy.lore : "Defeat this enemy in the gauntlet to record its lore.",
quip: isDiscovered ? enemy.quip : "No data available.",
discovered: isDiscovered
};
},

// Fetch Item / Artifact Entry
getItemEntry(itemId) {
const item = ITEM_DATABASE.find(i => i.id === itemId);
if (!item) return null;

const isDiscovered = GameState.meta.almanac.itemsDiscovered.includes(itemId);

return {
name: isDiscovered ? item.name : "??? (Undiscovered Relic)",
type: isDiscovered ? item.type : "Unknown",
rarity: isDiscovered ? item.rarity : "Unknown",
effect: isDiscovered ? item.effect : "Obtain or purchase this item during a run to unlock its capabilities.",
quip: isDiscovered ? item.almanacQuip : "Locked entry.",
discovered: isDiscovered
};
},

// Fetch Meta Event Entry
getEventEntry(eventId) {
const evt = META_EVENTS_DATABASE.find(e => e.id === eventId);
if (!evt) return null;

const isDiscovered = GameState.meta.almanac.eventsDiscovered.includes(eventId);

return {
name: isDiscovered ? evt.name : "??? (Mysterious Event)",
desc: isDiscovered ? evt.desc : "Encounter this event during a run node to record its details.",
quip: isDiscovered ? (evt.almanacQuip || "An unpredictable occurrence in the gauntlet.") : "Locked entry.",
discovered: isDiscovered
};
},

// ==========================================
// --- COMPENDIUM CATEGORY LIST GENERATORS ---
// ==========================================

// Returns array of all entries for render in Almanac UI
getAllCategoryEntries(category) {
switch (category) {
case "classes":
return Object.keys(CLASS_ROSTER).map(id => this.getClassEntry(id));
case "enemies":
return MASTER_BESTIARY.map(e => this.getEnemyEntry(e.id));
case "items":
return ITEM_DATABASE.map(i => this.getItemEntry(i.id));
case "events":
return META_EVENTS_DATABASE.map(evt => this.getEventEntry(evt.id));
default:
return [];
}
}
};


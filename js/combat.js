/* ==========================================================================
Project Aether Run - Complete Combat Engine & Drag Mechanics
Contains: Drag/Tap Targeting, Soul Ember Gauge, & Hold-to-Inspect System
========================================================================== */

import { GameState } from './state.js';
import { ENEMY_TAGS } from './enemies.js';

export class CombatEngine {
constructor() {
this.draggedPartyIdx = null;
this.inspectTimer = null;
this.inspectHoldDuration = 500; // 500ms click-and-hold trigger threshold
}

// ==========================================
// --- CLICK & HOLD INSPECT SYSTEM ---
// ==========================================
startInspectHold(entity, type, event) {
this.cancelInspectHold();
this.inspectTimer = setTimeout(() => {
this.triggerInspectModal(entity, type);
}, this.inspectHoldDuration);
}

cancelInspectHold() {
if (this.inspectTimer) {
clearTimeout(this.inspectTimer);
this.inspectTimer = null;
}
}

triggerInspectModal(entity, type) {
const modal = document.getElementById("inspect-modal");
if (!modal) return;

let content = "";

if (type === "enemy") {
// Calculate 10% Max HP threshold for Knight trait display
const knightThreshold = Math.floor(entity.maxHp * 0.10);

content = `
<div class="modal-card">
<h2>${entity.name} ${entity.isDowned ? "(DOWNED)" : ""}</h2>
<p><strong>Health:</strong> ${entity.hp} / ${entity.maxHp}</p>
<p><strong>Base Attack Power:</strong> ${entity.str} DMG</p>
<hr>
<h3>Class Traits & Passives</h3>
${this.getEnemyTraitDescriptions(entity, knightThreshold)}
<hr>
<p><em>"${entity.almanacQuip || entity.almanacLore}"</em></p>
<button onclick="document.getElementById('inspect-modal').classList.remove('active')">Close</button>
</div>
`;
} else if (type === "party") {
const classData = entity.classData;
content = `
<div class="modal-card">
<h2>${entity.name} (${classData.name})</h2>
<p><strong>Health:</strong> ${entity.hp} / ${entity.maxHp}</p>
<p><strong>Level:</strong> ${entity.level || 1} | <strong>STR:</strong> ${entity.str} | <strong>DEF:</strong> ${entity.def}</p>
<p><strong>LCK (Crit):</strong> ${entity.lck || 5}% | <strong>DEX (Dodge):</strong> ${entity.dex || 5}%</p>
<hr>
<h3>Abilities & Moveset</h3>
<p><strong>⚔️ Main Attack (Drag to Enemy):</strong> ${classData.mainAttack.name}<br><em>${classData.mainAttack.desc}</em></p>
<p><strong>🛡️ Support Ability (Drag to Ally):</strong> ${classData.allySkill.name}<br><em>${classData.allySkill.desc}</em></p>
<p><strong>✨ Self Stance (Tap Self):</strong> ${classData.selfSkill.name}<br><em>${classData.selfSkill.desc}</em></p>
<p><strong>🔥 Ultimate Attack:</strong> ${classData.ultimate.name}<br><em>${classData.ultimate.desc}</em></p>
<hr>
<button onclick="document.getElementById('inspect-modal').classList.remove('active')">Close</button>
</div>
`;
}

modal.innerHTML = content;
modal.classList.add("active");
}

getEnemyTraitDescriptions(enemy, knightThreshold) {
if (!enemy.tags || enemy.tags.length === 0 || enemy.tags.includes(ENEMY_TAGS.NEUTRAL)) {
return "<p><em>None (Standard Neutral Fiend)</em></p>";
}

let html = "";
enemy.tags.forEach(tag => {
switch (tag) {
case ENEMY_TAGS.KNIGHT:
html += `<p><strong>🛡️ Heavy Knight Armor:</strong> Takes 50% damage from hits dealing less than 10% Max HP (under ${knightThreshold} HP damage).</p>`;
break;
case ENEMY_TAGS.UNDEAD:
html += `<p><strong>💀 Undead Resilience:</strong> Enters Downed state for 3 turns at 0 HP. Resurrects to full health unless all enemies are defeated before timer expires.</p>`;
break;
case ENEMY_TAGS.NINJA:
html += `<p><strong>🥷 Ninja Shadow Cap:</strong> Cannot take more than 20% of Max HP in a single strike (${Math.floor(enemy.maxHp * 0.20)} Max Damage Cap).</p>`;
break;
case ENEMY_TAGS.BERSERKER:
html += `<p><strong>😡 Berserker Rage:</strong> Attack Power scales higher as the player's Soul Ember Ultimate Gauge fills up.</p>`;
break;
case ENEMY_TAGS.AUTOMATON:
html += `<p><strong>🤖 Automaton Shell:</strong> Immune to Bleed/Poison status conditions. Takes +50% extra damage from Critical Hits.</p>`;
break;
case ENEMY_TAGS.GHOST:
html += `<p><strong>👻 Incorporeal Ghost:</strong> Has a 50% passive dodge chance against physical strikes. Vulnerable to Magic and Holy attacks.</p>`;
break;
case ENEMY_TAGS.SWARM:
html += `<p><strong>🐝 Swarm Multiplication:</strong> Clones self at 50% HP if not defeated in a single turn.</p>`;
break;
case ENEMY_TAGS.ELDRITCH:
html += `<p><strong>👁️ Eldritch Dread:</strong> Inflicts passive stat drain on party members every turn.</p>`;
break;
}
});

return html;
}

// ==========================================
// --- DRAG AND TARGET COMBAT ACTIONS ---
// ==========================================
executeDragAttack(attackerIdx, enemyTargetIdx) {
const attacker = GameState.run.party[attackerIdx];
const target = GameState.run.activeEnemies[enemyTargetIdx];

if (!attacker || !target || target.isDowned) return;

const classData = attacker.classData;
const actionResult = classData.mainAttack.execute(attacker, target);

// Calculate critical hits based on Luck
const isCrit = Math.random() < ((attacker.lck || 5) / 100);
let rawDmg = actionResult.damage;
if (isCrit) rawDmg = Math.floor(rawDmg * 1.5);

// Deal damage via enemy class method
let actualDmg = target.takeDamage(rawDmg, isCrit, false, GameState.run.ultimateGauge);

// Build Soul Ember Gauge
this.addUltimateGauge(12);

GameState.addLog(`${attacker.name} used ${classData.mainAttack.name} on ${target.name} for ${actualDmg} damage! ${isCrit ? "(CRITICAL HIT!)" : ""}`);

this.checkEnemyStates();
this.processEnemyTurn();
}

executeDragSupport(attackerIdx, allyTargetIdx) {
const attacker = GameState.run.party[attackerIdx];
const ally = GameState.run.party[allyTargetIdx];

if (!attacker || !ally) return;

const classData = attacker.classData;
const actionResult = classData.allySkill.execute(attacker, ally);

if (actionResult.effect && actionResult.effect.amount) {
ally.hp = Math.min(ally.maxHp, ally.hp + actionResult.effect.amount);
}

this.addUltimateGauge(8);
GameState.addLog(`${attacker.name} used ${classData.allySkill.name} on ${ally.name}!`);

this.processEnemyTurn();
}

executeSelfTarget(partyIdx) {
const member = GameState.run.party[partyIdx];
if (!member) return;

const classData = member.classData;
classData.selfSkill.execute(member);

this.addUltimateGauge(6);
GameState.addLog(`${member.name} used self-ability ${classData.selfSkill.name}!`);

this.processEnemyTurn();
}

executeUltimate(partyIdx, targetEnemyIdx = 0) {
if (GameState.run.ultimateGauge < 100) return false;

const member = GameState.run.party[partyIdx];
const targetEnemy = GameState.run.activeEnemies[targetEnemyIdx];
const classData = member.classData;

const msg = classData.ultimate.execute(member, GameState.run.party, targetEnemy, GameState.run.activeEnemies);

GameState.run.ultimateGauge = 0; // Reset Ultimate Gauge
GameState.addLog(msg);

this.checkEnemyStates();
this.processEnemyTurn();
return true;
}

addUltimateGauge(amount) {
const efficiency = GameState.meta.accountUpgrades.soulEmberEfficiency || 1.0;
GameState.run.ultimateGauge = Math.min(100, GameState.run.ultimateGauge + Math.floor(amount * efficiency));
}

// ==========================================
// --- ENEMY TURN PROCESSING ---
// ==========================================
processEnemyTurn() {
if (GameState.run.activeEnemies.length === 0) return;

GameState.run.activeEnemies.forEach(enemy => {
const state = enemy.processTurnEnd();
if (state === "DOWNED" || enemy.isFrozen) {
enemy.isFrozen = false; // Unfreeze after turn
return;
}

// Pick random living party member
const livingParty = GameState.run.party.filter(p => p.hp > 0);
if (livingParty.length === 0) return;

const targetAlly = livingParty[Math.floor(Math.random() * livingParty.length)];
const atkPower = enemy.getAttackPower(GameState.run.ultimateGauge);

// Evasion Dodge Check
const dodgeChance = (targetAlly.dex || 5) / 100;
if (Math.random() < dodgeChance) {
GameState.addLog(`${targetAlly.name} dodged ${enemy.name}'s incoming attack!`);
return;
}

// Apply defense mitigation
const defMitigation = Math.min(0.75, (targetAlly.def * 1.5) / 100);
const finalDmg = Math.max(1, Math.floor(atkPower * (1 - defMitigation)));

targetAlly.hp = Math.max(0, targetAlly.hp - finalDmg);
this.addUltimateGauge(5); // Gain Soul Ember when taking hits

GameState.addLog(`${enemy.name} attacked ${targetAlly.name} for ${finalDmg} damage!`);
});
}

checkEnemyStates() {
GameState.run.activeEnemies = GameState.run.activeEnemies.filter(e => {
if (e.hp === 0 && !e.tags.includes(ENEMY_TAGS.UNDEAD)) {
GameState.run.gold += 15;
return false;
}
return true;
});
}
}

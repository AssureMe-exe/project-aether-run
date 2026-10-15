/* ==========================================================================
Project Aether Run - Complete Class Roster & Skill Tree System
Contains: All 16 Classes, Drag Mechanics, Self Stances, & Ultimate Attacks
========================================================================== */

export const CLASS_ROSTER = {
// ==========================================
// --- BASE STARTING CLASSES (1-5) ---
// ==========================================
warrior: {
id: "warrior",
name: "Warrior",
unlockedByDefault: true,
desc: "A balanced frontline fighter with heavy armor breaking strikes and protective shields.",
baseStats: { hp: 110, str: 14, def: 10, lck: 5, dex: 5 },
mainAttack: {
name: "Armor Sunder Cleave",
desc: "Deals heavy physical damage and reduces enemy Defense by 15% for 2 turns.",
execute: (attacker, target) => {
const dmg = attacker.str;
return { damage: dmg, effect: { type: "DEF_DOWN", duration: 2, value: 0.15 } };
}
},
allySkill: {
name: "Shield Bash Prep",
desc: "Grants targeted ally a protective barrier equal to 15% of their Max HP.",
execute: (attacker, target) => {
const shieldAmt = Math.floor(target.maxHp * 0.15);
return { effect: { type: "SHIELD", amount: shieldAmt } };
}
},
selfSkill: {
name: "Battle Stance",
desc: "Boosts own Attack Power by 25% for 2 turns.",
execute: (user) => {
return { effect: { type: "ATK_BUFF", duration: 2, value: 0.25 } };
}
},
ultimate: {
name: "Giant Jump Slash",
desc: "Deals massive damage (300% STR) to target enemy and grants the party +20% Defense.",
execute: (user, party, targetEnemy) => {
let dmg = 0;
if (targetEnemy) {
dmg = targetEnemy.takeDamage(user.str * 3, true);
}
party.forEach(p => p.def = Math.floor(p.def * 1.20));
return `Warrior unleashed Giant Jump Slash for ${dmg} damage and boosted party Defense!`;
}
}
},

cleric: {
id: "cleric",
name: "Cleric",
unlockedByDefault: true,
desc: "Holy healer capable of purifying debuffs and sustaining party health.",
baseStats: { hp: 85, str: 8, def: 5, lck: 10, dex: 6 },
mainAttack: {
name: "Holy Smite",
desc: "Deals light magic damage and heals the lowest HP ally slightly.",
execute: (attacker, target) => {
return { damage: attacker.str, effect: { type: "HEAL_LOWEST_ALLY", amount: 10 } };
}
},
allySkill: {
name: "Divine Blessing",
desc: "Heals targeted ally for 25 HP and cleanses all status debuffs.",
execute: (attacker, target) => {
return { effect: { type: "HEAL_AND_CLEANSE", amount: 25 } };
}
},
selfSkill: {
name: "Sanctuary Aura",
desc: "Grants self continuous regen (8 HP/turn) for 3 turns.",
execute: (user) => {
return { effect: { type: "REGEN", duration: 3, amount: 8 } };
}
},
ultimate: {
name: "Divine Purification",
desc: "Restores 50% Max HP to all party members and cleanses all active debuffs.",
execute: (user, party) => {
party.forEach(p => {
p.hp = Math.min(p.maxHp, p.hp + Math.floor(p.maxHp * 0.50));
p.debuffs = [];
});
return "Cleric activated Divine Purification! Party restored and purified!";
}
}
},

mage: {
id: "mage",
name: "Mage",
unlockedByDefault: true,
desc: "Elemental damage master applying vulnerabilities and party magic boosts.",
baseStats: { hp: 75, str: 18, def: 4, lck: 8, dex: 7 },
mainAttack: {
name: "Arcane Bolt",
desc: "Deals high magic damage and applies Magic Vulnerability (+20%) for 2 turns.",
execute: (attacker, target) => {
return { damage: attacker.str, effect: { type: "MAGIC_VULN", duration: 2, value: 0.20 } };
}
},
allySkill: {
name: "Mana Infusion",
desc: "Empowers ally's next attack to deal +45% extra damage.",
execute: (attacker, target) => {
return { effect: { type: "MANA_INFUSION", boostNextAttack: 0.45 } };
}
},
selfSkill: {
name: "Arcane Barrier",
desc: "Generates a 30 HP magical shield around self.",
execute: (user) => {
return { effect: { type: "SHIELD", amount: 30 } };
}
},
ultimate: {
name: "Meteor Storm",
desc: "Rains down celestial fire, dealing heavy magic damage (180% STR) to all enemies.",
execute: (user, party, targetEnemy, activeEnemies) => {
activeEnemies.forEach(e => {
e.takeDamage(Math.floor(user.str * 1.8), true, true);
});
return "Mage cast Meteor Storm! High magic damage inflicted across all enemies!";
}
}
},

rogue: {
id: "rogue",
name: "Rogue",
unlockedByDefault: true,
desc: "Fast, lethal assassin building stacking poison and granting stealth.",
baseStats: { hp: 85, str: 13, def: 5, lck: 15, dex: 12 },
mainAttack: {
name: "Venomed Dagger",
desc: "Deals swift physical strike and applies 2 stacks of Poison.",
execute: (attacker, target) => {
return { damage: attacker.str, effect: { type: "POISON", stacks: 2 } };
}
},
allySkill: {
name: "Smoke Screen",
desc: "Grants ally Stealth, forcing enemies to ignore them for 2 turns.",
execute: (attacker, target) => {
return { effect: { type: "STEALTH", duration: 2 } };
}
},
selfSkill: {
name: "Evasive Footwork",
desc: "Increases own Dodge Rate by +40% for 2 turns.",
execute: (user) => {
return { effect: { type: "DODGE_BUFF", duration: 2, value: 0.40 } };
}
},
ultimate: {
name: "Shadow Execution",
desc: "Strikes target from the shadows with a 100% critical hit dealing 350% STR.",
execute: (user, party, targetEnemy) => {
let dmg = 0;
if (targetEnemy) {
dmg = targetEnemy.takeDamage(Math.floor(user.str * 3.5), true);
}
return `Rogue executed Shadow Execution for ${dmg} critical damage!`;
}
}
},

tank: {
id: "tank",
name: "Tank (Guardian)",
unlockedByDefault: true,
desc: "Unstoppable fortress that draws enemy fire and absorbs incoming blows.",
baseStats: { hp: 130, str: 10, def: 18, lck: 3, dex: 3 },
mainAttack: {
name: "Taunt Strike",
desc: "Deals damage and forces target enemy to target the Guardian for 2 turns.",
execute: (attacker, target) => {
return { damage: attacker.str, effect: { type: "TAUNT", duration: 2 } };
}
},
allySkill: {
name: "Cover Guard",
desc: "Redirects 50% of all incoming damage from targeted ally to the Guardian.",
execute: (attacker, target) => {
return { effect: { type: "COVER", redirectPercent: 0.50 } };
}
},
selfSkill: {
name: "Iron Bastion",
desc: "Increases own Defense by +50% for 2 turns.",
execute: (user) => {
return { effect: { type: "DEF_BUFF", duration: 2, value: 0.50 } };
}
},
ultimate: {
name: "Aegis Fortress",
desc: "Constructs an impenetrable aura granting all party members Invulnerability for 1 turn.",
execute: (user, party) => {
party.forEach(p => p.invincibleTurns = 1);
return "Tank activated Aegis Fortress! Party is invulnerable for 1 turn!";
}
}
},

// ==========================================
// --- UNLOCKABLE SPECIALTY CLASSES (6-16) ---
// ==========================================
necromancer: {
id: "necromancer",
name: "Necromancer",
unlockedByDefault: false,
costToUnlock: 500,
desc: "Raises downed enemies as temporary minions and channels shadow energy.",
baseStats: { hp: 80, str: 16, def: 6, lck: 7, dex: 6 },
mainAttack: {
name: "Shadow Bolt",
desc: "Deals dark magic damage; if target is downed, revives them as a puppet.",
execute: (attacker, target) => ({ damage: attacker.str, effect: { type: "PUPPET_RAISE" } })
},
allySkill: {
name: "Soul Link",
desc: "Links ally; when ally takes damage, Necromancer heals for 30% of it.",
execute: (attacker, target) => ({ effect: { type: "SOUL_LINK", duration: 2 } })
},
selfSkill: {
name: "Lich Form",
desc: "Converts 10% Max HP into +30 Magic Attack for 2 turns.",
execute: (user) => ({ effect: { type: "HP_CONVERT_ATK" } })
},
ultimate: {
name: "Army of the Damned",
desc: "Summons skeletal spirits to strike all enemies and heal the party for total damage dealt.",
execute: (user, party, targetEnemy, activeEnemies) => {
let totalDmg = 0;
activeEnemies.forEach(e => {
totalDmg += e.takeDamage(user.str * 1.5, true, true);
});
const healAmt = Math.floor(totalDmg / party.length);
party.forEach(p => p.hp = Math.min(p.maxHp, p.hp + healAmt));
return `Necromancer summoned Army of the Damned! Dealt ${totalDmg} total damage & healed party!`;
}
}
},

vampire: {
id: "vampire",
name: "Vampire",
unlockedByDefault: false,
costToUnlock: 600,
desc: "Siphons enemy life force and sacrifices own HP pool to mend allies.",
baseStats: { hp: 95, str: 15, def: 7, lck: 12, dex: 10 },
mainAttack: {
name: "Vampiric Bite",
desc: "Deals physical damage and heals self for 40% of damage dealt.",
execute: (attacker, target) => ({ damage: attacker.str, effect: { type: "LIFESTEAL", percent: 0.40 } })
},
allySkill: {
name: "Blood Transfusion",
desc: "Sacrifices 15% of Vampire's Max HP to heal ally for 200% of that amount.",
execute: (attacker, target) => ({ effect: { type: "TRANSFUSION", hpCost: 15 } })
},
selfSkill: {
name: "Mist Form",
desc: "Becomes immune to physical strikes for 1 turn.",
execute: (user) => ({ effect: { type: "PHYSICAL_IMMUNE", duration: 1 } })
},
ultimate: {
name: "Crimson Feast",
desc: "Drains life from all enemies, dealing 200% STR damage and full restoring party HP.",
execute: (user, party, targetEnemy, activeEnemies) => {
activeEnemies.forEach(e => e.takeDamage(user.str * 2, true));
party.forEach(p => p.hp = p.maxHp);
return "Vampire used Crimson Feast! Enemies drained and party fully restored!";
}
}
},

werewolf: {
id: "werewolf",
name: "Werewolf",
unlockedByDefault: false,
costToUnlock: 600,
desc: "Shifts between Human Form (utility) and Beast Form (massive bleed DPS).",
baseStats: { hp: 115, str: 17, def: 8, lck: 8, dex: 11 },
mainAttack: {
name: "Frenzied Claws",
desc: "Rips into target inflicting severe Bleed (10 HP/turn).",
execute: (attacker, target) => ({ damage: attacker.str, effect: { type: "BLEED", amount: 10 } })
},
allySkill: {
name: "Pack Howl",
desc: "Boosts party Speed/Dexterity (+10 DEX) for 2 turns.",
execute: (attacker, target) => ({ effect: { type: "PARTY_DEX_BUFF", value: 10 } })
},
selfSkill: {
name: "Beast Shift",
desc: "Shifts into Beast Form, increasing STR by +40% but lowering DEF by -20%.",
execute: (user) => ({ effect: { type: "BEAST_SHIFT" } })
},
ultimate: {
name: "Apex Predator Maul",
desc: "Lunches onto target enemy executing 4 rapid strikes dealing 400% STR total.",
execute: (user, party, targetEnemy) => {
let dmg = 0;
if (targetEnemy) dmg = targetEnemy.takeDamage(user.str * 4, true);
return `Werewolf executed Apex Predator Maul for ${dmg} total ferocious damage!`;
}
}
},

summoner: {
id: "summoner",
name: "Summoner",
unlockedByDefault: false,
costToUnlock: 650,
desc: "Summons elemental constructs into turn order to act independently.",
baseStats: { hp: 80, str: 14, def: 5, lck: 9, dex: 8 },
mainAttack: {
name: "Elemental Spark",
desc: "Deals magic damage and charges elemental turret power.",
execute: (attacker, target) => ({ damage: attacker.str, effect: { type: "CHARGE_TURRET" } })
},
allySkill: {
name: "Aegis Construct",
desc: "Summons a stone shield sentinel to guard targeted ally.",
execute: (attacker, target) => ({ effect: { type: "SUMMON_GUARD" } })
},
selfSkill: {
name: "Summon Arcane Turret",
desc: "Places an automated turret that fires 15 magic damage every turn end.",
execute: (user) => ({ effect: { type: "PLACE_TURRET" } })
},
ultimate: {
name: "Summon Elemental Titan",
desc: "Summons a colossal titan that slams all enemies for 250% STR damage.",
execute: (user, party, targetEnemy, activeEnemies) => {
activeEnemies.forEach(e => e.takeDamage(user.str * 2.5, true, true));
return "Summoner unleashed Elemental Titan! Massive earthquake damage across battlefield!";
}
}
},

berserker: {
id: "berserker",
name: "Berserker",
unlockedByDefault: false,
costToUnlock: 700,
desc: "Damage output scales inversely with remaining health; trades HP for massive raw output.",
baseStats: { hp: 120, str: 20, def: 4, lck: 6, dex: 7 },
mainAttack: {
name: "Wild Reckless Swing",
desc: "Deals massive damage; damage increases by +1% for every 1% missing HP.",
execute: (attacker, target) => {
const missingHpPercent = (attacker.maxHp - attacker.hp) / attacker.maxHp;
const scaledStr = Math.floor(attacker.str * (1 + missingHpPercent * 1.5));
return { damage: scaledStr, effect: { type: "RECKLESS" } };
}
},
allySkill: {
name: "Battle Cry",
desc: "Inspires ally, increasing their Attack Power by +30% for 2 turns.",
execute: (attacker, target) => ({ effect: { type: "ATK_BUFF", duration: 2, value: 0.30 } })
},
selfSkill: {
name: "Blood Sacrifice",
desc: "Sacrifices 20 HP to instantly gain +50% Attack Power for 2 turns.",
execute: (user) => {
user.hp = Math.max(1, user.hp - 20);
return { effect: { type: "ATK_BUFF", duration: 2, value: 0.50 } };
}
},
ultimate: {
name: "Ragnarok Decimation",
desc: "Unleashes a world-shattering strike dealing 500% STR damage to target.",
execute: (user, party, targetEnemy) => {
let dmg = 0;
if (targetEnemy) dmg = targetEnemy.takeDamage(user.str * 5, true);
return `Berserker executed Ragnarok Decimation for a astronomical ${dmg} damage!`;
}
}
},

paladin: {
id: "paladin",
name: "Paladin",
unlockedByDefault: false,
costToUnlock: 750,
desc: "Combines Holy damage with reflective shields, healing allies when taking hits.",
baseStats: { hp: 125, str: 13, def: 16, lck: 6, dex: 4 },
mainAttack: {
name: "Righteous Hammer",
desc: "Deals Holy damage; ignores 30% of target's Defense.",
execute: (attacker, target) => ({ damage: attacker.str, effect: { type: "ARMOR_PIERCE", value: 0.30 } })
},
allySkill: {
name: "Lay on Hands",
desc: "Heals ally for 35% of Paladin's Max HP.",
execute: (attacker, target) => {
const heal = Math.floor(attacker.maxHp * 0.35);
return { effect: { type: "HEAL", amount: heal } };
}
},
selfSkill: {
name: "Aura of Retribution",
desc: "Reflects 30% of incoming damage back to attackers for 2 turns.",
execute: (user) => ({ effect: { type: "REFLECT", percent: 0.30 } })
},
ultimate: {
name: "Divine Judgement Shield",
desc: "Smites all enemies for Holy damage while granting whole party +40% Defense for 3 turns.",
execute: (user, party, targetEnemy, activeEnemies) => {
activeEnemies.forEach(e => e.takeDamage(user.str * 2, true, true));
party.forEach(p => p.def = Math.floor(p.def * 1.40));
return "Paladin invoked Divine Judgement Shield! Holy damage dealt & party Defense boosted!";
}
}
},

alchemist: {
id: "alchemist",
name: "Alchemist",
unlockedByDefault: false,
costToUnlock: 550,
desc: "Throws volatile status mix potions and brews instant stat elixirs for allies.",
baseStats: { hp: 85, str: 12, def: 6, lck: 14, dex: 8 },
mainAttack: {
name: "Volatile Mixture",
desc: "Throws random potion dealing splash damage and inflicting Burn, Freeze, or Corrode.",
execute: (attacker, target) => ({ damage: attacker.str, effect: { type: "RANDOM_STATUS" } })
},
allySkill: {
name: "Brew Elixir",
desc: "Brews instant elixir granting targeted ally +15 All Stats for 2 turns.",
execute: (attacker, target) => ({ effect: { type: "ALL_STATS_BUFF", value: 15 } })
},
selfSkill: {
name: "Transmute Gold",
desc: "Transmutes enemy debris gaining +25 Gold instantly.",
execute: (user) => ({ effect: { type: "GIVE_GOLD", amount: 25 } })
},
ultimate: {
name: "Grand Catalyst Explosion",
desc: "Detonates massive chemical bomb; deals heavy damage and applies ALL status conditions to enemies.",
execute: (user, party, targetEnemy, activeEnemies) => {
activeEnemies.forEach(e => {
e.takeDamage(user.str * 2.2, true, true);
e.burnStacks += 3;
e.poisonStacks += 3;
});
return "Alchemist detonated Grand Catalyst Explosion! All enemies burning and poisoned!";
}
}
},

bard: {
id: "bard",
name: "Bard",
unlockedByDefault: false,
costToUnlock: 500,
desc: "Distracts enemies and accelerates party action speeds & Soul Ember generation.",
baseStats: { hp: 90, str: 10, def: 6, lck: 16, dex: 10 },
mainAttack: {
name: "Dissonant Chord",
desc: "Deals sound wave magic damage and confuses enemy, reducing their hit rate by 20%.",
execute: (attacker, target) => ({ damage: attacker.str, effect: { type: "HIT_RATE_DOWN", value: 0.20 } })
},
allySkill: {
name: "Heroic Ballad",
desc: "Boosts ally's Critical Chance by +30% and Dexterity by +10.",
execute: (attacker, target) => ({ effect: { type: "CRIT_DEX_BUFF", crit: 0.30, dex: 10 } })
},
selfSkill: {
name: "Encore",
desc: "Instantly charges player's Soul Ember Ultimate Gauge by +25%.",
execute: (user) => ({ effect: { type: "CHARGE_ULTIMATE", amount: 25 } })
},
ultimate: {
name: "Symphony of Destruction",
desc: "Plays a masterpiece melody that heals party 40% HP and stuns all enemies for 1 turn.",
execute: (user, party, targetEnemy, activeEnemies) => {
party.forEach(p => p.hp = Math.min(p.maxHp, p.hp + Math.floor(p.maxHp * 0.40)));
activeEnemies.forEach(e => e.isFrozen = true);
return "Bard performed Symphony of Destruction! Party healed & enemies stunned!";
}
}
},

ninja: {
id: "ninja",
name: "Ninja",
unlockedByDefault: false,
costToUnlock: 800,
desc: "Bypasses enemy shields/damage caps with high natural dodge and shadow clones.",
baseStats: { hp: 80, str: 16, def: 4, lck: 12, dex: 18 },
mainAttack: {
name: "Shadow Strike",
desc: "Deals swift damage that completely ignores enemy Defense and Damage Caps.",
execute: (attacker, target) => ({ damage: attacker.str, effect: { type: "BYPASS_CAPS" } })
},
allySkill: {
name: "Substitute Technique",
desc: "Swaps places with ally, absorbing incoming strike for them with 100% dodge.",
execute: (attacker, target) => ({ effect: { type: "SUBSTITUTE" } })
},
selfSkill: {
name: "Shadow Clone",
desc: "Creates shadow clone that mirrors Ninja's next attack.",
execute: (user) => ({ effect: { type: "CLONE" } })
},
ultimate: {
name: "Omnislash Shadow Flurry",
desc: "Executes 6 lightning strikes across all enemies dealing 450% STR total damage.",
execute: (user, party, targetEnemy, activeEnemies) => {
let totalDmg = 0;
activeEnemies.forEach(e => {
totalDmg += e.takeDamage(user.str * 2.5, true);
});
return `Ninja unleashed Omnislash Shadow Flurry! Dealt ${totalDmg} total lethal damage!`;
}
}
},

chronomancer: {
id: "chronomancer",
name: "Chronomancer",
unlockedByDefault: false,
costToUnlock: 850,
desc: "Manipulates turn priority, delays enemy timers, and grants allies immediate extra turns.",
baseStats: { hp: 75, str: 15, def: 5, lck: 10, dex: 15 },
mainAttack: {
name: "Time Dilation Bolt",
desc: "Deals magic damage and reduces target enemy's attack speed.",
execute: (attacker, target) => ({ damage: attacker.str, effect: { type: "TIME_SLOW" } })
},
allySkill: {
name: "Haste Rewind",
desc: "Resets cooldowns and lets targeted ally take an immediate second turn.",
execute: (attacker, target) => ({ effect: { type: "EXTRA_TURN" } })
},
selfSkill: {
name: "Time Stop Shield",
desc: "Freezes self in stasis for 1 turn; invulnerable to all damage.",
execute: (user) => ({ effect: { type: "STASIS", duration: 1 } })
},
ultimate: {
name: "Chrono Shift Reset",
desc: "Rewinds time 1 turn: completely restores party HP to previous turn state & stuns enemies.",
execute: (user, party, targetEnemy, activeEnemies) => {
party.forEach(p => p.hp = p.maxHp);
activeEnemies.forEach(e => e.isFrozen = true);
return "Chronomancer activated Chrono Shift Reset! Time rewound, party restored!";
}
}
},

engineer: {
id: "engineer",
name: "Engineer",
unlockedByDefault: false,
costToUnlock: 650,
desc: "Places explosive traps, builds turrets, and equips party with shield kits.",
baseStats: { hp: 100, str: 14, def: 10, lck: 8, dex: 8 },
mainAttack: {
name: "Wrench Slam & Gunshot",
desc: "Deals physical damage and deploys automated snare trap.",
execute: (attacker, target) => ({ damage: attacker.str, effect: { type: "SNARE_TRAP" } })
},
allySkill: {
name: "Armor Maintenance Kit",
desc: "Repairs ally armor, granting +20 DEF and 20 Shield for 2 turns.",
execute: (attacker, target) => ({ effect: { type: "ARMOR_KIT", def: 20, shield: 20 } })
},
selfSkill: {
name: "Deploy Turret",
desc: "Deploys automated gatling turret firing 12 physical damage every round.",
execute: (user) => ({ effect: { type: "TURRET_DEPLOY" } })
},
ultimate: {
name: "Orbital Strike Beacon",
desc: "Calls down satellite laser beam dealing massive explosive fire damage (350% STR) to all enemies.",
execute: (user, party, targetEnemy, activeEnemies) => {
activeEnemies.forEach(e => e.takeDamage(user.str * 3.5, true, true));
return "Engineer signaled Orbital Strike Beacon! Satellite beam annihilated enemy lineup!";
}
}
}
};

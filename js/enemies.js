/* ==========================================================================
Project Aether Run - Complete Master Bestiary Engine
Contains: All Enemy Classifications, Passive Rules, & 140+ Unique Enemies
- 100+ Standard Enemies
- 20+ Minibosses
- 20+ Major Bosses
- 1 Final World Boss (Wave 200)
========================================================================== */

export const ENEMY_TAGS = {
UNDEAD: "UNDEAD", // Downs at 0 HP for 3 turns; resurrects to full unless team cleared
NINJA: "NINJA", // Damage Cap: Max 20% Max HP taken in single hit
KNIGHT: "KNIGHT", // Heavy Armor: Takes HALF damage from hits dealing < 10% Max HP
BERSERKER: "BERSERKER", // Rage: Damage scales linearly as player's Ultimate Gauge fills
AUTOMATON: "AUTOMATON", // Immune to Bleed/Poison; takes +50% Crit Damage
GHOST: "GHOST", // 50% physical evasion; vulnerable to Magic/Holy
SWARM: "SWARM", // Clones self at 50% HP if not defeated in single turn
ELDRITCH: "ELDRITCH", // Inflicts passive morale/stat drain every turn
NEUTRAL: "NEUTRAL" // Unclassified standard mob
};

export class Enemy {
constructor(config = {}) {
this.id = config.id || "mob_unknown";
this.name = config.name || "Unknown Fiend";
this.maxHp = config.hp || 50;
this.hp = this.maxHp;
this.str = config.str || 8;
this.def = config.def || 0;
this.tags = config.tags || [ENEMY_TAGS.NEUTRAL];
this.almanacLore = config.lore || "A mysterious creature wandering the gauntlet.";
this.almanacQuip = config.quip || "Best hit it until it stops moving.";

// Status Tracking
this.isDowned = false;
this.downedTurns = 0;
this.poisonStacks = 0;
this.burnStacks = 0;
this.isFrozen = false;
this.hasCloned = false;
}

takeDamage(rawAmount, isCrit = false, isMagic = false, playerUltGauge = 0) {
if (this.isDowned) return 0;

let finalDmg = rawAmount;

// Trait Logic: Knight Heavy Armor (% Dynamic Threshold Halving)
// If incoming hit is less than 10% of Knight's Max HP, damage is cut in half.
if (this.tags.includes(ENEMY_TAGS.KNIGHT)) {
const tenPercentThreshold = Math.floor(this.maxHp * 0.10);
if (finalDmg < tenPercentThreshold) {
finalDmg = Math.floor(finalDmg * 0.50); // Halves weak hits
}
}

// Trait Logic: Ninja Damage Cap
if (this.tags.includes(ENEMY_TAGS.NINJA)) {
const cap = Math.floor(this.maxHp * 0.20);
if (finalDmg > cap) finalDmg = cap;
}

// Trait Logic: Ghost Evasion
if (this.tags.includes(ENEMY_TAGS.GHOST) && !isMagic) {
if (Math.random() < 0.50) return 0; // Dodged physical hit
}

// Trait Logic: Automaton Critical Multiplier
if (this.tags.includes(ENEMY_TAGS.AUTOMATON) && isCrit) {
finalDmg = Math.floor(finalDmg * 1.50);
}

// Apply Base Defense Mitigation
finalDmg = Math.max(1, finalDmg - Math.floor(this.def * 0.5));
this.hp = Math.max(0, this.hp - finalDmg);

// Trait Logic: Undead Resurrection Check
if (this.hp === 0 && this.tags.includes(ENEMY_TAGS.UNDEAD) && !this.isDowned) {
this.isDowned = true;
this.downedTurns = 3;
return finalDmg;
}

return finalDmg;
}

getAttackPower(playerUltGauge = 0) {
let power = this.str;

// Trait Logic: Berserker Ultimate Gauge Scaling
if (this.tags.includes(ENEMY_TAGS.BERSERKER)) {
const rageBonus = Math.floor((playerUltGauge / 5) * 0.02 * this.str);
power += rageBonus;
}

return power;
}

processTurnEnd() {
if (this.isDowned) {
this.downedTurns--;
if (this.downedTurns <= 0) {
this.isDowned = false;
this.hp = this.maxHp; // Resurrects to full!
return "RESURRECTED";
}
return "DOWNED";
}

// Process Status Effects
if (this.poisonStacks > 0 && !this.tags.includes(ENEMY_TAGS.AUTOMATON)) {
this.hp = Math.max(0, this.hp - (this.poisonStacks * 5));
}
if (this.burnStacks > 0) {
this.hp = Math.max(0, this.hp - (this.burnStacks * 8));
this.burnStacks--;
}

return "ACTIVE";
}
}

// ==========================================================================
// --- 100+ STANDARD REGULAR ENEMIES ---
// ==========================================================================
export const REGULAR_ENEMIES = [
// --- Early Gauntlet (1-25) ---
{ id: "mob_001", name: "Goblin Scum", hp: 45, str: 8, def: 2, tags: [ENEMY_TAGS.NEUTRAL], lore: "Weak individually, annoying in groups.", quip: "Loves shiny coins and bad hygiene." },
{ id: "mob_002", name: "Skeleton Grunt", hp: 60, str: 10, def: 4, tags: [ENEMY_TAGS.UNDEAD], lore: "Reanimated bones holding a rusty sword.", quip: "Doesn't have the stomach for battle." },
{ id: "mob_003", name: "Shadow Shinobi", hp: 50, str: 14, def: 2, tags: [ENEMY_TAGS.NINJA], lore: "Stealthy assassin with extreme damage caps.", quip: "Appears, hits hard, caps your burst damage." },
{ id: "mob_004", name: "Armored Guard", hp: 85, str: 12, def: 12, tags: [ENEMY_TAGS.KNIGHT], lore: "Encased in thick iron plate armor.", quip: "Takes half damage from hits under 10% Max HP." },
{ id: "mob_005", name: "Raging Orc", hp: 70, str: 15, def: 3, tags: [ENEMY_TAGS.BERSERKER], lore: "Grows stronger as your ultimate gauge fills.", quip: "Don't charge your Soul Ember around him!" },
{ id: "mob_006", name: "Clockwork Sentry", hp: 90, str: 11, def: 8, tags: [ENEMY_TAGS.AUTOMATON], lore: "Brass robot immune to poison and bleeds.", quip: "Weak to high critical hits." },
{ id: "mob_007", name: "Crypt Spectre", hp: 40, str: 13, def: 0, tags: [ENEMY_TAGS.GHOST], lore: "Incorporeal ghost dodging physical hits.", quip: "Bring a Mage or suffer 50% misses." },
{ id: "mob_008", name: "Slime Swarm", hp: 50, str: 7, def: 1, tags: [ENEMY_TAGS.SWARM], lore: "Splits into copies if not killed fast.", quip: "Sticky, gooey, and multiplying." },
{ id: "mob_009", name: "Void Cultist", hp: 55, str: 12, def: 3, tags: [ENEMY_TAGS.ELDRITCH], lore: "Chants cursed spells every turn.", quip: "Needs a hobby that doesn't involve tentacles." },
{ id: "mob_010", name: "Venomous Tarantula", hp: 48, str: 9, def: 2, tags: [ENEMY_TAGS.NEUTRAL], lore: "Fires toxic bristles at party members.", quip: "Eight legs of pure, unadulterated nope." },
{ id: "mob_011", name: "Zombie Brawler", hp: 75, str: 11, def: 3, tags: [ENEMY_TAGS.UNDEAD], lore: "Slow-moving corpse that packs a heavy punch.", quip: "Loves brain food and long naps on the battlefield." },
{ id: "mob_012", name: "Kobold Trapper", hp: 42, str: 10, def: 1, tags: [ENEMY_TAGS.NINJA], lore: "Sets explosive snares and darts into shadows.", quip: "Small stature, giant attitude." },
{ id: "mob_013", name: "Gargoyle Sentry", hp: 95, str: 13, def: 15, tags: [ENEMY_TAGS.KNIGHT], lore: "Stone demon that hardens under direct assault.", quip: "Halves light strikes with ease." },
{ id: "mob_014", name: "Flame Elemental", hp: 65, str: 16, def: 4, tags: [ENEMY_TAGS.BERSERKER], lore: "Burns hotter as combat intensity escalates.", quip: "Extremely spicy personality." },
{ id: "mob_015", name: "Scrap Repair Drone", hp: 70, str: 8, def: 6, tags: [ENEMY_TAGS.AUTOMATON], lore: "Small flying robot repairing metal allies.", quip: "Beep boop, access denied." },
{ id: "mob_016", name: "Phantom Apparition", hp: 45, str: 14, def: 0, tags: [ENEMY_TAGS.GHOST], lore: "Haunts ancient hallways with cold touch.", quip: "You can see right through its strategy." },
{ id: "mob_017", name: "Mire Leech Swarm", hp: 52, str: 6, def: 1, tags: [ENEMY_TAGS.SWARM], lore: "Clings to skin and multiplies rapidly.", quip: "Brings new meaning to clingy behavior." },
{ id: "mob_018", name: "Eldritch Acolyte", hp: 58, str: 13, def: 3, tags: [ENEMY_TAGS.ELDRITCH], lore: "Channels void energy into dark beams.", quip: "Reading forbidden books during work hours." },
{ id: "mob_019", name: "Bandit Cutthroat", hp: 50, str: 12, def: 2, tags: [ENEMY_TAGS.NEUTRAL], lore: "Sneaks in for quick gold stealing strikes.", quip: "Your wallet is his favorite target." },
{ id: "mob_020", name: "Bone Archer", hp: 55, str: 11, def: 2, tags: [ENEMY_TAGS.UNDEAD], lore: "Shoots bone arrows from range.", quip: "Has a bone to pick with your frontline." },
{ id: "mob_021", name: "Nightblade Initiate", hp: 46, str: 15, def: 1, tags: [ENEMY_TAGS.NINJA], lore: "Swift daggers bypassing heavy shields.", quip: "Fast hands, faster escapes." },
{ id: "mob_022", name: "Sentry Footman", hp: 88, str: 10, def: 11, tags: [ENEMY_TAGS.KNIGHT], lore: "Carries a massive wooden kite shield.", quip: "Stands his ground with stubborn pride." },
{ id: "mob_023", name: "Pit Fighter Orc", hp: 78, str: 17, def: 4, tags: [ENEMY_TAGS.BERSERKER], lore: "Swings heavy spiked maces furiously.", quip: "Loves a good brawl on weekends." },
{ id: "mob_024", name: "Automaton Miner", hp: 92, str: 9, def: 9, tags: [ENEMY_TAGS.AUTOMATON], lore: "Industrial drill robot repurposed for war.", quip: "Drilling through your defensive strategy." },
{ id: "mob_025", name: "Haunted Armor", hp: 80, str: 12, def: 8, tags: [ENEMY_TAGS.GHOST, ENEMY_TAGS.KNIGHT], lore: "Empty suit of plate driven by spirits.", quip: "Nobody home, but still swinging." },

// --- Mid-Early Gauntlet (26-50) ---
{ id: "mob_026", name: "Rotting Ghoul", hp: 90, str: 14, def: 4, tags: [ENEMY_TAGS.UNDEAD], lore: "Feeds on fallen warriors in dark corridors.", quip: "Bad breath is an understatement." },
{ id: "mob_027", name: "Shadow Strider", hp: 70, str: 18, def: 3, tags: [ENEMY_TAGS.NINJA], lore: "Teleports behind target with shadowy precision.", quip: "Nothing personal, adventurer." },
{ id: "mob_028", name: "Iron Bastion Guard", hp: 110, str: 15, def: 16, tags: [ENEMY_TAGS.KNIGHT], lore: "Towering knight with impenetrable armor.", quip: "Weak attacks get halved instantly." },
{ id: "mob_029", name: "Wild Brawler", hp: 100, str: 20, def: 5, tags: [ENEMY_TAGS.BERSERKER], lore: "Fists glowing with furious red energy.", quip: "Knuckle sandwiches on special today." },
{ id: "mob_030", name: "Steam Turbine Bot", hp: 120, str: 14, def: 12, tags: [ENEMY_TAGS.AUTOMATON], lore: "Vents scalding hot steam when hit.", quip: "Pressure valve dangerously high." },
{ id: "mob_031", name: "Wailing Shade", hp: 65, str: 17, def: 0, tags: [ENEMY_TAGS.GHOST], lore: "Ethereal spirit floating effortlessly.", quip: "Ears ring for hours after fighting her." },
{ id: "mob_032", name: "Hive Maggot Swarm", hp: 75, str: 10, def: 2, tags: [ENEMY_TAGS.SWARM], lore: "Writhing mass of parasitic organisms.", quip: "Pass the bug spray immediately." },
{ id: "mob_033", name: "Tentacle Horror", hp: 85, str: 16, def: 5, tags: [ENEMY_TAGS.ELDRITCH], lore: "Sprouts limbs from dimensional cracks.", quip: "Loves long hugs and mind flaying." },
{ id: "mob_034", name: "Dungeon Gnoll", hp: 80, str: 15, def: 4, tags: [ENEMY_TAGS.NEUTRAL], lore: "Hyena warrior laughing maniacally in battle.", quip: "His humor is as bad as his posture." },
{ id: "mob_035", name: "Skeletal Mage", hp: 70, str: 18, def: 3, tags: [ENEMY_TAGS.UNDEAD], lore: "Casts bone spears and dark magic curses.", quip: "Spells drawn straight from the grave." },
{ id: "mob_036", name: "Poison Dart Ninja", hp: 65, str: 16, def: 2, tags: [ENEMY_TAGS.NINJA], lore: "Fires toxic darts with pin-point accuracy.", quip: "Watch out for poisoned blow darts." },
{ id: "mob_037", name: "Royal Paladin Corpse", hp: 115, str: 16, def: 15, tags: [ENEMY_TAGS.KNIGHT, ENEMY_TAGS.UNDEAD], lore: "Fallen holy knight bound to dark orders.", quip: "Fallen grace, heavy mace." },
{ id: "mob_038", name: "Minotaur Berserker", hp: 130, str: 22, def: 6, tags: [ENEMY_TAGS.BERSERKER], lore: "Charges wild through party formations.", quip: "Mess with the bull, get the horns." },
{ id: "mob_039", name: "Clockwork Gunner", hp: 100, str: 18, def: 10, tags: [ENEMY_TAGS.AUTOMATON], lore: "Rapid-fire brass gatling turret.", quip: "Reload time: 0.0 seconds." },
{ id: "mob_040", name: "Spectral Wraith", hp: 60, str: 19, def: 0, tags: [ENEMY_TAGS.GHOST], lore: "Siphons vitality with icy ghostly hands.", quip: "Chills you right down to the bone." },
{ id: "mob_041", name: "Corrupted Scarab Swarm", hp: 80, str: 11, def: 3, tags: [ENEMY_TAGS.SWARM], lore: "Golden beetles devouring armor and flesh.", quip: "Not the shiny treasure you wanted." },
{ id: "mob_042", name: "Mind Scrambler", hp: 90, str: 17, def: 6, tags: [ENEMY_TAGS.ELDRITCH], lore: "Emits psychic waves confusing heroes.", quip: "Makes you forget why you entered the dungeon." },
{ id: "mob_043", name: "Desert Bandit Leader", hp: 95, str: 18, def: 5, tags: [ENEMY_TAGS.NEUTRAL], lore: "Wields curved scimitars with high lethal flair.", quip: "Sand in your eyes, steel in your back." },
{ id: "mob_044", name: "Plague Mummy", hp: 105, str: 13, def: 8, tags: [ENEMY_TAGS.UNDEAD], lore: "Wrapped in ancient bandages soaked in plague.", quip: "Smells like 3,000 year old dust." },
{ id: "mob_045", name: "Kunoichi Assassin", hp: 75, str: 20, def: 3, tags: [ENEMY_TAGS.NINJA], lore: "Master of smoke bombs and rapid strikes.", quip: "Vanishes before her blade lands." },
{ id: "mob_046", name: "Stone Sentinel", hp: 140, str: 14, def: 17, tags: [ENEMY_TAGS.KNIGHT], lore: "Carved from solid granite bedrock.", quip: "Solid as a rock, cuts small hits in half." },
{ id: "mob_047", name: "Blood Fiend", hp: 110, str: 23, def: 4, tags: [ENEMY_TAGS.BERSERKER], lore: "Grows ravenous at the sight of spilled blood.", quip: "Frenzy mode activated." },
{ id: "mob_048", name: "Cyber Sentry Bot", hp: 115, str: 16, def: 14, tags: [ENEMY_TAGS.AUTOMATON], lore: "Fires target tracking laser pulses.", quip: "Target locked, executing fire protocol." },
{ id: "mob_049", name: "Dungeon Poltergeist", hp: 65, str: 18, def: 0, tags: [ENEMY_TAGS.GHOST], lore: "Hurls loose rocks and weapons magically.", quip: "Loves throwing furniture at guests." },
{ id: "mob_050", name: "Acid Slime Colony", hp: 85, str: 12, def: 2, tags: [ENEMY_TAGS.SWARM], lore: "Corrosive ooze eating through armor.", quip: "Do not attempt to touch or pet." },

// --- Mid-Gauntlet (51-75) ---
{ id: "mob_051", name: "Abyssal Cult Cultist", hp: 100, str: 20, def: 7, tags: [ENEMY_TAGS.ELDRITCH], lore: "Devoted follower of cosmic terrors.", quip: "Chanting in voices that give you headaches." },
{ id: "mob_052", name: "Cave Bear", hp: 135, str: 21, def: 6, tags: [ENEMY_TAGS.NEUTRAL], lore: "Massive ferocious subterranean predator.", quip: "Woke up from hibernation on the wrong side." },
{ id: "mob_053", name: "Lich Apprentice", hp: 95, str: 22, def: 5, tags: [ENEMY_TAGS.UNDEAD], lore: "Practicing forbidden dark resurrection.", quip: "Homework assignment: conquer the world." },
{ id: "mob_054", name: "Shadow Blade Master", hp: 85, str: 25, def: 4, tags: [ENEMY_TAGS.NINJA], lore: "Executes triple strikes from dark shadows.", quip: "Three strikes and your party is out." },
{ id: "mob_055", name: "Obsidian Knight", hp: 160, str: 18, def: 20, tags: [ENEMY_TAGS.KNIGHT], lore: "Forged from volcanic glass armor.", quip: "Halves hits dealing under 16 HP." },
{ id: "mob_056", name: "Gladiator Champion", hp: 145, str: 26, def: 8, tags: [ENEMY_TAGS.BERSERKER], lore: "Crowd favorite in underground arenas.", quip: "Are you not entertained yet?" },
{ id: "mob_057", name: "Heavy Steam Mech", hp: 170, str: 20, def: 16, tags: [ENEMY_TAGS.AUTOMATON], lore: "Piston powered destruction engine.", quip: "Piston powered punch heading your way." },
{ id: "mob_058", name: "Banshee Screamer", hp: 75, str: 22, def: 0, tags: [ENEMY_TAGS.GHOST], lore: "Screams shake the structural foundation.", quip: "Glass shatters when she hits high notes." },
{ id: "mob_059", name: "Vermin Horde", hp: 90, str: 13, def: 3, tags: [ENEMY_TAGS.SWARM], lore: "Thousands of glowing red eyes in darkness.", quip: "Strength in sheer terrifying numbers." },
{ id: "mob_060", name: "Void Behemoth Youth", hp: 120, str: 21, def: 9, tags: [ENEMY_TAGS.ELDRITCH], lore: "Young tentacled horror growing rapidly.", quip: "Needs a lot of cosmic snacks." },
{ id: "mob_061", name: "Ogre Heavy Clubber", hp: 160, str: 24, def: 7, tags: [ENEMY_TAGS.NEUTRAL], lore: "Swings whole tree trunks like lightweight bats.", quip: "Home run swing incoming." },
{ id: "mob_062", name: "Vampire Spawn", hp: 110, str: 23, def: 6, tags: [ENEMY_TAGS.UNDEAD], lore: "Siphons party health with razor fangs.", quip: "Wants a quick midnight bite." },
{ id: "mob_063", name: "Shinobi Infiltrator", hp: 90, str: 26, def: 4, tags: [ENEMY_TAGS.NINJA], lore: "Bypasses party frontline tanks entirely.", quip: "Sneaks directly to your squishy backline." },
{ id: "mob_064", name: "Ironclad Executioner", hp: 175, str: 22, def: 22, tags: [ENEMY_TAGS.KNIGHT], lore: "Heavy axe built for armored execution.", quip: "Off with their heads!" },
{ id: "mob_065", name: "Raging Werewolf", hp: 135, str: 28, def: 7, tags: [ENEMY_TAGS.BERSERKER], lore: "Howls under full moon, gains immense speed.", quip: "Silver weapons strongly recommended." },
{ id: "mob_066", name: "Nanite Swarm Bot", hp: 130, str: 17, def: 12, tags: [ENEMY_TAGS.AUTOMATON, ENEMY_TAGS.SWARM], lore: "Cloud of micro-bots slicing target targets.", quip: "Swarm intelligence in action." },
{ id: "mob_067", name: "Dread Phantom", hp: 80, str: 24, def: 0, tags: [ENEMY_TAGS.GHOST], lore: "Haunts heroes with visions of defeat.", quip: "Nightmare fuel in physical form." },
{ id: "mob_068", name: "Locust Cloud", hp: 95, str: 14, def: 2, tags: [ENEMY_TAGS.SWARM], lore: "Devours gear durability and health.", quip: "Leaves nothing behind in its wake." },
{ id: "mob_069", name: "Cosmic Watcher", hp: 115, str: 23, def: 8, tags: [ENEMY_TAGS.ELDRITCH], lore: "Giant floating eyeball staring into souls.", quip: "Always watching your every move." },
{ id: "mob_070", name: "Stone Gargoyle Brute", hp: 150, str: 22, def: 17, tags: [ENEMY_TAGS.NEUTRAL], lore: "Heavy aerial brute dropping from ceilings.", quip: "Watch the sky for falling stone!" },

// --- Late-Mid Gauntlet (76-100) ---
{ id: "mob_071", name: "Necropolis Guard", hp: 140, str: 20, def: 12, tags: [ENEMY_TAGS.UNDEAD, ENEMY_TAGS.KNIGHT], lore: "Guards royal burial grounds for centuries.", quip: "Overtime pay: zero gold." },
{ id: "mob_072", name: "Shadow Master Pupil", hp: 100, str: 28, def: 5, tags: [ENEMY_TAGS.NINJA], lore: "Trains under legendary shadow assassins.", quip: "A grade student in assassination." },
{ id: "mob_073", name: "Titan Crusher", hp: 200, str: 25, def: 24, tags: [ENEMY_TAGS.KNIGHT], lore: "Giant stone golem crushing armor shields.", quip: "Halves strikes doing under 20 damage." },
{ id: "mob_074", name: "Blood Berserker", hp: 155, str: 32, def: 8, tags: [ENEMY_TAGS.BERSERKER], lore: "Slashes wilder as his blood spills.", quip: "Pain only makes him hit harder." },
{ id: "mob_075", name: "Laser Cannon Turret", hp: 150, str: 24, def: 18, tags: [ENEMY_TAGS.AUTOMATON], lore: "Fires charged energy beams across battlefield.", quip: "Pew pew at lethal voltage." },
{ id: "mob_076", name: "Astral Specter", hp: 90, str: 26, def: 0, tags: [ENEMY_TAGS.GHOST], lore: "Glows with starlight energy in dark caverns.", quip: "Beautiful but completely deadly." },
{ id: "mob_077", name: "Spider Brood Mother", hp: 140, str: 18, def: 6, tags: [ENEMY_TAGS.SWARM], lore: "Spawns spiderlings every turn.", quip: "Mother of the year award winner." },
{ id: "mob_078", name: "Dimensional Ravager", hp: 130, str: 27, def: 10, tags: [ENEMY_TAGS.ELDRITCH], lore: "Tears holes in space to strike targets.", quip: "Here today, striking tomorrow." },
{ id: "mob_079", name: "Cave Troll", hp: 210, str: 27, def: 10, tags: [ENEMY_TAGS.NEUTRAL], lore: "Regenerates health every single round.", quip: "Fire or acid stops his healing!" },
{ id: "mob_080", name: "Ancient Mummy Lord", hp: 160, str: 21, def: 14, tags: [ENEMY_TAGS.UNDEAD], lore: "Curses heroes with lingering rot status.", quip: "Curse of the Pharaoh strikes again." },
{ id: "mob_081", name: "Ghost Ninja", hp: 85, str: 29, def: 2, tags: [ENEMY_TAGS.NINJA, ENEMY_TAGS.GHOST], lore: "Incorporeal ninja dodging physical attacks.", quip: "Can't touch this ninja skill." },
{ id: "mob_082", name: "Rune Knight", hp: 180, str: 23, def: 21, tags: [ENEMY_TAGS.KNIGHT], lore: "Armor inscribed with defensive spell runes.", quip: "Halves hits doing under 18 damage." },
{ id: "mob_083", name: "Raging Orc Chieftain", hp: 170, str: 34, def: 9, tags: [ENEMY_TAGS.BERSERKER], lore: "Commands horde with terrifying roar.", quip: "Roars so loud your speakers rattle." },
{ id: "mob_084", name: "Heavy War Automaton", hp: 190, str: 26, def: 20, tags: [ENEMY_TAGS.AUTOMATON], lore: "Armored tread robot packing heat.", quip: "Heavy artillery on tracks." },
{ id: "mob_085", name: "Wailing Ghost Queen", hp: 100, str: 28, def: 0, tags: [ENEMY_TAGS.GHOST], lore: "Commands spirits of fallen gauntlet runners.", quip: "Her opera solo hurts your ears." },
{ id: "mob_086", name: "Corrupted Hive Colony", hp: 125, str: 19, def: 8, tags: [ENEMY_TAGS.SWARM], lore: "Pulsating hive spawning airborne pests.", quip: "Smash the hive first!" },
{ id: "mob_087", name: "Void Tentacle Terror", hp: 145, str: 28, def: 11, tags: [ENEMY_TAGS.ELDRITCH], lore: "Crushes party targets in void coils.", quip: "Tight squeeze in the cosmic void." },
{ id: "mob_088", name: "Dungeon Drake", hp: 195, str: 29, def: 12, tags: [ENEMY_TAGS.NEUTRAL], lore: "Wingless dragon spitting burning flame.", quip: "Mini dragon with maximum temper." },
{ id: "mob_089", name: "Skeletal Champion", hp: 150, str: 25, def: 15, tags: [ENEMY_TAGS.UNDEAD, ENEMY_TAGS.KNIGHT], lore: "Dual-wields bone broadswords with skill.", quip: "Two swords, zero muscle." },
{ id: "mob_090", name: "Shadow Assassin Elite", hp: 110, str: 32, def: 6, tags: [ENEMY_TAGS.NINJA], lore: "Top assassin of the shadow clan.", quip: "Silent, deadly, and precise." },
{ id: "mob_091", name: "Obsidian Golem", hp: 220, str: 24, def: 26, tags: [ENEMY_TAGS.KNIGHT], lore: "Hardened volcanic stone construct.", quip: "Halves strikes doing under 22 HP." },
{ id: "mob_092", name: "Chieftain Berserker", hp: 180, str: 36, def: 10, tags: [ENEMY_TAGS.BERSERKER], lore: "Empowered by battle rage aura.", quip: "Anger management needed." },
{ id: "mob_093", name: "Cyber Dreadnought", hp: 210, str: 28, def: 22, tags: [ENEMY_TAGS.AUTOMATON], lore: "Peak futuristic robot engineering.", quip: "Shields active, weapons online." },
{ id: "mob_094", name: "Phantom Empress", hp: 110, str: 30, def: 0, tags: [ENEMY_TAGS.GHOST], lore: "Rules over spectral ghost realms.", quip: "Majestic and completely ethereal." },
{ id: "mob_095", name: "Acid Swarm Queen", hp: 135, str: 22, def: 9, tags: [ENEMY_TAGS.SWARM], lore: "Multiplies rapidly on the battlefield.", quip: "More slimes than a game show." },
{ id: "mob_096", name: "Eldritch Stalker", hp: 155, str: 31, def: 12, tags: [ENEMY_TAGS.ELDRITCH], lore: "Hunts party members from the dark.", quip: "Eyes in the dark are watching." },
{ id: "mob_097", name: "Glacier Yeti", hp: 230, str: 30, def: 14, tags: [ENEMY_TAGS.NEUTRAL], lore: "Freezes heroes with icy claws.", quip: "Cool, calm, and deadly." },
{ id: "mob_098", name: "Necromancer Elite", hp: 140, str: 26, def: 10, tags: [ENEMY_TAGS.UNDEAD], lore: "Raises fallen allies mid-combat.", quip: "Overtime resurrects available." },
{ id: "mob_099", name: "Shadow Grandmaster", hp: 120, str: 35, def: 7, tags: [ENEMY_TAGS.NINJA], lore: "Grandmaster of deadly stealth strikes.", quip: "Master class in shadow lethal art." },
{ id: "mob_100", name: "Titan Citadel Guard", hp: 250, str: 28, def: 28, tags: [ENEMY_TAGS.KNIGHT, ENEMY_TAGS.AUTOMATON], lore: "The final sentinel of the regular bestiary.", quip: "The wall that stops all runners." }
];

// ==========================================================================
// --- 20+ MINIBOSSES (EVERY 20 WAVES) ---
// ==========================================================================
export const MINIBOSSES = [
{ id: "mb_01", name: "MINIBOSS: Iron Golem", hp: 350, str: 25, def: 20, tags: [ENEMY_TAGS.AUTOMATON, ENEMY_TAGS.KNIGHT], lore: "Towering iron construct guarding early waves.", quip: "Halves hits under 35 damage." },
{ id: "mb_02", name: "MINIBOSS: Necromancer Lord", hp: 450, str: 28, def: 12, tags: [ENEMY_TAGS.UNDEAD], lore: "Summons undead minions and refuses to die easily.", quip: "Always brings extra company." },
{ id: "mb_03", name: "MINIBOSS: Berserker Chieftain", hp: 650, str: 40, def: 15, tags: [ENEMY_TAGS.BERSERKER], lore: "Wields dual giant axes with terrifying rage.", quip: "Hits like a runaway train." },
{ id: "mb_04", name: "MINIBOSS: Shadow Master Zero", hp: 850, str: 50, def: 18, tags: [ENEMY_TAGS.NINJA, ENEMY_TAGS.GHOST], lore: "Grandmaster ninja moving between dimensions.", quip: "Now you see him, now your party is gone." },
{ id: "mb_05", name: "MINIBOSS: Eldritch Hive Mind", hp: 1200, str: 62, def: 25, tags: [ENEMY_TAGS.ELDRITCH, ENEMY_TAGS.SWARM], lore: "Massive brain entity controlling swarms.", quip: "Overthinking is an understatement." },
{ id: "mb_06", name: "MINIBOSS: Doom Automaton Titan", hp: 1600, str: 75, def: 35, tags: [ENEMY_TAGS.AUTOMATON, ENEMY_TAGS.KNIGHT], lore: "War machine built to wipe out gauntlet climbers.", quip: "Halves hits under 160 damage." },
{ id: "mb_07", name: "MINIBOSS: Vampire Count", hp: 1800, str: 82, def: 28, tags: [ENEMY_TAGS.UNDEAD, ENEMY_TAGS.NINJA], lore: "Noble bloodsucker moving at blinding speed.", quip: "Wants to invite you for dinner... as the main dish." },
{ id: "mb_08", name: "MINIBOSS: Flame Warlord", hp: 2000, str: 90, def: 30, tags: [ENEMY_TAGS.BERSERKER], lore: "Incinerates whole party formations.", quip: "Spreading heat across the gauntlet." },
{ id: "mb_09", name: "MINIBOSS: Cyber Goliath", hp: 2200, str: 95, def: 38, tags: [ENEMY_TAGS.AUTOMATON], lore: "Armored robot with heavy missile pods.", quip: "Missile salvo locked on target." },
{ id: "mb_10", name: "MINIBOSS: Phantom Monarch", hp: 2400, str: 100, def: 20, tags: [ENEMY_TAGS.GHOST], lore: "Rules over spectral domain of ghosts.", quip: "Haunting your victory dreams." },
{ id: "mb_11", name: "MINIBOSS: Acid Swarm Emperor", hp: 2600, str: 105, def: 25, tags: [ENEMY_TAGS.SWARM], lore: "Giant acid monster splitting mid combat.", quip: "Melts party armor like butter." },
{ id: "mb_12", name: "MINIBOSS: Void Prophet", hp: 2800, str: 110, def: 32, tags: [ENEMY_TAGS.ELDRITCH], lore: "Prophesies doom for all party members.", quip: "The future looks bleak." },
{ id: "mb_13", name: "MINIBOSS: Bone Dragon Vanguard", hp: 3000, str: 115, def: 35, tags: [ENEMY_TAGS.UNDEAD, ENEMY_TAGS.KNIGHT], lore: "Skeletal dragon reanimated by necromancy.", quip: "Halves strikes doing under 300 damage." },
{ id: "mb_14", name: "MINIBOSS: Kunoichi Grandmaster", hp: 3200, str: 120, def: 22, tags: [ENEMY_TAGS.NINJA], lore: "Deadliest female assassin in existence.", quip: "You won't see her coming." },
{ id: "mb_15", name: "MINIBOSS: Citadel Bastion", hp: 3500, str: 125, def: 45, tags: [ENEMY_TAGS.KNIGHT, ENEMY_TAGS.AUTOMATON], lore: "Walking fort with massive shields.", quip: "Halves strikes doing under 350 damage." },
{ id: "mb_16", name: "MINIBOSS: Blood Berserker King", hp: 3800, str: 135, def: 28, tags: [ENEMY_TAGS.BERSERKER], lore: "Rage scales out of control rapidly.", quip: "Pure rage unleashed." },
{ id: "mb_17", name: "MINIBOSS: Mech Anvil Prime", hp: 4000, str: 140, def: 42, tags: [ENEMY_TAGS.AUTOMATON], lore: "Forges automated drones during battle.", quip: "Automated factory floor on wheels." },
{ id: "mb_18", name: "MINIBOSS: Spectral Lich Lord", hp: 4200, str: 145, def: 30, tags: [ENEMY_TAGS.GHOST, ENEMY_TAGS.UNDEAD], lore: "Combines phantom invulnerability with undead revive.", quip: "Double the deadliness." },
{ id: "mb_19", name: "MINIBOSS: Hive Queen Supreme", hp: 4500, str: 150, def: 35, tags: [ENEMY_TAGS.SWARM, ENEMY_TAGS.ELDRITCH], lore: "Commands infinite hordes of cosmic pests.", quip: "Bugs, bugs everywhere." },
{ id: "mb_20", name: "MINIBOSS: Cosmic Terror Warden", hp: 4800, str: 155, def: 40, tags: [ENEMY_TAGS.ELDRITCH, ENEMY_TAGS.KNIGHT], lore: "Guards the threshold to the ultimate boss.", quip: "Halves strikes under 480 damage." }
];

// ==========================================================================
// --- 20+ MAJOR BOSSES (EVERY 30 WAVES) ---
// ==========================================================================
export const MAJOR_BOSSES = [
{ id: "boss_01", name: "BOSS: Dragon of the Abyss", hp: 800, str: 35, def: 22, tags: [ENEMY_TAGS.KNIGHT, ENEMY_TAGS.BERSERKER], lore: "Ancient winged nightmare guarding Wave 30.", quip: "Halves hits under 80 HP." },
{ id: "boss_02", name: "BOSS: Lich King Supreme", hp: 1200, str: 45, def: 25, tags: [ENEMY_TAGS.UNDEAD, ENEMY_TAGS.ELDRITCH], lore: "Master of dark magic at Wave 60.", quip: "Downs at 0 HP and resurrects with full health unless cleared!" },
{ id: "boss_03", name: "BOSS: Mecha Colossus", hp: 1800, str: 55, def: 35, tags: [ENEMY_TAGS.AUTOMATON, ENEMY_TAGS.KNIGHT], lore: "Giant mechanical titan at Wave 90.", quip: "Halves hits under 180 HP." },
{ id: "boss_04", name: "BOSS: Shadow Empress", hp: 2500, str: 70, def: 30, tags: [ENEMY_TAGS.NINJA, ENEMY_TAGS.GHOST], lore: "Ruler of shadows at Wave 120.", quip: "Extremely high damage cap and 50% dodge rate." },
{ id: "boss_05", name: "BOSS: Eldritch Titan", hp: 3500, str: 85, def: 40, tags: [ENEMY_TAGS.ELDRITCH, ENEMY_TAGS.SWARM], lore: "Cosmic terror guarding Wave 150.", quip: "Drains stats and multiplies if left unchecked." },
{ id: "boss_06", name: "BOSS: Archdemon Lord", hp: 5000, str: 100, def: 50, tags: [ENEMY_TAGS.BERSERKER, ENEMY_TAGS.UNDEAD], lore: "Hellfire overlord at Wave 180.", quip: "The penultimatum of destruction." },
{ id: "boss_07", name: "BOSS: Frost Wyrm Empress", hp: 5200, str: 105, def: 45, tags: [ENEMY_TAGS.KNIGHT], lore: "Freezes entire battlefields in eternal ice.", quip: "Halves hits under 520 HP." },
{ id: "boss_08", name: "BOSS: Undead Emperor", hp: 5500, str: 110, def: 48, tags: [ENEMY_TAGS.UNDEAD], lore: "Commands massive armies of skeletal legions.", quip: "Long live the dead king." },
{ id: "boss_09", name: "BOSS: Shinobi Clan Overlord", hp: 5800, str: 115, def: 32, tags: [ENEMY_TAGS.NINJA], lore: "Strikes five times per turn from dark shadows.", quip: "Five blades, one target." },
{ id: "boss_10", name: "BOSS: Iron Fortress Colossus", hp: 6200, str: 120, def: 60, tags: [ENEMY_TAGS.KNIGHT, ENEMY_TAGS.AUTOMATON], lore: "Virtually impenetrable walking citadel.", quip: "Halves hits under 620 HP." },
{ id: "boss_11", name: "BOSS: Berserker God Avatar", hp: 6500, str: 130, def: 35, tags: [ENEMY_TAGS.BERSERKER], lore: "Rage meter multiplies damage astronomically.", quip: "Godly wrath unleashed." },
{ id: "boss_12", name: "BOSS: Cyber Core Overmind", hp: 6800, str: 135, def: 52, tags: [ENEMY_TAGS.AUTOMATON], lore: "Central AI governing all robots.", quip: "System status: exterminate all humans." },
{ id: "boss_13", name: "BOSS: Spectral Phantom Sovereign", hp: 7000, str: 140, def: 25, tags: [ENEMY_TAGS.GHOST], lore: "Phase shifts out of physical reality completely.", quip: "Can't hit what isn't really there." },
{ id: "boss_14", name: "BOSS: Acid Swarm Leviathan", hp: 7300, str: 145, def: 38, tags: [ENEMY_TAGS.SWARM], lore: "Massive biological swarm eating armor whole.", quip: "Dissolves party gear instantly." },
{ id: "boss_15", name: "BOSS: Void Star Eater", hp: 7600, str: 150, def: 45, tags: [ENEMY_TAGS.ELDRITCH], lore: "Devours light, mana, and hero stats.", quip: "Cosmic black hole on legs." },
{ id: "boss_16", name: "BOSS: Crimson Vampire Overlord", hp: 8000, str: 155, def: 40, tags: [ENEMY_TAGS.UNDEAD, ENEMY_TAGS.NINJA], lore: "Siphons massive party health with every hit.", quip: "Your blood fuels his immortality." },
{ id: "boss_17", name: "BOSS: Flame God Vulcan", hp: 8300, str: 160, def: 50, tags: [ENEMY_TAGS.BERSERKER, ENEMY_TAGS.KNIGHT], lore: "Forged in the center of volcanic suns.", quip: "Halves hits under 830 HP." },
{ id: "boss_18", name: "BOSS: Titan Doom Mech", hp: 8600, str: 165, def: 58, tags: [ENEMY_TAGS.AUTOMATON, ENEMY_TAGS.KNIGHT], lore: "Nuclear powered mech carrying massive orbital lasers.", quip: "Halves hits under 860 HP." },
{ id: "boss_19", name: "BOSS: Dread Queen Wraith", hp: 9000, str: 170, def: 30, tags: [ENEMY_TAGS.GHOST, ENEMY_TAGS.ELDRITCH], lore: "Screams fracture cosmic reality.", quip: "Piercing screams ring forever." },
{ id: "boss_20", name: "BOSS: Primordial Swarm Horror", hp: 9500, str: 175, def: 42, tags: [ENEMY_TAGS.SWARM, ENEMY_TAGS.ELDRITCH], lore: "Ancient swarm that devours entire worlds.", quip: "The end of all living things." }
];

// ==========================================================================
// --- THE FINAL WORLD BOSS (WAVE 200) ---
// ==========================================================================
export const FINAL_BOSS = {
id: "boss_200",
name: "FINAL WORLD BOSS: Aether Sovereign",
hp: 15000,
str: 200,
def: 75,
tags: [ENEMY_TAGS.KNIGHT, ENEMY_TAGS.NINJA, ENEMY_TAGS.AUTOMATON, ENEMY_TAGS.UNDEAD, ENEMY_TAGS.BERSERKER, ENEMY_TAGS.GHOST, ENEMY_TAGS.SWARM, ENEMY_TAGS.ELDRITCH],
lore: "The ultimate ruler of the gauntlet possessing every single enemy class trait simultaneously.",
quip: "Halves hits under 1,500 HP! Defeat this sovereign to achieve total victory!"
};

// Combine all into Master Bestiary List for Almanac & Spawn Queries
export const MASTER_BESTIARY = [
...REGULAR_ENEMIES,
...MINIBOSSES,
...MAJOR_BOSSES,
FINAL_BOSS
];
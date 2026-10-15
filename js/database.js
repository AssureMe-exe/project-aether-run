/* ==========================================================================
Project Aether Run - Complete Master Database
Contains: 50+ Meta Events & 100+ Collectible Items & Artifacts
========================================================================== */

export const META_EVENTS_DATABASE = [
// --- POTIONS & MERCHANTS (1-10) ---
{
id: "evt_01",
name: "Suspicious Potion Merchant",
desc: "A hooded figure offering strange bubbling brews from a makeshift stall.",
almanacQuip: "He insists the green glow means it's extra organic.",
choices: [
{ text: "Buy Minor Potion (20 Gold)", action: "BUY_ITEM", item: "item_001" },
{ text: "Test Experimental Brew", action: "ROLL_STAT", stat: "hp", amount: 20 },
{ text: "Leave", action: "SKIP" }
]
},
{
id: "evt_02",
name: "Alchemist's Clearance Rack",
desc: "An abandoned cart overflowing with mislabeled flasks and volatile test tubes.",
almanacQuip: "Discount potion brewing is a self-correcting industry.",
choices: [
{ text: "Rummage through the cart (Gain 2 Potions)", action: "GIVE_POTIONS", count: 2 },
{ text: "Kick the cart over (Cause explosion)", action: "AOE_DAMAGE", amount: 15 },
{ text: "Ignore it", action: "SKIP" }
]
},
{
id: "evt_03",
name: "Wandering Tea Vendor",
desc: "A cheerful turtle merchant boiling herbal teas over a miniature campfire.",
almanacQuip: "Steeped in ancient wisdom and slightly murky pond water.",
choices: [
{ text: "Drink Chamomile Brew (Heal Party 30%)", action: "HEAL_PARTY", percent: 0.30 },
{ text: "Buy Dragon Leaf Tea (50 Gold)", action: "BUY_ITEM", item: "item_005" },
{ text: "Politely Decline", action: "SKIP" }
]
},
{
id: "evt_04",
name: "The Gilded Blacksmith",
desc: "A massive minotaur hammering away at glowing golden equipment.",
almanacQuip: "If it doesn't shine, he refuses to forge it.",
choices: [
{ text: "Sharpen Weapons (+5 STR to leader, 40 Gold)", action: "BUFF_LEADER", stat: "str", amount: 5 },
{ text: "Reinforce Armor (+5 DEF to team, 40 Gold)", action: "BUFF_PARTY", stat: "def", amount: 5 },
{ text: "Leave him to his work", action: "SKIP" }
]
},
{
id: "evt_05",
name: "Shady Arms Dealer",
desc: "A goblin wearing three coats stacked on top of each other.",
almanacQuip: "None of these weapons are stolen. They were merely found before their owners lost them.",
choices: [
{ text: "Buy Mystery Weapon (30 Gold)", action: "GIVE_RANDOM_EQUIPMENT" },
{ text: "Sell Junk (+25 Gold)", action: "ADD_GOLD", amount: 25 },
{ text: "Walk away slowly", action: "SKIP" }
]
},
{
id: "evt_06",
name: "Mystic Crystal Cavern",
desc: "A cave floor filled with humming violet crystals pulsating with mana.",
almanacQuip: "Licking the crystals grants magical insight and a numb tongue.",
choices: [
{ text: "Harvest Crystals (+1 Rest Charge)", action: "ADD_REST", amount: 1 },
{ text: "Absorb Mana (+10% Ultimate Gauge)", action: "ADD_ULTIMATE", amount: 10 },
{ text: "Leave intact", action: "SKIP" }
]
},
{
id: "evt_07",
name: "The Wandering Gambler",
desc: "A sly fox rolling glowing wooden dice on a velvet rug.",
almanacQuip: "The house always wins, especially when the house has tail-swishing charm.",
choices: [
{ text: "Bet 20 Gold (50% Chance for Double)", action: "GAMBLE_GOLD", amount: 20 },
{ text: "Bet 50 Gold (30% Chance for Triple)", action: "GAMBLE_GOLD", amount: 50 },
{ text: "Decline the gamble", action: "SKIP" }
]
},
{
id: "evt_08",
name: "Traveling Circus Tent",
desc: "A loud, colorful tent setup in the middle of a desolate dungeon corridor.",
almanacQuip: "The clowns are harmless. The pie-throwing cannons are not.",
choices: [
{ text: "Watch Acrobat Show (+5 DEX to party)", action: "BUFF_PARTY", stat: "dex", amount: 5 },
{ text: "Test Strength Machine (+5 STR to party)", action: "BUFF_PARTY", stat: "str", amount: 5 },
{ text: "Leave", action: "SKIP" }
]
},
{
id: "evt_09",
name: "The Cursed Pawn Shop",
desc: "A dusty room full of ticking clocks and glowing, ominous artifacts.",
almanacQuip: "Everything comes with a price tag and a mild spectral curse.",
choices: [
{ text: "Buy Cursed Ring (Gain Rare Artifact, Lose 15 Max HP)", action: "CURSED_ITEM" },
{ text: "Exorcise Item (Requires Cleric/Paladin)", action: "CLEANSE_FREE_ITEM" },
{ text: "Exit immediately", action: "SKIP" }
]
},
{
id: "evt_10",
name: "Gourmet Monster Chef",
desc: "An ogre wearing a tiny white chef hat, stirring a giant iron pot.",
almanacQuip: "Don't ask what's in the stew. Just chew quickly.",
choices: [
{ text: "Eat Monster Stew (+20 Max HP to party)", action: "BUFF_PARTY", stat: "maxHp", amount: 20 },
{ text: "Ask for Recipe (+10 LCK to party)", action: "BUFF_PARTY", stat: "lck", amount: 10 },
{ text: "Pass", action: "SKIP" }
]
},

// --- SHRINES & STATUES (11-20) ---
{
id: "evt_11",
name: "Statue of the Solar Deity",
desc: "A golden statue bathing the corridor in brilliant sunlight.",
almanacQuip: "Provides SPF 50 sunblock and sacred smiting power.",
choices: [
{ text: "Pray for Strength (+10 STR)", action: "BUFF_PARTY", stat: "str", amount: 10 },
{ text: "Clean Shrine (+1 Rest Charge)", action: "ADD_REST", amount: 1 },
{ text: "Walk past", action: "SKIP" }
]
},
{
id: "evt_12",
name: "Altar of the Blood Moon",
desc: "A crimson altar carved from obsidian, dripping with ancient energy.",
almanacQuip: "It prefers sacrifices in dark chocolate or life force.",
choices: [
{ text: "Offer 20 HP (Gain +15% Crit Rate)", action: "SACRIFICE_HP", hpLoss: 20, buffStat: "lck", amount: 15 },
{ text: "Destroy Altar (Fight Shadow Spectre)", action: "SPAWN_ELITE_EVENT" },
{ text: "Leave", action: "SKIP" }
]
},
{
id: "evt_13",
name: "Shrine of the Swift Wind",
desc: "An airy gazebo where breeze swirls around ancient wind chimes.",
almanacQuip: "Standing here makes your hair blow heroically in the wind.",
choices: [
{ text: "Meditate (+8 DEX to party)", action: "BUFF_PARTY", stat: "dex", amount: 8 },
{ text: "Tinker with Chimes (+5 LCK to party)", action: "BUFF_PARTY", stat: "lck", amount: 5 },
{ text: "Move on", action: "SKIP" }
]
},
{
id: "evt_14",
name: "Forgotten Warrior's Tomb",
desc: "A stone sarcophagus holding a grand sword embedded in its lid.",
almanacQuip: "He won't be using that sword anymore. Probably.",
choices: [
{ text: "Pull Sword (Gain Legendary Sword)", action: "GIVE_ITEM", item: "item_030" },
{ text: "Pay Respects (+10 DEF to party)", action: "BUFF_PARTY", stat: "def", amount: 10 },
{ text: "Disturb nothing", action: "SKIP" }
]
},
{
id: "evt_15",
name: "Fountain of Eternal Youth",
desc: "Crystal blue water cascading from a marble carved maiden.",
almanacQuip: "Warning: Drinking too much may turn you back into a toddler.",
choices: [
{ text: "Drink Deeply (Full Party Restore)", action: "FULL_HEAL" },
{ text: "Fill Flasks (Gain 2 Healing Potions)", action: "GIVE_POTIONS", count: 2 },
{ text: "Leave", action: "SKIP" }
]
},
{
id: "evt_16",
name: "Monolith of the Deep",
desc: "A dark stone covered in tentacles carved from unknown black metal.",
almanacQuip: "Listening closely reveals whispers of infinite madness and low mortgage rates.",
choices: [
{ text: "Touch Monolith (Gain +20 STR, Lose 10 DEF)", action: "TRADE_STATS", addStat: "str", addVal: 20, subStat: "def", subVal: 10 },
{ text: "Cover Monolith (+10 DEF)", action: "BUFF_PARTY", stat: "def", amount: 10 },
{ text: "Back away", action: "SKIP" }
]
},
{
id: "evt_17",
name: "Statue of the Blind Justice",
desc: "A stone figure holding scales that tilt erratically back and forth.",
almanacQuip: "Justice is blind, deaf, and loves a good coin toss.",
choices: [
{ text: "Balance the Scales (Equalize Party HP)", action: "EQUALIZE_HP" },
{ text: "Place Coin on Scale (+30 Gold)", action: "ADD_GOLD", amount: 30 },
{ text: "Ignore", action: "SKIP" }
]
},
{
id: "evt_18",
name: "Totem of the Beast",
desc: "A wooden totem carved with bears, wolves, and eagles.",
almanacQuip: "Grants wild instincts and an overwhelming urge to howl at the moon.",
choices: [
{ text: "Channel Bear (+15 Max HP)", action: "BUFF_PARTY", stat: "maxHp", amount: 15 },
{ text: "Channel Eagle (+10 DEX)", action: "BUFF_PARTY", stat: "dex", amount: 10 },
{ text: "Leave", action: "SKIP" }
]
},
{
id: "evt_19",
name: "The Glitching Obelisk",
desc: "A weird stone spire flicker-shifting through reality.",
almanacQuip: "It appears the game code forgot to render this pillar properly.",
choices: [
{ text: "Touch Code (Gain random level up)", action: "FREE_LEVEL_UP" },
{ text: "Reboot Obelisk (+50 Gold)", action: "ADD_GOLD", amount: 50 },
{ text: "Ignore bug", action: "SKIP" }
]
},
{
id: "evt_20",
name: "Sanctuary of the Phoenix",
desc: "Warm ashes glowing in an ornate golden nest.",
almanacQuip: "Never extinguish phoenix ash; it gets furious.",
choices: [
{ text: "Gather Ash (Gain Auto-Revive Item)", action: "GIVE_ITEM", item: "item_050" },
{ text: "Warm Hands (Full Party Heal)", action: "FULL_HEAL" },
{ text: "Pass by", action: "SKIP" }
]
},

// --- MYSTERIOUS ENCOUNTERS (21-35) ---
{
id: "evt_21",
name: "The Lost Mimic",
desc: "A chest sitting in the middle of a hallway crying softly.",
almanacQuip: "Even monsters have feelings when nobody falls for their traps.",
choices: [
{ text: "Comfort the Mimic (Gain Friend Artifact)", action: "GIVE_ITEM", item: "item_060" },
{ text: "Attack Mimic (Gain Gold, take damage)", action: "FIGHT_MIMIC" },
{ text: "Leave it alone", action: "SKIP" }
]
},
{
id: "evt_22",
name: "Goblin Gambling Ring",
desc: "A group of goblins racing armored snails on a chalk track.",
almanacQuip: "High-stakes snail racing is the leading cause of goblin bankruptcy.",
choices: [
{ text: "Bet on Speedy Snail (Costs 15 Gold)", action: "GAMBLE_SNAIL" },
{ text: "Bribe the Ref (Costs 30 Gold)", action: "WIN_SNAIL_RACE" },
{ text: "Walk away", action: "SKIP" }
]
},
{
id: "evt_23",
name: "The Wandering Bard",
desc: "A minstrel playing a lute with three broken strings.",
almanacQuip: "His ballads are catchy, even if he confuses 'dragon' with 'flagon'.",
choices: [
{ text: "Listen to Song (+20 Ultimate Gauge)", action: "ADD_ULTIMATE", amount: 20 },
{ text: "Toss a Coin (+5 LCK to party)", action: "BUFF_PARTY", stat: "lck", amount: 5 },
{ text: "Cover ears and leave", action: "SKIP" }
]
},
{
id: "evt_24",
name: "A Abandoned Library",
desc: "Rows of dusty tome shelves decaying in quiet solitude.",
almanacQuip: "Quiet please! The ghosts are trying to read.",
choices: [
{ text: "Read Ancient Spellbook (+10 STR to Mages/Clerics)", action: "BUFF_MAGICAL", amount: 10 },
{ text: "Search Strategy Manuals (+8 DEX to party)", action: "BUFF_PARTY", stat: "dex", amount: 8 },
{ text: "Leave", action: "SKIP" }
]
},
{
id: "evt_25",
name: "The Time Anomaly",
desc: "A pocket of air where dropped pebbles fall in slow motion.",
almanacQuip: "Step inside to age ten years or gain extra turn priority.",
choices: [
{ text: "Step Inside (+12 DEX to party)", action: "BUFF_PARTY", stat: "dex", amount: 12 },
{ text: "Throw Equipment (Duplicate Item)", action: "DUPLICATE_RANDOM_ITEM" },
{ text: "Bypass", action: "SKIP" }
]
},
{
id: "evt_26",
name: "Derelict Robot Drone",
desc: "A metallic automaton sparking with dying electricity.",
almanacQuip: "Model 404: Heroic Motivation Not Found.",
choices: [
{ text: "Repair Drone (Gain Drone Companion)", action: "GIVE_ITEM", item: "item_075" },
{ text: "Scrap for Parts (+40 Gold)", action: "ADD_GOLD", amount: 40 },
{ text: "Ignore", action: "SKIP" }
]
},
{
id: "evt_27",
name: "The Wish Granter Well",
desc: "A deep stone well glowing with shimmering starlight water.",
almanacQuip: "Wishes non-refundable upon unexpected imp transformations.",
choices: [
{ text: "Toss 10 Gold (Gain Random Buff)", action: "RANDOM_BUFF" },
{ text: "Toss 50 Gold (Gain Artifact)", action: "GIVE_RANDOM_ARTIFACT" },
{ text: "Walk away", action: "SKIP" }
]
},
{
id: "evt_28",
name: "Ghostly Duelist",
desc: "A spectral knight leaning on a phantom claymore.",
almanacQuip: "He's been waiting three hundred years for a decent sparring match.",
choices: [
{ text: "Spar with Ghost (+15 STR, take 10 dmg)", action: "BUFF_PARTY_DAMAGE", stat: "str", amount: 15, dmg: 10 },
{ text: "Decline respectfully", action: "SKIP" }
]
},
{
id: "evt_29",
name: "Fairy Ring Circle",
desc: "A perfect ring of glowing blue mushrooms in the stone floor.",
almanacQuip: "Dancing inside is fun until you wake up two weeks later.",
choices: [
{ text: "Step inside (Heal 50% HP)", action: "HEAL_PARTY", percent: 0.50 },
{ text: "Pick Mushrooms (Gain Poison Elixir)", action: "GIVE_ITEM", item: "item_012" },
{ text: "Step around", action: "SKIP" }
]
},
{
id: "evt_30",
name: "The Sleepy Dragon",
desc: "A baby red dragon sleeping atop a tiny hoard of gold coins.",
almanacQuip: "Snores sound like miniature fireworks.",
choices: [
{ text: "Sneak Gold (+35 Gold, 30% chance to awaken)", action: "STEAL_GOLD" },
{ text: "Pet Dragon (+10 LCK, 20% chance to get burned)", action: "PET_DRAGON" },
{ text: "Leave quietly", action: "SKIP" }
]
},
{
id: "evt_31",
name: "Enchanted Mirror",
desc: "A full-length silver mirror reflecting a heroic version of your party.",
almanacQuip: "Objects in mirror are handsomer than they appear.",
choices: [
{ text: "Gaze Deeply (+10 All Stats to Leader)", action: "BUFF_LEADER_ALL", amount: 10 },
{ text: "Break Mirror (Gain 7 Years Luck or Curse)", action: "BREAK_MIRROR" },
{ text: "Cover mirror", action: "SKIP" }
]
},
{
id: "evt_32",
name: "The Underground Hot Spring",
desc: "Naturally heated thermal water steaming in a cavern alcove.",
almanacQuip: "Cleanliness is next to godliness, especially after wave 40.",
choices: [
{ text: "Take a Soak (Full Heal & +1 Rest)", action: "SOAK_SPRING" },
{ text: "Fill Water Canteens (Gain Restorative Tea)", action: "GIVE_ITEM", item: "item_005" },
{ text: "Skip", action: "SKIP" }
]
},
{
id: "evt_33",
name: "Runic Teleporter",
desc: "A stone pad floating inches off the ground glowing green.",
almanacQuip: "Teleports you forward. Usually into fewer enemies, but no guarantees.",
choices: [
{ text: "Step On (Skip Next 2 Waves)", action: "SKIP_WAVES", count: 2 },
{ text: "Charge Rune (+15 Ultimate Gauge)", action: "ADD_ULTIMATE", amount: 15 },
{ text: "Deactivate", action: "SKIP" }
]
},
{
id: "evt_34",
name: "Monster Nest",
desc: "An ominous nest composed of bones and shimmering armor pieces.",
almanacQuip: "Mama monster is out getting lunch. You have five minutes.",
choices: [
{ text: "Loot Nest (Gain High Tier Armor)", action: "GIVE_HIGH_ARMOR" },
{ text: "Destroy Eggs (+20 STR to party)", action: "BUFF_PARTY", stat: "str", amount: 20 },
{ text: "Sneak past", action: "SKIP" }
]
},
{
id: "evt_35",
name: "The Mad Scientist's Lab",
desc: "Tesla coils sparking and lightning rods humming overhead.",
almanacQuip: "It's alive! And it wants a word with your manager.",
choices: [
{ text: "Pull Lever (Gain +25 STR, take 15 shock dmg)", action: "LIGHTNING_BUFF" },
{ text: "Loot Battery Parts (+30 Gold)", action: "ADD_GOLD", amount: 30 },
{ text: "Walk away", action: "SKIP" }
]
},

// --- DANGER & HIGH RISK (36-52) ---
{
id: "evt_36",
name: "The Blood Bank",
desc: "A vampire nurse standing behind a polished mahogany counter.",
almanacQuip: "Donations are greatly appreciated. Juice boxes supplied afterwards.",
choices: [
{ text: "Donate Blood (Lose 25 HP, Gain 80 Gold)", action: "BLOOD_DONATION" },
{ text: "Steal Plasma (Gain Vampiric Item)", action: "GIVE_ITEM", item: "item_010" },
{ text: "Decline", action: "SKIP" }
]
},
{
id: "evt_37",
name: "Shadow Auction",
desc: "Masked figures bidding gold on shrouded artifacts.",
almanacQuip: "Bid high or bid home.",
choices: [
{ text: "Bid 60 Gold (Win Top Tier Relic)", action: "BUY_RELIC", price: 60 },
{ text: "Pickpocket Bidders (Gain 40 Gold, 50% risk)", action: "PICKPOCKET" },
{ text: "Observe silently", action: "SKIP" }
]
},
{
id: "evt_38",
name: "The Challenge Ring",
desc: "A bloody arena cage with an eager crowd of goblins shouting.",
almanacQuip: "Two enter, one leaves with bragging rights and prize money.",
choices: [
{ text: "Enter Champion Fight (Fight Elite Enemy)", action: "SPAWN_ELITE_EVENT" },
{ text: "Bet on Current Champion (+25 Gold)", action: "ADD_GOLD", amount: 25 },
{ text: "Pass arena", action: "SKIP" }
]
},
{
id: "evt_39",
name: "The Cursed Treasure Room",
desc: "Chests overflowing with gold, guarded by a towering gargoyle.",
almanacQuip: "Greed is good. Gargoyle claws are bad.",
choices: [
{ text: "Grab Chest (+100 Gold, take 25 dmg)", action: "LOOT_CURSED_CHEST" },
{ text: "Disarm Trap (+50 Gold)", action: "ADD_GOLD", amount: 50 },
{ text: "Leave gold behind", action: "SKIP" }
]
},
{
id: "evt_40",
name: "The Wandering Soul",
desc: "A wispy blue flame floating aimlessly near a grave marker.",
almanacQuip: "Looking for directions to the afterlife.",
choices: [
{ text: "Guide Soul (+15 LCK to party)", action: "BUFF_PARTY", stat: "lck", amount: 15 },
{ text: "Consume Flame (+25% Ultimate Gauge)", action: "ADD_ULTIMATE", amount: 25 },
{ text: "Leave", action: "SKIP" }
]
},
{
id: "evt_41",
name: "Demon Bargain Pedestal",
desc: "A burning horned altar offering extreme power at a steep price.",
almanacQuip: "Always read the terms and conditions in hellfire fine print.",
choices: [
{ text: "Sign Contract (+30 STR, Max HP reduced by 20)", action: "DEMON_CONTRACT" },
{ text: "Reject Contract (+10 DEF)", action: "BUFF_PARTY", stat: "def", amount: 10 },
{ text: "Walk past", action: "SKIP" }
]
},
{
id: "evt_42",
name: "The Clockwork Workshop",
desc: "Gears spinning, steam blowing, and brass gadgets ticking.",
almanacQuip: "Punctuality is enforced by automated turrets.",
choices: [
{ text: "Upgrade Gear (+10 All Stats, Cost 50 Gold)", action: "UPGRADE_ALL_STATS" },
{ text: "Scrap Gears (+30 Gold)", action: "ADD_GOLD", amount: 30 },
{ text: "Leave", action: "SKIP" }
]
},
{
id: "evt_43",
name: "Overgrown Botanical Garden",
desc: "Vines and glowing exotic flowers choking ancient ruins.",
almanacQuip: "Pruning shears strongly recommended.",
choices: [
{ text: "Gather Healing Herbs (+2 Rest Charges)", action: "ADD_REST", amount: 2 },
{ text: "Inhale Exotic Pollen (+15 DEX, 20% Poison risk)", action: "POLLEN_BUFF" },
{ text: "Walk through", action: "SKIP" }
]
},
{
id: "evt_44",
name: "The Forgotten Forge",
desc: "A fiery anvil glowing with elemental heat.",
almanacQuip: "Hot enough to melt steel, iron, and poor choices.",
choices: [
{ text: "Imbue Fire (+15 STR to Leader)", action: "BUFF_LEADER", stat: "str", amount: 15 },
{ text: "Temper Armor (+15 DEF to Leader)", action: "BUFF_LEADER", stat: "def", amount: 15 },
{ text: "Pass forge", action: "SKIP" }
]
},
{
id: "evt_45",
name: "The Cryptic Sphinx",
desc: "A massive lion with human head guarding a sealed doorway.",
almanacQuip: "Her riddles are tricky, but her puns are worse.",
choices: [
{ text: "Answer Riddle (50% Chance +50 Gold / 50% Take Dmg)", action: "SPHINX_RIDDLE" },
{ text: "Bribe Sphinx (Pay 20 Gold to pass)", action: "PAY_SPHINX" },
{ text: "Turn around", action: "SKIP" }
]
},
{
id: "evt_46",
name: "The Astral Portal",
desc: "A vortex showing glimpses of cosmic starry voids.",
almanacQuip: "Mind the step; cosmic voids have no gravity or snack bars.",
choices: [
{ text: "Reach Inside (Gain Astral Relic)", action: "GIVE_ITEM", item: "item_090" },
{ text: "Channel Energy (+30 Ultimate Gauge)", action: "ADD_ULTIMATE", amount: 30 },
{ text: "Close portal", action: "SKIP" }
]
},
{
id: "evt_47",
name: "Sewer Pipe Spill",
desc: "Green toxic sludge leaking across the cobblestones.",
almanacQuip: "Smells like teen spirit and radioactive mutations.",
choices: [
{ text: "Wade Through (+10 Max HP, take 10 poison dmg)", action: "SLUDGE_MUTATION" },
{ text: "Jump Over (+8 DEX to party)", action: "BUFF_PARTY", stat: "dex", amount: 8 },
{ text: "Find detour", action: "SKIP" }
]
},
{
id: "evt_48",
name: "The Frozen Hero",
desc: "A warrior encased in solid glacier ice.",
almanacQuip: "Chilling out taken to an absolute extreme.",
choices: [
{ text: "Melt Ice (Gain Hero Ally Equipment)", action: "GIVE_ITEM", item: "item_035" },
{ text: "Shatter Ice (+20 Gold)", action: "ADD_GOLD", amount: 20 },
{ text: "Leave in deep freeze", action: "SKIP" }
]
},
{
id: "evt_49",
name: "The Royal Treasury Vault",
desc: "A massive brass vault door hanging slightly open.",
almanacQuip: "The guards took the day off. The traps did not.",
choices: [
{ text: "Grab Royal Hoard (+120 Gold, fight Guard Automaton)", action: "LOOT_ROYAL_VAULT" },
{ text: "Take Small Pouch (+30 Gold safely)", action: "ADD_GOLD", amount: 30 },
{ text: "Leave", action: "SKIP" }
]
},
{
id: "evt_50",
name: "The Final Sanctuary",
desc: "A peaceful garden bathed in holy starlight.",
almanacQuip: "The ultimate breather before face-off with terror.",
choices: [
{ text: "Rest & Prepare (Full Heal, +2 Rest, +50 Ultimate)", action: "FINAL_SANCTUARY_BUFF" },
{ text: "Meditate (+20 All Stats)", action: "UPGRADE_ALL_STATS_MASSIVE" }
]
}
];

export const ITEM_DATABASE = [
// --- CONSUMABLES & POTIONS (1-20) ---
{ id: "item_001", name: "Minor Healing Potion", type: "Consumable", rarity: "Common", effect: "Heals single ally for 30 HP.", almanacQuip: "Tastes like cherry cough syrup and faint magic." },
{ id: "item_002", name: "Greater Healing Potion", type: "Consumable", rarity: "Uncommon", effect: "Heals single ally for 75 HP.", almanacQuip: "Now with 50% more restorative pulp!" },
{ id: "item_003", name: "Elixir of Life", type: "Consumable", rarity: "Rare", effect: "Full HP restore to single ally.", almanacQuip: "One sip removes all ailments and lingering regrets." },
{ id: "item_004", name: "Party Feast Basket", type: "Consumable", rarity: "Rare", effect: "Heals whole party for 40% Max HP.", almanacQuip: "Includes roast chicken, cheese, and zero spinach." },
{ id: "item_005", name: "Dragon Leaf Tea", type: "Consumable", rarity: "Uncommon", effect: "+20% Ultimate Gauge immediately.", almanacQuip: "Brewed directly over dragon breath." },
{ id: "item_006", name: "Antidote Flask", type: "Consumable", rarity: "Common", effect: "Cleanses Poison and Bleed status.", almanacQuip: "Tastes terrible, works instantly." },
{ id: "item_007", name: "Strength Tonic", type: "Consumable", rarity: "Common", effect: "+50% Attack power for 3 turns.", almanacQuip: "Basically liquid gym motivation." },
{ id: "item_008", name: "Ironhide Brew", type: "Consumable", rarity: "Common", effect: "+50% Defense mitigation for 3 turns.", almanacQuip: "Turns your skin into literal oak wood." },
{ id: "item_009", name: "Swiftfoot Elixir", type: "Consumable", rarity: "Common", effect: "+30% Dodge chance for 3 turns.", almanacQuip: "Makes your legs vibrate at high speeds." },
{ id: "item_010", name: "Vampiric Extract", type: "Consumable", rarity: "Rare", effect: "Gives ally 50% Lifesteal for 2 turns.", almanacQuip: "Count Dracula's personal smoothie." },
{ id: "item_011", name: "Smoke Bomb", type: "Consumable", rarity: "Common", effect: "Forces enemies to miss attacks for 1 turn.", almanacQuip: "Ninja-approved escape tool." },
{ id: "item_012", name: "Poison Flask", type: "Consumable", rarity: "Uncommon", effect: "Throws poison gas; inflicts 8 poison per turn to all enemies.", almanacQuip: "Handle with thick rubber gloves." },
{ id: "item_013", name: "Holy Water Flask", type: "Consumable", rarity: "Uncommon", effect: "Deals 100 Holy damage to Undead enemies.", almanacQuip: "Blessed by local bishops." },
{ id: "item_014", name: "Lightning in a Jar", type: "Consumable", rarity: "Uncommon", effect: "Deals 50 elemental shock damage to all enemies.", almanacQuip: "Don't open during a thunderstorm." },
{ id: "item_015", name: "Firebomb", type: "Consumable", rarity: "Common", effect: "Deals 40 explosive fire damage to target enemy.", almanacQuip: "Spicy in all the wrong ways." },
{ id: "item_016", name: "Freeze Capsule", type: "Consumable", rarity: "Uncommon", effect: "Stuns single enemy for 1 turn.", almanacQuip: "Instant cryogenic preservation." },
{ id: "item_017", name: "Lucky Clover Oil", type: "Consumable", rarity: "Common", effect: "+100% Critical Chance for 1 turn.", almanacQuip: "Extracted from five-leaf clovers." },
{ id: "item_018", name: "Revive Feather", type: "Consumable", rarity: "Epic", effect: "Revives fallen party member with 50% HP.", almanacQuip: "Plucked from a phoenix's tail." },
{ id: "item_019", name: "Rune of Power", type: "Consumable", rarity: "Rare", effect: "Fills Ultimate Gauge to 100% instantly.", almanacQuip: "Contains pure cosmic juice." },
{ id: "item_020", name: "Purification Salve", type: "Consumable", rarity: "Common", effect: "Removes all stat debuffs from ally.", almanacQuip: "Smells like eucalyptus and victory." },

// --- WEAPONS & EQUIPMENT (21-60) ---
{ id: "item_021", name: "Iron Shortsword", type: "Equipment", slot: "mainHand", rarity: "Common", effect: "+5 STR", almanacQuip: "Standard issue stabbing stick." },
{ id: "item_022", name: "Steel Broadsword", type: "Equipment", slot: "mainHand", rarity: "Uncommon", effect: "+12 STR", almanacQuip: "Heavy, sharp, and reliable." },
{ id: "item_023", name: "Mithril Claymore", type: "Equipment", slot: "mainHand", rarity: "Rare", effect: "+22 STR, +5% Crit", almanacQuip: "Light as a feather, cuts like a razor." },
{ id: "item_024", name: "Flamebringer Katana", type: "Equipment", slot: "mainHand", rarity: "Epic", effect: "+35 STR, applies Burn", almanacQuip: "Leaves scorch marks on everything." },
{ id: "item_025", name: "Novice Magic Staff", type: "Equipment", slot: "mainHand", rarity: "Common", effect: "+6 STR (Magic)", almanacQuip: "Basically a polished tree branch." },
{ id: "item_026", name: "Archmage Orb", type: "Equipment", slot: "mainHand", rarity: "Rare", effect: "+20 STR (Magic), +10% Ult Charge Rate", almanacQuip: "Swirling with miniature galaxies." },
{ id: "item_027", name: "Poisoned Stiletto", type: "Equipment", slot: "mainHand", rarity: "Uncommon", effect: "+10 STR, +10% Poison Chance", almanacQuip: "Coated in viper venom." },
{ id: "item_028", name: "Holy Scepter", type: "Equipment", slot: "mainHand", rarity: "Rare", effect: "+15 STR, +15% Healing Output", almanacQuip: "Glows with divine favor." },
{ id: "item_029", name: "Heavy Wooden Shield", type: "Equipment", slot: "offHand", rarity: "Common", effect: "+8 DEF", almanacQuip: "Guaranteed to stop splinters." },
{ id: "item_030", name: "Tower Shield of Aegis", type: "Equipment", slot: "offHand", rarity: "Epic", effect: "+25 DEF, +10% Block Chance", almanacQuip: "You can comfortably sleep behind this." },
{ id: "item_031", name: "Spiked Buckler", type: "Equipment", slot: "offHand", rarity: "Uncommon", effect: "+12 DEF, Reflects 10% Dmg", almanacQuip: "Offense meets defense." },
{ id: "item_032", name: "Leather Tunic", type: "Equipment", slot: "armor", rarity: "Common", effect: "+10 Max HP, +3 DEF", almanacQuip: "Smells like genuine cowhide." },
{ id: "item_033", name: "Chainmail Cuirass", type: "Equipment", slot: "armor", rarity: "Uncommon", effect: "+25 Max HP, +8 DEF", almanacQuip: "Clinks loudly when walking." },
{ id: "item_034", name: "Full Plate Armor", type: "Equipment", slot: "armor", rarity: "Rare", effect: "+50 Max HP, +18 DEF", almanacQuip: "Walking fortress dress code." },
{ id: "item_035", name: "Dragonscale Mail", type: "Equipment", slot: "armor", rarity: "Epic", effect: "+80 Max HP, +25 DEF, Fire Immune", almanacQuip: "Forged from adult red dragon scales." },
{ id: "item_036", name: "Iron Helmet", type: "Equipment", slot: "headwear", rarity: "Common", effect: "+5 DEF", almanacQuip: "Protects against rogue falling rocks." },
{ id: "item_037", name: "Wizard Pointy Hat", type: "Equipment", slot: "headwear", rarity: "Uncommon", effect: "+8 STR (Magic), +5 LCK", almanacQuip: "Mandatory dress code for spellcasters." },
{ id: "item_038", name: "Shadow Hood", type: "Equipment", slot: "headwear", rarity: "Rare", effect: "+10 DEX, +8% Dodge", almanacQuip: "Hides your face in pitch darkness." },
{ id: "item_039", name: "Crown of Kings", type: "Equipment", slot: "headwear", rarity: "Epic", effect: "+15 All Stats", almanacQuip: "Heavy is the head that wears it." },
{ id: "item_040", name: "Berserker Axe", type: "Equipment", slot: "mainHand", rarity: "Rare", effect: "+30 STR, -10 DEF", almanacQuip: "Who needs defense when enemies are dead?" },
{ id: "item_041", name: "Vampiric Scythe", type: "Equipment", slot: "mainHand", rarity: "Epic", effect: "+28 STR, 15% Lifesteal", almanacQuip: "Reaps souls and replenishes health." },
{ id: "item_042", name: "Chronomancer Hourglass Wand", type: "Equipment", slot: "mainHand", rarity: "Rare", effect: "+18 STR, +15 DEX", almanacQuip: "Manipulates local time flows." },
{ id: "item_043", name: "Engineer Wrench-Gun", type: "Equipment", slot: "mainHand", rarity: "Uncommon", effect: "+14 STR, +10% Crit", almanacQuip: "Fixes turrets and breaks skulls." },
{ id: "item_044", name: "Necromancer Bone Wand", type: "Equipment", slot: "mainHand", rarity: "Rare", effect: "+20 Magic STR", almanacQuip: "Carved from dragon femur." },
{ id: "item_045", name: "Golden Gauntlets", type: "Equipment", slot: "offHand", rarity: "Uncommon", effect: "+5 STR, +20% Gold Gains", almanacQuip: "Punch enemies into extra coins." },
{ id: "item_046", name: "Cloak of Displacement", type: "Equipment", slot: "armor", rarity: "Rare", effect: "+15% Dodge Rate", almanacQuip: "Makes you look like you're standing 2 feet away." },
{ id: "item_047", name: "Ninja Shuriken Pouch", type: "Equipment", slot: "offHand", rarity: "Uncommon", effect: "+12 DEX, +5% Crit", almanacQuip: "Infinite supply of throwing stars." },
{ id: "item_048", name: "Bard Lute of Charming", type: "Equipment", slot: "mainHand", rarity: "Rare", effect: "+12 STR, +20 LCK", almanacQuip: "Plays power chords automatically." },
{ id: "item_049", name: "Paladin Blessed Warhammer", type: "Equipment", slot: "mainHand", rarity: "Epic", effect: "+32 STR, +10 DEF", almanacQuip: "Crushes armor and purifies evil." },
{ id: "item_050", name: "Phoenix Feather Amulet", type: "Equipment", slot: "headwear", rarity: "Legendary", effect: "Auto-revives once per run", almanacQuip: "Glows with perpetual heat." },

// --- ARTIFACTS & RELICS (61-100+) ---
{ id: "item_060", name: "Friendly Mimic Pet", type: "Artifact", rarity: "Rare", effect: "Gives +10 Gold after every wave.", almanacQuip: "Bites enemies occasionally, loves head pats." },
{ id: "item_061", name: "Soul Ember Core", type: "Artifact", rarity: "Epic", effect: "Ultimate Gauge fills 25% faster.", almanacQuip: "Pulsates with pure Aether energy." },
{ id: "item_062", name: "Vampiric Ring", type: "Artifact", rarity: "Rare", effect: "Heals holder for 10% of physical damage dealt.", almanacQuip: "Faintly whispers for blood." },
{ id: "item_063", name: "Weighted Dice", type: "Artifact", rarity: "Uncommon", effect: "+15% Critical Hit Chance", almanacQuip: "Loaded with lead for optimal luck." },
{ id: "item_064", name: "Feather Charm", type: "Artifact", rarity: "Common", effect: "+10% Dodge Chance", almanacQuip: "Lightweight and aerodynamic." },
{ id: "item_065", name: "Golden Piggy Bank", type: "Artifact", rarity: "Uncommon", effect: "+30% Gold found during runs.", almanacQuip: "Oinks happily when fed coins." },
{ id: "item_066", name: "Cursed Skull", type: "Artifact", rarity: "Rare", effect: "+30 STR, -20 Max HP", almanacQuip: "High power at high cost." },
{ id: "item_067", name: "Aegis Pendant", type: "Artifact", rarity: "Rare", effect: "+15 DEF to whole party.", almanacQuip: "Emits a protective forcefield." },
{ id: "item_068", name: "Lucky Horseshoe", type: "Artifact", rarity: "Common", effect: "+15 LCK", almanacQuip: "Found outside a miniature tavern." },
{ id: "item_069", name: "Chrono Watch", type: "Artifact", rarity: "Epic", effect: "Party always attacks first in turn order.", almanacQuip: "Controls the flow of battle time." },
{ id: "item_070", name: "Demon Horn", type: "Artifact", rarity: "Rare", effect: "Attacks apply Burn for 3 turns.", almanacQuip: "Still warm from hellfire." },
{ id: "item_071", name: "Frost Gem", type: "Artifact", rarity: "Rare", effect: "Attacks have 15% chance to Freeze enemy.", almanacQuip: "Sub-zero elemental core." },
{ id: "item_072", name: "Tesla Coil Chip", type: "Artifact", rarity: "Rare", effect: "Attacks chain shock damage to adjacent enemies.", almanacQuip: "Sparking with high voltage." },
{ id: "item_073", name: "Hydra Tooth", type: "Artifact", rarity: "Uncommon", effect: "Attacks apply Poison stacks.", almanacQuip: "Cut one off, two grow back." },
{ id: "item_074", name: "Giant's Belt", type: "Artifact", rarity: "Rare", effect: "+50 Max HP", almanacQuip: "Size XXXL leather strap." },
{ id: "item_075", name: "Automaton Repair Drone", type: "Artifact", rarity: "Epic", effect: "Heals lowest HP ally 10 HP every turn.", almanacQuip: "Beep boop, health restored." },
{ id: "item_076", name: "Warrior's Emblem", type: "Artifact", rarity: "Uncommon", effect: "Warrior abilities deal +25% damage.", almanacQuip: "Engraved with crossed swords." },
{ id: "item_077", name: "Cleric's Rosary", type: "Artifact", rarity: "Uncommon", effect: "Cleric heals restore +25% HP.", almanacQuip: "Blessed by holy light." },
{ id: "item_078", name: "Mage's Monocle", type: "Artifact", rarity: "Uncommon", effect: "Mage spells ignore 20% Enemy DEF.", almanacQuip: "Magnifies mana threads." },
{ id: "item_079", name: "Rogue's Cloak", type: "Artifact", rarity: "Uncommon", effect: "Rogue attacks gain +20% Crit.", almanacQuip: "Blends seamlessly into shadows." },
{ id: "item_080", name: "Tank's Anvil", type: "Artifact", rarity: "Uncommon", effect: "Tank takes -15% damage from all sources.", almanacQuip: "Indestructible solid iron." },
{ id: "item_081", name: "Elixir Bandolier", type: "Artifact", rarity: "Rare", effect: "Start every battle with 1 free Potion.", almanacQuip: "Holds six flasks securely." },
{ id: "item_082", name: "Golden Touch Glove", type: "Artifact", rarity: "Epic", effect: "Enemies drop +50% Gold upon defeat.", almanacQuip: "Everything touched turns to gold." },
{ id: "item_083", name: "Phoenix Ash Vial", type: "Artifact", rarity: "Legendary", effect: "Prevents first party death once per run.", almanacQuip: "Glows warm in dark moments." },
{ id: "item_084", name: "Berserker Totem", type: "Artifact", rarity: "Rare", effect: "+2% STR for every 5% missing HP.", almanacQuip: "Rage fuels strength." },
{ id: "item_085", name: "Paladin Shield Pin", type: "Artifact", rarity: "Uncommon", effect: "+10 DEF when HP is full.", almanacQuip: "Symbol of unwavering honor." },
{ id: "item_086", name: "Necronomicon Page", type: "Artifact", rarity: "Rare", effect: "Defeated enemies explode dealing 20 damage.", almanacQuip: "Written in glowing eldritch ink." },
{ id: "item_087", name: "Werewolf Fang", type: "Artifact", rarity: "Rare", effect: "+20 STR during night waves (even waves).", almanacQuip: "Grows sharp under moonlight." },
{ id: "item_088", name: "Alchemist Alembic", type: "Artifact", rarity: "Uncommon", effect: "Potions used give +10 STR for 2 turns.", almanacQuip: "Distills pure potency." },
{ id: "item_089", name: "Ninja Smoke Ring", type: "Artifact", rarity: "Rare", effect: "15% chance to dodge any incoming strike.", almanacQuip: "Now you see me, now you don't." },
{ id: "item_090", name: "Astral Compass", type: "Artifact", rarity: "Legendary", effect: "Reveals map event choices in advance.", almanacQuip: "Points towards destiny and treasure." },
{ id: "item_091", name: "Ring of Resilience", type: "Artifact", rarity: "Uncommon", effect: "Immune to Poison and Bleed.", almanacQuip: "Protects blood purity." },
{ id: "item_092", name: "Spiked Collar", type: "Artifact", rarity: "Common", effect: "+5 STR, +5 DEF", almanacQuip: "Edgy fashion statement." },
{ id: "item_093", name: "Crown of Thorns", type: "Artifact", rarity: "Rare", effect: "Reflects 25% of all melee damage taken.", almanacQuip: "Hurts to wear, hurts to hit." },
{ id: "item_094", name: "Aether Prism", type: "Artifact", rarity: "Epic", effect: "Ultimate abilities deal +35% damage/healing.", almanacQuip: "Refracts pure energy." },
{ id: "item_095", name: "Goblin Coin Pouch", type: "Artifact", rarity: "Common", effect: "Start run with +50 Gold.", almanacQuip: "Jingles pleasantly." },
{ id: "item_096", name: "Gladiator Helmet", type: "Artifact", rarity: "Uncommon", effect: "+10 STR, +10 Max HP", almanacQuip: "Are you not entertained?!" },
{ id: "item_097", name: "Dragon Heart Scale", type: "Artifact", rarity: "Legendary", effect: "+100 Max HP, Fire Immunity", almanacQuip: "Beats with ancient power." },
{ id: "item_098", name: "Mirror of Duplication", type: "Artifact", rarity: "Epic", effect: "10% chance to cast ability twice.", almanacQuip: "Reflects double magic." },
{ id: "item_099", name: "Orb of Discord", type: "Artifact", rarity: "Rare", effect: "Enemies take +20% damage from all hits.", almanacQuip: "Spreads chaos in battle." },
{ id: "item_100", name: "Aether Gauntlet of Victory", type: "Artifact", rarity: "Legendary", effect: "+25 All Stats across whole party.", almanacQuip: "The pinnacle of artifact creation." }
];
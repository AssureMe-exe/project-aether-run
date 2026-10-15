/* ==========================================================================
Project Aether Run - Character Creator & Modular Sprite System
========================================================================== */

export class MiiAvatar {
constructor(config = {}) {
// Modular Body Customization
this.headShape = config.headShape || "round"; // round, oval, square, heart
this.hairStyle = config.hairStyle || "short"; // short, long, spiky, curly, bald
this.hairColor = config.hairColor || "#4a2e10";
this.eyeStyle = config.eyeStyle || "normal"; // normal, determined, cheerful, fierce
this.skinTone = config.skinTone || "#f5c6a5";
this.outfitColor = config.outfitColor || "#3a5a80";

// Equipment Anchor Points (x, y offsets relative to avatar node center)
this.anchors = {
head: { x: 0, y: -35 },
torso: { x: 0, y: 5 },
hand_L: { x: -28, y: 10 },
hand_R: { x: 28, y: 10 }
};

// Active Equipment Attachments (Visual Overlays)
this.equipmentVisuals = {
headwear: config.headwear || null,
armor: config.armor || null,
mainHand: config.mainHand || null,
offHand: config.offHand || null
};
}

// Equip visual gear item onto avatar anchor node
equipItem(slot, spriteId) {
if (this.equipmentVisuals.hasOwnProperty(slot)) {
this.equipmentVisuals[slot] = spriteId;
}
}

// Return layered array for canvas rendering pipeline
getRenderLayers() {
return [
{ type: "body", skinTone: this.skinTone, headShape: this.headShape },
{ type: "face", eyeStyle: this.eyeStyle },
{ type: "hair", style: this.hairStyle, color: this.hairColor },
{ type: "outfit", color: this.outfitColor, anchor: this.anchors.torso },
{ type: "armor", sprite: this.equipmentVisuals.armor, anchor: this.anchors.torso },
{ type: "headwear", sprite: this.equipmentVisuals.headwear, anchor: this.anchors.head },
{ type: "mainHand", sprite: this.equipmentVisuals.mainHand, anchor: this.anchors.hand_R },
{ type: "offHand", sprite: this.equipmentVisuals.offHand, anchor: this.anchors.hand_L }
];
}
}


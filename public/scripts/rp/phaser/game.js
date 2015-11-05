/*
  globals
    Phaser
    preload
    create
    update
 */

// Namespace
var rp = rp || {};
rp.phaser = rp.phaser || {};

// The game
rp.phaser.game = new Phaser.Game(1920, 1080, Phaser.AUTO, 'stage-viewport', {
  preload: preload
, create: create
, update: update
});

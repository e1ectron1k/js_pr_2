const Character = require('../src/js/Character');
const Bowerman = require('../src/js/Bowerman');
const Magician = require('../src/js/Magician');

describe('Character Methods', () => {
  describe('levelUp method', () => {
    test('should increase level and stats', () => {
      const character = new Bowerman('John');
      character.levelUp();

      expect(character.level).toBe(2);
      expect(character.attack).toBe(30);
      expect(character.defence).toBe(30);
      expect(character.health).toBe(100);
    });

    test('should throw error when leveling up dead character', () => {
      const character = new Bowerman('John');
      character.health = 0;

      expect(() => character.levelUp()).toThrow('Cannot level up a dead character');
    });

    test('should handle multiple level ups correctly', () => {
      const character = new Bowerman('John');
      character.levelUp();
      character.levelUp();

      expect(character.level).toBe(3);
      expect(character.attack).toBe(36);
      expect(character.defence).toBe(36);
    });

    test('should not level up when health is exactly 0', () => {
      const character = new Bowerman('John');
      character.health = 0;

      expect(() => character.levelUp()).toThrow('Cannot level up a dead character');
    });
  });

  describe('damage method', () => {
    test('should reduce health correctly with defence calculation', () => {
      const character = new Bowerman('John');
      character.damage(20);
      expect(character.health).toBe(85);
    });

    test('should not reduce health below 0', () => {
      const character = new Bowerman('John');
      character.damage(200);
      expect(character.health).toBe(0);
    });

    test('should not affect dead character', () => {
      const character = new Bowerman('John');
      character.health = 0;
      character.damage(20);
      expect(character.health).toBe(0);
    });

    test('should work with different defence values', () => {
      const magician = new Magician('Merlin');
      magician.damage(20);
      expect(magician.health).toBe(88);
    });

    test('should handle zero damage', () => {
      const character = new Bowerman('John');
      character.damage(0);
      expect(character.health).toBe(100);
    });

    test('should handle very small damage', () => {
      const character = new Bowerman('John');
      character.damage(1);
      expect(character.health).toBeCloseTo(99.25);
    });
  });

  describe('constructor validation', () => {
    test('should throw error for empty name', () => {
      expect(() => new Character('', 'Bowman')).toThrow('Name must be a string with length between 2 and 10 characters');
    });

    test('should throw error for null type', () => {
      expect(() => new Character('John', null)).toThrow('Invalid type. Must be one of: Bowman, Swordsman, Magician, Daemon, Undead, Zombie');
    });
  });
});
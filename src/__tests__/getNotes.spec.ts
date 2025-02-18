import { describe, expect, it } from 'vitest';
import {
  getToneCountFromTonic,
  getNextNote,
  // getNotes,
  getNotesWithOctave,
  getMinMaxTonesCountFromTonics,
} from '../getNotes';

describe('getNotesWithOctave', () => {
  it('returns the list of notes from start to end with octave', () => {
    expect(getNotesWithOctave(['1A', '2C'])).toEqual([
      '1A',
      '1B',
      '1C',
      '1D',
      '1E',
      '1F',
      '1G',
      '2A',
      '2B',
      '2C',
    ]);
    expect(getNotesWithOctave(['1E', '2G'])).toEqual([
      '1E',
      '1F',
      '1G',
      '2A',
      '2B',
      '2C',
      '2D',
      '2E',
      '2F',
      '2G',
    ]);
    expect(getNotesWithOctave(['1B', '2D'])).toEqual([
      '1B',
      '1C',
      '1D',
      '1E',
      '1F',
      '1G',
      '2A',
      '2B',
      '2C',
      '2D',
    ]);
    expect(getNotesWithOctave(['1F', '2A'])).toEqual(['1F', '1G', '2A']);
  });
});

describe('getNextNote', () => {
  it('returns the next note', () => {
    expect(getNextNote('0A')).toEqual('0B');
    expect(getNextNote('0B')).toEqual('0C');
    expect(getNextNote('0C')).toEqual('0D');
    expect(getNextNote('0D')).toEqual('0E');
    expect(getNextNote('0F')).toEqual('0G');
    expect(getNextNote('0G')).toEqual('1A');
  });
});

describe('getSemitoneCountFromTonic', () => {
  it('returns the count of semi-tones from given note and previous', () => {
    expect(getToneCountFromTonic('0G', '1A')).toEqual(1);
    expect(getToneCountFromTonic('0G', '1B')).toEqual(2);
    expect(getToneCountFromTonic('0G', '1C')).toEqual(2.5);
    expect(getToneCountFromTonic('0G', '1D')).toEqual(3.5);
    expect(getToneCountFromTonic('0G', '1E')).toEqual(4.5);
    expect(getToneCountFromTonic('0G', '1F')).toEqual(5);
    expect(getToneCountFromTonic('1G', '2G')).toEqual(6);
    expect(getToneCountFromTonic('0G', '2A')).toEqual(7);
  });
});

describe('getMinMaxSemitonesCountFromTonic', () => {
  it('returns min max semitones', () => {
    expect(
      getMinMaxTonesCountFromTonics({
        '0G': ['1A', '1B', '1C', '1D'],
        '1D': ['1E', '1F', '1G', '2A'],
        '2A': ['2B', '2C', '2D', '2E'],
        '2E': ['2F', '2G', '3A', '3B'],
      })
    ).toEqual([0.5, 3.5]);

    expect(
      getMinMaxTonesCountFromTonics({
        '0G': ['1B', '1C', '1D', '1E'],
        '1D': ['1F', '1G', '2A', '2B'],
        '2A': ['2C', '2D', '2E', '2F'],
        '2E': ['2G', '3A', '3B', '3C'],
      })
    ).toEqual([1.5, 4.5]);

    expect(
      getMinMaxTonesCountFromTonics({
        '0G': ['1C', '1D', '1E', '1F'],
        '1D': ['1G', '2A', '2B', '2C'],
        '2A': ['2D', '2E', '2F', '2G'],
        '2E': ['3A', '3B', '3C', '3D'],
      })
    ).toEqual([2.5, 5]);

    expect(
      getMinMaxTonesCountFromTonics({
        '0G': ['1D', '1E', '1F', '1G'],
        '1D': ['2A', '2B', '2C', '2D'],
        '2A': ['2E', '2F', '2G', '3A'],
        '2E': ['3B', '3C', '3D', '3E'],
      })
    ).toEqual([3.5, 6]);

    expect(
      getMinMaxTonesCountFromTonics({
        '0G': ['1E', '1F', '1G', '2A'],
        '1D': ['2B', '2C', '2D', '2E'],
        '2A': ['2F', '2G', '3A', '3B'],
        '2E': ['3C', '3D', '3E', '3F'],
      })
    ).toEqual([4, 7]);

    expect(
      getMinMaxTonesCountFromTonics({
        '0G': ['1F', '1G', '2A', '2B'],
        '1D': ['2C', '2D', '2E', '2F'],
        '2A': ['2G', '3A', '3B', '3C'],
        '2E': ['3D', '3E', '3F', '3G'],
      })
    ).toEqual([5, 8]);

    expect(
      getMinMaxTonesCountFromTonics({
        '0G': ['1G', '2A', '2B', '2C'],
        '1D': ['2D', '2E', '2F', '2G'],
        '2A': ['3A', '3B', '3C', '3D'],
        '2E': ['3E', '3F', '3G', '4A'],
      })
    ).toEqual([6, 8.5]);
  });
});

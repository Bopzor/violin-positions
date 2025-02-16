import { describe, expect, it } from 'vitest';
import {
  getToneCountFromTonic,
  getNextNote,
  getNotes,
  getNotesWithOctave,
  getMinMaxTonesCountFromTonics,
} from '../getNotes';

describe('getNotes', () => {
  it('returns the list of notes from start to end', () => {
    expect(getNotes(['A', 'A'])).toEqual(['A']);
    expect(getNotes(['A', 'B'])).toEqual(['A', 'B']);
    expect(getNotes(['A', 'G'])).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G']);
  });

  it('returns the list of notes from start to end with octave', () => {
    expect(getNotes(['A', '2C'])).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'A', 'B', 'C']);
    expect(getNotes(['E', '2G'])).toEqual(['E', 'F', 'G', 'A', 'B', 'C', 'D', 'E', 'F', 'G']);
    expect(getNotes(['B', '2D'])).toEqual(['B', 'C', 'D', 'E', 'F', 'G', 'A', 'B', 'C', 'D']);
    expect(getNotes(['F', '2A'])).toEqual(['F', 'G', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'A']);
  });
});

describe('getNotesWithOctave', () => {
  it('returns the list of notes from start to end with octave', () => {
    expect(getNotesWithOctave(['A', '2C'])).toEqual([
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      '2A',
      '2B',
      '2C',
    ]);
    expect(getNotesWithOctave(['E', '2G'])).toEqual([
      'E',
      'F',
      'G',
      'A',
      'B',
      'C',
      'D',
      '2E',
      '2F',
      '2G',
    ]);
    expect(getNotesWithOctave(['B', '2D'])).toEqual([
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'A',
      '2B',
      '2C',
      '2D',
    ]);
    expect(getNotesWithOctave(['F', '2A'])).toEqual([
      'F',
      'G',
      'A',
      'B',
      'C',
      'D',
      'E',
      '2F',
      '2G',
      '2A',
    ]);
  });
});

describe('getNextNote', () => {
  it('returns the next note', () => {
    expect(getNextNote('A')).toEqual('B');
    expect(getNextNote('B')).toEqual('C');
    expect(getNextNote('C')).toEqual('D');
    expect(getNextNote('D')).toEqual('E');
    expect(getNextNote('F')).toEqual('G');
    expect(getNextNote('G')).toEqual('A');
  });
});

describe('getSemitoneCountFromTonic', () => {
  it('returns the count of semi-tones from given note and previous', () => {
    expect(getToneCountFromTonic('G', 'A')).toEqual(1);
    expect(getToneCountFromTonic('G', 'B')).toEqual(2);
    expect(getToneCountFromTonic('G', 'C')).toEqual(2.5);
    expect(getToneCountFromTonic('G', 'D')).toEqual(3.5);
    expect(getToneCountFromTonic('G', 'E')).toEqual(4.5);
    expect(getToneCountFromTonic('G', 'F')).toEqual(5);
    expect(getToneCountFromTonic('G', '2G')).toEqual(6);
    expect(getToneCountFromTonic('G', '2A')).toEqual(7);
  });
});

describe('getMinMaxSemitonesCountFromTonic', () => {
  it('returns min max semitones', () => {
    expect(
      getMinMaxTonesCountFromTonics({
        G: ['A', 'B', 'C', 'D'],
        D: ['E', 'F', 'G', 'A'],
        A: ['B', 'C', 'D', 'E'],
        E: ['F', 'G', 'A', 'B'],
      })
    ).toEqual([0.5, 3.5]);

    expect(
      getMinMaxTonesCountFromTonics({
        G: ['B', 'C', 'D', 'E'],
        D: ['F', 'G', 'A', 'B'],
        A: ['C', 'D', 'E', 'F'],
        E: ['G', 'A', 'B', 'C'],
      })
    ).toEqual([1.5, 4.5]);

    expect(
      getMinMaxTonesCountFromTonics({
        G: ['C', 'D', 'E', 'F'],
        D: ['G', 'A', 'B', 'C'],
        A: ['D', 'E', 'F', 'G'],
        E: ['A', 'B', 'C', 'D'],
      })
    ).toEqual([2.5, 5]);

    expect(
      getMinMaxTonesCountFromTonics({
        G: ['D', 'E', 'F', '2G'],
        D: ['A', 'B', 'C', '2D'],
        A: ['E', 'F', 'G', '2A'],
        E: ['B', 'C', 'D', '2E'],
      })
    ).toEqual([3.5, 6]);

    expect(
      getMinMaxTonesCountFromTonics({
        G: ['E', 'F', '2G', '2A'],
        D: ['B', 'C', '2D', '2E'],
        A: ['F', 'G', '2A', '2B'],
        E: ['C', 'D', '2E', '2F'],
      })
    ).toEqual([4, 7]);

    expect(
      getMinMaxTonesCountFromTonics({
        G: ['F', '2G', '2A', '2B'],
        D: ['C', '2D', '2E', '2F'],
        A: ['G', '2A', '2B', '2C'],
        E: ['D', '2E', '2F', '2G'],
      })
    ).toEqual([5, 8]);

    expect(
      getMinMaxTonesCountFromTonics({
        G: ['2G', '2A', '2B', '2C'],
        D: ['2D', '2E', '2F', '2G'],
        A: ['2A', '2B', '2C', '2D'],
        E: ['2E', '2F', '2G', '2A'],
      })
    ).toEqual([6, 8.5]);
  });
});

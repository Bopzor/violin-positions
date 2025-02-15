import { describe, expect, it } from 'vitest';
import { getSemitoneCountFromTonic, getNextNote, getNotes, getNotesWithOctave } from '../getNotes';

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
  it('returns the list of notes from start to end', () => {
    expect(getNotesWithOctave(['A', 'A'])).toEqual(['A']);
    expect(getNotesWithOctave(['A', 'B'])).toEqual(['A', 'B']);
    expect(getNotesWithOctave(['A', 'G'])).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G']);
  });

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
    expect(getSemitoneCountFromTonic('G', 'A')).toEqual(2);
    expect(getSemitoneCountFromTonic('G', 'B')).toEqual(4);
    expect(getSemitoneCountFromTonic('G', 'C')).toEqual(5);
    expect(getSemitoneCountFromTonic('G', 'D')).toEqual(7);
    expect(getSemitoneCountFromTonic('G', 'E')).toEqual(9);
    expect(getSemitoneCountFromTonic('G', 'F')).toEqual(10);
    expect(getSemitoneCountFromTonic('G', '2G')).toEqual(12);
    expect(getSemitoneCountFromTonic('G', '2A')).toEqual(14);
  });
});

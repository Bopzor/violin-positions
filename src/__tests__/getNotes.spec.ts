import { describe, expect, it } from 'vitest';
import { getNextNote, getNotes } from '../getNotes';

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

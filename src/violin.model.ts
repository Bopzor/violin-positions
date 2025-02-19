import { Note, OctaveNote } from './getNotes';

export const VIOLON_STRINGS = new Set<[Note, OctaveNote]>([
  ['G', '2C'],
  ['D', '2G'],
  ['A', '2D'],
  ['E', '2A'],
]);

export const POSITIONS: {
  number: number;
  color: string;
  strings: { [tonic in Note]?: (Note | OctaveNote)[] };
}[] = [
  {
    number: 1,
    color: '#f94144',
    strings: {
      G: ['A', 'B', 'C', 'D'],
      D: ['E', 'F', 'G', 'A'],
      A: ['B', 'C', 'D', 'E'],
      E: ['F', 'G', 'A', 'B'],
    },
  },
  {
    number: 2,
    color: '#f3722c',
    strings: {
      G: ['B', 'C', 'D', 'E'],
      D: ['F', 'G', 'A', 'B'],
      A: ['C', 'D', 'E', 'F'],
      E: ['G', 'A', 'B', 'C'],
    },
  },
  {
    number: 3,
    color: '#f8961e',
    strings: {
      G: ['C', 'D', 'E', 'F'],
      D: ['G', 'A', 'B', 'C'],
      A: ['D', 'E', 'F', 'G'],
      E: ['A', 'B', 'C', 'D'],
    },
  },
  {
    number: 4,
    color: '#f9c74f',
    strings: {
      G: ['D', 'E', 'F', '2G'],
      D: ['A', 'B', 'C', '2D'],
      A: ['E', 'F', 'G', '2A'],
      E: ['B', 'C', 'D', '2E'],
    },
  },
  {
    number: 5,
    color: '#90be6d',
    strings: {
      G: ['E', 'F', '2G', '2A'],
      D: ['B', 'C', '2D', '2E'],
      A: ['F', 'G', '2A', '2B'],
      E: ['C', 'D', '2E', '2F'],
    },
  },
  {
    number: 6,
    color: '#43aa8b',
    strings: {
      G: ['F', '2G', '2A', '2B'],
      D: ['C', '2D', '2E', '2F'],
      A: ['G', '2A', '2B', '2C'],
      E: ['D', '2E', '2F', '2G'],
    },
  },
  {
    number: 7,
    color: '#577590',
    strings: {
      G: ['2G', '2A', '2B', '2C'],
      D: ['2D', '2E', '2F', '2G'],
      A: ['2A', '2B', '2C', '2D'],
      E: ['2E', '2F', '2G', '2A'],
    },
  },
];

export type Position = (typeof POSITIONS)[number];

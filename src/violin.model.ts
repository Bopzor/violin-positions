import { OctaveNote } from './getNotes';

export const VIOLON_STRINGS = new Set<[OctaveNote, OctaveNote]>([
  ['0G', '2C'],
  ['1D', '3G'],
  ['2A', '3D'],
  ['2E', '4A'],
]);

export const POSITIONS: {
  number: number;
  color: string;
  strings: { [tonic in OctaveNote]?: OctaveNote[] };
}[] = [
  {
    number: 1,
    color: '#f94144',
    strings: {
      '0G': ['1A', '1B', '1C', '1D'],
      '1D': ['1E', '1F', '1G', '2A'],
      '2A': ['2B', '2C', '2D', '2E'],
      '2E': ['2F', '2G', '3A', '3B'],
    },
  },
  {
    number: 2,
    color: '#f3722c',
    strings: {
      '0G': ['1B', '1C', '1D', '1E'],
      '1D': ['1F', '1G', '2A', '2B'],
      '2A': ['2C', '2D', '2E', '2F'],
      '2E': ['2G', '3A', '3B', '3C'],
    },
  },
  {
    number: 3,
    color: '#f8961e',
    strings: {
      '0G': ['1C', '1D', '1E', '1F'],
      '1D': ['1G', '2A', '2B', '2C'],
      '2A': ['2D', '2E', '2F', '2G'],
      '2E': ['3A', '3B', '3C', '3D'],
    },
  },
  {
    number: 4,
    color: '#f9c74f',
    strings: {
      '0G': ['1D', '1E', '1F', '1G'],
      '1D': ['2A', '2B', '2C', '2D'],
      '2A': ['2E', '2F', '2G', '3A'],
      '2E': ['3B', '3C', '3D', '3E'],
    },
  },
  {
    number: 5,
    color: '#90be6d',
    strings: {
      '0G': ['1E', '1F', '1G', '2A'],
      '1D': ['2B', '2C', '2D', '2E'],
      '2A': ['2F', '2G', '3A', '3B'],
      '2E': ['3C', '3D', '3E', '3F'],
    },
  },
  {
    number: 6,
    color: '#43aa8b',
    strings: {
      '0G': ['1F', '1G', '2A', '2B'],
      '1D': ['2C', '2D', '2E', '2F'],
      '2A': ['2G', '3A', '3B', '3C'],
      '2E': ['3D', '3E', '3F', '3G'],
    },
  },
  {
    number: 7,
    color: '#577590',
    strings: {
      '0G': ['1G', '2A', '2B', '2C'],
      '1D': ['2D', '2E', '2F', '2G'],
      '2A': ['3A', '3B', '3C', '3D'],
      '2E': ['3E', '3F', '3G', '4A'],
    },
  },
];

export type Position = (typeof POSITIONS)[number];

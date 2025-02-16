import React, { useState } from 'react';
import {
  type Note,
  OctaveNote,
  getMinMaxTonesCountFromTonics,
  getNotesWithOctave,
  getToneCountFromTonic,
  isNote,
  noteToFrench,
  tonesFromSemitones,
} from './getNotes';

const VIOLON_STRINGS = new Set<[Note, OctaveNote]>([
  ['G', '2C'],
  ['D', '2G'],
  ['A', '2D'],
  ['E', '2A'],
]);

const POSITIONS: {
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

function App() {
  const stringSpacing = 50;
  const noteSpacing = 80;
  const noteRadius = 20;
  const firstNoteOffset = noteRadius * 3;
  const startStringOffset = 125;

  const [selectedPositions, setSelectedPosition] = useState<(typeof POSITIONS)[number][]>([]);
  const [toFrench, setToFrench] = useState(false);

  const togglePosition = (position: number) => {
    if (selectedPositions.find((selectedPosition) => selectedPosition.number === position)) {
      setSelectedPosition(
        selectedPositions.filter((selectedPosition) => selectedPosition.number !== position)
      );
      return;
    }

    const positionToAdd = POSITIONS.find(
      (selectedPosition) => selectedPosition.number === position
    );

    if (positionToAdd !== undefined) {
      setSelectedPosition([...selectedPositions, positionToAdd]);
    }
  };

  const onCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToFrench(event.target.checked);
  };

  return (
    <div className="p-4 flex flex-col gap-4 h-screen w-screen">
      <div className="flex gap-2 flex-wrap justify-center">
        {POSITIONS.map(({ number, color }) => (
          <div
            onClick={() => togglePosition(number)}
            role="button"
            key={`position-chip-${number}`}
            style={{ color }}
            className={`rounded px-2 md:py-2 sm:py-1 py-1 border ${
              selectedPositions.find((position) => position?.number === number) !== undefined
                ? 'border-blue-500'
                : ''
            } `}
          >
            <span className="sm:hidden md:inline hidden">Position</span> {number}
          </div>
        ))}
      </div>

      <div>
        <label className="inline-flex items-center cursor-pointer">
          <span className="me-3 text-sm font-medium text-gray-900 ">Anglaise</span>
          <input
            type="checkbox"
            value={String(toFrench)}
            checked={toFrench}
            onChange={onCheck}
            className="sr-only peer"
          />
          <div className="relative md:w-11 w-8 sm:w-8 h-4 md:h-6 sm:h-4 bg-gray-200 peer-focus:outline-none md:peer-focus:ring-4 sm:peer-focus:ring-1 peer-focus:ring-1 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full md:after:h-5 sm:after:h-3 after:h-3 after:w-3 md:after:w-5 sm:after:w-3 after:transition-all peer-checked:bg-blue-600"></div>
          <span className="ms-3 text-sm font-medium text-gray-900 ">Française</span>
        </label>
      </div>

      <svg version="1.1" viewBox="0 0 500 800" xmlns="http://www.w3.org/2000/svg">
        {POSITIONS.map(({ number, color, strings }, positionIndex) => {
          if (!selectedPositions.find((position) => number === position.number)) {
            return null;
          }

          const [minSemitonesFromTonic, maxSemitonesFromTonic] =
            getMinMaxTonesCountFromTonics(strings);

          const baseKeyString =
            positionIndex % 2 === 0
              ? (Object.keys(strings)[0] as Note)
              : (Object.keys(strings)[Object.keys(strings).length - 1] as Note);
          const baseStringNotes = strings[baseKeyString] as (Note | OctaveNote)[];

          return (
            <React.Fragment key={`position-${number}`}>
              <rect
                x={
                  positionIndex % 2 === 0
                    ? startStringOffset - POSITIONS.length * 15 + 15 * positionIndex
                    : stringSpacing + startStringOffset
                }
                y={minSemitonesFromTonic * noteSpacing + (firstNoteOffset - noteRadius)}
                width={stringSpacing * 4 + (POSITIONS.length * 15 - 15 * positionIndex)}
                height={
                  (maxSemitonesFromTonic - minSemitonesFromTonic) * noteSpacing +
                  (firstNoteOffset - noteRadius)
                }
                stroke={color}
                strokeWidth="1"
                fill={color}
                fillOpacity="0.1"
              />
              {baseStringNotes.map((note, index) => {
                const finger = index + 1;
                const tonesFromTonic = getToneCountFromTonic(baseKeyString, note);

                return (
                  <React.Fragment key={`finger-${finger}`}>
                    <circle
                      cx={
                        positionIndex % 2 === 0
                          ? 15 +
                            startStringOffset -
                            POSITIONS.length * 15 +
                            15 * positionIndex
                          : stringSpacing * 4 +
                            noteRadius * 2 -
                            5 +
                            startStringOffset +
                            POSITIONS.length * 15 -
                            15 * positionIndex
                      }
                      cy={tonesFromTonic * noteSpacing + firstNoteOffset}
                      r="10"
                      fill={color}
                      stroke={color}
                      strokeWidth="1"
                    />
                    <text
                      x={
                        positionIndex % 2 === 0
                          ? 15 +
                            startStringOffset -
                            POSITIONS.length * 15 +
                            15 * positionIndex
                          : stringSpacing * 4 +
                            noteRadius * 2 -
                            5 +
                            startStringOffset +
                            POSITIONS.length * 15 -
                            15 * positionIndex
                      }
                      y={tonesFromTonic * noteSpacing + firstNoteOffset + 5}
                      fontSize="14"
                      textAnchor="middle"
                      fill="white"
                    >
                      {finger}
                    </text>
                  </React.Fragment>
                );
              })}
            </React.Fragment>
          );
        })}

        {[...VIOLON_STRINGS.values()].map((notes, tonicIndex) => {
          const [tonic, ...notesWithOctave] = getNotesWithOctave(notes);

          if (!isNote(tonic)) {
            throw new Error(`the tonic ${tonic} contains an octave`);
          }

          return (
            <React.Fragment key={tonic}>
              <circle
                cx={(tonicIndex + 1) * stringSpacing + startStringOffset}
                cy={stringSpacing}
                r="20"
                fill="transparent"
                stroke="blue"
                strokeWidth="1"
              />
              <text
                x={(tonicIndex + 1) * stringSpacing + startStringOffset}
                y="58"
                fontSize="22"
                textAnchor="middle"
                fill="black"
              >
                {toFrench ? noteToFrench[tonic] : tonic}
              </text>

              <line
                x1={(tonicIndex + 1) * stringSpacing + startStringOffset}
                y1="80"
                x2={(tonicIndex + 1) * stringSpacing + startStringOffset}
                y2="800"
                stroke="black"
                strokeWidth="2"
              />

              {notesWithOctave.map((note, noteIndex) => {
                const noteWithoutOctave: Note = isNote(note) ? note : (note[1] as Note);
                const tonesFromTonic = getToneCountFromTonic(tonic, note);

                return (
                  <React.Fragment key={`${tonic}-${noteIndex}`}>
                    <circle
                      cx={(tonicIndex + 1) * stringSpacing + startStringOffset}
                      cy={tonesFromTonic * noteSpacing + firstNoteOffset}
                      r="20"
                      fill="white"
                      stroke="blue"
                      strokeWidth="1"
                    />

                    <text
                      x={(tonicIndex + 1) * stringSpacing + startStringOffset}
                      y={tonesFromTonic * noteSpacing + firstNoteOffset + 8}
                      fontSize="22"
                      textAnchor="middle"
                      fill="black"
                    >
                      {toFrench ? noteToFrench[noteWithoutOctave] : noteWithoutOctave}
                    </text>
                  </React.Fragment>
                );
              })}
            </React.Fragment>
          );
        })}
      </svg>
    </div>
  );
}

export default App;

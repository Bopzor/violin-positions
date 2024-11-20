import React, { useState } from 'react';
import { type Note, OctaveNote, getNotes, noteToFrench } from './getNotes';

const VIOLON_STRINGS = new Map<Note, [Note, OctaveNote]>([
  ['G', ['A', '2C']],
  ['D', ['E', '2G']],
  ['A', ['B', '2D']],
  ['E', ['F', '2A']],
]);

const POSITIONS = [
  { number: 1, color: '#f94144' },
  { number: 2, color: '#f3722c' },
  { number: 3, color: '#f8961e' },
  { number: 4, color: '#f9c74f' },
  { number: 5, color: '#90be6d' },
  { number: 6, color: '#43aa8b' },
  { number: 7, color: '#577590' },
];

function App() {
  const stringSpacing = 50;
  const noteSpacing = 60;
  const noteRadius = 20;
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

      <svg version="1.1" viewBox="0 0 500 700" xmlns="http://www.w3.org/2000/svg">
        {selectedPositions.map(({ number, color }, positionIndex) => (
          <React.Fragment key={`position-${number}`}>
            <rect
              x={
                positionIndex % 2 === 0
                  ? startStringOffset - selectedPositions.length * 15 + 15 * positionIndex
                  : stringSpacing + startStringOffset
              }
              y={number * noteSpacing + noteSpacing / 2}
              width={stringSpacing * 4 + (selectedPositions.length * 15 - 15 * positionIndex)}
              height={60 * 4}
              stroke={color}
              strokeWidth="1"
              fill={color}
              fillOpacity="0.1"
            />
            {[1, 2, 3, 4].map((finger, index) => (
              <React.Fragment key={`finger-${finger}`}>
                <circle
                  cx={
                    positionIndex % 2 === 0
                      ? 15 + startStringOffset - selectedPositions.length * 15 + 15 * positionIndex
                      : stringSpacing * 4 +
                        noteRadius * 2 -
                        5 +
                        startStringOffset +
                        selectedPositions.length * 15 -
                        15 * positionIndex
                  }
                  cy={(index + 2) * noteSpacing + noteSpacing * (number - 1)}
                  r="10"
                  fill={color}
                  stroke={color}
                  strokeWidth="1"
                />
                <text
                  x={
                    positionIndex % 2 === 0
                      ? 15 + startStringOffset - selectedPositions.length * 15 + 15 * positionIndex
                      : stringSpacing * 4 +
                        noteRadius * 2 -
                        5 +
                        startStringOffset +
                        selectedPositions.length * 15 -
                        15 * positionIndex
                  }
                  y={(index + 2) * noteSpacing + 5 + noteSpacing * (number - 1)}
                  fontSize="14"
                  textAnchor="middle"
                  fill="white"
                >
                  {finger}
                </text>
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}

        {[...VIOLON_STRINGS.entries()].map(([tonic, notes], tonicIndex) => (
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

            {getNotes(notes).map((note, noteIndex) => (
              <React.Fragment key={`${tonic}-${noteIndex}`}>
                <circle
                  cx={(tonicIndex + 1) * stringSpacing + startStringOffset}
                  cy={(noteIndex + 2) * noteSpacing}
                  r="20"
                  fill="white"
                  stroke="blue"
                  strokeWidth="1"
                />

                <text
                  x={(tonicIndex + 1) * stringSpacing + startStringOffset}
                  y={(noteIndex + 2) * noteSpacing + 8}
                  fontSize="22"
                  textAnchor="middle"
                  fill="black"
                >
                  {toFrench ? noteToFrench[note] : note}
                </text>
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </svg>
    </div>
  );
}

export default App;

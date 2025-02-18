import {
  FIRST_NOTE_OFFSET,
  NOTE_RADIUS,
  NOTE_SPACING,
  START_STRING_OFFSET,
  STRING_SPACING,
} from './drawing.const';
import { getMinMaxTonesCountFromTonics, getToneCountFromTonic, OctaveNote } from './getNotes';
import { POSITIONS } from './violin.model';

type PositionsProps = {
  positions: (typeof POSITIONS)[number][];
  selectedPositions: (typeof POSITIONS)[number][];
  selectedString?: OctaveNote;
};

export function Positions({ positions, selectedPositions, selectedString }: PositionsProps) {
  return (
    <>
      {positions.map(({ number, color, strings }, positionIndex) => {
        if (!selectedPositions.find((position) => number === position.number)) {
          return null;
        }

        const [minSemitonesFromTonic, maxSemitonesFromTonic] =
          getMinMaxTonesCountFromTonics(strings);

        const baseKeyString = selectedString
          ? selectedString
          : positionIndex % 2 === 0
          ? (Object.keys(strings)[0] as OctaveNote)
          : (Object.keys(strings)[Object.keys(strings).length - 1] as OctaveNote);
        const baseStringNotes = strings[baseKeyString] as OctaveNote[];

        return (
          <g id={`position-${number}`} key={`position-${number}`}>
            <rect
              x={
                positionIndex % 2 === 0
                  ? START_STRING_OFFSET - positions.length * 15 + 15 * (positions.length - number)
                  : STRING_SPACING + START_STRING_OFFSET
              }
              y={minSemitonesFromTonic * NOTE_SPACING + (FIRST_NOTE_OFFSET - NOTE_RADIUS)}
              width={
                STRING_SPACING * 4 + (positions.length * 15 - 15 * (positions.length - number))
              }
              height={
                (maxSemitonesFromTonic - minSemitonesFromTonic) * NOTE_SPACING +
                (FIRST_NOTE_OFFSET - NOTE_RADIUS)
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
                <g id={`${finger}-finger-position-${number}`} key={`finger-${finger}`}>
                  <circle
                    cx={
                      positionIndex % 2 === 0
                        ? 15 +
                          START_STRING_OFFSET -
                          positions.length * 15 +
                          15 * (positions.length - number)
                        : STRING_SPACING * 4 +
                          NOTE_RADIUS * 2 -
                          5 +
                          START_STRING_OFFSET +
                          positions.length * 15 -
                          15 * (positions.length - number)
                    }
                    cy={tonesFromTonic * NOTE_SPACING + FIRST_NOTE_OFFSET}
                    r="10"
                    fill={color}
                    stroke={color}
                    strokeWidth="1"
                  />
                  <text
                    x={
                      positionIndex % 2 === 0
                        ? 15 +
                          START_STRING_OFFSET -
                          positions.length * 15 +
                          15 * (positions.length - number)
                        : STRING_SPACING * 4 +
                          NOTE_RADIUS * 2 -
                          5 +
                          START_STRING_OFFSET +
                          positions.length * 15 -
                          15 * (positions.length - number)
                    }
                    y={tonesFromTonic * NOTE_SPACING + FIRST_NOTE_OFFSET + 5}
                    fontSize="14"
                    textAnchor="middle"
                    fill="white"
                  >
                    {finger}
                  </text>
                </g>
              );
            })}
          </g>
        );
      })}
    </>
  );
}

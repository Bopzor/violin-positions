import {
  FIRST_NOTE_OFFSET,
  NOTE_RADIUS,
  NOTE_SPACING,
  START_STRING_OFFSET,
  STRING_SPACING,
} from '../drawing.const';
import { getMinMaxTonesCountFromTonics, Note, OctaveNote } from '../getNotes';
import { type Position } from '../violin.model';
import { Fingers } from './Fingers';
import { getOddXPosition, getPositionWidth } from './positions.helpers';

type PositionsProps = {
  positions: Position[];
  selectedPositions: Position[];
  selectedString?: Note;
};

export function Positions({ positions, selectedPositions, selectedString }: PositionsProps) {
  return (
    <>
      {positions.map((position, positionIndex) => {
        const { number, color, strings } = position;

        if (!selectedPositions.find((position) => number === position.number)) {
          return null;
        }

        const [minSemitonesFromTonic, maxSemitonesFromTonic] =
          getMinMaxTonesCountFromTonics(strings);

        const baseKeyString = selectedString
          ? selectedString
          : positionIndex % 2 === 0
          ? (Object.keys(strings)[0] as Note)
          : (Object.keys(strings)[Object.keys(strings).length - 1] as Note);
        const baseStringNotes = strings[baseKeyString] as (Note | OctaveNote)[];

        return (
          <g id={`position-${number}`} key={`position-${number}`}>
            <rect
              x={
                positionIndex % 2 === 0
                  ? getOddXPosition({ position, selectedPositions })
                  : STRING_SPACING + START_STRING_OFFSET
              }
              y={minSemitonesFromTonic * NOTE_SPACING + (FIRST_NOTE_OFFSET - NOTE_RADIUS)}
              width={getPositionWidth({
                position,
                selectedPositions,
              })}
              height={
                (maxSemitonesFromTonic - minSemitonesFromTonic) * NOTE_SPACING +
                (FIRST_NOTE_OFFSET - NOTE_RADIUS)
              }
              stroke={color}
              strokeWidth="1"
              fill={color}
              fillOpacity="0.1"
            />
            <Fingers
              tonic={baseKeyString}
              notes={baseStringNotes}
              selectedPositions={selectedPositions}
              position={position}
            />
          </g>
        );
      })}
    </>
  );
}

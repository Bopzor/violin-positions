import { FIRST_NOTE_OFFSET, NOTE_SPACING } from '../drawing.const';
import { getToneCountFromTonic, Note, OctaveNote } from '../getNotes';
import { type Position } from '../violin.model';
import { getFingerXPosition } from './positions.helpers';

type FingersProps = {
  tonic: Note;
  notes: (Note | OctaveNote)[];
  selectedPositions: Position[];
  position: Position;
};

export function Fingers({ notes, position, selectedPositions, tonic }: FingersProps) {
  return (
    <>
      {notes.map((note, index) => {
        const finger = index + 1;
        const tonesFromTonic = getToneCountFromTonic(tonic, note);

        return (
          <g id={`${finger}-finger-position-${position.number}`} key={`finger-${finger}`}>
            <circle
              cx={getFingerXPosition({
                position,
                selectedPositions,
              })}
              cy={tonesFromTonic * NOTE_SPACING + FIRST_NOTE_OFFSET}
              r="10"
              fill={position.color}
              stroke={position.color}
              strokeWidth="1"
            />
            <text
              x={getFingerXPosition({
                position,
                selectedPositions,
              })}
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
    </>
  );
}

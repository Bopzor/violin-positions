import { STRING_SPACING, START_STRING_OFFSET, NOTE_RADIUS } from '../drawing.const';
import { type Position } from '../violin.model';

export const getPositionRatio = (position: Position, selectedPositions: Position[]) => {
  const sameSidePositions = selectedPositions.filter(
    ({ number }) => number % 2 === position.number % 2
  );

  const currentPositionNote = position.strings['0G']!.flat();
  const allGStringNotes = sameSidePositions
    .map(({ strings }) => strings['0G'])
    .flat()
    .filter((note) => currentPositionNote.includes(note!));
  const isOverlapping = [...new Set(allGStringNotes)].length < allGStringNotes.length;

  if (!isOverlapping) {
    return 0;
  }

  return sameSidePositions
    .map(({ number }) => number)
    .sort()
    .indexOf(position.number);
};

export const getPositionWidth = ({
  position,
  selectedPositions,
}: {
  selectedPositions: Position[];
  position: Position;
}) => {
  const number = getPositionRatio(position, selectedPositions);

  if ((position.number - 1) % 2 === 0) {
    return STRING_SPACING * 4 + 30 * number;
  }

  return STRING_SPACING * 4 + 30 * number;
};

export const getOddXPosition = ({
  position,
  selectedPositions,
}: {
  selectedPositions: Position[];
  position: Position;
}) => {
  const number = getPositionRatio(position, selectedPositions);

  return START_STRING_OFFSET - 30 * number;
};

export const getFingerXPosition = ({
  position,
  selectedPositions,
}: {
  selectedPositions: Position[];
  position: Position;
}) => {
  if ((position.number - 1) % 2 === 0) {
    return 15 + getOddXPosition({ position, selectedPositions });
  }

  const number = getPositionRatio(position, selectedPositions);

  const CONTANT_VALUES = STRING_SPACING * 4 + NOTE_RADIUS * 2 + START_STRING_OFFSET - 5;
  return CONTANT_VALUES + 30 * number;
};

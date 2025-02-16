import {
  FIRST_NOTE_OFFSET,
  NOTE_SPACING,
  START_STRING_OFFSET,
  STRING_SPACING,
} from './drawing.const';
import {
  getNotesWithOctave,
  getToneCountFromTonic,
  isNote,
  Note,
  noteToFrench,
  OctaveNote,
} from './getNotes';

type StringsProps = {
  strings: [Note, OctaveNote][];
  isFrench: boolean;
  onSelectString: (string: Note) => void;
};

export function Strings({ strings, isFrench, onSelectString }: StringsProps) {
  return (
    <>
      {strings.map((notes, tonicIndex) => {
        const [tonic, ...notesWithOctave] = getNotesWithOctave(notes);

        if (!isNote(tonic)) {
          throw new Error(`the tonic ${tonic} contains an octave`);
        }

        return (
          <g id={`${tonic}-string`} key={tonic}>
            <g
              id={`${tonic}-base-note`}
              onClick={() => onSelectString(tonic)}
              className="cursor-pointer"
            >
              <circle
                cx={(tonicIndex + 1) * STRING_SPACING + START_STRING_OFFSET}
                cy={STRING_SPACING}
                r="20"
                fill="transparent"
                stroke="blue"
                strokeWidth="1"
              />
              <text
                x={(tonicIndex + 1) * STRING_SPACING + START_STRING_OFFSET}
                y="58"
                fontSize="22"
                textAnchor="middle"
                fill="black"
              >
                {isFrench ? noteToFrench[tonic] : tonic}
              </text>
            </g>

            <line
              x1={(tonicIndex + 1) * STRING_SPACING + START_STRING_OFFSET}
              y1="80"
              x2={(tonicIndex + 1) * STRING_SPACING + START_STRING_OFFSET}
              y2="800"
              stroke="black"
              strokeWidth="2"
            />

            {notesWithOctave.map((note, noteIndex) => {
              const noteWithoutOctave: Note = isNote(note) ? note : (note[1] as Note);
              const tonesFromTonic = getToneCountFromTonic(tonic, note);

              return (
                <g id={`${note}-note-${tonic}-string`} key={`${tonic}-${noteIndex}`}>
                  <circle
                    cx={(tonicIndex + 1) * STRING_SPACING + START_STRING_OFFSET}
                    cy={tonesFromTonic * NOTE_SPACING + FIRST_NOTE_OFFSET}
                    r="20"
                    fill="white"
                    stroke="blue"
                    strokeWidth="1"
                  />

                  <text
                    x={(tonicIndex + 1) * STRING_SPACING + START_STRING_OFFSET}
                    y={tonesFromTonic * NOTE_SPACING + FIRST_NOTE_OFFSET + 8}
                    fontSize="22"
                    textAnchor="middle"
                    fill="black"
                  >
                    {isFrench ? noteToFrench[noteWithoutOctave] : noteWithoutOctave}
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

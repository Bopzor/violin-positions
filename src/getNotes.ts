const NOTES = ['A', 'B', 'C', 'D', 'E', 'F', 'G'] as const;
export type Note = (typeof NOTES)[number];
export type OctaveNote = `${number}${Note}`;

function isNote(note: Note | OctaveNote): note is Note {
  return NOTES.includes(note as Note);
}

export function getNotes([first, last]: [Note, Note | OctaveNote]): Note[] {
  const notes: Note[] = [first];
  const lastNote: Note = isNote(last) ? last : (last[1] as Note);
  const octave: number = isNote(last) ? 1 : Number(last[0]);

  let currentOctave = 1;

  while (octave !== currentOctave || notes[notes.length - 1] !== lastNote) {
    const nextNote = getNextNote(notes[notes.length - 1]);

    notes.push(nextNote);

    if (nextNote === first) {
      currentOctave++;
    }
  }

  return notes;
}

export function getNextNote(note: Note): Note {
  const noteIndex = NOTES.indexOf(note);

  if (noteIndex === NOTES.length - 1) {
    return NOTES[0];
  }

  return NOTES[noteIndex + 1];
}

const FRENCH_NOTES = ['Do', 'Ré', 'Mi', 'Fa', 'Sol', 'La', 'Si'] as const;
type FrenchNote = (typeof FRENCH_NOTES)[number];

export const noteToFrench: Record<Note, FrenchNote> = {
  A: 'La',
  B: 'Si',
  C: 'Do',
  D: 'Ré',
  E: 'Mi',
  F: 'Fa',
  G: 'Sol',
};

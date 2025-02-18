const NOTES = ['A', 'B', 'C', 'D', 'E', 'F', 'G'] as const;
export type Note = (typeof NOTES)[number];
export type OctaveNote = `${number}${Note}`;

export function isNote(note: Note | OctaveNote): note is Note {
  return NOTES.includes(note as Note);
}

export function getNotesWithOctave([first, last]: [OctaveNote, OctaveNote]): OctaveNote[] {
  const notes: OctaveNote[] = [first];

  while (notes[notes.length - 1] !== last) {
    const nextNote = getNextNote(notes[notes.length - 1]);

    notes.push(nextNote);
  }

  return notes;
}

export function getNextNote(noteWithOctave: OctaveNote): OctaveNote {
  const octave = Number(noteWithOctave[0]);
  const note = noteWithOctave[1] as Note;
  const noteIndex = NOTES.indexOf(note);

  if (noteIndex === NOTES.length - 1) {
    return `${octave + 1}${NOTES[0]}`;
  }

  return `${octave}${NOTES[noteIndex + 1]}`;
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

export function getToneCountFromTonic(tonic: OctaveNote, note: OctaveNote): number {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, ...notes] = getNotesWithOctave([tonic, note]);

  return (
    notes.reduce((semitones, note) => {
      if (['C', 'F'].includes(note[1])) {
        return (semitones += 1);
      }

      return (semitones += 2);
    }, 0) / 2
  );
}

export function getMinMaxTonesCountFromTonics(notes: {
  [tonic in OctaveNote]?: OctaveNote[];
}): [number, number] {
  let minSemitones = 0;
  let maxSemitones = 0;

  for (const [tonic, composingNotes] of Object.entries(notes)) {
    if (!composingNotes) {
      continue;
    }

    for (const note of composingNotes) {
      const semitones = getToneCountFromTonic(tonic as OctaveNote, note);

      if (minSemitones === 0 || semitones < minSemitones) {
        minSemitones = semitones;
      }

      if (maxSemitones === 0 || semitones > maxSemitones) {
        maxSemitones = semitones;
      }
    }
  }

  return [minSemitones, maxSemitones];
}

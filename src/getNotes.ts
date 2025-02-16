const NOTES = ['A', 'B', 'C', 'D', 'E', 'F', 'G'] as const;
export type Note = (typeof NOTES)[number];
export type OctaveNote = `${number}${Note}`;

export function isNote(note: Note | OctaveNote): note is Note {
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

export function getNotesWithOctave([first, last]: [Note, Note | OctaveNote]): (
  | Note
  | OctaveNote
)[] {
  const notes = getNotes([first, last]);
  let octave = 0;

  return notes.map((note) => {
    if (note === first) {
      octave += 1;
    }

    if (octave > 1) {
      return `${octave}${note}` as OctaveNote;
    }

    return note;
  });
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

export function getToneCountFromTonic(tonic: Note, note: Note | OctaveNote): number {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, ...notes] = getNotes([tonic, note]);

  return (
    notes.reduce((semitones, note) => {
      if (['C', 'F'].includes(note)) {
        return (semitones += 1);
      }

      return (semitones += 2);
    }, 0) / 2
  );
}

export function getMinMaxTonesCountFromTonics(notes: {
  [tonic in Note]?: (Note | OctaveNote)[];
}): [number, number] {
  let minSemitones = 0;
  let maxSemitones = 0;

  for (const [tonic, composingNotes] of Object.entries(notes)) {
    for (const note of composingNotes) {
      const semitones = getToneCountFromTonic(tonic as Note, note);

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

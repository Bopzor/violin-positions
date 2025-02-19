import { useEffect, useState } from 'react';

import { Configuration } from './Configuration';
import { Positions } from './positions/Positions';
import { Strings } from './Strings';
import { Violin } from './Violin';
import { type Position, POSITIONS, VIOLON_STRINGS } from './violin.model';
import { OctaveNote } from './getNotes';

function App() {
  const [selectedPositions, setSelectedPosition] = useState<Position[]>([]);
  const [selectedString, setSelectedString] = useState<OctaveNote | undefined>();
  const [selectedNote, setSelectedNote] = useState<OctaveNote | undefined>();
  const [isFrench, setIsFrench] = useState(false);

  const togglePosition = (position: number) => {
    if (selectedPositions.find((selectedPosition) => selectedPosition.number === position)) {
      const newPositions = selectedPositions.filter(
        (selectedPosition) => selectedPosition.number !== position
      );
      setSelectedPosition(newPositions);

      if (newPositions.length === 0) {
        setSelectedNote(undefined);
      }

      return;
    }

    const positionToAdd = POSITIONS.find(
      (selectedPosition) => selectedPosition.number === position
    );

    if (positionToAdd !== undefined) {
      setSelectedPosition([...selectedPositions, positionToAdd]);
    }
  };

  const handleSelectNote = (note: OctaveNote) => {
    if (note === selectedNote) {
      setSelectedNote(undefined);
      setSelectedPosition([]);
      return;
    }

    setSelectedNote(note);

    const includingPosition: Position[] = [];

    for (const position of POSITIONS) {
      const notes = new Set(Object.values(position.strings).flat());

      if (notes.has(note)) {
        includingPosition.push(position);
      }
    }

    setSelectedPosition(includingPosition);
  };

  useEffect(() => {
    if (selectedPositions.length === 0) {
      setSelectedString(undefined);
    }
  }, [selectedPositions]);

  return (
    <div className="p-4 flex flex-col gap-4 h-screen w-screen">
      <Configuration
        toggleLanguageNotation={(isFrench) => setIsFrench(isFrench)}
        isFrench={isFrench}
        selectedPositions={selectedPositions}
        togglePosition={togglePosition}
      />

      <svg version="1.1" viewBox="0 0 500 800" xmlns="http://www.w3.org/2000/svg">
        <Violin />

        <Positions
          positions={POSITIONS}
          selectedPositions={selectedPositions}
          selectedString={selectedString}
        />

        <Strings
          strings={[...VIOLON_STRINGS.values()]}
          isFrench={isFrench}
          selectedNote={selectedNote}
          onSelectString={setSelectedString}
          onSelectNote={handleSelectNote}
        />
      </svg>
    </div>
  );
}

export default App;

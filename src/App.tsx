import { useEffect, useState } from 'react';

import { Configuration } from './Configuration';
import { type Note } from './getNotes';
import { Positions } from './Positions';
import { Strings } from './Strings';
import { POSITIONS, VIOLON_STRINGS } from './violin.model';

function App() {
  const [selectedPositions, setSelectedPosition] = useState<(typeof POSITIONS)[number][]>([]);
  const [selectedString, setSelectedString] = useState<Note | undefined>();
  const [isFrench, setIsFrench] = useState(false);

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
        <Positions
          positions={POSITIONS}
          selectedPositions={selectedPositions}
          selectedString={selectedString}
        />

        <Strings
          strings={[...VIOLON_STRINGS.values()]}
          isFrench={isFrench}
          onSelectString={setSelectedString}
        />
      </svg>
    </div>
  );
}

export default App;

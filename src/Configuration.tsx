import { POSITIONS } from './violin.model';

type ConfigurationProps = {
  togglePosition: (position: number) => void;
  selectedPositions: (typeof POSITIONS)[number][];
  isFrench: boolean;
  toggleLanguageNotation: (isFrench: boolean) => void;
};

export function Configuration({
  isFrench,
  selectedPositions,
  toggleLanguageNotation,
  togglePosition,
}: ConfigurationProps) {
  return (
    <>
      <div className="flex gap-2 flex-wrap justify-center">
        {POSITIONS.map(({ number, color }) => (
          <div
            onClick={() => togglePosition(number)}
            role="button"
            key={`position-chip-${number}`}
            style={{ color }}
            className={`rounded px-2 md:py-2 sm:py-1 py-1 border ${
              selectedPositions.find((position) => position?.number === number) !== undefined
                ? 'border-blue-500'
                : ''
            } `}
          >
            <span className="sm:hidden md:inline hidden">Position</span> {number}
          </div>
        ))}
      </div>

      <div>
        <label className="inline-flex items-center cursor-pointer">
          <span className="me-3 text-sm font-medium text-gray-900 ">Anglaise</span>
          <input
            type="checkbox"
            value={String(isFrench)}
            checked={isFrench}
            onChange={(event) => toggleLanguageNotation(event.target.checked)}
            className="sr-only peer"
          />
          <div className="relative md:w-11 w-8 sm:w-8 h-4 md:h-6 sm:h-4 bg-gray-200 peer-focus:outline-none md:peer-focus:ring-4 sm:peer-focus:ring-1 peer-focus:ring-1 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full md:after:h-5 sm:after:h-3 after:h-3 after:w-3 md:after:w-5 sm:after:w-3 after:transition-all peer-checked:bg-blue-600"></div>
          <span className="ms-3 text-sm font-medium text-gray-900 ">Française</span>
        </label>
      </div>
    </>
  );
}

import { type Note, OctaveNote, getNotes } from './getNotes';

const ViolonStrings = new Map<Note, [Note, OctaveNote]>([
  ['G', ['A', '2C']],
  ['D', ['E', '2G']],
  ['A', ['B', '2D']],
  ['E', ['F', '2A']],
]);

function Tonic({ note }: { note: Note }) {
  return (
    <div className="min-h-8 size-8 rounded-full border border-solid border-blue-500 flex justify-center items-center">
      <div>{note}</div>
    </div>
  );
}

function Note({ note }: { note: Note }) {
  return (
    <div className="min-h-8 size-8 rounded-full border border-solid border-blue-500 flex justify-center items-center">
      <div>{note}</div>
    </div>
  );
}

function App() {
  return (
    <div className="p-10">
      <div className="flex gap-3">
        {[...ViolonStrings.entries()].map(([tonic, notes]) => (
          <div className="flex flex-col" key={tonic}>
            <div className="flex flex-col items-center h-12">
              <Tonic note={tonic} />
              <div className="h-full w-0.5 bg-black mt-2" />
            </div>

            {getNotes(notes).map((note, index) => (
              <div
                className={`flex flex-col items-center h-12 ${
                  index === 0 || index < 4 ? 'bg-red-300/50 bg-clip-border' : ''
                }`}
                key={`${tonic}-${index}`}
              >
                <div className="h-full w-0.5 bg-black" />
                <Note note={note} />
                <div className="h-full w-0.5 bg-black" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

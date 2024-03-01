import { String } from "./String";
import { E, A, D, G, Note } from "./data";
import { useMachine } from "@xstate/react";
import { gameMachine, Event, GameState } from "./gameMachine";
import { NoteSelectionContextProvider } from "./NoteSelectionContext";
import { FretNumbers } from "./FretNumbers";

export const FretBoard = () => {
  const [state, send] = useMachine(gameMachine);

  const start = () => {
    send({
      type: Event.Start,
    });
  };

  const onNoteClick = (note: Note) => {
    send({
      type: Event.Answer,
      note,
    });
  };

  return (
    <NoteSelectionContextProvider nonSelectedNotes={state.context.notesLeft}>
      <div className="grid gap-2 p-2">
        <FretNumbers />
        <String onNoteClick={onNoteClick} notes={G} stringName="G" />
        <String onNoteClick={onNoteClick} notes={D} stringName="D" />
        <String onNoteClick={onNoteClick} notes={A} stringName="A" />
        <String onNoteClick={onNoteClick} notes={E} stringName="E" />

        <div className="grid grid-flow-row gap-4 min-w-40 justify-center justify-items-center	">
          {state.matches(GameState.Inactive) && (
            <button
              className="w-fit border-2 px-8 py-2 rounded-md"
              onClick={start}
            >
              Start
            </button>
          )}

          <span className="text-8xl">{state.context.currentNote?.note}</span>
          <p className="text-xs italic">{state.value}</p>
        </div>
      </div>
    </NoteSelectionContextProvider>
  );
};

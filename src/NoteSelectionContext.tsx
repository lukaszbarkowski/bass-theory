import { createContext, useContext } from "react";
import { Note } from "./data";

interface NoteSelectionContextValue {
  nonSelectedNotes: Note[];
}

const NoteSelectionContext = createContext<NoteSelectionContextValue>({
  nonSelectedNotes: [],
});

export const NoteSelectionContextProvider = ({
  children,
  nonSelectedNotes,
}: NoteSelectionContextValue & {
  children: React.ReactNode;
}) => {
  return (
    <NoteSelectionContext.Provider value={{ nonSelectedNotes }}>
      {children}
    </NoteSelectionContext.Provider>
  );
};

export const useNoteSelectionState = (note: Note) => {
  const context = useContext(NoteSelectionContext);

  if (context === undefined) {
    throw new Error(
      "useNoteSelectionState must be used within a NoteSelectionContextProvider"
    );
  }

  const isSelected = !Boolean(
    context.nonSelectedNotes.find((n) => {
      return n.note === note.note && n.string === note.string;
    })
  );

  return isSelected;
};

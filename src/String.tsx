import { Note } from "./Note";
import { Note as NoteModel } from "./data";

interface StringProps {
  notes: string[];
  stringName: string;

  onNoteClick(note: NoteModel): void;
}

export const String = ({ notes, stringName, onNoteClick }: StringProps) => {
  return (
    <div className="grid grid-cols-12 gap-2">
      {notes.map((note) => {
        return (
          <Note
            onClick={onNoteClick}
            note={note}
            string={stringName}
            key={note + stringName}
          />
        );
      })}
    </div>
  );
};

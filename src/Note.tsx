import { useNoteSelectionState } from "./NoteSelectionContext";
import { Note as NoteModel } from "./data";

interface NoteProps {
  note: string;
  string: string;
  onClick(note: NoteModel): void;
}

export const Note = ({ note, string, onClick }: NoteProps) => {
  const wasSelected = useNoteSelectionState({ string, note });

  const handleClick = () => {
    onClick({
      note,
      string,
    });
  };

  return (
    <div
      className="border text-center p-2 h-12 cursor-pointer hover:bg-gray-200"
      onClick={handleClick}
    >
      {wasSelected && note}
    </div>
  );
};

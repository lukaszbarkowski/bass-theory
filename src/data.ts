export const E = [
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
  "C",
  "C#",
  "D",
  "D#",
];
export const A = [
  "A",
  "A#",
  "B",
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
];
export const D = [
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
  "C",
  "C#",
];
export const G = [
  "G",
  "G#",
  "A",
  "A#",
  "B",
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
];

const STRING_MAP: Record<number, string> = {
  0: "E",
  1: "A",
  2: "D",
  3: "G",
};

export interface Note {
  string: string;
  note: string;
}

export const pairs: Note[] = [E, A, D, G]
  .map((stringNotes, index) => {
    return stringNotes.map((n) => ({
      string: STRING_MAP[index],
      note: n,
    }));
  })
  .flat();

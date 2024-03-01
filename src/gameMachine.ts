import { Note, pairs } from "./data";
import { assign, setup } from "xstate";

export const enum GameState {
  Inactive = "inactive",
  RandomNoteChosen = "random_note_chosen",
  Answered = "answered",
  CorrectAnswer = "correct_answer",
  IncorrectAnswer = "incorrect_answer",
  OutOfTime = "out_of_time",
}

export const enum Event {
  Start = "start",
  Answer = "answer",
}

export const enum Guard {
  IsCorrectAnswer = "is_correct_answer",
}

export const enum Actions {
  UpdateAnswer = "update_answer",
}

const getRandomNote = <T>(arr: T[]) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const validateAnswer = (ctx: Context) => {
  const { notesLeft, currentNote, answer } = ctx;

  const validAnswers = notesLeft.filter((note) => {
    return note.note === currentNote?.note;
  });

  if (
    validAnswers.some((a) => {
      return a.note === answer?.note && a.string === answer.string;
    })
  ) {
    return true;
  }

  return false;
};

const processCorrectAnswer = (ctx: Context) => {
  return {
    ...ctx,
    // TODO: add configuration to be able to fill whole board with notes
    // notesLeft: ctx.notesLeft.filter((n) => {
    //   return !(n.note === ctx.answer?.note && n.string === ctx.answer?.string);
    // }),
  };
};

interface Context {
  notesLeft: Note[];
  currentNote: Note | null;
  answer: Note | null;
}
export const gameMachine = setup({
  types: {} as {
    context: Context;
  },
  guards: {
    [Guard.IsCorrectAnswer]: ({ context }) => {
      return validateAnswer(context);
    },
  },
  actions: {
    [Actions.UpdateAnswer]: assign({
      answer: ({ event }) => {
        return event.note;
      },
    }),
  },
}).createMachine({
  id: "game",
  context: { notesLeft: pairs, currentNote: null, answer: null },
  initial: GameState.Inactive,
  states: {
    [GameState.Inactive]: {
      on: { [Event.Start]: GameState.RandomNoteChosen },
    },

    [GameState.RandomNoteChosen]: {
      entry: assign({
        currentNote: ({ context }) => getRandomNote(context.notesLeft),
        answer: null,
      }),
      on: {
        [Event.Answer]: [
          {
            target: GameState.Answered,
            actions: [Actions.UpdateAnswer],
          },
        ],
      },
    },

    [GameState.Answered]: {
      always: [
        {
          target: GameState.CorrectAnswer,
          guard: Guard.IsCorrectAnswer,
        },
        {
          target: GameState.IncorrectAnswer,
        },
      ],
    },

    [GameState.CorrectAnswer]: {
      entry: assign(({ context }) => processCorrectAnswer(context)),      
      after: {
        1000: GameState.RandomNoteChosen,
      },
    },

    [GameState.IncorrectAnswer]: {
      after: {
        1000: GameState.RandomNoteChosen,
      },
    },

    // TODO: once the game is configurable, this state will be used
    [GameState.OutOfTime]: {
      after: {
        1000: GameState.RandomNoteChosen,
      },
    },
  },
});
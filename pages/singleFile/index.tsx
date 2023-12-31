import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";
import type { NextPage } from "next";
import { Provider, useDispatch, useSelector } from "react-redux";
import undoable, { StateWithHistory, UndoableOptions } from "redux-undo";

// partial state for a section (undo target)
interface NumberState {
  id: string;
  title: string;
  value: number;
}

const numberStateUndoableOption: UndoableOptions = {
  undoType: "NUMBER_UNDO",
  redoType: "NUMBER_REDO",
  jumpToPastType: "NUMBER_JUMP_TO_PAST",
  jumpToFutureType: "NUMBER_JUMP_TO_FUTURE",
};

const numberHistoryActions = {
  undo: () => ({ type: numberStateUndoableOption.undoType }),
  redo: () => ({ type: numberStateUndoableOption.redoType }),
  jumpToPast: (index: number) => ({
    type: numberStateUndoableOption.jumpToPastType,
    index,
  }),
  jumpToFuture: (index: number) => ({
    type: numberStateUndoableOption.jumpToFutureType,
    index,
  }),
};

const initialNumberState: NumberState = {
  id: "initial",
  value: 0,
  title: "Initial",
};

// methods to update the state
// (They are NOT invoked directly)
const numberReducers = {
  set: (state: NumberState, action: PayloadAction<number>): NumberState => {
    const value = action.payload;
    return {
      ...state,
      id: crypto.randomUUID(),
      value,
      title: `Set ${value}`,
    };
  },
};

// combine above into an object called "slice"
const numberSlice = createSlice({
  name: "number",
  initialState: initialNumberState,
  reducers: numberReducers,
});

// kind of getters
function useNumberValue() {
  return useSelector((state: StoreState) => state.number.present.value);
}
function useNumberPast(): NumberState[] {
  return useSelector((state: StoreState) => state.number.past);
}
function useNumberPresent(): NumberState {
  return useSelector((state: StoreState) => state.number.present);
}
function useNumberFuture(): NumberState[] {
  return useSelector((state: StoreState) => state.number.future);
}

// kind of setters generated from reducers to update the state
// e.g. dispatch(numberActions.set(10));
const numberActions = numberSlice.actions;

// whole state for a page
// (The sub state will be wrapped by `undoable()`)
interface StoreState {
  number: StateWithHistory<NumberState>;
}

// finally, create a store wrapping the sub state
const store = configureStore<StoreState>({
  reducer: {
    number: undoable(numberSlice.reducer, numberStateUndoableOption),
  },
});

// components that use the state have to be wrapped by Provider
const Home: NextPage = () => {
  // const value = useNumberValue();
  // ^ this does not work
  //   Error: could not find react-redux context value; please ensure the component is wrapped in a <Provider>

  return (
    <Provider store={store}>
      <PageContent />
    </Provider>
  );
};

// to get, use selectors. e.g. `useNumberValue()` (prepared above)
// to update, use dispatch. e.g. `dispatch(numberActions.set())`
function PageContent() {
  const dispatch = useDispatch();
  const value = useNumberValue();
  const past = useNumberPast();
  const present = useNumberPresent();
  const future = useNumberFuture();

  return (
    <div>
      <h1>History system - Single file example</h1>
      <div>
        Value: {value}{" "}
        <button onClick={() => dispatch(numberActions.set(value + 10))}>
          +10
        </button>
      </div>
      <div>
        <button
          className="disabled:opacity-50"
          disabled={past.length < 1}
          onClick={() => dispatch(numberHistoryActions.undo())}
        >
          Undo
        </button>
        <button
          className="disabled:opacity-50"
          disabled={future.length < 1}
          onClick={() => dispatch(numberHistoryActions.redo())}
        >
          Redo
        </button>
      </div>
      <ul>
        {past.map((v, i) => (
          <li
            key={v.id}
            onClick={() => dispatch(numberHistoryActions.jumpToPast(i))}
          >
            {v.title}
          </li>
        ))}
        <li className="text-red-700">{present.title}</li>
        {future.map((v, i) => (
          <li
            key={v.id}
            onClick={() => dispatch(numberHistoryActions.jumpToFuture(i))}
          >
            {v.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;

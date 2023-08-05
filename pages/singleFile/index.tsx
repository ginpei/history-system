import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";
import type { NextPage } from "next";
import { Provider, useDispatch, useSelector } from "react-redux";

// partial state for a section (undo target)
interface NumberState {
  value: number;
}

const initialNumberState: NumberState = {
  value: 0,
};

// methods to update the state
// (They are NOT invoked directly)
const numberReducers = {
  set: (state: NumberState, action: PayloadAction<number>) => {
    const value = action.payload;
    return {
      ...state,
      value,
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
  return useSelector((state: StoreState) => state.number.value);
}

// kind of setters generated from reducers to update the state
// e.g. dispatch(numberActions.set(10));
const numberActions = numberSlice.actions;

// whole state for a page
// (Why separated to sub states? See below sections)
interface StoreState {
  number: NumberState;
}

// finally, create a store
const store = configureStore<StoreState>({
  reducer: {
    number: numberSlice.reducer,
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

  return (
    <div>
      <h1>History system - Single file example</h1>
      <div>
        Value: {value}{" "}
        <button onClick={() => dispatch(numberActions.set(value + 10))}>
          +10
        </button>
      </div>
    </div>
  );
}

export default Home;

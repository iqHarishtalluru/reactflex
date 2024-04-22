import { createSlice } from "@reduxjs/toolkit";
import { FlexintialConfiguration } from "../../flex.config";

export const initialvalue = (data) => {
  return (data || []).map((item) => ({ ...item }));
};

const resultObject = initialvalue(FlexintialConfiguration).reduce(
  (accumulator, currentObject) => {
    return { ...accumulator, ...currentObject };
  },
  {}
);

// Function to save state to storage based on the specified storage type
const saveStateToStorage = (state, storageType) => {
  switch (storageType) {
    case "local":
      localStorage.setItem("reduxState", JSON.stringify(state));
      break;
    case "session":
      sessionStorage.setItem("reduxState", JSON.stringify(state));
      break;
    // Add cases for IndexedDB and cookies as needed
    default:
      break;
  }
};

// Check if the state is already stored in storage
const storedState = JSON.parse(localStorage.getItem("reduxState")) ||
                    JSON.parse(sessionStorage.getItem("reduxState"));

// If not stored, save the initial state to storage
if (!storedState) {
  saveStateToStorage(resultObject, FlexintialConfiguration.storageType);
}

const initialState = storedState || resultObject;

const reducers = {};

for (let key in initialState) {
  const setKey = `${key.charAt(0).toUpperCase() + key.slice(1)}`;
  reducers[setKey] = (state, action) => {
    state[key] = action.payload;
    saveStateToStorage(state, FlexintialConfiguration[0].storageType); // Save state to storage after each action
  };
}

const iqSlice = createSlice({
  name: "iqSlice",
  initialState,
  reducers,
});

export const htboxSelector = iqSlice.actions;

export default iqSlice.reducer;

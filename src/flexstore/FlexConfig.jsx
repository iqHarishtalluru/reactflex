import { Provider } from "react-redux";
import PropTypes from "prop-types";
import { configureStore } from "@reduxjs/toolkit";
import iqSlice from "./FlexMachine.jsx";

const FlexStore = configureStore({
  reducer: {
    iqSlice,
    // Add other reducers here if needed
  },
});

export const FlexProvider = (props) => {
  const { element } = props;
  return <Provider store={FlexStore}>{element}</Provider>;
};

FlexProvider.propTypes = {
  element: PropTypes.node.isRequired,
};

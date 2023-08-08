import React from "react";
import "./App.scss";
import AppRouter from "./config/router";
import { store } from "./store";
import { Provider } from "react-redux";

function App() {
  return (
    <div>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </div>
  );
}

export default App;

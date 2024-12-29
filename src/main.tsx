import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate
        loading={<div>Loading...</div>}
        persistor={persistor}
        onBeforeLift={() => {
          const state = store.getState();
          const search = state.movies.search;
          if (search.trim()) {
            store.dispatch({ type: "movies/fetchMovieList" });
          }
        }}
      >
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);
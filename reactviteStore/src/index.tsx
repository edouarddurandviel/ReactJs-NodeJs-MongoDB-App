import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./stores";
import socketIo from "./stores/socket/socketioInstance";
import Routes from "./views/Routes";
import "./theme/index.css";
import { PersistGate } from "redux-persist/integration/react";

socketIo.init();

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

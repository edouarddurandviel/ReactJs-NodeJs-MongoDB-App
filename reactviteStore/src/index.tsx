import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { store } from "./stores";
import socketIo from "./stores/socket/socketioInstance";
import Routes from "./views/Routes";
import "./theme/index.css";

socketIo.init();

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>,
);

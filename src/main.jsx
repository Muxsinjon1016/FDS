import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { client } from "./config/query-client.js";
import { QueryClientProvider } from "@tanstack/react-query";
import store from "./store/store.js";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </Provider>
);

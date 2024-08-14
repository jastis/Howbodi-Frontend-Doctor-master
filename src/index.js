import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "./index.css";

const theme = extendTheme({
  initialColorMode: "light",
  useSystemColorMode: false,

  styles: {
    global: (props) => ({
      body: {
        fontFamily: "Gilroy-Medium",
      },
    }),
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Router>
          <App />
        </Router>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

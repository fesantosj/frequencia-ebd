import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import AppRoutes from "@/routes";
import colors from "@/theme/colors";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${colors.background};
  }

  button {
    font-family: inherit;
  }

  input, select, textarea {
    font-family: inherit;
  }
`;

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyle />
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
}

import react from "react";
import reactDom from "react-dom/client";
import App from "./App";
import { CustomThemeProvider } from './src/components/ThemeContext';
 

const root = reactDom.createRoot(document.getElementById("root"))

root.render(
    <CustomThemeProvider>
<App />
</CustomThemeProvider>)
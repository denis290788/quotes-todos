import { useState, useEffect } from "react";
import SourceSelector from "./components/SourceSelector";
import ThemeSwitcher from "./components/ThemeSwitcher";
import CardList from "./components/CardList";

import "./styles/themes.css";
import "./styles/App.css";

function App() {
    const [source, setSource] = useState("quotes");
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        document.documentElement.setAttribute("main-theme", theme);
    }, [theme]);

    return (
        <div>
            <header>
                <h1>Quotes and Todos</h1>
                <div className="header-controls">
                    <SourceSelector value={source} onChange={setSource} />
                    <ThemeSwitcher value={theme} onChange={setTheme} />
                </div>
            </header>
            <main>
                <CardList source={source} />
            </main>
        </div>
    );
}

export default App;

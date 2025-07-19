import { useState } from "react";
import SourceSelector from "./components/SourceSwitcher";
import CardList from "./components/CardList";

function App() {
    const [source, setSource] = useState("quotes");

    return (
        <div>
            <header>
                <SourceSelector value={source} onChange={setSource} />
            </header>

            <CardList source={source} />
        </div>
    );
}

export default App;

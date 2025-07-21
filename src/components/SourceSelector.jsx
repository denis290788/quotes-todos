import "../styles/SourceSelector.css";

export default function SourceSelector({ value, onChange }) {
    return (
        <div className="select-wrapper">
            <select
                className="custom-select"
                id="source"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="quotes">Quotes</option>
                <option value="todos">Todos</option>
            </select>
            <span className="select-arrow">▼</span>
        </div>
    );
}

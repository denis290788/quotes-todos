export default function SourceSelector({ value, onChange }) {
    return (
        <select value={value} onChange={(e) => onChange(e.target.value)}>
            <option value="quotes">Quotes</option>
            <option value="todos">Todos</option>
        </select>
    );
}

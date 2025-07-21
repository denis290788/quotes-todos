import "../styles/Button.css";

export default function ThemeSwitcher({ value, onChange }) {
    const toggleTheme = () => {
        onChange(value === "light" ? "dark" : "light");
    };

    return (
        <button className="button" onClick={toggleTheme}>
            {value === "light" ? "Темная" : "Светлая"}
        </button>
    );
}

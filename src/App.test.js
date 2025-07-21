import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("App", () => {
    it("по умолчанию устанавливается light тема", () => {
        render(<App />);
        expect(document.documentElement.getAttribute("main-theme")).toBe("light");
    });

    it("тема меняется на dark при клике", () => {
        render(<App />);

        const themeButton = screen.getByRole("button", { name: /темная/i });
        fireEvent.click(themeButton);

        expect(document.documentElement.getAttribute("main-theme")).toBe("dark");
    });

    it("тема меняется обратно на light при повторном клике", () => {
        render(<App />);

        const themeButton = screen.getByRole("button", { name: /темная/i });
        fireEvent.click(themeButton);

        fireEvent.click(screen.getByRole("button", { name: /светлая/i }));

        expect(document.documentElement.getAttribute("main-theme")).toBe("light");
    });
});

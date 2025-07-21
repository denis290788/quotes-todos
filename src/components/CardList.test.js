import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CardList from "./CardList";
import { fetchCards } from "../services/api";

jest.mock("../services/api", () => ({
    fetchCards: jest.fn(),
    PAGE_LIMIT: 18,
}));

jest.mock("./PageController", () => {
    return function MockPageController({ page, isLastPage, onPrev, onNext }) {
        return (
            <div data-testid="page-controller">
                <button onClick={onPrev} disabled={page === 1}>
                    Назад
                </button>
                <span>Страница {page}</span>
                <button onClick={onNext} disabled={isLastPage}>
                    Вперёд
                </button>
            </div>
        );
    };
});

describe("CardList", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("загружает и отображает карточки успешно", async () => {
        fetchCards.mockResolvedValueOnce({
            data: [{ id: 1, quote: "Test Quote 1", author: "Author 1" }],
            total: 1,
        });

        render(<CardList source="quotes" />);

        expect(screen.getByText("Загрузка...")).toBeInTheDocument();
        await waitFor(() => expect(screen.queryByText("Загрузка...")).not.toBeInTheDocument());

        expect(fetchCards).toHaveBeenCalledWith("quotes", 1);
        expect(screen.getByText("Всего: 1")).toBeInTheDocument();

        const quoteCard = document.querySelector("card-quote");
        expect(quoteCard).toBeInTheDocument();
        expect(quoteCard).toHaveAttribute(
            "data",
            JSON.stringify({ id: 1, quote: "Test Quote 1", author: "Author 1" })
        );
        const todoCard = document.querySelector("card-todo");
        expect(todoCard).not.toBeInTheDocument();
    });

    it("показывает ошибку, если загрузка данных не удалась", async () => {
        const errorMessage = "Network Error";
        fetchCards.mockRejectedValueOnce(new Error(errorMessage));

        render(<CardList source="quotes" />);

        expect(screen.getByText("Загрузка...")).toBeInTheDocument();
        await waitFor(() =>
            expect(
                screen.getByText(`Error: ${errorMessage}: Ошибка загрузки данных`)
            ).toBeInTheDocument()
        );
        expect(screen.queryByText("Загрузка...")).not.toBeInTheDocument();
    });

    it("сбрасывает страницу на 1 при смене source и загружает новые данные", async () => {
        fetchCards.mockImplementation((source, page) => {
            if (source === "quotes" && page === 1)
                return Promise.resolve({
                    data: [{ quote: "Test quote 1", author: "Authoe 1" }],
                    total: 100,
                });

            if (source === "quotes" && page === 2)
                return Promise.resolve({
                    data: [{ quote: "Test quote 2", author: "Author 2" }],
                    total: 100,
                });

            if (source === "todos" && page === 1)
                return Promise.resolve({
                    data: [{ todo: "Test todo", completed: false }],
                    total: 50,
                });

            return Promise.resolve({ data: [], total: 0 });
        });

        const { rerender } = render(<CardList source="quotes" />);

        await waitFor(() => {
            expect(screen.getByText("Всего: 100")).toBeInTheDocument();
            expect(screen.getByText("Страница 1")).toBeInTheDocument();
        });

        await userEvent.click(screen.getByRole("button", { name: "Вперёд" }));

        await waitFor(() => {
            expect(screen.getByText("Страница 2")).toBeInTheDocument();
        });

        await act(async () => {
            rerender(<CardList source="todos" />);
        });

        await waitFor(() => {
            expect(screen.getByText("Всего: 50")).toBeInTheDocument();
            expect(screen.getByText("Страница 1")).toBeInTheDocument();
        });

        expect(fetchCards).toHaveBeenCalledWith("todos", 1);
    });
});

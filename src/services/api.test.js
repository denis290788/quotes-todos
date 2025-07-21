import { fetchCards } from "../services/api";

global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ quotes: [{ id: 1, text: "Test quote" }], total: 1 }),
    })
);

describe("fetchCards", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("запрашивает успешно данные", async () => {
        const { data, total } = await fetchCards("quotes", 1);
        expect(data).toEqual([{ id: 1, text: "Test quote" }]);
        expect(total).toBe(1);
        expect(fetch).toHaveBeenCalledWith("https://dummyjson.com/quotes?limit=18&skip=0");
    });

    it("ошибка, если нет ответа от сервера", async () => {
        fetch.mockImplementationOnce(() => Promise.resolve({ ok: false }));
        await expect(fetchCards("quotes", 1)).rejects.toThrow("Ошибка загрузки данных");
    });
});

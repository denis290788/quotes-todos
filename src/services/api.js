const LIMIT = 5;

export const fetchCards = async (source, page) => {
    const skip = (page - 1) * LIMIT;
    const url = `https://dummyjson.com/${source}?limit=${LIMIT}&skip=${skip}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error("Ошибка загрузки данных");

    const json = await res.json();
    return {
        data: json[source],
        total: json.total,
    };
};

export const PAGE_LIMIT = LIMIT;

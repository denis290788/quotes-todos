import { useEffect, useState } from "react";
import { fetchCards, PAGE_LIMIT } from "../services/api";
import "../components/CardQuote";
import "../components/CardTodo";
import PageController from "./PageController";
import "../styles/CardList.css";

export default function CardList({ source }) {
    const [page, setPage] = useState(1);
    const [cardState, setCardState] = useState({
        cards: [],
        total: 0,
        loading: false,
        error: "",
    });

    useEffect(() => {
        setPage(1);
    }, [source]);

    useEffect(() => {
        const load = async () => {
            setCardState((prev) => ({ ...prev, loading: true, error: "" }));
            try {
                const { data, total } = await fetchCards(source, page);
                setCardState({ cards: data, total, loading: false, error: "" });
            } catch (err) {
                setCardState((prev) => ({
                    ...prev,
                    loading: false,
                    error: `${err}: Ошибка загрузки данных`,
                }));
            }
        };
        load();
    }, [source, page]);

    const isLastPage = page * PAGE_LIMIT >= cardState.total;

    return (
        <div>
            {cardState.loading && <p>Загрузка...</p>}
            {cardState.error && <p>{cardState.error}</p>}

            {!cardState.loading && !cardState.error && (
                <div className="card-list-container">
                    <p>Всего: {cardState.total}</p>
                    <div className="card-list">
                        {cardState.cards.map((item, idx) =>
                            source === "quotes" ? (
                                <card-quote key={idx} data={JSON.stringify(item)} />
                            ) : (
                                <card-todo key={idx} data={JSON.stringify(item)} />
                            )
                        )}
                    </div>
                    <PageController
                        page={page}
                        isLastPage={isLastPage}
                        onPrev={() => setPage((p) => Math.max(p - 1, 1))}
                        onNext={() => setPage((p) => p + 1)}
                    />
                </div>
            )}
        </div>
    );
}

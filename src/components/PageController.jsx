import "../styles/Button.css";
import "../styles/PageController.css";

export default function PageController({ page, isLastPage, onPrev, onNext }) {
    return (
        <div className="page-controller">
            <button className="button" onClick={onPrev} disabled={page === 1}>
                Назад
            </button>
            <span>Страница {page}</span>
            <button className="button" onClick={onNext} disabled={isLastPage}>
                Вперёд
            </button>
        </div>
    );
}

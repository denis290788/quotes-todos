import todoStyles from "../styles/CardTodo.css?inline";

class CardTodo extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        const { todo, completed } = JSON.parse(this.getAttribute("data") || "{}");
        this.shadowRoot.innerHTML = `
          <style>${todoStyles}</style>
          <div class="card card-todo">
            <p class="todo">${todo}</p>
            <p>
              Статус: <span class="status">${completed ? "Выполнено" : "Не выполнено"}</span>
            </p>
          </div>
        `;
    }
}

customElements.define("card-todo", CardTodo);

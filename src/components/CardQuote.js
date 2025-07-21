import quoteStyles from "../styles/CardQuote.css?inline";

class CardQuote extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        const { quote, author } = JSON.parse(this.getAttribute("data") || "{}");
        this.shadowRoot.innerHTML = `
          <style>${quoteStyles}</style>
          <div class="card card-quote">
            <p class="quote">"${quote}"</p>
            <p class="author">${author}</p>
          </div>
        `;
    }
}

customElements.define("card-quote", CardQuote);

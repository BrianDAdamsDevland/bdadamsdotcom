import { LitElement, html, css } from "lit";

export class LitExperiment extends LitElement {
  static styles = css`
  .demo-card {
    background: var(--color-subcard-background);
    padding: 15px;
    border-radius: 10px;
    margin-bottom: 15px;
  
    h4 {
      font-family: "IBM Plex Mono", monospace;
      color: var(--color-secondary);
      margin: 0;
      margin-bottom: 10px;
    }

    table {
      border-collapse: collapse;
      width: 100%;
    }
  
    th,
    td {
      border: 1px solid black;
      padding: 7px;
    }
  
    th {
      background: var(--color-primary);
      color: var(--color-background-dark);
    }
  
    input {
      padding: 8px;
      font-size: 0.85em;
      border: 1px solid var(--color-background-dark);
      border-radius: 8px;
    }
  
    input:focus {
      border: 1px solid var(--color-primary);
    }
  }
  
  `;

  static properties = {
    query: { type: String },
    data: { type: Array },
  };

  constructor() {
    super();
    this.query = "";
    this.data = [];
  }

  render() {
    return html`
      <div class="demo-card">
        <h4>Test Component (Lit)</h4>
        <input
          type="search"
          placeholder="Filter Table"
          @input=${this.handleInput}
          .value=${this.query}
        />
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>
            ${this.filteredData.map(
              (d) => html`
                <tr>
                  <td>${d.firstName}</td>
                  <td>${d.lastName}</td>
                </tr>
              `
            )}
          </tbody>
        </table>
      </div>
    `;
  }

  handleInput(event) {
    this.query = event.target.value;
  }

  get hasQuery() {
    return !!this.query.trim();
  }

  get filteredData() {
    if (!this.hasQuery) return this.data;

    const queryTerms = this.query.toLowerCase().split(" ");

    return this.data.filter((d) =>
      queryTerms.every(
        (qt) =>
          d.firstName.toLowerCase().includes(qt) ||
          d.lastName.toLowerCase().includes(qt)
      )
    );
  }
}

customElements.define("lit-experiment", LitExperiment);

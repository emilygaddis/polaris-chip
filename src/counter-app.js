import { LitElement, html, css } from 'lit';

export class CounterApp extends LitElement{
    
    static get tag() {
      return 'counter-app';
    }

    constructor() {
      super();
      this.number = "#";
    }

    static get styles() {
        return css`
          :host{
            display: block;
            background-color: pink;
            padding: 20px;
            margin: 12px;
            width: 300px;
            text-align: center;
          }

          :host([number="16"]) .button{

          } 

          .number {
            font-size: 65px;
          }

          .subtract-button {
            font-size: 40px;
            width: 50px;
            text-align: center;
          }

          .add-button {
            font-size: 40px;
            width: 50px;
            text-align: center;
          }
  
        `;
      }

      render() {

        return html`
          <div class = "counter-card">
            <title class = "title">Counter</title>
            <h1 class = "number">${this.number}</h1>
            <div class = "button-wrapper">
              <button class = "subtract-button">-</button>
              <button class = "add-button">+</button>
            </div>
          </div>
        `;
      }

      static get properties() {
        return {  
          number: { type: Number, reflect: true },
        };
      }    
}

globalThis.customElements.define(CounterApp.tag, CounterApp);

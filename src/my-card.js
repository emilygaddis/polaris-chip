import { LitElement, html, css } from 'lit';

/**
 * Now it's your turn. Here's what we need to try and do
 * 1. 
 */

export class MyCard extends LitElement {

  static get tag() {
    return 'my-card';
  }

  constructor() {
    super();
    this.title = "My card";
    this.imageurl = "#";
    this.description = "#";
    this.buttonlink = "#";
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      button.btn:hover {
        background-color: blue;
        color: white;
      }
    `;
  }

  render() {

    return html`

    <div class = "card">
      <h1 class = "heading">My Trip to Italy</h1>
      <img class = "italyimage" src="${this.imageurl}" style="width: 300px; object-fit: scale-down;">  
      <p class = "paragraph">${this.description}</p>
      <a href="${this.buttonlink}" rel="noopener noreferrer">
        <button class="btn">Details</button>
      </a>
    </div>
    `;
  }

  static get properties() {
    return {
      title: { type: String },
      imageurl: { type: String},
      description: { type: String},
      buttonlink: { type: String},
    };
  }
}

globalThis.customElements.define(MyCard.tag, MyCard);

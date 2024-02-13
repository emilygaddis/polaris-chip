import { LitElement, html, css } from 'lit';
import "@lrnwebcomponents/meme-maker/meme-maker.js";

export class MyCard extends LitElement {

  static get tag() {
    return 'my-card';
  }

  constructor() {
    super();
    this.title = "#";
    this.imageurl = "#";
    this.description = "Details";
    this.buttonlink = "#";
    this.fancy = false;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        background-color: lightblue;
        padding: 20px;
        margin: 12px;
        width: 350px;
      }

      :host([fancy]) {
      display: block;
        background-color: pink;
        border: 2px solid fuchsia;
        box-shadow: 10px 5px 5px red;
      }

      .change-color{
        background-color: #ff9700;
      }

      details summary {
        text-align: left;
        font-size: 20px;
        padding: 8px;
      }

      details[open] summary {
        font-weight: bold;
      }
  
      details div {
        border: 2px solid black;
        text-align: left;
        padding: 8px;
        height: 70px;
        overflow: auto;
      }
    `;
  }

  // put this anywhere on the MyCard class; just above render() is probably good
  openChanged(e) {
    console.log(e.newState);
    if (e.newState === "open") {
      this.fancy = true;
    }
    else {
      this.fancy = false;
    }
  }

  render() {

    return html`

    <div class = "card">
    <meme-maker 
      alt="Cat stalking a small toy" image-url="${this.imageurl}" top-text="${this.title}" bottom-text="ya know?">
    </meme-maker>
      <h2 class = "heading">${this.title}</h2>
      <details ?open="${this.fancy}" @toggle="${this.openChanged}">
        <summary>Description</summary>
        <div>
          <slot>${this.description}</slot>
        </div>
      </details>
    </div>
    `;
  }

  static get properties() {
    return {  
      title: { type: String },
      imageurl: { type: String },
      description: { type: String },
      buttonlink: { type: String },
      fancy: { type: Boolean, reflect: true },
    };
  }
}

globalThis.customElements.define(MyCard.tag, MyCard);

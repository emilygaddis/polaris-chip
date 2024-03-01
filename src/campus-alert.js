import { LitElement, html, css } from 'lit';

export class CampusAlert extends LitElement{
    
    static get tag() {
      return 'campus-alert';
    }

    constructor() {
      super();
      this.date = "#";
      this.alertMessageText = "#";
      this.isOpen = true;
      this.type = "";
    }

    static get styles() {
      return css`
        :host{
            --open-alert-height: 200px;
            --closed-alert-height: 100px;
            display: flex;
            width: 100%;
            text-align: center;
            justify-content: center;
            background-color: --general-background-color;

        }

        :host([isOpen]) .alert-wrapper{
            height: var(--open-alert-height);
        }
        
        :host([isOpen=false]) .alert-wrapper{
            height: var(--open-alert-height);
        }

        :host([type="notice"]) {
            --general-background-color: #9f9fd4;
            --message-background-color: #dbdbfa;
        }      
        
        :host([type="warning"]) {
            --general-background-color: #dc9e3c;
            --message-background-color: #ebf047;
        }    
        
        :host([type="alert"]) {
            --general-background-color: #952d2d;
            --message-background-color: #f04747;
        }  

        .alert-wrapper {
            display: flex;
            flex-direction: row;
            background-color: var(--general-background-color);
            height: var(--open-alert-height);
            width: 100%;
        }

        .alert-message {
            flex-grow: 1;
            background-color: var(--message-background-color);
            padding: 0 10px;
            transform: skew(20deg); 
            align-items: center;
            justify-content: center;
            height: 100%;
        }

        .alert-message-text{
            transform: skew(-20deg); 

        }

       `;
    }

    toggleAlert() {
        this.isOpen = !this.isOpen;
    }

    render () {      

      return html`  
          
        <div class="alert-wrapper">

            <div class="date">
                <p>${this.date}</p>
            </div>

            <slot>
                <div class="alert-message">
                    <!--
                    <details ?open: !isOpen @toggle="${this.isOpen}">
                        <summary>Description</summary>
                    </details>
        -->
                    <p class="alert-message-text">${this.alertMessageText}</p>
                </div> 
            </slot>

            <div class="is-open">
                <button>${this.isOpen}</button>
            </div>
        </div>
        
      `;
    }

    static get properties() {
      return {  
        date: { type: String },
        alertMessageText: { type: String, attribute: "alert-message-text" },
        isOpen: { type: Boolean, attribute: "is-open", reflect: true },
        type: { type: String },
      };
    } 
}

globalThis.customElements.define(CampusAlert.tag, CampusAlert);
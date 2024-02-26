import { LitElement, html, css } from 'lit';

export class CampusAlert extends LitElement{
    
    static get tag() {
      return 'campus-alert';
    }

    constructor() {
      super();
      this.date = "#";
      this.alertMessage = "#";
      this.minimizeAlert = true;
    }

    static get styles() {
      return css`
        :host{
            display: flex;
            width: 100%;
            text-align: center;
            justify-content: center;
            //font-family
            
        }

        .alert-wrapper {
            display: flex;
            flex-direction: row;
            background-color: pink;
            width: 100%;
        }

        .alert-message {
            flex-grow: 1;
            background-color: white;
            padding: 0 20px;
        }

       `;
    }

    render () {
      return html`            
        <div class="alert-wrapper">

            <div class="date">
                <p>${this.date}</p>
            </div>

            <div class="alert-message">
                <!--
                ::before
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 82 82" class="alert-icon">
                    <g transform="translate(-350.099 -428.714)">
                        <g transform="translate(350.099 428.714)" fill="none" stroke-width="6">
                            <circle cx="41" cy="41" r="41" stroke="none"></circle>
                            <circle cx="41" cy="41" r="38" fill="none"></circle>
                        </g>
                        <g transform="translate(384.41 448.566)">
                            <rect width="10.381" height="7.786" transform="translate(0.919 34.336)"></rect>
                            <path d="M6520.672,2327.554h-5.854l-3.21-23.669V2299.2h11.81v4.681Z" transform="translate(-6511.607 -2299.203)"></path>
                        </g>
                    </g>
                </svg>
                -->
                <p>${this.alertMessage}</p>
                <!--<a href="" class="-->
            </div>

            <div class="minimize-alert">
                <button>${this.minimizeAlert}</button>
            </div>
        </div>
        
      `;
    }

    static get properties() {
      return {  
        date: { type: String },
        alertMessage: { type: String, attribute: "alert-message" },
        minimizeAlert: { type: Boolean, attribute: "minimize-alert", reflect: true },
      };
    } 
}

globalThis.customElements.define(CampusAlert.tag, CampusAlert);
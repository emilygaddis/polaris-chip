import { LitElement, html, css } from 'lit';

export class CampusAlert extends LitElement{
    
    static get tag() {
      return 'campus-alert';
    }

    constructor() {
      super();
      this.date = "#";
      this.time = "#";
      this.alertMessageText = "#";
      this.isSticky = false;
      this.issue = "#";
      this.isOpen = true;
      if(localStorage.getItem("--alert-opened-state") == "false") {
            this.isOpen = false;
      }

    }

    static get styles() {
      return css`
        :host{
            --open-alert-height: 160px;
            --closed-alert-height: 80px;
            width: 100%;
            text-align: center;
            justify-content: center;
            background-color: --general-background-color;
        }

        :host([]) .closeButton {
            border-color: transparent;
        }

        :host([isOpen]) .message-full {
            height: var(--open-alert-height);
        }
        
        :host([isOpen=false]) .message-min{
            height: var(--closed-alert-height);
        }

        :host([issue="notice"]) {
            --general-background-color: #7c91de;
            --message-background-color: #c0d6ff;
        }      
        
        :host([issue="warning"]) {
            --general-background-color: #d4d76a;
            --message-background-color: #eff388;
        }    
        
        :host([issue="alert"]) {
            --general-background-color: #ca5151;
            --message-background-color: #f16f6f;
        }  

        :host([isSticky]) {
            position: sticky;
            top: 0;
            z-index: 100;
        }

        .alert-wrapper {
            display: flex;
            background-color: var(--general-background-color);
            height: var(--open-alert-height);
            width: 100%;
        }

        .message-full {
            display: flex;
            flex-direction: row;
            align-items: center;            
        }

        .alert-message {
            display: flex;
            height: var(--open-alert-height);
            background-color: var(--message-background-color);
            transform: skew(20deg); 
            align-items: center;
            width: 900px;
            
        }

        .alert-message-text{
            transform: skew(-20deg); 
            margin-left: 3vw;
            margin-right: 2vw;
            justify-content: center;
            overflow: auto;
            max-height: var(--open-alert-height);

        }

        .alert-icon {
            transform: skew(-20deg) scale(1.25); 
            margin-left: 4vw;
            flex: 0 0 auto;
        }

        .date-time {
            text-align: left;
            margin-left: 6vw;
            margin-right: 6vw;
            font-weight: 600;
            font-size: 90%;
            text-transform: uppercase;
        }    

        .triangle {
            border-style: solid;
            border-width: 0 50px 50px;
            width: 0;
            height: 0;
            position: absolute;
            bottom: 2rem;
            left: -2rem;
            border-left: 35px solid transparent;
            border-right: 0px solid transparent;
            color: var(--message-background-color);
        }

        .close-alert-button {
            background-color: transparent;
            border-color: transparent;
            display: flex;
            align-items: center;
            margin-left: 2vw;
            margin-top: 0;
        }

        .close-alert-button-text {
            margin-left: 8px;
            line-height: 14.48px;
            font-weight: 600;
            font-size: 90%;
        }

        .button-wrapper {
            display: flex;
            align-items: flex-start;
        }

        .message-min {
            height: var(--closed-alert-height);
            width: 100%;
            display: flex;
        }

        .expand-alert-button {
            width: 100%;
            font-weight: 700;
            font-style: italic;
            border-color: transparent;
            background-color: var(--message-background-color);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 19.2px;
        }

        .closed-alert-text {
            margin-left: 1vw;
            margin-right: 1vw;
        }

        @media (max-width: 800px) and (min-width: 200px) {
            .alert-wrapper {
                display: block;
            }
        }
        
       `;
    }

    toggleAlert() {
        this.isOpen = !this.isOpen;
        localStorage.setItem("--alert-opened-state", this.isOpen);

        if (this.isOpen) {
            this.shadowRoot.querySelector('button.close-alert-button').focus();
        } else {
            this.shadowRoot.querySelector('button.expand-alert-button').focus();
        }
    }

    openedAlert() {
        return html` 
            <div class="alert-wrapper">
                <div class="message-full">
                    <slot>

                    <div class="date-time">
                        <p class="date">${this.date}</p>
                        <p class="time">${this.time}</p>
                    </div>

                    <div class="alert-message">
                        <svg class="alert-icon" xmlns="http://www.w3.org/2000/svg" style="height: 90px; width: 90px; align-items: center;" viewBox="0 0 24 24"><title>alert-circle-outline</title><path d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z"/></svg>    
                        <p class="alert-message-text">${this.alertMessageText}</p>

                        <div class="triangle"></div>
                    </div>

                    <div class="button-wrapper">
                        <button class="close-alert-button" aria-label="collapse" @click="${this.toggleAlert}">
                            <svg class="alert-dismiss" style="height: 14.48px; width: 14.48px;">
                                <path d="M8.939 7.224l5.162-5.162A1.21 1.21 0 1012.39.351l-5.161 5.16L2.067.349A1.21 1.21 0 10.356 2.06l5.159 5.164-5.162 5.162a1.21 1.21 0 101.711 1.711l5.162-5.162 5.162 5.162a1.21 1.21 0 101.711-1.711z" data-name="Icon ionic-ios-close"></path>
                            </svg>
                            <p class="close-alert-button-text">Close</p>
                        </button>
                    </div>
                    </slot>
                </div>
            </div>
        `;
    }

    closedAlert() {
        return html`
            <div class="message-min">
                <button class="expand-alert-button" tabindex="0" aria-label="Open Alert" @click="${this.toggleAlert}">
                    <svg xmlns="http://www.w3.org/2000/svg" style="height: 50px; width: 50px;" viewBox="0 0 24 24"><title>alert-circle-outline</title><path d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z"/></svg>
                    <span class="closed-alert-text">ALERT</span>
                    <svg xmlns="http://www.w3.org/2000/svg" style="height: 50px; width: 50px;" viewBox="0 0 24 24"><title>chevron-down</title><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
                </button> 
            </div>  
        `;  
    }


    render() {      
        return (this.isOpen) ? this.openedAlert() : this.closedAlert();
    }

    static get properties() {
      return {  
        date: { type: String },
        time: { type: String },
        alertMessageText: { type: String, attribute: "alert-message-text" },
        isOpen: { type: Boolean, attribute: "is-open", reflect: true },
        isSticky: { type: Boolean, attribute: "is-sticky", reflect: true },
        issue: { type: String },
      };
    } 
}

globalThis.customElements.define(CampusAlert.tag, CampusAlert);
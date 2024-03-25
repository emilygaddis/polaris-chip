import { html, css } from 'lit';
import { DDD } from "./d-d-d/d-d-d/d-d-d.js";

export class CampusAlert extends DDD {
    
    static get tag() {
      return 'campus-alert';
    }

    constructor() {
      super();
      this.date = "#";
      this.time = "#";
      this.isSticky = false;
      this.issue = "#";
      this.isOpen = true;
      if(localStorage.getItem("--alert-opened-state") == "false") {
            this.isOpen = false;
      }

    }

    static get styles() {
      return [
        super.styles,
        css`
            /*
                class {
                    backround color:
                        var {
                            ---some variable;
                            var {

                            }
                        }
                    ;
                }
            */

            :host{
                --open-alert-height: 160px;
                --closed-alert-height: 80px;
                width: 100%;
                text-align: center;
                justify-content: center;
                background-color: var(--general-background-color);
                font-family: var(--ddd-font-navigation);
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
                --general-background-color: var(--ddd-theme-default-accent); 
                --message-background-color: var(--ddd-theme-default-alertNonEmergency);
            }      
            
            :host([issue="warning"]) {
                --general-background-color: var(--ddd-theme-default-keystoneYellow);
                --message-background-color: var(--ddd-theme-default-alertUrgent);
            }    
            
            :host([issue="alert"]) {
                --general-background-color: var(--ddd-theme-default-discoveryCoral);
                --message-background-color: var(--ddd-theme-default-alertImmediate);
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

            .message-text-wrapper {
                margin-left: var(--ddd-spacing-10);
                margin-right: var(--ddd-spacing-12);
                font-family: var(--ddd-font-secondary);
                font-weight: 200;
                transform: skew(-20deg); 
            }

            .alert-message-text{
                justify-content: center;
                max-height: var(--open-alert-height);
                overflow: auto
            }

            .alert-icon {
                transform: skew(-20deg) scale(1.25); 
                margin-left: 4vw;
                flex: 0 0 auto;
            }

            .date-time {
                text-align: left;
                margin: var(--ddd-spacing-22);
                font-weight:var(--ddd-font-primary-bold);
                font-size: 18px;
                text-transform: uppercase;
            }    

            .triangle {
                border-style: solid;
                border-width: 0 50px 50px;
                width: 0;
                height: 0;
                position: absolute;
                bottom: 2rem;
                left: -1.5rem;
                border-left: 35px solid transparent;
                border-right: 0px solid transparent;
                color: var(--message-background-color);
            }

            .button-wrapper {

            }

            .close-alert-button {
                background-color: transparent;
                border-color: transparent;
                display: flex;
                align-items: center;
                margin-left: 2vw;
                margin-top: 0;
                font-family: var(--ddd-font-navigation);
                font-size: 18px;
            }

            .close-alert-button-text {
                margin-left: 8px;
                line-height: 14.48px;
                font-weight: var(--ddd-font-primary-bold);
            }

            .button-wrapper {
                display: flex;
                align-items: center;
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
                background-color: var(--general-background-color);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 19.2px;
            }

            .closed-alert-text {
                margin-left: 1vw;
                margin-right: 1vw;
                font-family: var(--ddd-font-primary);
            }

            @media (max-width: 800px) and (min-width: 200px) {
                .alert-wrapper {
                    display: block;
                }
            }
        `,
      ]
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
                    
                    <div class="date-time">
                        <p class="date">${this.date}</p>
                        <p class="time">${this.time}</p>
                    </div>

                    <div class="alert-message">
                        <svg class="alert-icon" xmlns="http://www.w3.org/2000/svg" style="height: 90px; width: 90px; align-items: center;" viewBox="0 0 24 24"><title>alert-circle-outline</title><path d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z"/></svg>    
                        <div class="message-text-wrapper">
                            <slot>
                                <p class="alert-message-text"></p>
                            </slot>
                        </div>
                        <div class="triangle"></div>
                    </div>

                    <div class="button-wrapper">
                        <button class="close-alert-button" aria-label="collapse" @click="${this.toggleAlert}">
                            <svg class="alert-dismiss" style="height: 14.48px; width: 14.48px;">
                                <path d="M8.939 7.224l5.162-5.162A1.21 1.21 0 1012.39.351l-5.161 5.16L2.067.349A1.21 1.21 0 10.356 2.06l5.159 5.164-5.162 5.162a1.21 1.21 0 101.711 1.711l5.162-5.162 5.162 5.162a1.21 1.21 0 101.711-1.711z" data-name="Icon ionic-ios-close"></path>
                            </svg>
                            <p class="close-alert-button-text">CLOSE</p>
                        </button>
                    </div>
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
        ...super.properties,
        date: { type: String },
        time: { type: String },
        isOpen: { type: Boolean, attribute: "is-open", reflect: true },
        isSticky: { type: Boolean, attribute: "is-sticky", reflect: true },
        issue: { type: String },
      };
    } 
}

globalThis.customElements.define(CampusAlert.tag, CampusAlert);
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
            // display: flex;
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

        .sticky-alert {
            position: sticky;
            top: 0;
            z-index: 100;
            opacity: 1.0;
        }

        .alert-wrapper {
            display: flex;
            //flex-direction: row;
            background-color: var(--general-background-color);
            height: var(--open-alert-height);
            //width: 100%;
        }

        .message-full {
            display: flex;
            flex-direction: row;
            align-items: center;
            //justify-content: center;
            
        }

        .alert-message {
            display: flex;
            height: var(--open-alert-height);
            //flex-grow: 1;
            background-color: var(--message-background-color);
            //padding: 0 10px;
            transform: skew(20deg); 
            align-items: center;
            //margin-left: 2vw;
            //justify-content: center;
            //height: 100%;
            width: 900px;
            //position: relative;
        }

        .alert-message-text{
            transform: skew(-20deg); 
        }

        .date-time {
            text-align: left;
            margin-left: 6vw;
            margin-right: 6vw;
            font-weight: 600;
            font-size: 90%;
            text-transform: uppercase;
            //padding: 0px;
            //line-height: 1.3;
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

        .alert-icon {
            //-webkit-box-flex: 0;
            //-ms-flex: 0 0 90px;
            flex: 0 0 90px;
            height: 90px;
            margin-left: 0;
            margin-right: 24px;
            z-index: 1;
            -ms-flex-item-align: center;
            align-self: center;
            transform: skew(-20deg); 
        }

        .close-alert-button {
            background-color: transparent;
            border-color: transparent;
            
            
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


       `;
    }

    toggleAlert() {
        this.isOpen = !this.isOpen;
        localStorage.setItem("--alert-opened-state", this.isOpen);
    }

    openedAlert() {
        return html` 
            <div class="alert-wrapper ${(this.sticky) ? "sticky-alert" : ""}">
                <div class="message-full">
                    <slot></slot>

                    <div class="date-time">
                        <p class="date">${this.date}</p>
                        <p class="time">${this.time}</p>
                    </div>

                    <div class="alert-message">
                    <!---    
                    <svg class="alert-icon" viewBox="0 0 82 82">
                            <g fill="none" data-name="Path 4286">
                                <path d="M41 0A41 41 0 110 41 41 41 0 0141 0z"></path>
                                <path d="M41 6C21.7 6 6 21.7 6 41s15.7 35 35 35 35-15.7 35-35S60.3 6 41 6m0-6c22.644 0 41 18.356 41 41S63.644 82 41 82 0 63.644 0 41 18.356 0 41 0z"></path>
                            </g>
                            <g fill="#000321" data-name="Group 3036">
                                <path d="M35.232 54.188h10.381v7.786H35.232z" data-name="Rectangle 3589"></path>
                                <path d="M43.378 48.203h-5.854l-3.21-23.669v-4.685h11.81v4.681z" data-name="Path 2763"></path>
                            </g>
                            <circle cx="41" cy="41" fill="none" stroke="#000321" stroke-width="4"></circle>
                        </svg>
                        --->

                        <p class="alert-message-text"><svg xmlns="http://www.w3.org/2000/svg" style="height: 30px; width: 30px; align-items: center;" viewBox="0 0 24 24"><title>alert-circle-outline</title><path d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" /></svg>
                            ${this.alertMessageText}
                        </p>

                        <div class="triangle"></div>
                        <div class="polygon"></div>
                    </div>

                    <div class="button-wrapper">
                        <button class="close-alert-button" aria-label="collapse" @click="${this.toggleAlert}"> Close
                            <svg class="alert-dismiss" viewBox="0 0 14.453 14.449">
                                <path d="M8.939 7.224l5.162-5.162A1.21 1.21 0 1012.39.351l-5.161 5.16L2.067.349A1.21 1.21 0 10.356 2.06l5.159 5.164-5.162 5.162a1.21 1.21 0 101.711 1.711l5.162-5.162 5.162 5.162a1.21 1.21 0 101.711-1.711z" data-name="Icon ionic-ios-close"></path>
                            </svg>
                            <span class="visually-hidden"></span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    closedAlert() {
        return html`
            <div class="message-min ${(this.sticky) ? "sticky-alert" : ""}">
                <button class="expand-alert-button" tabindex="0" aria-label="Open Alert" @click="${this.toggleAlert}">
                    <svg xmlns="http://www.w3.org/2000/svg" style="height: 50px; width: 50px;" viewBox="0 0 24 24"><title>alert-circle-outline</title><path d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z"/></svg>
                    <span class="closed-alert-text">ALERT</span>
                    <svg xmlns="http://www.w3.org/2000/svg" style="height: 50px; width: 50px;" viewBox="0 0 24 24"><title>chevron-down</title><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
                </button> 
            </div>  
        `;
    }


    render() {      
        /*
        if(this.isSticky) {
            if(this.isOpen) {
                return html` <div id="sticky-alert">${this.openedAlert()}</div>`;
            }
            return html` <div id="sticky-alert">${this.closedAlert()}</div>`;
        } 
        */    
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
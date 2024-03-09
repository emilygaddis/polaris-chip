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
      this.isOpen = true;
      this.isSticky = false;
      this.type = "";
    }

    static get styles() {
      return css`
        :host{
            --open-alert-height: 200px;
            --closed-alert-height: 100px;
            // display: flex;
            width: 100%;
            text-align: center;
            justify-content: center;
            background-color: --general-background-color;
        }

        :host([]) .closeButton {
            border-color: transparent;
        }

        :host([isOpen]) .alert-wrapper{
            height: var(--open-alert-height);
        }
        
        :host([isOpen=false]) .alert-wrapper{
            height: var(--closed-alert-height);

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
            //align-items:
            //display: flex;
            //flex-direction: row;
        }

       `;
    }

    toggleAlert() {
        console.log(e.newState);
        if (e.newState === "open") {
          this.isOpen = true;
        }
        else {
          this.isOpen = false;
        }
    }

    render () {      

      return html`  
          
        <div class="alert-wrapper">

            <!---
            <div class="message-min">
                <button class="expand-alert" tabindex="0" aria-label="Open Alert">
                    <svg xmlns="http://www.w3.org/2000/svg" width="82" height="82" viewBox="0 0 82 82" class="alert-icon min" aria-hidden="true"><g transform="translate(-350.099 -428.714)"><g transform="translate(350.099 428.714)" fill="none" stroke-width="6"><circle cx="41" cy="41" r="41" stroke="none"></circle><circle cx="41" cy="41" r="38" fill="none"></circle></g><g transform="translate(384.41 448.566)"><rect width="10.381" height="7.786" transform="translate(0.919 34.336)"></rect><path d="M6520.672,2327.554h-5.854l-3.21-23.669V2299.2h11.81v4.681Z" transform="translate(-6511.607 -2299.203)" class="alert-icon-min"></path></g></g></svg>
                    <span>test</span>
                    <svg class="svg-inline--fa fa-angle-down" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path></svg>     
                </button> 
            </div>  
            --->

            <div class="message-full">
                <slot></slot>

                <div class="date-time">
                    <p class="date">${this.date}</p>
                    <p class="time">${this.time}</p>
                </div>

                <div class="alert-message">
                    <svg class="alert-icon" viewBox="0 0 82 82">
                        <g fill="none" data-name="Path 4286">
                            <path d="M41 0A41 41 0 110 41 41 41 0 0141 0z"></path>
                            <path d="M41 6C21.7 6 6 21.7 6 41s15.7 35 35 35 35-15.7 35-35S60.3 6 41 6m0-6c22.644 0 41 18.356 41 41S63.644 82 41 82 0 63.644 0 41 18.356 0 41 0z"></path>
                        </g>
                        <g fill="#000321" data-name="Group 3036">
                            <path d="M35.232 54.188h10.381v7.786H35.232z" data-name="Rectangle 3589"></path>
                            <path d="M43.378 48.203h-5.854l-3.21-23.669v-4.685h11.81v4.681z" data-name="Path 2763"></path>
                        </g>
                    </svg>

                    <p class="alert-message-text">${this.alertMessageText}</p>
        
                    <div class="triangle"></div>
                    <div class="polygon"></div>
                </div>

                <button class="close-alert-button" aria-label="collapse"> Close
                    <svg class="alert-dismiss" viewBox="0 0 14.453 14.449">
                        <path d="M8.939 7.224l5.162-5.162A1.21 1.21 0 1012.39.351l-5.161 5.16L2.067.349A1.21 1.21 0 10.356 2.06l5.159 5.164-5.162 5.162a1.21 1.21 0 101.711 1.711l5.162-5.162 5.162 5.162a1.21 1.21 0 101.711-1.711z" data-name="Icon ionic-ios-close"></path>
                    </svg>
                    <span class="visually-hidden"></span>
                </button>

            </div>
        </div>
  


                <!---
                    <p class="alert-message-text">${this.alertMessageText}</p>

                
                    <details ?open: !isOpen @toggle="${this.isOpen}">
                        <summary>Description</summary>
                    </details>
                --->
          

            <!---
            <div class="is-open">
                <button class="closeButton"> X Close </button>
            </div>
            --->
        
      `;
    }

    static get properties() {
      return {  
        date: { type: String },
        time: { type: String },
        alertMessageText: { type: String, attribute: "alert-message-text" },
        isOpen: { type: Boolean, attribute: "is-open", reflect: true },
        isSticky: { type: Boolean, attribute: "is-sticky", reflect: true },
        type: { type: String },
      };
    } 
}

globalThis.customElements.define(CampusAlert.tag, CampusAlert);
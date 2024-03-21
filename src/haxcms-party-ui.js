import { html, css } from 'lit';
import { DDD } from "./d-d-d/d-d-d/d-d-d.js";
import "@lrnwebcomponents/rpg-character/rpg-character.js";

export class HaxcmsPartyUI extends DDD {

    static get tag() {
        return 'haxcms-party-ui';
    }

    constructor() {
        super();
        this.items = [];
    }

    static get styles() {
        return [
          super.styles,
          css`
            :host {
                display: block;
            }

            .party-ui-wrapper {
                margin: var(--ddd-spacing-2) var(--ddd-spacing-0);
                height: 50px;
                background-color: var(--ddd-theme-default-keystoneYellow);
            }


          `;
        ]
    }

    

    render() {
        return html`
            <h1></h1>
            <div class="party-ui-wrapper">
                <div class="input-wrapper">
                    <input type="text">
                    <button class="add-btn"></button>
                </div>
                <div class="user-character-wrapper">
                    <rpg-character></rpg-character>
                </div>
                <button class="save-btn"></button>
            </div>
        `;
    }

    static get properties() {
        return {  
            ...super.properties,
            items: { type: Array },
        };
    }

}

globalThis.customElements.define(HaxcmsPartyUI.tag, HaxcmsPartyUI);
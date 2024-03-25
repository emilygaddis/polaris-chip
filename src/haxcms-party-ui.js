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
                text-align: center;
                margin: var(--ddd-spacing-10);
            }

            .party-ui-wrapper {
                background-color: var(--ddd-theme-default-keystoneYellow);
            }

            .input-wrapper {
                padding: var(--ddd-spacing-2);
            }

            .user-character-wrapper {
                padding: var(--ddd-spacing-4);
            }

            .save-btn {
                margin: var(--ddd-spacing-2);
            }
        `];
    } 

    /*

    addItem(e) {
        const randomNumber = globalThis.crypto.getRandomValues(new Uint32Array(1))[0];
    
        const item = {
          id: randomNumber,
          title: "Cool",
        }

        console.log(item);
        // push by itself is not a mutating operation
        this.items.push(item);
        this.requestUpdate();
        //this.items = [...this.items, item];
        console.log(this.items);
    }
    
    targetClicked(e) {
        // what item bubbled the event
        console.log(e.target);
        // a way of seleecting the closest tag relative to what you clicked
        console.log(e.target.closest('my-item'));
        console.log(e.target.closest('my-item').getAttribute('data-id'));
        // other ways of knowing what to eliminate but this is one method
        this.shadowRoot.querySelectorAll('my-item').forEach((item) => {
        if (item === e.target.closest('my-item')) {
            console.log(item);
            console.log('found the thing clicked in the array');
        }

        // another way of finding the index that matches what was clicked if you have a unique value in your items as added
        // which... seed / name of the user should be enforced to be unique so.....
        const index = this.items.findIndex((item) => {
            return item.id === parseInt(e.target.closest('my-item').getAttribute('data-id'));
        });
        console.log(index);
    });
    */
    

    render() {
        return html`
            <div class="party-ui-wrapper">
                <div class="input-wrapper">
                    <input type="text">
                    <button class="add-btn">Add</button>
                </div>

                <div class="user-character-wrapper">
                    <!--${this.items.map((item) => html`                        <div class="user-item">
                        <rpg-character></rpg-character>
                    `)} -->
                    <rpg-character></rpg-character>

                </div>

                <button class="save-btn">Save</button>
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
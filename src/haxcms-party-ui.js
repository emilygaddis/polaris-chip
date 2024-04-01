import { html, css } from 'lit';
import { DDD } from "./d-d-d/d-d-d/d-d-d.js";
import "@lrnwebcomponents/rpg-character/rpg-character.js";

export class HaxcmsPartyUI extends DDD {

    static get tag() {
        return 'haxcms-party-ui';
    }

    constructor() {
        super();
        this.users = [];
        this.userName = "";
    }

    static get styles() {
        return [
          super.styles,
          css`
            :host {
                text-align: center;
            }

            .party-ui-wrapper {
                background-color: var(--ddd-theme-default-creekLight);
                border: var(--ddd-border-xs);
                border-color: var(--ddd-theme-default-potential70);
                border-radius: var(--ddd-radius-sm);
                margin: var(--ddd-spacing-10);
            }

            .input-wrapper {
                padding: var(--ddd-spacing-2);
            }

            .user-character-wrapper {
                //display: inline-flex;
                flex-direction: row;
                width: 100px;
                //align-items: center;
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
            }

            .character-wrapper {
                width: 100px;
                margin: 10px; /* Adjust margin as needed for spacing */
                text-align: center;
                position: relative; /* Ensure positioning context */
            }

            .delete-button {
                position: absolute;
                top: 0;
                right: 0;
                background-color: var(--ddd-theme-default-creekLight);
                border: none;
            }

            .user-character {
                text-align: center;
                display: block;
            }

            .character-name {
                background-color: none;
            }

            .input-text, .add-btn {
                border: var(--ddd-border-xs);
                border-color: var(--ddd-theme-default-potential70);
                border-radius: var(--ddd-radius-xs);         
            }
        
            .save-btn {
                margin: var(--ddd-spacing-2);
                border: var(--ddd-border-xs);
                border-color: var(--ddd-theme-default-potential70);
                border-radius: var(--ddd-radius-xs);         
            }

            button:hover {
                background-color: var(--ddd-theme-default-creekTeal);
                color: white;
            }
        `];
    } 

    addUser(e) {
        
        // Check if the userName is empty
        if (!this.userName.trim()) {
        alert('Please enter a name for the character.');
        return; // Prevent further execution
        }

        const randomNumber = globalThis.crypto.getRandomValues(new Uint32Array(1))[0];
    
        const user = {
          id: randomNumber,
          name: this.userName,
        }

        // Clear the input field by setting its value to an empty string
        const inputField = this.shadowRoot.querySelector('.input-text');
        inputField.value = '';

        console.log(user);
        // push by itself is not a mutating operation
        this.users.push(user);
        this.requestUpdate();
        //this.items = [...this.items, item];
        console.log(this.users);
    }

    updateUsername(e) {
        this.userName = e.target.value;
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.addUser();
        }
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
    }

    render() {
        return html`
            <div class="party-ui-wrapper">
                <div class="input-wrapper">
                    <input class="input-text" type="text" placeholder="Username" @input="${this.updateUsername}" @keydown="${this.handleKeyPress}">
                    <button class="add-btn" @click="${this.addUser}">Add</button>
                </div>

                <div class="user-character-wrapper">
                    ${this.users.map((user, index) => html`                        
                    <div class="character-wrapper">
                           <button class="delete-button" @click="${() => this.removeUser(user)}">x</button>
                           <rpg-character class="user-character" seed="${user.name}"></rpg-character>
                           <p class="character-name">${user.name}</p>
                    </div>
                    ${index > 0 && (index + 1) % 4 === 0 ? html`<div class="clear-row"></div>` : ''}
                    `)}
                </div>


                <button class="save-btn">Save</button>
            </div>
        `;
    }

    static get properties() {
        return {  
            ...super.properties,
            users: { type: Array },
            userName: { type: String },
        };
    }

}

globalThis.customElements.define(HaxcmsPartyUI.tag, HaxcmsPartyUI);
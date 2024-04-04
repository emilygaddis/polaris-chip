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
        this.showUsersList = false;
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
                border: var(--ddd-border-sm);
                border-color: var(--ddd-theme-default-potential70);
                border-radius: var(--ddd-radius-sm);
                margin: var(--ddd-spacing-10);
            }

            .input-wrapper {
                padding: var(--ddd-spacing-2);
            }

            .user-character-wrapper {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;   
                padding: var(--ddd-spacing-4);                
                margin: auto;
            }

            .character-wrapper {
                width: 180px;
                text-align: center;
                margin: var(--ddd-spacing-4);
                border: var(--ddd-border-sm);
                border-color: var(--ddd-theme-default-potential70);   
                border-radius: var(--ddd-radius-sm);  
                box-shadow: var(--ddd-boxShadow-sm);
            }

            .user-character {
                width: 120px;
                margin-top: var(--ddd-spacing-4);
            }

            .character-name {
                background-color: none;
                margin: var(--ddd-spacing-4);
                font-family: var(--ddd-font-navigation);
                overflow-x: auto;
            }

            .delete-button {
                border: var(--ddd-border-xs);
                border-color: var(--ddd-theme-default-potential70);
                border-radius: var(--ddd-radius-xs);    
                margin-bottom: var(--ddd-spacing-4);
                font-family: var(--ddd-font-navigation);
            }

            .input-text, .add-btn {
                border: var(--ddd-border-xs);
                border-color: var(--ddd-theme-default-potential70);
                border-radius: var(--ddd-radius-xs);      
                font-family: var(--ddd-font-navigation);
            }

            .add-btn:disabled {
                background-color: var(--ddd-theme-default-limestoneGray);
                color: var(--ddd-theme-default-limestoneMaxLight);
                cursor: not-allowed;
            }
        
            .save-btn {
                border: var(--ddd-border-xs);
                border-color: var(--ddd-theme-default-potential70);
                border-radius: var(--ddd-radius-xs);  
                font-family: var(--ddd-font-navigation);
                margin-bottom: var(--ddd-spacing-4);
            }

            button:hover {
                background-color: var(--ddd-theme-default-creekTeal);
                color: white;
            }

            .users-list {
                margin-bottom: var(--ddd-spacing-4);
                font-family: var(--ddd-font-navigation);
            }

            #success-text {
                margin-bottom: var(--ddd-spacing-2);
                margin-top: var(--ddd-spacing-0);
            }
        `];
    } 

    addUser(e) {
        if (!/^[a-zA-Z0-9]+$/.test(this.userName.trim())) {
            alert('Please do not use spaces or special characters');
            return;
        }

        if (this.users.some(user => user.name === this.userName)) {
            alert("This user already exists.");
            return;
        }

        const randomNumber = globalThis.crypto.getRandomValues(new Uint32Array(1))[0];
    
        const user = {
          id: randomNumber,
          name: this.userName.toLowerCase().trim(),
        }

        // Clear the input field by setting its value to an empty string
        const inputField = this.shadowRoot.querySelector('.input-text');
        inputField.value = "";
        this.userName = "";
        this.shadowRoot.querySelector('.input-text').focus;

        console.log(user);
        // push by itself is not a mutating operation
        this.users.push(user);
        this.requestUpdate();
        //this.items = [...this.items, item];
        console.log(this.users);
    }

    removeUser(e) {
        this.users = this.users.filter(user => user.id !== parseInt(e.target.getAttribute("data-user-id")));
    }

    saveCharacters() {
        /*
        if(this.users.length === 0) {
            alert("No Users.");
            return;
        }
        */
        this.makeItRain();
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

    toggleUsersList(e) {
        const target = e.target;
    
        if (target.classList.contains('save-btn')) {
            // If the "Save Characters" button is clicked, set showUsersList to true
            this.showUsersList = true;
        } else {
            // If anything else on the UI is clicked, set showUsersList to false
            this.showUsersList = false;
        }
    }

    makeItRain() {
        import("@lrnwebcomponents/multiple-choice/lib/confetti-container.js").then(
          (module) => {
            setTimeout(() => {
              this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
            }, 0);
          }
        );
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
            <confetti-container id="confetti">
            <div class="party-ui-wrapper" @click="${this.toggleUsersList}">
                <div class="input-wrapper">
                    <input class="input-text" type="text" placeholder="Username" @input="${this.updateUsername}" @keydown="${this.handleKeyPress}">
                    <button class="add-btn" @click="${this.addUser}" ?disabled="${this.userName === ""}">Add</button>
                </div>

                <div class="user-character-wrapper">
                    ${this.users.map((user, index) => html`                        
                    <div class="character-wrapper">
                           <rpg-character class="user-character" seed="${user.name}"></rpg-character>
                           <p class="character-name">${user.name}</p>
                           <button class="delete-button" data-user-id="${user.id}" @click="${this.removeUser}">Delete</button>
                    </div>
                    `)}
                </div>

                <button class="save-btn" @click="${this.saveCharacters}">Save Characters</button>
                <!-- Users list (conditionally rendered) -->
                ${this.showUsersList ? html`
                    <p id="success-text">SUCCESS!</p>
                    <div class="users-list">
                        ${JSON.stringify(this.users, null, 2)}
                    </div>
                ` : ''}
            </div>
            </confetti-container>
        `;
    }

    static get properties() {
        return {  
            ...super.properties,
            users: { type: Array },
            userName: { type: String },
            showUsersList: { type: Boolean },
        };
    }

}

globalThis.customElements.define(HaxcmsPartyUI.tag, HaxcmsPartyUI);
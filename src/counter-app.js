import { LitElement, html, css } from 'lit';

export class CounterApp extends LitElement{
    
    static get tag() {
      return 'counter-app';
    }

    constructor() {
      super();
      this.number = 0;
      this.min = 0;
      this.max = 25;
    }

    static get styles() {
        return css`
          :host{
            display: block;
            background-color: pink;
            padding: 20px;
            margin: 12px;
            width: 300px;
            text-align: center;
          }

          .number {
            font-size: 65px;
          }

          .subtract-button {
            font-size: 40px;
            width: 50px;
            text-align: center;
          }

          .add-button {
            font-size: 40px;
            width: 50px;
            text-align: center;
          }

          button:focus {
            outline: none;
            box-shadow: 15px, 5px, 5px;
          }

          button:hover {
            color: purple;
          }

          button:disabled {
            opacity: 0.5;
          }

        `;
      }

      render() {
        var textColor = "black";
        if(this.number === this.max) {textColor = "red"};
        if(this.number === this.min) {textColor = "purple"};
        if(this.number === 18) {textColor = "blue"};
        if(this.number === 21) {textColor = "yellow"};

        return html`
          <confetti-container id="confetti">
          
          <div class = "counter-card">
            <h1 class = "number" style="color:${textColor}">${this.number}</h1>
            <div class = "button-wrapper">
              <button class="subtract-button" @click="${this.decrement}" ?disabled="${this.min === this.number}">-</button>
              <button class="add-button" @click="${this.increment}" ?disabled="${this.max === this.number}">+</button>
            </div>
          </div>
          </confetti-container>
        `;
      }

      decrement() {
        if (this.number > this.min) {
          this.number--;
        }
      }

      increment() {
        if (this.number < this.max) {
          this.number++;
        }
      }

      updated(changedProperties) {
        if (changedProperties.has('number')) {
          // do your testing of the value and make it rain by calling makeItRain
          if (this.number === 21) {
            this.makeItRain();
          }
        }
      }
      
      makeItRain() {
        // this is called a dynamic import. It means it won't import the code for confetti until this method is called
        // the .then() syntax after is because dynamic imports return a Promise object. Meaning the then() code
        // will only run AFTER the code is imported and available to us
        import("@lrnwebcomponents/multiple-choice/lib/confetti-container.js").then(
          (module) => {
            // This is a minor timing 'hack'. We know the code library above will import prior to this running
            // The "set timeout 0" means "wait 1 microtask and run it on the next cycle.
            // this "hack" ensures the element has had time to process in the DOM so that when we set popped
            // it's listening for changes so it can react
            setTimeout(() => {
              // forcibly set the poppped attribute on something with id confetti
              // while I've said in general NOT to do this, the confetti container element will reset this
              // after the animation runs so it's a simple way to generate the effect over and over again
              this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
            }, 0);
          }
        );
      }

      static get properties() {
        return {  
          number: { type: Number, reflect: true },
          min: { type: Number },
          max: { type: Number },
        };
      }   
      
    
}

globalThis.customElements.define(CounterApp.tag, CounterApp);

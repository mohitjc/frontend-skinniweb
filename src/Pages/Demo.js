import {html, css, LitElement} from 'lit';

// A plain Lit component which can be used in any framework
export class Demo extends LitElement {
  static properties = {
    name: {},
  };
  static styles = css`
    p {
      display: inline-block;
      border: solid 1px gray;
      background: white;
      padding: 0 1em;
    }
  `;

  constructor() {
    super();
    this.name = 'Somebody';
  }

  render() {
    return html`<p>Hello, ${this.name}!</p>`;
  }
}
customElements.define('demo-greeting', Demo);

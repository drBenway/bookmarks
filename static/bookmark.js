class BookMark extends HTMLElement {
  constructor() {
    super();


    // We attach an open shadow root to the custom element
    const shadowRoot = this.attachShadow({mode: 'open'});

    // We define some inline styles using a template string


    const styles = `

    
    figure {
      font-family: 'Roboto', sans-serif;
      display: block;
      position: relative;
      float: left;
      overflow: hidden;
      margin: 0 20px 20px 0;
      border: 1px solid black;
      width: 300px;
      height: 200px;
      
    }
    figure img{
      width: 100%;
      height: 100%;
    }
    figcaption {
      position: absolute;
      background: black;
      background: rgba(0,0,0,0.75);
      color: white;
      padding: 10px 20px;
      opacity: 0;
      -webkit-transition: all 0.6s ease;
      -moz-transition:    all 0.6s ease;
      -o-transition:      all 0.6s ease;
      width: 100%;
      height: 50%;
    }
    figure:hover figcaption {
      opacity: 1;
    }
    

  
  .cap-left figcaption { bottom: 0; left: -30%; }
  .cap-left:hover figcaption { left: 0; }


  .cap-right figcaption { bottom: 0; right: -30%; }
  .cap-right:hover figcaption { right: 0; }


  .cap-top figcaption { left: 0; top: -30%; }
  .cap-top:hover figcaption { top: 0; }


  .cap-bot figcaption { left: 0; bottom: -30%;}
  .cap-bot:hover figcaption { bottom: 0; }
    `;


    // We provide the shadow root with some HTML
    shadowRoot.innerHTML = `
            <style>${styles}</style>
        `;


  }

  static get observedAttributes() {
    return ['href', 'src'];
  }

  get href() {
    console.log('gethref');
    return this.getAttribute('href');
  }

  set href(newValue) {
    this.setAttribute('href', newValue);
  }

  get src() {
    console.log('getsrc');
    return this.getAttribute('src');
  }

  set src(newValue) {
    this.setAttribute('src', newValue);
  }

  connectedCallback() {
    let fig = document.createElement('figure');
    fig.classList.add('cap-bot');

    let figcap = document.createElement('figcaption');
    figcap.innerText = `${this.href}`;

    let link = document.createElement('a');
    link.setAttribute('href', this.href);

    let img = document.createElement('img');
    img.setAttribute('src', this.src);
    img.setAttribute('class', 'bookmark');

    link.appendChild(img);
    link.appendChild(figcap);
    fig.appendChild(link);
    this.shadowRoot.appendChild(fig);
  }


}

// This is where the actual element is defined for use in the DOM
customElements.define('book-mark', BookMark);

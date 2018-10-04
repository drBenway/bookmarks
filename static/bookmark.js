class BookMark extends HTMLElement {
    constructor() {
        super();


        // We attach an open shadow root to the custom element
        const shadowRoot = this.attachShadow({mode: 'open'});

        // We define some inline styles using a template string
        const styles = `
            .bookmark{
                border: 1px solid black;
                width: 300px;
                height: 200px;
             }
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

    get src(){
        console.log('getsrc');
        return this.getAttribute('src');
    }
    set src(newValue){
        this.setAttribute('src', newValue);
    }

    connectedCallback(){
        let link = document.createElement('a');
        link.setAttribute('href', this.href);
        let img = document.createElement('img');
        img.setAttribute('src', this.src);
        img.setAttribute('class', 'bookmark');
        link.appendChild(img);
        this.shadowRoot.appendChild(link);
    }



}

// This is where the actual element is defined for use in the DOM
customElements.define('book-mark', BookMark);
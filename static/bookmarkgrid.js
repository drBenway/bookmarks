class BookMarkGrid extends HTMLElement {

  constructor() {
    super();


    // We attach an open shadow root to the custom element
    const shadowRoot = this.attachShadow({mode: 'open'});

    // We define some inline styles using a template string
    const styles = `
          book-mark{
            width: 300px;
          }
        `;


    // We provide the shadow root with some HTML
    shadowRoot.innerHTML = `
            <style>${styles}</style>
        `;


  }


  connectedCallback() {
    this.fetchData(this);
  }

  fetchData(el) {
    let shadowRoot = el.shadowRoot;
    fetch('http://localhost:3000/api/bookmarks')
      .then(
        function (response) {
          if (response.status !== 200) {
            console.log(response);
            return;
          }
          response.json().then(function (data) {
            data.forEach(function (element) {
              let bookmark = document.createElement('book-mark');
              bookmark.setAttribute('href', element.url);
              bookmark.setAttribute('src', element.thumb);
              bookmark.setAttribute('data-id', element.id);
              shadowRoot.appendChild(bookmark);
            })
          })
        });
  }


}

// This is where the actual element is defined for use in the DOM
customElements.define('book-mark-grid', BookMarkGrid);

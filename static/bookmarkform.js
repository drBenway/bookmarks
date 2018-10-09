class BookMarkForm extends HTMLElement {


  /* ---------------- CONSTRUCTOR  ------------------------*/


  constructor() {
    super();
    this.preview = "thumb/default.png";

    // We attach an open shadow root to the custom element
    const shadowRoot = this.attachShadow({mode: 'open'});

    // We define some inline styles using a template string
    const styles = `
            .bookmarkform{
                border: 1px solid black;
                width: 450px;
                height: 300px;
                display: grid;
                grid-template-columns: 200px 250px;
             }

             #preview{
         
                border: 1px solid black;
             }
             #preview img{
                width: 200px;
                height: 150px;
              }
             #metadata{
            display: grid;
            grid-template-columns: 50px 1fr;
            grid-auto-rows: minmax(20px, 50px);
            border: 1px solid black;             
             }
             #metadata input {
             height: 20px;
             }
             
        `;


    // We provide the shadow root with some HTML
    shadowRoot.innerHTML = `
            <style>${styles}</style>
            <form  class="bookmarkform">
                <div id="preview">
                <img src="${this.preview}" id="previewthumb"/>
                <div id="takeScreenshot" />takescreenshot</div>
                </div>
                <div id="metadata">
                <label for="url">url:</label>
                <input type="text" id="url" value="${this.url}" />
                <label for="tags">tags:</label>
                <input type="text" id="tags" value="${this.tags}" />
                <input type="submit" id="submit" onclick="submitForm()" return false />
                </div>
            </form>
        `;


  }



  /* ---------------- CALLBACKS  ------------------------*/

  connectedCallback() {
    this.addBtnEventListener(this);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log('Custom square element attributes changed.');
    //updateStyle(this);
  }


  /* ---------------- ATRIBUTES  ------------------------*/
 get url() {
   return this.getAttribute('url');
  }
  set url(newvalue){
    this.setAttribute('url', newvalue);
  }



  get tags() {
    return this.getAttribute('tags').split(',');
  }

  set tags(newvalue){
   this.setAttribute('tags', newvalue.toString());
  }


  getFormUrl (){
    return this.shadowRoot.getElementById('url').value;
  }
  getFormTags(){
   return this.shadowRoot.getElementById('tags').value;
  }

  addBtnEventListener(el) {
    const shadow = el.shadowRoot;
    const btn_scrnshot = shadow.querySelector("#takeScreenshot");
    btn_scrnshot.addEventListener('click',this.takeScreenshot.bind(el));
  }


  submitForm() {

    if (this.hasUrl() && this.hasTags()) {
      var bodystring = 'url=' + this.getFormUrl() + '&tags=' + this.getFormTags() + '&thumb=' + this.preview;
      fetch('api/bookmarks', {
        method: 'post',
        headers: {
          "content-type": "application/x-www.form-urlencoded; charset=UTF-8"
        },
        body: bodystring
      })
    }
  }

  updatePreview(url){
   let tag = this.shadowRoot.getElementById('previewthumb');
   console.log(tag);
   tag.setAttribute('src', url);
  }



  resolveScreenshot(response) {
    console.log('3.resolve screenshot triggered');
    let self = this;
    if (response.status !== 200) {
      console.log('Looks like there was a problem. Status Code: ' +
        response.status);
      return;
    }

    // Examine the text in the response
    response.json().then(function (data) {
      console.log('4.' + data);
      self.preview = data.thumb;
      console.log(self.preview);
      setTimeout(function(){self.updatePreview(self.preview)},2000);

    });

  }



  takeScreenshot() {
    let that = this;
    console.log('1.takescreenshot' + that.getFormUrl());
    let url = "http://localhost:3000/api/screenshots?url=" + that.getFormUrl();
      fetch(url).then((response)=>{
        console.log(' 2.calling resolve screenshot');
        that.resolveScreenshot(response);
        }
      )
        .catch(function (err) {
          console.log('Fetch Error :-S', err);
        });
    }


}


// This is where the actual element is defined for use in the DOM
customElements.define('book-mark-form', BookMarkForm);



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
            
                font-family: 'Roboto', sans-serif;
                margin: 0px;
                padding: 0px;
                max-width: 450px;
                max-height: 200px;
                display: grid;
                grid-template-columns: 200px 240px;
                grid-gap: 10px;
             }

             #preview{
             }
             #preview img{
                width: 198px;
                height: 150px;
                border: 1px solid black;
              }
              
             #metadata{
            display: grid;
            grid-template-columns: 50px 1fr;
            grid-auto-rows: minmax(20px, 50px);
            column-gap: 10px;
                         
             }
             #metadata input {
             height: 20px;
             padding: 5px;
             }
             .btn {
                background-color: #333C4E;
                color: white;
                border: 1px solid black;
                border-left-color: darkgray;
                border-top-color: darkgray;
                background-color: #AAAAAA;
                font-weight: normal;
                text-align: center;
                padding: 10px
             }
             .btn:hover{
                border: 1px solid black;
                border-bottom-color: darkgrey;
                border-right-color: darkgrey;
                font-weight: bold;
             }
             .btn.disable, .btn.disable:hover {
                border: 1px solid black;
                border-bottom-color: darkgrey;
                border-right-color: darkgrey;
                font-weight: normal;
             }
             .header{
                background-color: #22A5F4; 
                color: white;
                text-align: center;
             }
             
        `;


    // We provide the shadow root with some HTML
    shadowRoot.innerHTML = `
            <style>${styles}</style>
            
            <form  class="bookmarkform">
            
                <div id="preview">
                <img src="${this.preview}" id="previewthumb"/>
                <div id="takeScreenshot" class="btn"/>take screenshot</div>
                </div>
                <div id="metadata">
                <label for="url">url:</label>
                <input type="text" id="url" value="${this.url}" />
                <label for="tags">tags:</label>
                <input type="text" id="tags" value="${this.tags}" />
                <div></div>
                <div class="btn" id="submit" />Submit</div>
                
            </form>
        `;


  }



  /* ---------------- CALLBACKS  ------------------------*/

  connectedCallback() {
    this.addBtnEventListener(this);
    this. enableSubmit();
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

  disableSubmit(){
   const submitbtn = this.shadowRoot.getElementById('submit');
    submitbtn.removeEventListener('click',this.submitForm.bind(this));
    submitbtn.classList.add('disable');
  }

  enableSubmit(){
    const submitbtn = this.shadowRoot.getElementById('submit');
    submitbtn.addEventListener('click', this.submitForm.bind(this));
    submitbtn.classList.remove('disable');
  }

  setAwaitingAnimation(){
   const shadowroot = this.shadowRoot
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
    console.log('submit form');
    if (this.url !== '' && this.tags !== []) {
      let bodystring = {url: this.url,tags: this.tags,thumb: this.preview};
      fetch('http://localhost:3000/api/bookmarks',
        {
          method: 'post',
          body: JSON.stringify(bodystring),
          headers: new Headers({"Content-Type": "application/json"})
        });
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
      self.updatePreview(self.preview)
      //setTimeout(function(){self.updatePreview(self.preview)},2000);

    });

  }



  takeScreenshot() {
    let that = this;

    let url = "http://localhost:3000/api/screenshots?url=" + that.getFormUrl();
    // show an animation in the preview
    this.updatePreview('thumb/waiting.gif');
    this.disableSubmit();
    console.log('1.takescreenshot: ' + url);
      fetch(url).then((response)=>{
        console.log(' 2.calling resolve screenshot');
        that.resolveScreenshot(response);
        that.enableSubmit();
        }
      )
        .catch(function (err) {
          console.log('Fetch Error :-S', err);
        });
    }


}


// This is where the actual element is defined for use in the DOM
customElements.define('book-mark-form', BookMarkForm);



class BookMarkForm extends HTMLElement {


  /* ---------------- CONSTRUCTOR  ------------------------*/


  constructor() {
    super();
    this.preview = "thumb/default.png";
    this.submitable = true;

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
    this.addScreenshotEventListener(this);
    this.enableSubmit(this);
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

  disableSubmit(el){
   const submitbtn = this.shadowRoot.getElementById('submit');
    submitbtn.classList.add('disable');
    // replacing with clone, had issues when tyring to use remove event
   const clone = submitbtn.cloneNode(true);
    submitbtn.parentNode.replaceChild(clone, submitbtn);
  }

  enableSubmit(el){
   this.submitable = true;
    const submitbtn = this.shadowRoot.getElementById('submit');
    submitbtn.addEventListener('click', this.submitForm.bind(el),true);
    submitbtn.classList.remove('disable');
  }


  getFormUrl (){
    return this.shadowRoot.getElementById('url').value;
  }
  getFormTags(){
   return this.shadowRoot.getElementById('tags').value;
  }


  addScreenshotEventListener(el) {
    const shadow = el.shadowRoot;
    const btn_scrnshot = shadow.querySelector("#takeScreenshot");
    const takescrnsht = this.takeScreenshot.bind(el);
    btn_scrnshot.addEventListener('click',takescrnsht,true);
  }


  submitForm() {
    if (this.url !== '' && this.tags !== [] && this.submitable === true) {
      let bodystring = {url: this.url,tags: this.tags,thumb: this.preview};
      fetch('http://localhost:3000/api/bookmarks',
        {
          method: 'post',
          body: JSON.stringify(bodystring),
          headers: new Headers({"Content-Type": "application/json"})
        }).then(function(){
        window.location.reload();
      });
    }
  }




  updatePreview(url){
   let tag = this.shadowRoot.getElementById('previewthumb');
   tag.setAttribute('src', url);
  }



  resolveScreenshot(response) {
    let self = this;
    if (response.status !== 200) {
      console.log('Looks like there was a problem. Status Code: ' +
        response.status);
      return;
    }

    // Examine the text in the response
    response.json().then(function (data) {
      self.preview = data.thumb;
      self.updatePreview(self.preview)
    });

  }


  takeScreenshot() {
    let that = this;

    let url = "http://localhost:3000/api/screenshots?url=" + that.getFormUrl();
    // show an animation in the preview
    this.updatePreview('thumb/waiting.gif');
    this.disableSubmit(this);
      fetch(url).then((response)=>{
        that.resolveScreenshot(response);
        that.enableSubmit(this);
        }
      )
        .catch(function (err) {
          console.log('Fetch Error :-S', err);
        });
    }


}


// This is where the actual element is defined for use in the DOM
customElements.define('book-mark-form', BookMarkForm);

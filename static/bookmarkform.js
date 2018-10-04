class BookMarkForm extends HTMLElement {
    constructor() {
        super();


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
        const preview = "thumb/default.png";

        // We provide the shadow root with some HTML
        shadowRoot.innerHTML = `
            <style>${styles}</style>
            <form  class="bookmarkform">
                <div id="preview">
                <img src="${preview}" />
                <input type="submit" value="<" />
                <input type="submit" value=">" />
                <input type="submit" value="screenshot" id="takescreenshot"/>
                </div>
                <div id="metadata">
                <label for="url">url:</label>
                <input type="text" id="url" />
                <label for="tags">tags:</label>
                <input type="text" id="tags" />
                <input type="submit" id="submit" />
                </div>
            </form>
        `;


    }



    connectedCallback() {

    }
    hasUrl(){
        return true ;
    }
    hasTags(){
        return true ;
    }
    getScreenshot(){

    }
    addBtnEventListener(el){
        el.addEventListener('onclick',()=>{this.submitForm()});
    }
    submitForm(){
        if(this.hasUrl()&&this.hasTags()){
            fetch('api/bookmarks',{
                method: 'post',
                headers: {
                    "content-type" : "application/x-www.form-urlencoded; charset=UTF-8"
                },
                body: 'url = http://www.westworld.be&tags=private,public&thumb=thumb/1AZERAZERQSQZEAZE.png'
            })
        }
    }

}

// This is where the actual element is defined for use in the DOM
customElements.define('book-mark-form', BookMarkForm);
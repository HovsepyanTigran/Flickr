class Flickr {
    constructor(options) {
        this.container = options.container;
        //this.api_token = api_token;
        //this.images_limit = images_limit;
        if(this.container) this.drawInput();
    }
    drawInput() {
        document.querySelector('.flickr-wrapper__button-start').onclick = function() {
            document.querySelector('.flickr-wrapper__button-start').style.visibility = 'hidden';
                
            var flickrSearcher = document.createElement('div');  
            flickrSearcher.classList.add("flickr-searcher");
            document.querySelector('.flickr-container').append(flickrSearcher);

            var flickrInput = document.createElement('input');
            flickrInput.classList.add("flickr-input");
            document.querySelector('.flickr-searcher').append(flickrInput);
        
            var flickrSubmit = document.createElement('input');
            flickrSubmit.classList.add("flickr-submit");
            flickrSubmit.type = "submit";
            document.querySelector('.flickr-searcher').append(flickrSubmit);
            var strArr;
            flickrSubmit.onclick = (function() {
                strArr = flickrInput.value.split(/[,.\s]/).filter(function(item) {
                return item.length != 0});
                console.log(strArr);
            })
        }
    }
}



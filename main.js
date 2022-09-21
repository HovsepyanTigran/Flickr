class Flickr {
    constructor(options) {
        this.container = options.container;
        //this.api_token = api_token;
        //this.images_limit = images_limit;
        if(this.container) this.render();
    }
    render() {
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
                let flickrImgs = document.createElement('div');
                flickrImgs.classList.add("flickr-imgs");
                document.querySelector('.flickr-container').append(flickrImgs);
                var key = '979b6782aab93b8ca2f3fce0f80b652d'
                
                strArr.map(function(item) {
                    let url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + key + '&tags=' + item + '&per_page=5&page=3&format=json&nojsoncallback=1'
                fetch(url).then(function(resp) {
                    return resp.json()
                }).then(function(j) {
                    return j.photos.photo.map((pic) => {
                let srcPath = 'https://farm'+pic.farm+'.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg';
                let img = document.createElement('img');
                img.classList.add("img");
                flickrImgs.append(img);
                img.src = srcPath
                }
                )
                })
                })
                strArr.map(function(item) {
                    item = document.createElement('div');
                    item.classList.add("flickr-boxes");
                document.querySelector('.flickr-container').append(item);
                })
                
            })
        }
    }
                    
}



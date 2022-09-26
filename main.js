class Flickr {
  constructor(options) {
    this.container = options.container;
    this.options = {};
    this.options.api_token =
      options.api_token || "979b6782aab93b8ca2f3fce0f80b652d";
    this.options.per_page = options.images_limit || 5;
    this.options.api_url = "https://api.flickr.com/services/rest/?method=flickr.photos.search";
    this.images = [];
    if (this.container) this.render();
  }
  render() {
    var flickrSearcher = document.createElement("div");
    flickrSearcher.classList.add("flickr-searcher");
    this.container.append(flickrSearcher);

    var flickrInput = document.createElement("input");
    flickrInput.classList.add("flickr-input");
    flickrSearcher.append(flickrInput);

    var flickrSubmit = document.createElement("input");
    flickrSubmit.classList.add("flickr-submit");
    flickrSubmit.type = "submit";
    flickrSearcher.append(flickrSubmit);
    var strArr;
    flickrSubmit.onclick = () => {
      strArr = flickrInput.value.split(/[,.\s]/).filter(function (item) {
        return item.length != 0;
      });
      let flickrImgs = document.createElement("div");
      flickrImgs.classList.add("flickr-imgs");
      this.container.append(flickrImgs);

      strArr.map(async (item) => {
        let url =
          this.options.api_url +
          "&api_key=" +
          this.options.api_token +
          "&tags=" +
          item +
          "&per_page=" +
          this.options.per_page +
          "&page=3&format=json&nojsoncallback=1";
        let result = await fetch(url);

        try{
            result = await result.json();
        }catch(ex){
            console.log(ex)
        }
        
        let photos = result.photos.photo;

        photos.map((pic) => {
            let srcPath =
              "https://farm" +
              pic.farm +
              ".staticflickr.com/" +
              pic.server +
              "/" +
              pic.id +
              "_" +
              pic.secret +
              ".jpg";

            let flickrImgsImg = document.createElement("img");
            flickrImgsImg.classList.add("flickr-imgs__img");
            flickrImgs.append(flickrImgsImg);
            flickrImgsImg.src = srcPath;

            this.images.push({srcPath})
            this.images.push(flickrImgsImg);
            function shuffleArray(array) {
              for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
              }
              return array;
            }
            shuffleArray(this.images);
            
          });

        
      });
      let dragged = null;


      let flickrBoxes = document.createElement("div");
      flickrBoxes.classList.add("flickr-boxes");
      this.container.append(flickrBoxes);

      for (let i = 0; i < strArr.length; i++) {
        let flickrBoxesBox = document.createElement("div");
        flickrBoxesBox.classList.add("flickr-boxes__box");
        document.querySelector(".flickr-boxes").append(flickrBoxesBox);
      }

      let showBoxContent = document.createElement("div");
      showBoxContent.classList.add("flickr-boxes-content");
      this.container.append(showBoxContent);

      let boxes = this.container.querySelectorAll(".flickr-boxes__box");
      for (let i = 0; i < strArr.length; i++) {
        boxes[i].textContent = strArr[i];
      }
      
    };
  }
}

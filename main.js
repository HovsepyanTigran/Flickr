class Flickr {
  constructor(options) {
    this.container = options.container;
    this.options = {};
    this.options.api_token =
      options.api_token || "979b6782aab93b8ca2f3fce0f80b652d";
    this.options.per_page = options.images_limit || 5;
    this.options.api_url = "https://api.flickr.com/services/rest/?method=flickr.photos.search";
    this.flickrImgsImg;
    this.flickrBoxesBox;
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

    var submitClick = true;
    flickrSubmit.onclick = () => {
      if(submitClick === true) {
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

            this.flickrImgsImg = document.createElement("img");
            this.flickrImgsImg.classList.add("flickr-imgs__img");
            this.flickrImgsImg.alt = pic.name;
            flickrImgs.append(this.flickrImgsImg);
            this.flickrImgsImg.src = srcPath;
            
           
        });
        // for(let i = 0;i < photos.length;i++) {
        //   photos[i].name = item;
          
        //   function shuffleArray(array) {
        //     for (var i = array.length - 1; i > 0; i--) {
        //       var j = Math.floor(Math.random() * (i + 1));
        //       var temp = array[i];
        //       array[i] = array[j];
        //       array[j] = temp;
        //     }
        //     return array;
        //   }
        //   shuffleArray(photos);
          
        // }
      let dragged = null;
      this.flickrBoxesBox = document.querySelectorAll(".flickr-boxes__box")
      this.flickrImgsImg = document.querySelectorAll(".flickr-imgs__img")
      this.flickrImgsImg.forEach((item) => {item.addEventListener("dragstart", (event) => {
        dragged = event.target;})
      });
      

      this.flickrBoxesBox.forEach(function(item) {
        item.addEventListener("dragover", (event) => {
          event.preventDefault();
      })
      });
      this.flickrBoxesBox.forEach((item) => {
        item.addEventListener("drop", (event) => {
        event.preventDefault();
        if (event.target.textContent === dragged.alt) {
          // dragged.parentNode.removeChild(dragged);
          event.target.appendChild(dragged);
          dragged.style.visibility = 'hidden';
        }
        });
      });
      });
  
      let flickrBoxes = document.createElement("div");
      flickrBoxes.classList.add("flickr-boxes");
      this.container.append(flickrBoxes);

      for (let i = 0; i < strArr.length; i++) {
        this.flickrBoxesBox = document.createElement("div");
        this.flickrBoxesBox.classList.add("flickr-boxes__box");
        document.querySelector(".flickr-boxes").append(this.flickrBoxesBox);
      }
      this.flickrBoxesBox.onclick = () => {
        let showBoxContent = document.createElement("div");
        showBoxContent.classList.add("flickr-boxes-content");
        this.container.append(showBoxContent);
      }
      
      
      
     
      for (let i = 0; i < strArr.length; i++) {
        this.container.querySelectorAll(".flickr-boxes__box")[i].textContent = strArr[i];
      }
      submitClick = false;
    }
  }
  }
}

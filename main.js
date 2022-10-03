class Flickr {
  constructor(options) {
    this.options = options;

    this.container = options.container;
    // this.options = {};
    this.options.api_token = options.api_token;
    this.options.per_page = options.images_limit;
    this.api_url =
      "https://api.flickr.com/services/rest/?method=flickr.photos.search";
    this.flickrImgsImg;
    this.flickrBoxesBox;
    if (this.container) this.render();
  }
  render() {
    // let defaultOptions = {
    //   container: document.querySelector('.flickr-container'),
    //   api_token: "60db52e60b6936d4298cbd26d5460558",
    //   images_limit: 5
    // }
    // this.options = [...defaultOptions, ... this.options]
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
    flickrSubmit.onclick = async () => {
      if (submitClick === true) {
        strArr = flickrInput.value.split(/[,.\s]/).filter(function (item) {
          return item.length != 0;
        });
        let flickrImgs = document.createElement("div");
        flickrImgs.classList.add("flickr-imgs");
        this.container.append(flickrImgs);

        let urls = strArr.map((item) => {
          return {
            url: `${this.api_url}&api_key=${this.options.api_token}&tags=${item}&per_page=${this.options.per_page}&page=3&format=json&nojsoncallback=1`,
            name: item,
          };
        });
        let results = await Promise.all(
          urls.map(async (urlObject) => {
            const resp = await fetch(urlObject.url);
            const result = await resp.json();
            let photos = result?.photos?.photo;
            for (let i = 0; i < photos.length; i++) {
              photos[i].name = urlObject.name;
            }
            return photos || [];
          })
        );
        let concatedArray = [];
        results.forEach(function (item) {
          concatedArray = concatedArray.concat(item);
        });
        results.length = 0;
        results = null;
        console.log(concatedArray);
        function shuffleArray(array) {
          let currentIndex = array.length, randomIndex;
          while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
          }
          return array;
        }
          shuffleArray(concatedArray);            

        concatedArray.map((pic) => {
            let srcPath = `https://farm${pic.farm}.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}.jpg`;

            this.flickrImg = document.createElement("img");
            this.flickrImg.classList.add("flickr-imgs__img");
            this.flickrImg.alt = pic.name
            flickrImgs.append(this.flickrImg);
            this.flickrImg.src = srcPath;
        });
        let flickrBoxes = document.createElement("div");
        flickrBoxes.classList.add("flickr-boxes");
        this.container.append(flickrBoxes);

        for (let i = 0; i < strArr.length; i++) {
          let boxArr = []
          this.flickrBox = document.createElement("div");
          this.flickrBox.classList.add("flickr-boxes__box");
          this.container.querySelector(".flickr-boxes").append(this.flickrBox);
        }
        let dragged = null;
        this.flickrBox = this.container.querySelectorAll(".flickr-boxes__box")
        this.flickrImg = this.container.querySelectorAll(".flickr-imgs__img")

        for (let i = 0; i < strArr.length; i++) {
          this.container.querySelectorAll(".flickr-boxes__box")[i].textContent = strArr[i];
        }
        
        this.flickrImg.forEach((item) => {item.addEventListener("dragstart", (event) => {
          dragged = event.target;})
        });

        this.flickrBox.forEach(function(item) {
          item.addEventListener("dragover", (event) => {
            event.preventDefault();
        })
        });
        let a = []
        this.flickrBox.forEach((item) => {
          item.addEventListener("drop", (event) => {
          event.preventDefault();
          if (event.target.textContent === dragged.alt) {
            event.target.appendChild(dragged);
            dragged.style.visibility = 'hidden';
            a.push(dragged)
            console.log(a);
          }
          });
        });
        console.log(a);
        
        //   this.flickrBox.onclick = () => {
        //   this.showBoxContent = document.createElement("div");
        //   this.showBoxContent.classList.add("flickr-boxes-content");
        //   this.container.append(this.showBoxContent);
        //   let a = this.container.querySelector('.flickr-boxes__box');
        //   let b = [];
        //   // this.showBoxContent.append(this.flickrBox)
        //   let v = this.container.querySelector('.flickr-boxes__box')
        //   let c = v.childNodes;
        //   console.log(c);
        //    this.showBoxContent.append(c)
        //    console.log(this.showBoxContent);
        //   // this.container.querySelector('.flickr-boxes__box').append(this.showBoxContent)

        // }

        
        
      }
      submitClick = false;
    }
    
  }
}

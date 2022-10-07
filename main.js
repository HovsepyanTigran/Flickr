class Flickr {
  constructor(options) {

    this.options = options;
    if (!this.options) throw new Error("Options not defined")

    let defaultOptions = {
      container: document.querySelector(".flickr-container"),
      api_token: "60db52e60b6936d4298cbd26d5460558",
      images_limit: 5,
    };
    options = { ...defaultOptions, ...options };

    this.container = options.container;
    this.options.api_token = options.api_token;
    this.options.per_page = options.images_limit;
    this.api_url = "https://api.flickr.com/services/rest/?method=flickr.photos.search";
    if (this.container) this.render(), this.refresh();
  }

  render() 
  {
    let flickrSearcher = document.createElement("div");
    flickrSearcher.classList.add("flickr-searcher");
    this.container.append(flickrSearcher);

    let flickrInput = document.createElement("input");
    flickrInput.classList.add("flickr-input");
    flickrSearcher.append(flickrInput);

    let flickrSubmit = document.createElement("input");
    flickrSubmit.classList.add("flickr-submit");
    flickrSubmit.type = "submit";
    flickrSearcher.append(flickrSubmit);

    

    let strArr;
    let submitClick = true;

    flickrSubmit.onclick = async () => 
    {
      if (submitClick === true) 
      {
        submitClick = false;
        strArr = flickrInput.value.split(/[,.\s]/).filter(function (item) 
        {
          return item.length != 0;
        });
        let flickrImgs = document.createElement("div");
        flickrImgs.classList.add("flickr-imgs");
        this.container.append(flickrImgs);
        let urls = strArr.map((item) => 
        {
          return {
            url: `${this.api_url}&api_key=${this.options.api_token}&tags=${item}&per_page=${this.options.per_page}&page=3&format=json&nojsoncallback=1`,
            name: item,
          };
        });
        let results = await Promise.all(
          urls.map(async (urlObject) => 
          {
            const resp = await fetch(urlObject.url);
            const result = await resp.json();
            let photos = result?.photos?.photo;
            for (let i = 0; i < photos.length; i++) 
            {
              photos[i].name = urlObject.name;
            }

            return photos || [];

          })
        );

        let concatedArray = [];

        results.forEach(function (item) 
        {
          concatedArray = concatedArray.concat(item);
        });

        results.length = 0;
        results = null;

        function shuffleArray(array) 
        {
          let currentIndex = array.length,
            randomIndex;
          while (currentIndex != 0) 
          {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
          }
          return array;
        }

        shuffleArray(concatedArray);

        let picArr = []
        this.photos = concatedArray;
        
        concatedArray.map((pic) => 
        {
          let srcPath = `https://farm${pic.farm}.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}.jpg`;
          this.flickrImg = document.createElement("img");
          this.flickrImg.classList.add("flickr-imgs__img");
          this.flickrImg.alt = pic.name;
          this.flickrImg.id = pic.id;
          flickrImgs.append(this.flickrImg);
          this.flickrImg.src = srcPath;
          picArr.push(this.flickrImg)

          this.flickrImg.addEventListener("dragstart", (event) => 
          {
            dragged = event.target;
          });
          
        });
        
        let flickrBoxes = document.createElement("div");
        flickrBoxes.classList.add("flickr-boxes");
        this.container.append(flickrBoxes);

        let dragged = null;
        
        let flickrBox = document.createElement("div");

        for (let i = 0; i < strArr.length; i++) 
        {
          flickrBox = document.createElement("div");
          flickrBox.classList.add("flickr-boxes__box");
          this.container.querySelector(".flickr-boxes").append(flickrBox);

          flickrBox.addEventListener("dragover", (event) => 
          {
            event.preventDefault();
          });

          var dragArr = [];

          flickrBox.addEventListener("drop", (event) => 
          {
            event.preventDefault();
            if (event.target.textContent === dragged.alt) 
            {
              dragArr.push(this.photos.filter(function (item) 
              {
                  return item.id === dragged.id;
              })
              );
              event.target.appendChild(dragged);
              dragged.style.visibility = "hidden";
              picArr.pop()
            }
            setTimeout(() => 
            {
              if(picArr.length === 0) 
              {
                alert("Complete")
                this.restart()
              }
            },2)
            
          });
        }
        let showBoxContent = document.createElement("div");
        showBoxContent.classList.add("flickr-boxes-content");
        this.container.append(showBoxContent);
          let img;
          flickrBox.onclick = () => 
          {
            showBoxContent.innerHTML = "";
            for (let i = 0; i < dragArr.length; i++) 
            {
              dragArr[i].forEach(function (item) 
              {
                let srcPath = `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`;
                img = document.createElement("img");
                img.classList.add("flickr-boxes-content__img");
                showBoxContent.append(img);
                img.src = srcPath;
              });
            }
           
          };
        }
        for (let i = 0; i < strArr.length; i++) 
        {
          this.container.querySelectorAll(".flickr-boxes__box")[i].textContent = strArr[i];
        }
    }
  }

  destroy() 
  {
    this.container.innerHTML = "";
    for (let i in this) 
    {
      if (!["options", "container", "api_url"].includes(i)) 
      {
        delete this[i];
      }
    }
  }

  restart() 
  {
    this.destroy();
    this.render();
    let restartButton = document.createElement("button");
    restartButton.classList.add("flickr-restarter");
    restartButton.textContent = "Restart";
    this.container.querySelector(".flickr-searcher").append(restartButton);
    restartButton.onclick = () => 
    {
      this.restart();
    };
  }

  refresh() 
  {
    let restartButton = document.createElement("button");
    restartButton.classList.add("flickr-restarter");
    restartButton.textContent = "Restart";
    this.container.querySelector(".flickr-searcher").append(restartButton);
    restartButton.onclick = () => 
    {
      this.restart();
    };
  }
}

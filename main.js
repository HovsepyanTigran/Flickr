class Flickr {
  constructor(options) {

    this.options = {
      container: document.querySelector(".flickr-container"),
      api_token: "60db52e60b6936d4298cbd26d5460558",
      images_limit: 5,
    }
    this.options = {...this.options, ...options};
    if (!this.options.container) 
    {
      throw new Error("Options container not defined")
    }

    
   
    this.options.images_limit;
    this.api_url = "https://api.flickr.com/services/rest/?method=flickr.photos.search";
    this.render(), this.refresh();
  }

  render() 
  {
    let flickrSearcher = document.createElement("div");
    flickrSearcher.classList.add("flickr-searcher-container");
    this.options.container.append(flickrSearcher);

    let flickrInput = document.createElement("input");
    flickrInput.classList.add("flickr-searcher-container__flickr-input");
    flickrSearcher.append(flickrInput);

    let flickrSubmit = document.createElement("input");
    flickrSubmit.classList.add("flickr-searcher-container__flickr-submit");
    flickrSubmit.type = "submit";
    flickrSubmit.value = "Submit"

    flickrSearcher.append(flickrSubmit);

    

    let stringArray;
    let submitClick = true;

    flickrSubmit.onclick = async () => 
    {
      if (submitClick === true) 
      {
        submitClick = false;
        stringArray = flickrInput.value.split(/[,.\s]/).filter(function (item) 
        {
          return item.length != 0;
         });
        
        let flickrImgs = document.createElement("div");
        flickrImgs.classList.add("flickr-imgs");
        this.options.container.append(flickrImgs);

        let results = await Promise.all(
          stringArray.map(async (item) => 
          { 
            const resp = await fetch(`${this.api_url}&api_key=${this.options.api_token}&tags=${item}&per_page=${this.options.images_limit}&page=3&format=json&nojsoncallback=1`);
            const result = await resp.json();
            let photoArray = result?.photos?.photo;
            for (let i = 0; i < photoArray.length; i++) 
            {
              photoArray[i].name = item;
            }

            return photoArray || [];

          })
        );
        this.photos  = [];

        results.forEach((item) => this.photos = this.photos.concat(item));
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

        shuffleArray(this.photos);

        var pictureArray = []
        
        this.photos.map((pic) => 
        {
          let srcPath = `https://farm${pic.farm}.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}.jpg`;
          
          let flickrImg = document.createElement("img");
          flickrImg.classList.add("flickr-imgs__img");
          flickrImg.alt = pic.name;
          flickrImg.id = pic.id;
          flickrImgs.append(flickrImg);
          flickrImg.src = srcPath;
          pictureArray.push(flickrImg)

          flickrImg.addEventListener("dragstart", (event) => 
          {
            dragged = event.target;
          });
          
        });
        
        let flickrBoxes = document.createElement("div");
        flickrBoxes.classList.add("flickr-boxes");
        this.options.container.append(flickrBoxes);
        let dragged = null;
        
        let flickrBox = document.createElement("div");

        for (let i = 0; i < stringArray.length; i++) 
        {
          flickrBox = document.createElement("div");
          flickrBox.classList.add("flickr-boxes__box");
          this.options.container.querySelector(".flickr-boxes").append(flickrBox);
          flickrBox.textContent = stringArray[i]
          flickrBox.addEventListener("dragover", (event) => 
          {
            event.preventDefault();
          });

          let dragedPictureArray = [];

          flickrBox.addEventListener("drop", (event) => 
          {
            event.preventDefault();
            if (event.target.textContent === dragged.alt) 
            {
              dragedPictureArray.push(this.photos.filter(function (item) 
              {
                  return item.id === dragged.id;
              })
              );
              event.target.appendChild(dragged);
              dragged.style.visibility = "hidden";
              pictureArray.pop()
            }
            setTimeout(() => 
            {
              if(pictureArray.length === 0) 
              {
                let flickrMessage = document.createElement("span");
                flickrMessage.classList.add("flickr-message");
                flickrMessage.textContent = "Complete"
                flickrImgs.append(flickrMessage)
              }
            },2)
            
          });
        
          
          
          let img;
          flickrBox.onclick = () => 
          {
            showBoxContent.innerHTML = "";
            for (let i = 0; i < dragedPictureArray.length; i++) 
            {
              dragedPictureArray[i].forEach(function (item) 
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
        let showBoxContent = document.createElement("div");
        showBoxContent.classList.add("flickr-boxes-content");
        this.options.container.append(showBoxContent);
      }
  
    }
    
  }

  destroy() 
  {
    this.options.container.innerHTML = "";
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
    this.options.container.querySelector(".flickr-searcher-container").append(restartButton);
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
    this.options.container.querySelector(".flickr-searcher-container").append(restartButton);
    restartButton.onclick = () => 
    {
      this.restart();
    };
  }
}

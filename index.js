window.onload = function() {



  document.querySelector('.flickr-wrapper__button-start').onclick = () => {
    document.querySelector('.flickr-wrapper__button-start').style.visibility = 'hidden';
    new Flickr({
      container: document.querySelector('.flickr-container'),
      api_token: "51a8f260e6144901015daceb57a59640",
      images_limit: 5,
  })
    }    
   

  
}

// hhtps://farm66.statickFlickr.com/65535/52371952391_1063dc898d.jpg
// https://farm66.staticFlickr.com/65535/52371952391_1063dc898d.jpg

// https://farm66.staticflickr.com/65535/52371006392_273ff021a9.jpg
// hhtps://farm66.staticflickr.com/65535/52371006392_273ff021a9.jpg
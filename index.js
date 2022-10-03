window.onload = function() {



  document.querySelector('.flickr-wrapper__button-start').onclick = () => {
    document.querySelector('.flickr-wrapper__button-start').style.visibility = 'hidden';
    new Flickr({
      container: document.querySelector('.flickr-container'),
      api_token: "2da929e91634dd5c53a05dbd51547a00",
      images_limit: 5,
  })
    }    
   

  
}

// hhtps://farm66.statickFlickr.com/65535/52371952391_1063dc898d.jpg
// https://farm66.staticFlickr.com/65535/52371952391_1063dc898d.jpg

// https://farm66.staticflickr.com/65535/52371006392_273ff021a9.jpg
// hhtps://farm66.staticflickr.com/65535/52371006392_273ff021a9.jpg
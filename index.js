window.onload = function(){



  document.querySelector('.flickr-wrapper__button-start').onclick = function() {
    document.querySelector('.flickr-wrapper__button-start').style.visibility = 'hidden';
    }    
    new Flickr({
      container: document.querySelector('.flickr-container')
  })

  
}
var key = '979b6782aab93b8ca2f3fce0f80b652d'
let url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + key + '&tags=car&per_page=10&page=1&format=json&nojsoncallback=1'
fetch(url).then(function(resp) {
return resp.json()
}).then(function(j) {
  return j.photos.photo.map((pic) => {
    console.log(pic);
  let srcPath = 'hhtps://farm'+pic.farm+'.statickFlickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg';
  let img = document.createElement('img');
            img.classList.add("img");
            document.querySelector('.flickr-container').append(img);
  img.src = srcPath
  
  
  }
  )
  console.log(j)
})
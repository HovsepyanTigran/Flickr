window.onload = function(){

  document.querySelector('.flickr-wrapper__button-start').addEventListener('click',function(){
    
    new Flickr({
      container: document.querySelector('.flickr-container')
  })

  })
}


window.onload = function() {



  document.querySelector('.flickr-wrapper__button-start').onclick = () => {
    document.querySelector('.flickr-wrapper__button-start').style.visibility = 'hidden';
    new Flickr({})
    }    
   

  
}

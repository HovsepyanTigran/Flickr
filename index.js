window.onload = function() 
{
  document.querySelector('.flickr-wrapper__button-start').onclick = () => 
  {
    document.querySelector('.flickr-wrapper__button-start').style.visibility = 'hidden';
    new Flickr(
    { 
    container: document.querySelector(".flickr-container"),
    api_token: "60db52e60b6936d4298cbd26d5460558",
    images_limit: 5,
    })
  }    
}

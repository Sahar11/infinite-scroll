const imageContainer = document.getElementById('img-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialLoad = true;

// Unsplash API
let imageCount = 5;
const apiKey='MtYpgQ1fThL2k69bZUdXyKvhV8HO8Pk-EIHa-YcIkDI';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;



//check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    imageCount=30;
  }
}

 //Helper function to set attributes on DOM elements
 function setAttributes(elements, attributes) {
  for(const key in attributes) {
    elements.setAttribute(key, attributes[key])
  }
 }



//  Create elments for links & photos, Add to DOM
function displayPhotos() {
   imagesLoaded =0;
  totalImages = photosArray.length;
  // Run function for each object in photosArray
 console.log('total images', totalImages)
  photosArray.forEach((photo) => {
    // create <a> to link unsplash
    const item = document.createElement('a');
    // item.setAttribute('href', photo.links.html);
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank'
    });
    // item.setAttribute('target', '_blank');
    //Create <img> for photo
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_descriptions
    });
    //Event listener, check when each image is finished loading
    img.addEventListener('load', imageLoaded());
    // Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  })
}

// Get photos from unsplash API
async function getPhotos() {

  try {
   const response = await fetch(apiURL);
   photosArray = await response.json();
   console.log(photosArray);
   displayPhotos();
  } catch(error) {
    //Catch error here
    console.log(error)
  }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready=false;
    getPhotos();
    // console.log('ready', ready);
  }
})

getPhotos();
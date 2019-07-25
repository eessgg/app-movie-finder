const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.close-modal');
// const thumbs = document.querySelectorAll('figure.image');
// const mysearch = document.querySelector('.mysearch');
// const outputResult = document.querySelector('.output-result');
// const resultsBox = document.querySelector('.results');
// const errorMessage = document.querySelector('.error-message');
// const topOutput = document.querySelector('#rated .container');
// const popularOutput = document.querySelector('#popular .container');




function loadEvents() {
  const thumbs = document.querySelectorAll('figure.image');
  if(thumbs) {
    thumbs.forEach(function (thumb) {
      console.log(thumb);
      thumb.addEventListener('click', openModal)
    })
  }
  window.addEventListener('click', outsideClick);
  closeBtn.addEventListener('click', closeModal);
  // mysearch.addEventListener('change', validate);
}

// MODAL
function openModal() {
  modal.style.display = 'block';
}

function closeModal() {
  modal.style.display = 'none';
}

function outsideClick(e) {
  if (e.target === modal) {
      modal.style.display = 'none';
  }
}


window.addEventListener('DOMContentLoaded', function() {
  loadEvents()
  // getTopRated();
  // getPopularMovies();
})
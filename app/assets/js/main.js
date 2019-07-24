const modal = document.querySelector('.modal');
const thumbs = document.querySelectorAll('figure.image');
const closeBtn = document.querySelector('.close-modal');
const mysearch = document.querySelector('.mysearch');
const outputResult = document.querySelector('.output-result');
const resultsBox = document.querySelector('.results');
const errorMessage = document.querySelector('.error-message');
const topOutput = document.querySelector('#rated .container');
const popularOutput = document.querySelector('#popular .container');

const errosText = {
    empty: 'Digite um nome de filme...'
}

const genres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance"},
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie"  },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War"  },
  { id: 37, name: "Western"}
];


function validate() {
    let inputValue = mysearch.value;
    if (!inputValue) {
        errorMessage.innerHTML = errosText.empty;
        errorMessage.style.display = 'block';
        setTimeout(function () {
            errorMessage.style.display = 'none';
        }, 3000)
    } else {
        loadURL(inputValue)
    }
}

function loadURL(inputValue) {
    let urlData = '';
  var apiObj = { key: '5b1ed0f512dc0bcf732837664658fb66' , query: inputValue}
  urlData = `https://api.themoviedb.org/3/search/movie?api_key=${apiObj.key}&language=en-US&query=${apiObj.query}&page=1&include_adult=false}`;

  return getDataSearch(urlData);
}

function getTopRated() {
    const apiRateInfo = { api_key_r: '5b1ed0f512dc0bcf732837664658fb66' }
    let topRatedResults;

    var urlTop = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiRateInfo.api_key_r}&language=en-US&page=1`;
    fetch(urlTop)
        .then(response => response.json())
        .then(data => {
          topRatedResults = data.results.slice(0,4);
          topRatedResults.map(ratedMovie => {
            showTopRated(ratedMovie)

          })
        })
}

function getPopularMovies() {
  const apiRateInfo = { api_key_r: '5b1ed0f512dc0bcf732837664658fb66' };
  let popularRatedResults;

  var urlPopular = `https://api.themoviedb.org/3/movie/popular?api_key=${apiRateInfo.api_key_r}&language=en-US&page=1`;
  fetch(urlPopular)
      .then(response => response.json())
      .then(data => {
        popularRatedResults = data.results.slice(0,4);
        // showPopular(popularRatedResults)
        showPopular(popularRatedResults)
      })
}

function getDataSearch(urlData) {
  let arrayResults = [];

//   var url = loadURL(userInput)
  fetch(urlData)
  .then((resp) => resp.json())
  .then(function(data) {
    var results = data.results.slice(0,4);
    console.log(results[0])
    results.map(res => {
      showSearch(res)
    })
    mysearch.value = '';
  })
  .catch((error) => { console.log(error)});
}
// resolver buscas acopladas
function showSearch(dt) {
  resultsBox.style.display = 'block';
  output = '';
  output += `
    <div class="column result-box">
      <figure class="image-search">
        <img src=${'https://image.tmdb.org/t/p/w500'+dt.poster_path} alt="${dt.title}">
        <div class="legend">
          <h2 class="title is-5"> ${dt.original_title}(${dt.release_date.slice(0,4)}) </h2>
          <p class="cat"> Drama/ Adventure</p>
          ${!dt.video ? '': '<button class="btn"> <a href="'+dt.video+'">Watch TRailer</a> <span> > </span></button>' }
        </div>
      </figure>
    </div>
  `
  outputResult.innerHTML += output;
}

function showTopRated(results) {
  topOutputBox = '';
  topOutputBox += `
    <div class="column">
      <figure class="image">
        <img src=${'https://image.tmdb.org/t/p/w500/'+results.poster_path} alt="${results.title}">
        <div class="legend">
          <h2 class="title is-5"> ${results.title}(${results.release_date.slice(0,4)})</h2>
          <p class="cat"> Drama/ Adventure</p>
        </div>
      </figure>
    </div>
  `;
  topOutput.innerHTML += topOutputBox;
}

function showPopular(results) {
  popularOutputBox = '';
  popularOutputBox += `
    <div class="column">
      <figure class="image">
        <img src=${'https://image.tmdb.org/t/p/w500/'+results.poster_path} alt="${results.title}">
        <div class="legend">
          <h2 class="title is-5"> ${results.title}(${results.release_date})</h2>
          <p class="cat"> Drama/ Adventure</p>
        </div>
      </figure>
    </div>
  `;
  popularOutput.innerHTML += popularOutputBox;
}

function loadEvents() {
  thumbs.forEach(function (thumb) {
      // thumb.addEventListener('click', openModal)
      console.log(thumb);
  })
  window.addEventListener('click', outsideClick);
  closeBtn.addEventListener('click', closeModal);
  mysearch.addEventListener('change', validate);
}

// MODAL
function openModal() {
  modal.style.display = 'block';
}

function closeModal() {
  modal.style.display = 'none';
}

function outsideClick(e) {
  if (e.target == modal) {
      modal.style.display = 'none';
  }
}
window.addEventListener('DOMContentLoaded', function() {
  loadEvents()
  getTopRated();
  getPopularMovies();
})
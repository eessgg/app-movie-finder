const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.close-modal');
const thumbs = document.querySelectorAll('figure.image');
const mysearch = document.querySelector('.mysearch');
const resultsBox = document.querySelector('.results');
const outputResult = document.querySelector('.output-result');


// const topOutput = document.querySelector('#rated .container');
// const popularOutput = document.querySelector('#popular .container');

const errosText = {
    empty: 'Digite um nome de filme...'
}

function loadEvents() {
    const thumbs = document.querySelectorAll('figure.image');
    if(thumbs) {
        thumbs.forEach(function (thumb) {
            thumb.addEventListener('click', openModal)
        })
    }

    window.addEventListener('click', outsideClick);
    closeBtn.addEventListener('click', closeModal);
    mysearch.addEventListener('change', validate);
}

//validar campos search
function validate(e) {
    const errorMessage = document.querySelector('.error-message');
    e.preventDefault()
    let inputValue = e.target.value;
    if (!inputValue) {
        errorMessage.innerHTML = errosText.empty;
        errorMessage.style.display = 'block';
        setTimeout(function () {
            errorMessage.style.display = 'none';
        }, 3000)
    } else {
        loadURL(inputValue)
        //  console.log(error)
    }
}

// carregar url com query
function loadURL(inputValue) {
    let urlData = '';
    var apiObj = { key: '5b1ed0f512dc0bcf732837664658fb66', query: inputValue }

    urlData = `https://api.themoviedb.org/3/search/movie?api_key=${apiObj.key}&language=en-US&query=${apiObj.query}&page=1&include_adult=false}`;

    return getDataSearch(urlData);
}

function getDataSearch(urlData) {
    // let arrayResults = [];
    // var url = loadURL(userInput)
    fetch(urlData)
        .then((resp) => resp.json())
        .then(function (data) {
            var results = data.results.slice(0, 4);
            // console.log(results[0])
            results.map(res => {
                showSearch(res)
            })
            mysearch.value = '';
        })
        .catch((error) => { console.log(error) });

        outputResult.innerHTML = '';
}

function showSearch(dt) {

    resultsBox.style.display = 'block';
    // debugger;
    console.log(dt)
    output = '';
    output += `
      <div class="column result-box">
        <figure class="image-search">
          <img src=${'https://image.tmdb.org/t/p/w500' + dt.poster_path} alt="${dt.title}">
          <div class="legend">
            <h2 class="title is-5"> ${dt.original_title}(${dt.release_date.slice(0, 4)}) </h2>
            <p class="cat"> Drama/ Adventure</p>
            ${!dt.video ? '' : '<button class="btn"> <a href="' + dt.video + '">Watch TRailer</a> <span> > </span></button>'}
          </div>
        </figure>
      </div>
  `;
    outputResult.innerHTML += output;
}

// getTopRated
function getTopRated() {
    const apiRateInfo = { api_key_r: '5b1ed0f512dc0bcf732837664658fb66' }
    let topRatedResults;
    let ratedResultsObj;
    // let ratedResultsArray = [];

    const urlTop = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiRateInfo.api_key_r}&language=en-US&page=1`;
    fetch(urlTop)
        .then(response => response.json())
        .then(data => {
            topRatedResults = data.results.slice(0, 5);
            topRatedResults.map(results => {
                ratedResultsObj = {
                    img: results.poster_path,
                    title: results.title,
                    year: results.release_date.slice(0, 4),
                    text: results.overview,
                    vid: results.video
                }
                showTopRated(ratedResultsObj)
            })
        })
}

function showTopRated(ratedResult) {
    const topOutput = document.querySelector('#rated .container');

    let topOutputBox = '';
    topOutputBox += `
         <div class="column">
             <figure class="image">
                 <img src=${'https://image.tmdb.org/t/p/w500/' + ratedResult.img} alt="${ratedResult.title}">
                 <div class="legend">
                     <h2 class="title is-5"> ${ratedResult.title}(${ratedResult.year})</h2>
                     <p class="cat"> Drama/ Adventure</p>
                 </div>
             </figure>
         </div>
    `;
    topOutput.innerHTML += topOutputBox;

    loadEvents()
    contentModal(ratedResult);
}


function contentModal(results) {
    const modalContent = document.querySelector('.modal-content');

    let resultModal = '';
      resultModal += `
          <div class="column image-modal">
            <img src=${'https://image.tmdb.org/t/p/w500/'+results.img} alt="${results.title}">
          </div>
          <div class="column info-modal">
            <header>
              <h2> ${results.title} (${results.year})</h2>
            </header>
            <p class="cat"> Drama / Adventure</p>
            <p class="info"> ${results.text} </p>
            ${ results.vid ?  '<button class="btn">Watch TRailer <span> > </span></button>' : ''}}
            <footer>
              <div class="star">
                <i class="fas fa-star"></i>
                &star;
              </div>
            </footer>
          </div>
          <span class="close-modal">&times;</span>
      `;
      console.log(resultModal)
      modalContent.innerHTML = resultModal;
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


window.addEventListener('DOMContentLoaded', function () {
    loadEvents()
    // getTopRated();
    // getPopularMovies();
})

window.addEventListener('DOMContentLoaded', getTopRated);
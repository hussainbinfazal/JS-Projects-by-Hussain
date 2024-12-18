
let searchedMovie = document.getElementById("inputmovie");
let parentContainer = document.querySelector(".herosection");
let inputBtn = document.getElementById("inputbtn")
let infoContainer = document.querySelector(".secondary");
let firstContainer = document.querySelector(".first");
let detailsContainer = document.querySelector(".details");



async function getMovies(){
    parentContainer.innerHTML ="Loading......."
    let movieName = searchedMovie.value; // input's value is movie name //
    let myApiKey = "********"; //Api key //
    let url = `http://www.omdbapi.com/?apikey=${myApiKey}&t=${movieName}`;
    let movieList = await fetch(url); 
    let movie = await movieList.json();
    
    
    parentContainer.innerHTML = '';
    // If movie data exists
    if (movie.Response === "True") {
        showMovie(movie);
    } else {
        alert("Movie not found!");
    }
    
}


function showMovie(movie){
    let movieTitle = document.createElement("P");
    let movieActors = document.createElement("P");
    let movieCountry = document.createElement("P");
    let movieLang = document.createElement("P");
    let movieGenre = document.createElement("P");
    let movieReleased = document.createElement("P");
    let movieImdb = document.createElement("P");
    let moviePlot = document.createElement("P");
    let movieDuration = document.createElement("P");
    let divPrimary = document.createElement("div");
    let divParent = document.createElement("div");
    let divFirst = document.createElement("div");
    let divDetails = document.createElement("div");
    let divSecondary = document.createElement("div");
    let moviePoster = document.createElement("img");
    let divGenre1 = document.createElement("div");
    let divGenre2 = document.createElement("div");
    let divGenre3 = document.createElement("div");
    let divMain2 = document.createElement("div")
    divMain2.setAttribute("class","main2");
    divPrimary.setAttribute("class","primary");
    divSecondary.setAttribute("class","secondary");
    divParent.setAttribute("class","parent");
    divFirst.setAttribute("class","first");
    divDetails.setAttribute("class","details");
    movieTitle.setAttribute("id","movietitle");
    movieCountry.setAttribute("id","moviecountry");
    movieLang.setAttribute("id","movielang");
    movieGenre.setAttribute("id","moviegenre");
    movieReleased.setAttribute("id","moviereleased");
    movieActors.setAttribute("id","movieactors");
    movieActors.setAttribute("id","movieimdb");
    moviePlot.setAttribute("id","movieplot");
    moviePlot.setAttribute("id","movieduration");
    moviePoster.setAttribute("id","moviePoster");
    divGenre1.setAttribute("id","genre1");
    divGenre2.setAttribute("id","genre2");
    divGenre3.setAttribute("id","genre3");
    moviePoster.src = `${movie.Poster}`;
    movieTitle.innerHTML = `${movie.Title}`;
    movieImdb.innerHTML = `<span>Rating:</span> <i class="fa-solid fa-star"></i> ${movie.imdbRating}`;
    divGenre1.innerHTML += `${movie.Genre.split(",")[0]}`;
    divGenre2.innerHTML +=`${movie.Genre.split(",")[1]}`;
    divGenre3.innerHTML +=`${movie.Genre.split(",")[2]}`;
    movieCountry.innerHTML = `<span>Country:</span> ${movie.Country}`;
    movieLang.innerHTML = `<span>Language:</span> ${movie.Language}`;
    movieReleased.innerHTML = `<span>Realesed Date:</span> ${movie.Released}`;
    movieActors.innerHTML = `<span>Cast:</span> ${movie.Actors}`;
    moviePlot.innerHTML = `<span>Plot:</span> ${movie.Plot}`;
    movieDuration.innerHTML = `<span>Duration:</span> ${movie.Runtime}`;
    divMain2.appendChild(divPrimary);
    divPrimary.appendChild(moviePoster)
    divParent.appendChild(divFirst)
    divParent.appendChild(divSecondary);
    divFirst.appendChild(movieTitle);
    divFirst.appendChild(movieImdb);
    divFirst.appendChild(divDetails)
    divDetails.appendChild(divGenre1);
    divDetails.appendChild(divGenre2);
    divDetails.appendChild(divGenre3);
    divSecondary.appendChild(movieCountry);
    divSecondary.appendChild(movieLang);
    divSecondary.appendChild(movieReleased);
    divSecondary.appendChild(movieActors);
    divSecondary.appendChild(moviePlot);
    divSecondary.appendChild(movieDuration)
    divMain2.appendChild(divParent);
    parentContainer.appendChild(divMain2);



}


inputBtn.addEventListener("click",()=>{ // search movie & get movie //
    if (searchedMovie.value === "") {
        alert("Please type the movie name")
    } else {

        getMovies()

        setTimeout(() => {
            searchedMovie.value = "";
        }, 4000);
    }    
})

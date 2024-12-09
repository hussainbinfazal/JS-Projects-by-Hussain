let songs;
let currentSong = new Audio();
let p = document.getElementById("pausebtn"); //pause button declared globally//
let icon = document.getElementById("playbutton");
let btn = document.getElementById("playbutton"); // playbutton declared globally//
const circle = document.getElementById("circle");
let range = document.querySelector("#volbar");
let vol = document.querySelector("#volume");
let volRange = document.getElementById("volbar");
let ham = document.querySelector(".ham");
let currFolder;

// let currentSong = new currentSong();

// hide the Left Sidebar in phones//
let left = document.querySelector(".left");
let sdB = document.getElementById("bar");
sdB.addEventListener("click", () => {
  ham.classList.replace("fa-xmark", "fa-bars");

  if (left.style.display === "block") {
    left.style.display = "none";
  } else {
    left.style.position = "absolute"; // Corrected
    left.style.display = "block"; // Show the element
    ham.classList.replace("fa-bars", "fa-xmark");
  }
});
//                                                        //



//                                                         //

// monks function give us song //
async function monks(folder) {
  currFolder = folder;
  let s = await fetch(`/${folder}/`);
  let res = await s.text();
  let div = document.createElement("div");
  div.innerHTML = res;
  let a = div.getElementsByTagName("a");
  songs = [];
  for (let index = 0; index < a.length; index++) {
    const element = a[index];
    if (element.href.endsWith("mp3")) {
      songs.push(element.href.trim("/"));
    }
  }

  // Code of The Playlist of the songs in the folder  //

  const songListDiv = document.querySelector(".songlist");
  if (songListDiv) {
    songListDiv.innerHTML = ""; // Clear existing content
    songs.forEach((song, index) => {
      const songDiv = document.createElement("div");
      const playDiv = document.createElement("div");
      const songItem = document.createElement("li");
      songItem.innerHTML = `${index + 1}. ${decodeURI(song.split("/").pop())}`;
      playDiv.innerHTML = '<i class="fa-solid fa-circle-play playbig"></i>';
      songItem.classList.add("song-item");
      songDiv.classList.add("song-div");
      playDiv.classList.add("play-i");
      songListDiv.appendChild(songDiv);
      songDiv.appendChild(songItem);
      songDiv.appendChild(playDiv);

      // Optional: Add a click event to play the song when clicked
      songItem.addEventListener("click", () => {
        playMusic(song);
      });
      playDiv.addEventListener("click", () => {
        playMusic(song, false);
      });
    });
  }

  
  return songs;
}
//                                                          //
// `/${/songs/}/`
const playMusic = (track, pause = false) => {
  currentSong.src = track;
  if (!pause) {
    if (icon.classList.contains("fa-play")) {
      icon.classList.replace("fa-play", "fa-pause");
      currentSong.play();
    } else if (icon.classList.contains("fa-pause")) {
      icon.classList.replace("fa-pause", "fa-play");
      currentSong.pause();
    } else icon.classList.replace("fa-play", "fa-pause");
  }
  const trackName = decodeURI(track.split("/").pop());
  document.querySelector(".songname").innerHTML = trackName;
};

function secondsToMinutesSeconds(seconds) {
  if (isNaN(seconds) || seconds < 0) {
    return "00:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}

//code for display albums in herosection  //
// songs fetching from the SONGS folder//

async function displayAlbums() {
  let b = await fetch(`/songs/`);
  let response = await b.text();
  let div2 = document.createElement("div");
  div2.innerHTML = response;
  let anchors = div2.getElementsByTagName("a");

  let card = document.querySelector(".cards");
  let array = Array.from(anchors);
  for (let index = 0; index < array.length; index++) {
    const e = array[index];

    if (e.href.includes("/songs/") && !e.href.includes(".htaccess")) {
      let folder = e.href.split("/").slice(-1)[0];
      let a = await fetch(`/songs/${folder}/info.json`);
      let jsonResponse = await a.json();
      card.innerHTML =
        card.innerHTML +
        `<div data-folder="${folder}" class="column">
                          <div  class="play">
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="16" height="16" fill="black">
                          <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/>
                        </svg>
                      </div>
                      
                      
                <img src="/songs/${folder}/cover.jpg" alt="">
                <h2>${jsonResponse.title}</h2>
                <p>${jsonResponse.description}</p>
                </div>`;
    }
  }

  // load playlist whenever the card is clicked//
  Array.from(document.querySelectorAll(".cards .column")).forEach((e) => {
    e.addEventListener("click", async (item) => {
      songs = await monks(`songs/${item.currentTarget.dataset.folder}`);
      playMusic(songs[0]);
    });
  });
}
//                                                                   //

// Code for the Second Row(POPULAR Albums)

async function displayAlbums2() {
  let b = await fetch(`/popular/`);
  let response = await b.text();
  let div2 = document.createElement("div");
  div2.innerHTML = response;
  let anchors = div2.getElementsByTagName("a");
  let card = document.querySelector(".cards2");
  let array = Array.from(anchors);
  for (let index = 0; index < array.length; index++) {
    const e = array[index];

    if (e.href.includes("/popular/") && !e.href.includes(".htaccess")) {
      let folder = e.href.split("/").slice(-1)[0];
      let a = await fetch(`/popular/${folder}/info.json`);
      let jsonResponse = await a.json();
      card.innerHTML =
        card.innerHTML +
        `<div data-folder="${folder}" class="column2">
                          <div  class="play">
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="16" height="16" fill="black">
                          <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/>
                        </svg>
                      </div>
                      
                      
                <img src="/popular/${folder}/cover.jpg" alt="">
                <h2>${jsonResponse.title}</h2>
                <p>${jsonResponse.description}</p>
                </div>`;
    }
  }

  // load playlist whenever the coolumn in second row is clicked//
  Array.from(document.querySelectorAll(".cards2 .column2")).forEach((e) => {
    e.addEventListener("click", async (item) => {
      songs = await monks(`popular/${item.currentTarget.dataset.folder}`);
      playMusic(songs[0]);
    });
  });
}
//            end                                    //

// Code for the third row//
async function displayAlbums3() {
  let b = await fetch(`/most/`);
  let response = await b.text();
  let div2 = document.createElement("div");
  div2.innerHTML = response;
  let anchors = div2.getElementsByTagName("a");
  let card = document.querySelector(".cards3");
  let array = Array.from(anchors);
  for (let index = 0; index < array.length; index++) {
    const e = array[index];
    if (e.href.includes("/most/") && !e.href.includes(".htaccess")) {
      let folder = e.href.split("/").slice(-1)[0];
      let a = await fetch(`/most/${folder}/info.json`);
      let jsonResponse = await a.json();
      card.innerHTML =
        card.innerHTML +
        `<div data-folder="${folder}" class="column3">
                          <div  class="play">
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="16" height="16" fill="black">
                          <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/>
                        </svg>
                      </div>
                      
                      
                <img src="/most/${folder}/cover.jpg" alt="">
                <h2>${jsonResponse.title}</h2>
                <p>${jsonResponse.description}</p>
                </div>`;
    }
  }

  // load playlist whenever the coolumn in second row is clicked//
  Array.from(document.querySelectorAll(".cards3 .column3")).forEach((e) => {
    e.addEventListener("click", async (item) => {
      songs = await monks(`most/${item.currentTarget.dataset.folder}`);
      playMusic(songs[0]);
    });
  });
}
//   




// Main Logic for the Web App//

async function hussain() {
  songs = await monks("songs/ncs");
  playMusic(songs[0], true);
  await displayAlbums();
  await displayAlbums2();
  await displayAlbums3();

  // backward Button//
  document.getElementById("back").addEventListener("click", () => {
    const icon = document.getElementById("playbutton");
    let index = songs.indexOf(currentSong.src);
    if (index - 1 >= 0) {
      playMusic(songs[index - 1]);
    }
    // Check current icon class and toggle between fa-play and fa-pause
    if (icon.classList.contains("fa-play")) {
      icon.classList.replace("fa-play", "fa-pause");
      currentSong.play();
    } else {
      icon.classList.replace("fa-pause", "fa-play");
      currentSong.pause();
      // Change to play icon & pause the song
    }
  });

  //

  document.getElementById("playbutton").addEventListener("click", () => {
    // const myTextarea = document.getElementById("myTextarea").select().style.width = "99%";
    currentSong.play();
    toggleIcon();
  });

  // forward button in playbar //
  document.getElementById("forward").addEventListener("click", () => {
    let index = songs.indexOf(currentSong.src);
    if (index + 1 < songs.length) {
      playMusic(songs[index + 1]);
    }

    const icon = document.getElementById("playbutton");
    if (icon.classList.contains("fa-play")) {
      icon.classList.replace("fa-play", "fa-pause");
      currentSong.play();
    } else {
      currentSong.play();
      // Change to play icon & pause the song
    }
  });

  // code for time adjustments in playbar //
  currentSong.addEventListener("timeupdate", () => {
    document.querySelector("#duration").innerHTML = `${secondsToMinutesSeconds(
      currentSong.duration
    )}`;
    document.querySelector("#running").innerHTML = `${secondsToMinutesSeconds(
      currentSong.currentTime
    )}`;
    const circle = document.getElementById("circle");
    circle.max = currentSong.duration;
    circle.value = currentSong.currentTime;

    // const circle = document.getElementById("circle");
    circle.addEventListener("input", () => {
      currentSong.currentTime = circle.value;
    });
  });

  currentSong.addEventListener("ended", () => {
    endSong(false);
  });
  //                                                   //

  // function contains logic of play pause button//
  function toggleIcon() {
    const icon = document.getElementById("playbutton");

    // Check current icon class and toggle between fa-play and fa-pause
    if (icon.classList.contains("fa-play")) {
      icon.classList.replace("fa-play", "fa-pause");
      currentSong.play(); // Change to pause icon & play the song
    } else {
      icon.classList.replace("fa-pause", "fa-play");
      currentSong.pause(); // Change to play icon & pause the song
    }
  }

  // EventListener for the volume change //
  range.addEventListener("change", (e) => {
    console.log("Setting volume to", e.target.value, "/ 100");
    const awaaz = e.target.value / 100;
    currentSong.volume = awaaz;
    if (currentSong.volume > 0) {
      vol.classList.replace("fa-volume-xmark", "fa-volume-high");
    } else vol.classList.replace("fa-volume-high", "fa-volume-xmark");
  });

  // volume bar & icon controls //
  volume.addEventListener("click", () => {

    if (vol.classList.contains("fa-volume-high")) {
      vol.classList.replace("fa-volume-high", "fa-volume-xmark");

      currentSong.volume = parseInt(0 / 100);
      volRange.value = parseInt(0 / 100);
    } else vol.classList.replace("fa-volume-xmark", "fa-volume-high");
    currentSong.volume = parseInt(10 / 100);
    volRange.value = parseInt(10 / 100);
  });
  function endSong(isPlaying) {
    if (isPlaying) {
      icon.classList.replace("fa-play", "fa-pause");
    } else {
      icon.classList.replace("fa-pause", "fa-play");
    }
  }

  function slider() {
    valPercent = (volRange.value / volRange.max) * 100;
    
    volRange.style.background = `linear-gradient(to right, #DF871B ${valPercent}%, #000000 ${valPercent}%)`;
    volRange.style.transition = "1s all ease";
    
  }
  volRange.addEventListener("change", slider);
  volRange.addEventListener("input", volCol);

  function volCol() {
    valPercent = (volRange.value / volRange.max) * 100;
    volRange.style.background = `linear-gradient(to right, #DF871B ${valPercent}% , #000000 ${valPercent}%)`;
  }

  //  
  
  
  //
  // play songs whenever the card is clicked //
  const cards = document.querySelectorAll(".column");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      playMusic(songs[0], false);
    });
  });

  const card2 = document.querySelectorAll(".column2");
  card2.forEach((card) => {
    card.addEventListener("click", () => {
      playMusic(songs[0], false);
    });
  });

  //                                                                     //
}

hussain();


